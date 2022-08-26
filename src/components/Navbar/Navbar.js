import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import "./navbar.css";
import { toast } from "react-toastify";

export default function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div
      className="fixed-top border navbar-brand ml-5"
      style={{ backgroundColor: "white" }}
    >
      <nav className="navbar bg-black ">
        <div>
          <Link className="image " to="/">
            <img
              src="logo192.jpg"
              width={360}
              height={75}
              alt="logo"
              className="ms-5"
            />
          </Link>
        </div>{" "}
        <div className="col-130 justify-content-center">
          <b>
            <Link className="btn btn-block btn-dark me-3 " to="/">
              Home{" "}
            </Link>
          </b>

          <b>
            <Link class="btn btn-block btn-dark me-3 " to="/drafts">
              Drafts
            </Link>{" "}
          </b>
          <b>
            <Link class="btn btn-block btn-dark me-3 " to="/edition">
              Edition
            </Link>{" "}
          </b>
          <b>
            <Link class="btn btn-block btn-dark me-3 " to="/published">
              Published
            </Link>{" "}
          </b>
        </div>
        <div>
          <div className="col-9 ps-3"></div>
          {user && (
            <>
              <span className="username">Signed is as {user.displayName}</span>
              <button
                className="btn btn-block btn-dark btn-sm me-3"
                onClick={() => {
                  signOut(auth);
                  {
                    toast("Logged out", { type: "warning" });
                  }
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
