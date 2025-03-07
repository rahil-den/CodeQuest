import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import ScrollingFeatures from "../components/scrollingfeatures.jsx";
import AboutUs from "../components/aboutus.jsx";
import ContactUs from "../components/contactus.jsx";
import Footer from "../components/footer.jsx";
import "./homepage.css";

function Index() {
  return (
    <>
      <Header />
      {/* Hero Section Below 👇🏻 */}
      <section className="text-primary h-[90vh] flex items-start justify-center pt-20 lg:pt-32">
  <div className="container mx-auto px-6 lg:px-20 text-center">
    <h1 className="text-4xl lg:text-6xl font-bold">
      Level Up Your Coding Skills with <span className="text-accent">CodeQuest!</span>
    </h1>
    <p className="mt-4 text-xl lg:text-2xl  font-medium">
      Let's start practicing and write that code.
    </p>
    <Link
      to="/practice"
      className="mt-6 inline-block bg-accent text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-hover transition-all"
    >
      Start Practicing
    </Link>
  </div>
</section>

<ScrollingFeatures />

    <div className="m-28">
      {/* <p className="text-hidden"> */}
        
        {/* </p> */}
    </div>

      <div  id="about-us">
      
        <AboutUs />
      </div>

      <div id="Contact-us">
        <ContactUs />
      </div>

      <div id="footer">
        <footer>

          <Footer />
          {/* <div className="container mx-auto px-6 lg:px-20 py-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-primary">CodeQuest</p>
              </div>
              <div>
                <p className="text-primary">© 2021 CodeQuest. All rights reserved.</p>
              </div>
            </div>
          </div> */}
        </footer>
      </div>
    </>
  );
}

export default Index;
