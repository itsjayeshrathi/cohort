import { useState } from "react";
import PostComponent from "./PostComponent.jsx";
import { useEffect } from "react";
const posts = [
  {
    id: 1,
    userImage: "../src/assets/images/dp.jpeg",
    userName: "Jayesh Rathi",
    followers: "10 followers",
    time: "12m",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, laboriosam tenetur? Assumenda illo, quasi rerum, est qui debitis autem nulla suscipit natus in, quaerat modi tempora deserunt eum placeat vero.",
  },
  {
    id: 2,
    userImage: "../src/assets/images/dp.jpeg",
    userName: "John Doe",
    followers: "25 followers",
    time: "1h",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, laboriosam tenetur? Assumenda illo, quasi rerum, est qui debitis autem nulla suscipit natus in, quaerat modi tempora deserunt eum placeat vero.",
  },
  {
    id: 3,
    userImage: "../src/assets/images/dp.jpeg",
    userName: "Alice Smith",
    followers: "18 followers",
    time: "5m",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, laboriosam tenetur? Assumenda illo, quasi rerum, est qui debitis autem nulla suscipit natus in, quaerat modi tempora deserunt eum placeat vero.",
  },
  {
    id: 4,
    userImage: "../src/assets/images/dp.jpeg",
    userName: "Linkdin",
    promoted: "Promoted",
    content: "Get job job job by saying I'm interested",
  },
];
function App() {
  const [count, setCount] = useState(0);
  useEffect(
    function () {
      const intervalId = setInterval(() => {
        console.log("clock ticking");
        setCount((count) => count + 1);
      }, 2000);
      return () => clearInterval(intervalId);
    },
    [count]
  );
  return (
    <>
      <div>{count}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {posts.map((post) => {
          return (
            <PostComponent
              key={post.id}
              userImage={post.userImage}
              userName={post.userName}
              followers={post.followers}
              time={post.time}
              promoted={post.promoted}
              content={post.content}
            />
          );
        })}
      </div>
    </>
  );
}
// function ToggleMessage() {
//   const [isVisible, setIsVisible] = useState(false);
//   return (
//     <>
//       <div style={{ paddingBottom: 5 }}>
//         <button onClick={() => setIsVisible(!isVisible)}>Toggle Message</button>
//         {isVisible && <p>lol you are fool</p>}
//       </div>
//     </>
//   );
// }

export default App;
