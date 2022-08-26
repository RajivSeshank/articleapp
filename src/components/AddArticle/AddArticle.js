import React, { useState } from "react";
import { Timestamp, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import slugify from "react-slugify";

export default function AddArticle() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
    category: "",
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSlugChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: slugify(e.target.title) });
  // };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.image ||
      !formData.category
    ) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
          category: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = doc(db, "articles", slugify(formData.title));
          setDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
            category: formData.category,
            // slug: slugify(formData.title),
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div
      className="border p-3 mt-3 bg-light shadow"
      style={{ position: "fixed", paddding: 10, width: 400 }}
    >
      {!user ? (
        <>
          <h4>
            <Link to="/signin" className="btn btn-block btn-dark mt-2">
              Login to Editor Portal
            </Link>
          </h4>
          Don't have an account? <Link to="/register">Signup</Link>
        </>
      ) : (
        <>
          <span className="text-center text-dark py-3 display-6">
            {" "}
            Create an article
          </span>

          <div className="form-group" style={{ width: 360 }}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="">Url: </label>
            <div className="form-control" style={{ width: 360 }}>
              {" "}
              article/ {slugify(formData.title)}
            </div>

            {/* description */}
            <label htmlFor="">Description</label>
            <div>
              {/* <CKEditor
              editor={ClassicEditor}
              data={formData.description}
              onChange={(e) => {
                handleChange(e);
              }}
            ></CKEditor> */}
            </div>
            <textarea
              name="description"
              className="form-control"
              data={formData.description}
              onChange={(e) => handleChange(e)}
            />
            {/* image */}
            <label htmlFor="">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
            />
            <div className="form-group p-2">
              <label htmlFor="">Status: </label>
              {/* <input
              type="text"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={(e) => handleChange(e)}
            /> */}
              <select
                className="form-control ml-3"
                name="category"
                type="text"
                onChange={(e) => handleChange(e)}
              >
                {" "}
                <option>Select an option</option>
                <option value="Draft">Draft</option>
                <option value="Edition">Edition</option>
                <option value="Published">Published</option>
              </select>
            </div>
            {progress === 0 ? null : (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped mt-2"
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image ${progress}%`}
                </div>
              </div>
            )}
          </div>
          <button
            className="form-control btn btn-block btn-dark mt-2"
            onClick={handlePublish}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
