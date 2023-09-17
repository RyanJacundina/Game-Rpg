(function (){
const firebaseConfig = {
    apiKey: "AIzaSyBu9EOYIABkJ5gS12KaNENdoJYMhvWlAow",
    authDomain: "game-multiplayer-45455.firebaseapp.com",
    databaseURL: "https://game-multiplayer-45455-default-rtdb.firebaseio.com/",
    projectId: "game-multiplayer-45455",
    storageBucket: "game-multiplayer-45455.appspot.com",
    messagingSenderId: "292266434146",
    appId: "1:292266434146:web:171d802c1f35b02bb9bb3b",
    measurementId: "G-9PMVV5SJWK"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
})();

// Variables
  const firestore = firebase.firestore();