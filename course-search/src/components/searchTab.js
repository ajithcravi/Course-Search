import React from "react";
import $ from "jquery";

const SearchTab = () => {
  const formNewArrayOfUniqueItemsFromArrayOfObjects = (
    array,
    objectKey1,
    objectKey2
  ) => {
    let uniqueArray = [];
    let count = 0;
    array.forEach(element => {
      let elementIndexInArrayUsingObjectKey1 = $.inArray(
        element[objectKey1],
        uniqueArray
      );
      let elementIndexInArrayUsingObjectKey2 = $.inArray(
        element[objectKey2],
        uniqueArray
      );
      if (elementIndexInArrayUsingObjectKey1 === -1) {
        uniqueArray.push(element[objectKey1]);
      }
      if (elementIndexInArrayUsingObjectKey2 === -1) {
        uniqueArray.push(element[objectKey2]);
      }
      // else {
      //   uniqueArray[1][elementIndexInArrayUsingObjectKey1].push([count]);
      //   uniqueArray[1][elementIndexInArrayUsingObjectKey2].push([count]);
      // }
      count++;
    });
    console.log(uniqueArray);
    return uniqueArray;
  };

  const filterCondition = element => {
    let searchString = $("#input").val();
    return element.toUpperCase().includes(searchString.toUpperCase());
  };

  const changeHandler = array => {
    $("#input").on("input", () => {
      let newArray = array.filter(filterCondition);
      console.log(newArray);
    });
  };

  const fetchCourseDetailsFromApi = () => {
    fetch("http://nut-case.s3.amazonaws.com/coursessc.json")
      .then(courseDetails => courseDetails.json())
      .then(parsedCourseDetailsArray =>
        formNewArrayOfUniqueItemsFromArrayOfObjects(
          parsedCourseDetailsArray,
          "Child Subject",
          "Provider"
        )
      )
      .then(subjectsList => changeHandler(subjectsList));
  };

  fetchCourseDetailsFromApi();

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        id="input"
        className="form-control"
        placeholder="Let's begin here"
        aria-label="Let's begin here"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">
          Learn
        </button>
      </div>
    </div>
  );
};

export default SearchTab;
