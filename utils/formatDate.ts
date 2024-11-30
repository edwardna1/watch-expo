import { format } from "date-fns";

export const formatDate = (firestoreTimestamp) => {
  if (!firestoreTimestamp) return "No date available";
  const date = firestoreTimestamp.toDate();
  return format(date, "dd-MM-yyyy HH:mm");
};
