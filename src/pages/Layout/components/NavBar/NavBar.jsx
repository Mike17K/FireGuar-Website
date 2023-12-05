import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({visibleDropDown,setVisibleDropDown, isSearchInputSelected, setIsSearchInputSelected}) {

    const navbarRef = createRef(null);

    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    
  useEffect(() => {
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isNavbarVisible]);
  return (
  <div className={`navbar-container ${isNavbarVisible?"visible":"hidden"}-navbar ${(prevScrollPos<10)?"":"shaddow"}`}>
    <nav ref={navbarRef} >
      <Link to="/" className="logo">skroutz</Link>
      
    </nav>
  </div>  
  )
}
