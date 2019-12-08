import React from "react";

const Result = props => {
  return (
    <div className="col-sm-6">
      <div className="card card--marginBottom-1rem">
        <div className="card-body">
          <h5 className="card-title">{props.courseDetails["Course Name"]}</h5>
          <h5 className="card-title text-muted">
            {props.courseDetails["Parent Subject"]}
          </h5>
          <h6 className="card-text">
            By: {props.courseDetails["Universities/Institutions"]}
          </h6>
          <h6 className="card-text">
            Platform: {props.courseDetails["Provider"]}
          </h6>

          <p className="length text-muted">
            Course Duration: {props.courseDetails["Length"]} hrs
          </p>
          <p className="nextSession text-muted">
            Next Session: {props.courseDetails["Next Session Date"]}
          </p>

          <a
            href={props.courseDetails["Video(Url)"]}
            className="btn btn-primary text-left"
          >
            Watch Video
          </a>
          <a
            href={props.courseDetails["Url"]}
            className="btn btn-success button-right"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
