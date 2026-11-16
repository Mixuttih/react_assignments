import { useState, useEffect, useRef } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);


  // 1. Ilman riippuvuustaulukkoa
  // useEffect(fn)
  useEffect(() => {
    console.log('Component rendered');
  });

  // 2. Komponentin mount vaiheessa
  // useEffect(fn, [])
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // 3. Mount vaiheet sekä count -arvon muuttuessa
  // useEffect(fn, [count])
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // useRef hook
  const inputRef = useRef(count);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br></br>
      <textarea ref={inputRef} placeholder="Type something..." />
      <br></br>
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  )
}

export default Example
