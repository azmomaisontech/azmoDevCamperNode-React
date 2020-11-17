import React from "react";
import { Course as CourseProps } from "../../context/type";

interface Props {
  course: Partial<CourseProps>;
}

const Course: React.FC<Props> = ({ course }) => {
  return (
    <div className="course">
      <div className="course-heading">
        <h2 className="s-heading">{course.title}</h2>
      </div>
      <div className="course-body">
        <h2 className="s-heading">Duration: {course.weeks} Weeks</h2>
        <p>{course.description}</p>
        <div className="course-key">
          <ul>
            <li>Cost: ${course.tuition} USD</li>
            <li>Skill Required: {course.minimumSkill}</li>
            <li>
              Scholarship Available:{" "}
              <span>
                {course.scholarshipAvailable ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Course;
