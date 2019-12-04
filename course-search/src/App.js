import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  useEffect(() => {
    fetch("http://nut-case.s3.amazonaws.com/coursessc.json")
      .then(response => response.json())
      .then(result => {
        console.log(result);
        localStorage.setItem("courseData", JSON.stringify(result));
      });
  }, []);

  let data = JSON.parse(localStorage.getItem("courseData"));

  if (data.length > 0) {
    return (
      <div>
        {data.map(details => (
          <h5 key={details["Course Id"]}>{details["Course Id"]}</h5>
        ))}
      </div>
    );
  }
  return <h1>Failure da mapla</h1>;
};

export default App;
