import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div>
      <h2>Web development curriculum</h2>
      <Header name={courses[0].name} />
      <Content parts={courses[0].parts} />

      <Total parts={courses[0].parts} />
      <Header name={courses[1].name} />
      <Content parts={courses[1].parts} />

      <Total parts={courses[1].parts} />
    </div>
  );
};

export default Course;
