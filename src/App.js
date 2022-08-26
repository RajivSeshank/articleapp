import React from "react";
import Articles from "./components/Articles/Articles";
import AddArticle from "./components/AddArticle/AddArticle";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/ArticleDetails/Article";
import Drafts from "./components/Drafts/Drafts";
import Edition from "./components/Edition/Edition";
import Published from "./components/Published/Published";
import Edit from "./components/Edit";
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/edition" element={<Edition />} />
          <Route path="/published" element={<Published />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route
            path="/"
            element={
              <div className="row mt-5 p-5">
                <div className="col-md-8">
                  <Articles />
                </div>
                <div className="col-md-4">
                  <AddArticle />
                </div>
              </div>
            }
          />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
