import React from 'react';
import Course from "./components/Course";

const App = ({ courses }) => {
  return (
      <>
      <h1>Web development cirriculum</h1>
      <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
      </div>
      </>
  )
};

export default App;