import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    // https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get
    const dbTweets = await dbService.collection("myMessage").get();
    dbTweets.forEach((document) => {
      const tweetObj = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#add
    await dbService.collection("myMessage").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  console.log(tweets);
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
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </>
    </>
  );
};
export default Home;
