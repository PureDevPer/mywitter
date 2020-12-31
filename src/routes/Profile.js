import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import ProfileTweet from "components/ProfileTweet";

const Profile = ({ userObj }) => {
  // https://reactrouter.com/web/api/Hooks
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const [init, setInit] = useState(false);
  const [myTweets, setMyTweets] = useState([]);
  useEffect(() => {
    const getMyTweet = async () => {
      const tweet = [];
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const tweets = await dbService
        .collection("myMessage")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
      // console.log(tweets.docs.map((doc) => doc.data()));
      tweets.docs.map((doc) => tweet.push(doc.data()));
      setMyTweets(tweet);
    };
    getMyTweet();
    setInit(true);
  }, [userObj.uid]);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
      {init ? (
        <>
          {myTweets.map((tweet) => (
            <ProfileTweet key={tweet.id} tweet={tweet} />
          ))}
        </>
      ) : (
        "Loading ..."
      )}
    </>
  );
};

export default Profile;
