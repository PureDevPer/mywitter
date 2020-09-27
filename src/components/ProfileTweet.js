import React from "react";

const myTweet = ({ tweet }) => {
  return (
    <div>
      <h4>{tweet.text}</h4>
      {tweet.attachmentUrl && (
        <img src={tweet.attachmentUrl} alt="" width="50px" height="50px" />
      )}
    </div>
  );
};

export default myTweet;
