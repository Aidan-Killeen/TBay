var express = require('express');
var router = express.Router();
var firebase = require("firebase");
const admin = require('firebase-admin')
//Address of private key
var serviceAccount = require("./../../../../tbay-c2e0d-firebase-adminsdk-ouq9q-f91bf19d0d.json");
const firebaseConfig = {
  apiKey: "AIzaSyAZajE4nOJqlYs170-ND9YMYooPg3tA5JE",
  authDomain: "tbay-c2e0d.firebaseapp.com",
  projectId: "tbay-c2e0d",
  storageBucket: "tbay-c2e0d.appspot.com",
  messagingSenderId: "633870967402",
  appId: "1:633870967402:web:bea053d2e77afd0915e013",
  measurementId: "G-WJNMPW4VJZ"
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 
  //Add email and password error handling here

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      return res.status(200).send('Sign up complete!');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

router.get('/login', (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    return user.getIdToken().then((idToken) => {
      return res.status(200).send(JSON.stringify({ idToken })); //return ID Token to client
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
});

router.get('/verify', (req, res) => {
  let idToken = req.body["idToken"];
  console.log("verify")
  // idToken comes from the client app
  admin.auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log("verified")
      return res.status(200).send("Verified!");
    })
    .catch((error) => {
      console.log(error)
      return res.status(200).send("Token verification failed!");
    });
});

router.get('/logout', (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});

module.exports = router;
