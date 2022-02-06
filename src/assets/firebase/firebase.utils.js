import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFKm7t1wB1Whlohi117LRHTrexDKKMwGA",
  authDomain: "crown-db-53831.firebaseapp.com",
  databaseURL: "https://crown-db-53831.firebaseio.com",
  projectId: "crown-db-53831",
  storageBucket: "crown-db-53831.appspot.com",
  messagingSenderId: "889683544707",
  appId: "1:889683544707:web:928fb291b19940df6869b6",
  measurementId: "G-9Q4W7CXQS5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account " });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  return userRef;
};

export default firebase;
