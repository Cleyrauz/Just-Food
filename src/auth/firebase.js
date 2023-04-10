import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCa3IG_edUs9LWhMGfUs_nF4TCbOHFhloQ",
    authDomain: "just-food-4ef99.firebaseapp.com",
    projectId: "just-food-4ef99",
    storageBucket: "just-food-4ef99.appspot.com",
    messagingSenderId: "266603645620",
    appId: "1:266603645620:web:f7b1fef3a778e85f1425e1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signUp = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signIn,
  signUp,
  logOut,
};