import { collection, onSnapshot, where, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "articles");
    const q = query(articleRef, where("category", "==", "Published"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <div>
      <div>
        {articles.length === 0 ? (
          <p>No articles found!</p>
        ) : (
          articles.map(
            ({
              id,
              title,
              description,
              imageUrl,
              createdAt,
              createdBy,
              userId,
              likes,
              comments,
              category,
            }) => (
              <div>
                <br></br>
                <br></br>
                <br></br>

                <div className="border mt-3 p-3 bg-light shadow" key={id}>
                  <div className="col-6 ps-3"></div>

                  <div className="row">
                    <div className="col-3">
                      <Link to={`/article/${id}`}>
                        <img
                          src={imageUrl}
                          alt="title"
                          style={{ height: 180, width: 180 }}
                        />
                      </Link>
                    </div>
                    <div className="col-9 ps-3">
                      <div className="row">
                        <div className="col-6">
                          {createdBy && (
                            <span className="badge bg-secondary">
                              {" "}
                              Created by: {createdBy}
                            </span>
                          )}
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                          {user && user.uid === userId && (
                            <DeleteArticle id={id} imageUrl={imageUrl} />
                          )}
                        </div>
                      </div>
                      <h4 className="fs-4">{title}</h4>
                      <p> Published on: {createdAt.toDate().toDateString()}</p>
                      <h8>{description}</h8>
                      <div>
                        <br></br>
                        <span className="badge bg-secondary">
                          {" "}
                          Category: {category}
                        </span>
                      </div>
                      <div className="d-flex flex-row-reverse">
                        {user && <LikeArticle id={id} likes={likes} />}
                        <div className="pe-2">
                          <p>{likes?.length} likes</p>
                        </div>
                        {comments && comments.length > 0 && (
                          <div className="pe-2">
                            <p>{comments?.length} comments</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
