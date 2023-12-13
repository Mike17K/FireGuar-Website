import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ visibleDropDown, setVisibleDropDown }) {
  const navbarRef = createRef(null);

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("href");
      const targetElement = document.querySelector(target);
      targetElement.scrollIntoView({ behavior: "smooth" });
    };
    document.querySelectorAll(".nav-buttons-container div").forEach((div) => {
      div.addEventListener("click", handleSmoothScroll);
    });

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = prevScrollPos < currentScrollPos;

      // Check if scrolling down and the navbar is visible, or scrolling up and the navbar is hidden
      if (scrollingDown && isNavbarVisible) {
        setIsNavbarVisible(false);
      } else if (!scrollingDown && !isNavbarVisible) {
        setIsNavbarVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.querySelectorAll(".nav-buttons-container div").forEach((div) => {
        div.removeEventListener("click", handleSmoothScroll);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isNavbarVisible]);
  return (
    <nav
      ref={navbarRef}
      className={`navbar-container ${
        isNavbarVisible ? "visible" : "hidden"
      }-navbar ${prevScrollPos < 10 ? "" : "shaddow"} mx-auto`}
    >
      <Link
        to="/"
        className="w-[4rem] h-[4rem]"
        onClick={() => {
          document
            .querySelector("#toppage")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        <img src="logo64.png" alt="logo" />
      </Link>

      <div className="nav-buttons-container">
        <div href="#ourvision">Our Vision</div>
        <div href="#oursolution">Our Solution</div>
        <div href="#contactus">Contact Us</div>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="sign_in" className="bg-white p-4 rounded-full">
          Login Sign up
        </Link>
        <div>More Info</div>
      </div>
    </nav>
  );
}
