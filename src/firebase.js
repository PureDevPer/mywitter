import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA3EPZfRtxqvDSghuTHBmKxoesPjITFuHc",
  authDomain: "mywitter-ce310.firebaseapp.com",
  databaseURL: "https://mywitter-ce310.firebaseio.com",
  projectId: "mywitter-ce310",
  storageBucket: "mywitter-ce310.appspot.com",
  messagingSenderId: "859314881640",
  appId: "1:859314881640:web:2f3b10da66f1b8f5a927dd",
};

export default firebase.initializeApp(firebaseConfig);
