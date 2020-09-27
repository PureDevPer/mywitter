import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  // https://reactrouter.com/web/api/Hooks
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyTweet = async () => {
    const tweets = await dbService
      .collection("myMessage")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweet();
  }, [getMyTweet]);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
