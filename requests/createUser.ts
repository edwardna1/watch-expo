import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs } from "firebase/firestore";
// Follow this pattern to import other Firebase services
import { db } from "../firebaseConfig";
import { router } from "expo-router";

export const createUser = async (username, password) => {
  if (!username || !password) {
    return "Please enter both username and password.";
  }

  try {
    // Add the user to the Firestore `users` collection
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      password: password,
      createdAt: new Date(),
    });

    console.log("User added with ID:", docRef.id);
    return "Successfully added user to database";
  } catch (error) {
    console.error("Error adding user:", error);
    return "ERROR";
  }
};
