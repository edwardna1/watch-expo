import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firebase config

export const deleteUser = async (userId) => {
  try {
    const userDoc = doc(db, "users", userId); // Reference the document
    await deleteDoc(userDoc); // Delete the document
    console.log("User deleted with ID:", userId);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Propagate the error for handling in the component
  }
};
