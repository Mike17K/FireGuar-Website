import React, { useEffect, useState } from "react";
import "./Forests.css";
import ForestLayout from "./components/ForestLayout/ForestLayout";
import forestsDamyData from "./exampleForests.json";
import { useNavigate } from "react-router-dom";

export default function Forests() {
  const [forests, setForests] = useState([...forestsDamyData]);
  const [searchResults, setSearchResults] = useState(forests);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO
    // get forests data api call TODO
    // update the forests
    // update the searchResults and run the noInputChange function
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    // when submiting the form take the first result and get the id and redirect to the map page
    const firstResult = searchResults[0];
    const id = firstResult.id;
    navigate("/map?id=" + id);
  }

  function onInputChange(event) {
    const input = event.target.value;
    if (input === "") {
      setSearchResults(forests);
      return;
    }
    setSearchResults(forests.filter((forest) => forest.name.includes(input)));
  }

  return (
    <div className="mt-[5rem] flex flex-col gap-4 items-center w-[90%]">
      <form
        onSubmit={handleSubmit}
        className="group w-[400px] border-2 my-[1rem] px-2 rounded-full overflow-hidden hover:border-black flex focus-within:border-black"
      >
        <input
          type="text"
          className="w-full h-full py-2 px-4 focus-none group"
          onChange={onInputChange}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      {searchResults.map((forestData) => {
        return <ForestLayout data={forestData} />;
      })}
    </div>
  );
}
