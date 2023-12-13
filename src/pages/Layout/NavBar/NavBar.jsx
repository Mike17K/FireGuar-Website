import React, { createRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from '../../../contexts/AuthContext';

export default function NavBar({ visibleDropDown, setVisibleDropDown }) {
  const navbarRef = createRef(null);
  const { currentUser } = useContext(AuthContext);

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
        {
          currentUser ? (
            <Link to="/forests">Forests</Link>
          ) : (
            <div href="#ourvision">Our Vision</div>            
          )
        }
        {
          currentUser ? (
            <Link to="/map">Map</Link>
          ) : (
            <div href="#oursolution">Our Solution</div>
          )
        }
        <Link to="/contactus">Contact Us</Link>
      </div>

      <div className="flex gap-4 items-center">
        {
          currentUser ? (
            <div className="h-[4rem] aspect-square rounded-full bg-white border-2 lex items-center justify-center overflow-hidden">
              <img src={currentUser?.photoURL} alt="user img" />
            </div>
          ) : (
            <Link to="/sign_in" className="bg-white p-4 rounded-full">
              Login Sign up
            </Link>
          )
        }
        <div>More Info</div>
      </div>
    </nav>
  );
}
