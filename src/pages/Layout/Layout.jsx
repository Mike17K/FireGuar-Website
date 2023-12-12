// Layout.js
import { Outlet } from "react-router-dom";
import "./Layout.css";
import NavBar from "./NavBar/NavBar.jsx";
import { useEffect, useState } from "react";

function Layout() {
  const [visibleDropDown, setVisibleDropDown] = useState("");

  useEffect(() => {
    // this is used to close the dropdown when the user clicks outside of it
    const handleClickOutsideOfSearchInput = (event) => {
      if (event.target.closest(".popup") === null) {
        setVisibleDropDown("");
      }
    };
    document.addEventListener("mousedown", handleClickOutsideOfSearchInput);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideOfSearchInput
      );
    };
  }, []);

  return (
    <div id="body">
      <NavBar
        visibleDropDown={visibleDropDown}
        setVisibleDropDown={setVisibleDropDown}
      />

      <div className="main-content-container">
        <Outlet
          visibleDropDown={visibleDropDown}
          setVisibleDropDown={setVisibleDropDown}
        />
      </div>
    </div>
  );
}

export default Layout;
