import React from 'react';

const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
  };
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((accum, curr) => accum + curr.exercises, 0);
    return <h4>Number of exercises {sum}</h4>;
  };
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };
  
  const Course = ({ course }) => {
    // console.log(course)
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    );
  };

  export default Course;