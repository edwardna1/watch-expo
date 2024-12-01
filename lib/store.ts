import { create } from "zustand";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path to your Firebase config file
import * as Notifications from "expo-notifications";

type State = {
  click: number;
  isAnimDone: boolean;
  token: string;
  logs: string[]; // List of logs for pings
  pingCount: number; // Total number of pings
  unsubscribe: (() => void) | null;
  lastSeenTimestamp: Date;
  isPinging: Boolean;
  intervalId: NodeJS.Timeout;
  listenerStartTime: Date | null;
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
  finishAnimation: () => void;
  setToken: (newToken: string) => void;
  startPingListener: () => void;
  stopPingListener: () => void;
};

export const useStore = create<State & Actions>((set, get) => ({
  click: 0,
  isAnimDone: false,
  token: "",
  logs: [], // Initialize logs as an empty array
  pingCount: 0, // Initialize ping count as 0
  unsubscribe: null, // No listener initially
  listenerStartTime: null,
  lastSeenTimestamp: null,
  isPinging: false,
  intervalId: null,
  incrementClick: () => set((state) => ({ click: state.click + 1 })),
  decrementClick: () => set((state) => ({ click: state.click - 1 })),
  finishAnimation: () => set(() => ({ isAnimDone: true })),
  setToken: (newToken: string) => set(() => ({ token: newToken })),

  startPinging: async () => {
    const { isPinging, intervalId } = get();

    // Prevent multiple intervals
    if (isPinging || intervalId) return;

    set({ isPinging: true });

    const interval = setInterval(async () => {
      try {
        const videoName = `video_${new Date().toISOString()}_${Math.random()
          .toString(36)
          .substring(2, 8)}`;
        await addDoc(collection(db, "videos"), {
          name: videoName,
          createdAt: new Date(),
        });
        console.log(`Pinged: ${videoName}`);
      } catch (error) {
        console.error("Error adding video:", error);
      }
    }, 5000);

    set({ intervalId: interval });
  },

  stopPinging: () => {
    const { intervalId } = get();

    if (intervalId) {
      clearInterval(intervalId);
      set({ intervalId: null, isPinging: false });
      console.log("Stopped pinging...");
    }
  },

  startPingListener: () => {
    const { unsubscribe } = get();

    if (unsubscribe) {
      console.warn("Listener is already active.");
      return;
    }
    const startTime = new Date(); // Set the listener start time
    set({ lastSeenTimestamp: startTime });
    const { lastSeenTimestamp } = get();
    const newUnsubscribe = onSnapshot(collection(db, "videos"), (snapshot) => {
      const newLogs = [];
      let latestTimestamp = lastSeenTimestamp;
      console.log("lastSeenTimestamp", lastSeenTimestamp);
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          const createdAt = data.createdAt.toDate();

          // Only add and notify for new logs
          if (!lastSeenTimestamp || createdAt > lastSeenTimestamp) {
            newLogs.push(
              `Name: ${data.name}, Timestamp: ${createdAt.toLocaleString()}`
            );

            // Send a notification
            Notifications.scheduleNotificationAsync({
              content: {
                title: "New Ping Added",
                body: `Name: ${data.name}`,
                data: { ping: data },
              },
              trigger: null,
            });

            // Update the latest timestamp
            if (!latestTimestamp || createdAt > latestTimestamp) {
              latestTimestamp = createdAt;
            }
          }
        }
      });

      // Update logs, ping count, and last seen timestamp in the store
      set((state) => ({
        logs: [...state.logs, ...newLogs],
        pingCount: state.pingCount + newLogs.length,
        lastSeenTimestamp: latestTimestamp || state.lastSeenTimestamp,
      }));
    });

    set({ unsubscribe: newUnsubscribe });
  },

  stopPingListener: () => {
    const { unsubscribe } = get();

    if (unsubscribe) {
      unsubscribe();
      set({ unsubscribe: null });
    }
  },
}));
