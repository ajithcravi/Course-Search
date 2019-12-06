import React, { useEffect, useState } from "react";
import $ from "jquery";

const SearchTab = props => {
  const changeHandler = () => {
    $("#input").change(() =>
      console.log("Vanakkam da mapla... input la irundhu")
    );
  };
  changeHandler();
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
