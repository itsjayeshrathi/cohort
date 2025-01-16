/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  function increaseCount() {
    setCount((count) => count + 1);
  }
  return (
    <div>
      <Counter key={count} count={count} />
      <button onClick={increaseCount}>increase count</button>
    </div>
  );
}

function Counter(props) {
  useEffect(
    function () {
      console.log("count changed");
      return function () {
        console.log("inside cleanup");
      };
    },
    [props.count]
  );
  return (
    <>
      <h1>{`Counter ${props.count}`}</h1>
    </>
  );
}
export default App;

// import { useState } from "react";
// import "./App.css";
// import { useEffect } from "react";

// function App() {
//   let [counterVisible, setCounterVisible] = useState(true);
//   useEffect(function () {
//     setInterval(function () {
//       setCounterVisible((c) => !c);
//     }, 5000);
//   }, []);
//   return (
//     <>
//       <div>{counterVisible && <Counter />}</div>
//     </>
//   );
// }
// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(function () {
//     let clock = setInterval(function () {
//       // setCount((count) => count + 1);
//       setCount(function (count) {
//         return count + 1;
//       });
//     }, 1000);

//     return function () {
//       clearInterval(clock);
//     };
//   }, []);

//   function increaseCount() {
//     setCount(count + 1);
//   }

//   return (
//     <>
//       <div>
//         <div>{count}</div>
//         <button onClick={increaseCount}>increase Count</button>
//       </div>
//     </>
//   );
// }
// export default App;
