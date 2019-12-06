// Importing packages and styles
import React, { useState, useEffect } from "react"; //Importing React, usestate and useeffect  from react
import SearchTab from "./components/searchTab";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import $ from "jquery";

const App = () => {
  let childSubjectList = [];
  let [courseDetails, setCourseDetails] = useState(undefined);
  useEffect(() => {
    fetch("http://nut-case.s3.amazonaws.com/coursessc.json")
      .then(response => response.json())
      .then(result => setCourseDetails((courseDetails = result)))
      .then(() =>
        courseDetails.forEach(element => {
          if ($.inArray(element["Child Subject"], childSubjectList) === -1)
            childSubjectList.push(element["Child Subject"]);
        })
      )
      .then(() => console.log(childSubjectList));
  }, []);
  return <SearchTab courseDetails={courseDetails} />;
};

export default App;
