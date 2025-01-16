/* eslint-disable react/prop-types */

function PostComponent({
  userImage,
  userName,
  followers,
  time,
  promoted,
  content,
}) {
  console.log("post component is getting rerendered");
  return (
    <div
      style={{
        width: 200,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        marginTop: 0,
        marginBottom: 5,
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          src={userImage}
          alt="User"
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
        <div style={{ marginLeft: 5 }}>
          <b>{userName}</b>
          {promoted ? (
            <div style={{ fontSize: 12 }}>{promoted}</div>
          ) : (
            <div style={{ fontSize: 12 }}>
              <div>{followers}</div>
              <div>{time}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ fontSize: 12 }}>{content}</div>
    </div>
  );
}
export default PostComponent;
