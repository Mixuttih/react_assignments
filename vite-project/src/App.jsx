import './App.css';
import Greeting from './components/Greeting.jsx';
import Home from './components/Home';
const App = () => {

  const siteName = "Super Site"

  return (
    <>
      <h1>My App asdasd {siteName}</h1>
      <p>ugugh {35-1}</p>
      <Greeting name="big boi" age={30} isTeacher={true} />
      <Greeting name="small boi" age={25} isTeacher={false} />
      <Greeting name="medium boi" age={35} isTeacher={true} />
      <Home />
    </>
  );
};
export default App;
