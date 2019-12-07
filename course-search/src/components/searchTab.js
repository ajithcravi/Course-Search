import React from "react";
import $ from "jquery";

const SearchTab = () => {
  const formNewArrayOfUniqueItemsFromArrayOfObjects = (array, objectKey) => {
    let childSubjectArray = [];
    array.forEach(element => {
      if ($.inArray(element[objectKey], childSubjectArray) === -1)
        childSubjectArray.push(element[objectKey]);
    });
    return childSubjectArray;
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
          "Child Subject"
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
        placeholder="Recipient's username"
        aria-label="Recipient's username"
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
