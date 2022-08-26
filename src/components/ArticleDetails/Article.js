import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import LikeArticle from "../LikeArticle";

import { Link } from "react-router-dom";

import slugify from "react-slugify";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    category: "",
  });

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
        className="container border bg-light rounded mb-0 shadow p-4"
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
                {" "}
                <h2>{article.title}</h2>
                {user && (
                  <div>
                    {" "}
                    {article.category === "Edition" && (
                      <Link
                        className="btn btn-block btn-dark sm me-3"
                        to={`/edit/${id}`}
                      >
                        Edit{" "}
                      </Link>
                    )}{" "}
                  </div>
                )}
                {user && (
                  <div>
                    {" "}
                    {article.category === "Draft" && (
                      <Link
                        className="btn btn-block btn-dark sm me-3"
                        to={`/edit/${id}`}
                      >
                        Edit{" "}
                      </Link>
                    )}{" "}
                  </div>
                )}
                {/* <FontAwesomeIcon icon="fa-solid fa-pen" /> */}
                {/* <div>{slugify(article.title)}</div> */}
                <h5>Author: {article.createdBy}</h5>
                <div>
                  {" "}
                  {article.category === ("Edition" || "Draft") && (
                    <div>
                      Created on: {article.createdAt.toDate().toDateString()}
                    </div>
                  )}
                </div>
                <div>
                  {" "}
                  {article.category === "Draft" && (
                    <div>
                      Created on: {article.createdAt.toDate().toDateString()}
                    </div>
                  )}
                </div>
                <div>
                  {" "}
                  {article.category === "Published" && (
                    <div>
                      Published on: {article.createdAt.toDate().toDateString()}
                    </div>
                  )}
                </div>
                <hr />
                <h4>{article.description}</h4>
                <div className="d-flex flex-row-reverse">
                  {user && <LikeArticle id={id} likes={article.likes} />}
                  <div className="pe-2">
                    <p>{article.likes.length} Likes</p>
                  </div>
                </div>
                {/* comment  */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
