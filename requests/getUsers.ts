import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore";
// Follow this pattern to import other Firebase services
import { db } from "../firebaseConfig";

// TODO: Replace the following with your app's Firebase project configuration

// Get a list of cities from your database
export const getUsers = async () => {
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Spread the fields
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
