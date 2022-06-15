import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div
      className="fixed-top border navbar-brand ml-5"
      style={{ backgroundColor: "white" }}
    >
      <nav className="navbar">
        <div>
          <img
            src="logo192.png"
            width={60}
            height={60}
            alt="logo"
            className="ms-5"
          />
          NewsApp
        </div>{" "}
        <b>
          <Link className="navbar-brand " to="/">
            Home{" "}
          </Link>
        </b>
        <div>
          {user && (
            <>
              <span className="pe-4">Signed is as {user.displayName}</span>
              <button
                className="btn btn-block btn-dark btn-sm me-3"
                onClick={() => {
                  signOut(auth);
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
