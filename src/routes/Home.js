import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // Real-time
    // https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#onsnapshot
    dbService.collection("myMessage").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#add
    await dbService.collection("myMessage").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  // console.log(tweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={140}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
      </form>
      <>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </>
    </>
  );
};
export default Home;
