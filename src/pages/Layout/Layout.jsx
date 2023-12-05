// Layout.js
import { Outlet } from "react-router-dom";
import "./Layout.css";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";

function Layout() {
  const [visibleDropDown, setVisibleDropDown] = useState("");
  const [isSearchInputSelected,setIsSearchInputSelected] = useState(false);  

  useEffect(() => {
    const handleClickOutsideOfSearchInput = (event) => {
      if(event.target.closest(".popup") === null){ // make more here for every dropdown
        setVisibleDropDown("");
      }
      if (event.target.name !== "INPUT") setIsSearchInputSelected(false);
    }
    document.addEventListener("mousedown", handleClickOutsideOfSearchInput);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOfSearchInput);
    };
  }, []);


  return (
    <div id="body">
        <NavBar visibleDropDown={visibleDropDown} setVisibleDropDown={setVisibleDropDown} isSearchInputSelected={isSearchInputSelected} setIsSearchInputSelected={setIsSearchInputSelected}/>

        <div className="main-content-container">
          <Outlet visibleDropDown={visibleDropDown} setVisibleDropDown={setVisibleDropDown}/>
        </div>
    </div>
  );
}

export default Layout;
