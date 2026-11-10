const Greeting = (props) => {
  return <p><h1>Hello, {props.name}.</h1> You are {props.age} years old and you are {props.isTeacher ? 'a teacher' : 'not a teacher'}.</p>;
};

export default Greeting;

