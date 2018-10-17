var firebase = require('firebase');

var config = {
  apiKey: "",
  authDomain: "firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "",
  storageBucket: ".appspot.com",
  messagingSenderId: ""
};
firebase.initializeApp(config);

module.exports = {
    firebase: firebase,
};
