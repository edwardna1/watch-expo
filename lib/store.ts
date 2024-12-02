import { create } from "zustand";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path to your Firebase config file
import * as Notifications from "expo-notifications";

type Log = {
  name: string;
  createdAt: any;
  url?: string;
};

type State = {
  click: number;
  isAnimDone: boolean;
  token: string;
  logs: Log[]; // List of logs for pings
  pingCount: number; // Total number of pings
  unsubscribe: (() => void) | null;
  lastSeenTimestamp: Date;
  isPinging: boolean;
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
  startPinging: () => void;
  stopPinging: () => void;
  resetPings: () => void;
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
    const videoUrls = [
      "https://files.catbox.moe/hzbxgj.mp4", //black men kissing
      "https://files.catbox.moe/bp61pd.mp4",
      "https://files.catbox.moe/4ap2ne.mp4",
      "https://files.catbox.moe/yeltmq.mp4",
      "https://files.catbox.moe/ejtb1r.mp4",
    ];
    let currentIndex = 0;

    const interval = setInterval(async () => {
      try {
        const res1 = await fetch(
          "https://api.datamuse.com/words?ml=masturbate&max=100"
        );
        const data1 = await res1.json();
        const i1 = Math.floor(Math.random() * data1.length);
        const noun = data1[i1].word;
        const r2 = await fetch(
          `https://api.datamuse.com/words?ml=${noun}&max=100`
        );

        const data2 = await r2.json();

        const i2 = Math.floor(Math.random() * data2.length);
        const verb = data1[i2].word;

        console.log("n", noun);
        // Construct the video name
        const videoName = `ponke ${verb} ${noun}`;
        const url = videoUrls[currentIndex];
        currentIndex = (currentIndex + 1) % videoUrls.length;
        await addDoc(collection(db, "videos"), {
          name: videoName,
          createdAt: new Date(),
          url,
        });
        console.log(`Pinged: ${videoName}`);
      } catch (error) {
        console.error("Error adding video:", error);
      }
    }, 3000);

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
            newLogs.push(data);

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
        logs: [...newLogs, ...state.logs],
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
  resetPings: () => {
    set({ logs: [], pingCount: 0 });
  },
}));
