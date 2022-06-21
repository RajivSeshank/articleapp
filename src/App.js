import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";
import Drafts from "./components/Drafts";
import Edition from "./components/Edition";
import Published from "./components/Published";
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
