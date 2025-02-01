import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "./index.css";

function Index() {
  return (
    <>
      <Header />
      {/* Hero Section Below 👇🏻 */}
      <div className="container">
        <h1>Welcome to CodeQuest</h1>
        <h2>Learn to code with us</h2>
        <p>
          CodeQuest is a platform where you can practice coding and learn new
          concepts. We have a wide range of problems to solve and tutorials to
          help you learn new concepts. We also have a map that shows you the
          path to becoming a coding master. So what are you waiting for? Get
          started now!
        </p>
        <div className="button-container">
          <Link to="/Practice" className="button">
           Practice
          </Link>
          <Link to="/map" className="button">
            Map
          </Link>
        </div>
      </div> 
    </>
  );
}

export default Index;
