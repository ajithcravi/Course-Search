// Importing the required modules
import React, { useState } from "react"; //Importing react
import $ from "jquery"; //Importing jquery
import Result from "./Result";

// Defining the SearchTab component
const SearchTab = () => {
  let [courses, setCourses] = useState([]);
  let courseDetails = []; // This array contains the course details fetched from the api
  // This array contains the keywords that the user will search for at index 0 and the respective indices in 'courseDetails' array at index 1.
  // It is declred outside the 'createKeywordsWithRespectiveIndicesArray' function because it's scope extends beyond the function
  let keywordsWithRespectiveIndices = [[], []];

  let courseSearchResult = [];

  /**
   * This function is displayed as a part of  SearchTab component.
   * @description This function returns a 2d array with 2 rows. 1st row containing an array of keywords and second tab containing an array of their respective indices in input array
   * @function createKeywordsWithRespectiveIndicesArray
   * @param {array} - The array to be searched through
   * @param {string} - First object key to search for
   * @param {string} - Second object key to search for
   */
  const createKeywordsWithRespectiveIndicesArray = (
    array,
    objectKey1,
    objectKey2
  ) => {
    courseDetails = array; // Storing the input array as 'courseDetails'
    let indexCount = 0; // This is to keep a check of the index while looping through the array

    // Looping throuh the array
    array.forEach(element => {
      // $.inArray compares an element and an array. If the element is found in the array, it returns its index in that array. Else, it will return -1
      // Comaring the value of First object key of the current element and the 0th index subarray of 'keywordsWithRespectiveIndices' array and storing it in variable 'elementIndexInArrayUsingObjectKey1'
      let elementIndexInArrayUsingObjectKey1 = $.inArray(
        element[objectKey1],
        keywordsWithRespectiveIndices[0]
      );

      // Comaring the value of Second object key of the current element and the 0th index subarray of 'keywordsWithRespectiveIndices' array and storing it in variable 'elementIndexInArrayUsingObjectKey2'
      let elementIndexInArrayUsingObjectKey2 = $.inArray(
        element[objectKey2],
        keywordsWithRespectiveIndices[0]
      );

      // If 'elementIndexInArrayUsingObjectKey1' turns -1 store the value and its input array index' in 'keywordsWithRespectiveIndices'
      if (elementIndexInArrayUsingObjectKey1 === -1) {
        keywordsWithRespectiveIndices[0].push(element[objectKey1]);
        keywordsWithRespectiveIndices[1].push([indexCount]);
      }
      // If 'elementIndexInArrayUsingObjectKey2' turns -1 store the value and its input array index' in 'keywordsWithRespectiveIndices'
      if (elementIndexInArrayUsingObjectKey2 === -1) {
        keywordsWithRespectiveIndices[0].push(element[objectKey2]);
        keywordsWithRespectiveIndices[1].push([indexCount]);
      }
      // If both the conditions doesn't satisfy, it means the keywords are already in the 'keywordsWithRespectiveIndices[0]' array. So add the newly found indices to 'keywordsWithRespectiveIndices[1]' array
      else {
        elementIndexInArrayUsingObjectKey1 > -1
          ? keywordsWithRespectiveIndices[1][
              elementIndexInArrayUsingObjectKey1
            ].push(indexCount)
          : void 0;
        elementIndexInArrayUsingObjectKey2 > -1
          ? keywordsWithRespectiveIndices[1][
              elementIndexInArrayUsingObjectKey2
            ].push(indexCount)
          : void 0;
      }
      indexCount++; // Increment the indexCount
    });
    // Though 'keywordsWithRespectiveIndices' is globally declared, it is returned here because this functionis used in '.then' promise, that should return a value
    return keywordsWithRespectiveIndices;
  };

  /**
   * This callback is displayed as a part of  SearchTab component.
   * @description This function returns the condition to filter. Here it checks whether the value typed in the DOM component with id 'input' is included in the respective input element.
   * @function filterCondition
   * @param {any} - The element to be checked
   */
  const filterCondition = element => {
    let searchString = $("#input").val();
    return element.toUpperCase().includes(searchString.toUpperCase());
  };

  /**
   * This function is displayed as a part of  SearchTab component.
   * @description This function handles the changes made to the DOM element with id 'input'
   * @function changeHandler
   * @param {array} - The array to be searched through
   */
  const changeHandler = array => {
    $("#input").on("input", () => {
      let keywordIndex = [];
      let courseIndex = [];

      // It filers the 'keywordsWithRespectiveIndices[0]' array according to the user input and stores it in 'filteredKeywordsArrayAccordingToInputSearch'
      let filteredKeywordsArrayAccordingToInputSearch = array[0].filter(
        filterCondition
      );

      // It traces the indices of filtered keywords in 'keywordsWithRespectiveIndices[0]' array and stores it in the 'keywordIndex' array
      keywordIndex = filteredKeywordsArrayAccordingToInputSearch.map(element =>
        keywordsWithRespectiveIndices[0].indexOf(element)
      );
      // It stores the values present in 'keywordsWithRespectiveIndices[1]'(the indices corresponding to 'keywordIndex') in 'courseIndex' array
      courseIndex = keywordIndex.map(
        element => keywordsWithRespectiveIndices[1][element]
      );

      // For each value in the 'courseIndex' array and subarrays find the respective element from the 'courseDetails' array
      courseIndex.forEach(element => {
        courseSearchResult = element.map(
          particularElement => courseDetails[particularElement]
        );
      });
      setCourses(courseSearchResult);
    });
  };

  /**
   * This function is displayed as a part of  SearchTab component.
   * @description This function fetches data from API.
   * @function fetchCourseDetails
   */
  const fetchCourseDetails = () => {
    fetch("http://nut-case.s3.amazonaws.com/coursessc.json") // Fetching data from API
      .then(data => data.json()) // Parsing the feetched data
      .then(parseddataArray =>
        createKeywordsWithRespectiveIndicesArray(
          // Calling the createKeywordsWithRespectiveIndicesArray function
          parseddataArray,
          "Child Subject",
          "Provider"
        )
      )
      .then(subjectsList => changeHandler(subjectsList)); // Calling the changeHandler function
  };

  fetchCourseDetails();
  return (
    <div>
      <h1 className="appTitle">Let's Learn</h1>
      <div className="input-group mb-3 searchbarAndButton">
        <input
          type="text"
          id="input"
          className="form-control"
          placeholder="Begin here"
          aria-label="Begin here"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Learn
          </button>
        </div>
      </div>
      <div className="row">
        {courses.map(element => (
          <Result key={element["Course Id"]} courseDetails={element} />
        ))}
      </div>
    </div>
  );
};

export default SearchTab;
