import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // Check if the credentials are correct
    if (username === "admin" && password === "admin@123") {
      setIsAuthenticated(true);
      console.log("Login successful");
    } else {
      alert("Invalid credentials");
      console.log("Login failed");
    }
  };

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <>
            {/* <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav> */}
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Navigate replace to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
