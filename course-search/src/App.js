// Importing required modules and components
import React from "react"; //Importing React, usestate and useeffect  from react
import SearchTab from "./components/SearchTab"; // Importing the SearchTab component

// Importing the style
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {

  
  return (
    <div className="contents">
      <SearchTab />
    </div>
  );
};

export default App;
