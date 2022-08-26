import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeArticle from "./LikeArticle";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div>
      <br></br>
      <br></br>
      <div
        className="container border bg-light rounded mb shadow p-4"
        style={{ marginTop: 70 }}
      >
        {article && (
          <div>
            <div className="row">
              <div className="col-3">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  style={{ width: "100%", padding: 10 }}
                />
              </div>
              <div className="col-9 mt-3">
                <h2>{article.title}</h2>

                {/* <FontAwesomeIcon icon="fa-solid fa-pen" /> */}
                <h5>Author: {article.createdBy}</h5>
                <div>
                  {" "}
                  Published on: {article.createdAt.toDate().toDateString()}
                </div>
                <hr />

                <div className="col-11 py-4">
                  <CKEditor
                    editor={ClassicEditor}
                    data={article.description}
                  ></CKEditor>
                </div>

                <Link className="btn btn-block btn-dark sm my-4 " to="/">
                  Submit{" "}
                </Link>
                <br></br>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
