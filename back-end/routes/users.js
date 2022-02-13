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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 
  //Add email and password error handling here

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
      //create session token
      return res.status(200).send('Hello World!');

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});

router.get('/login', (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 
  //Add email and password error handling here
  console.log("HERE")
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    return user.getIdToken().then((idToken) => {
      return res.status(200).send(JSON.stringify({ idToken })); //returns ID Token
    });
    // ...
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
      // ...
    })
    .catch((error) => {
      // Handle error
      console.log(error)
      return res.status(200).send("Verified!");
    });
});

router.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

router.get('/logout', (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 
  //Add email and password error handling here

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});

module.exports = router;
