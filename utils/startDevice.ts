import axios from "axios";
import { useDeviceStore } from "@lib/store"; // Import Zustand store

const RPI_IP = "100.96.222.60";  // Example Tailscale IP

export const startDeviceScript = async ():Promise<boolean> => {
  const { isScriptRunning, setScriptRunning } = useDeviceStore.getState();

  // Prevent duplicate start requests
  if (isScriptRunning) {
    console.log("⚠️ Script is already running. Skipping duplicate request.");
    return false;
  }

  try {
    console.log(`🔗 Sending request to Raspberry Pi at http://${RPI_IP}:5001/start`);

    setScriptRunning(true); // Set running state before request

    const response = await axios.post(`http://${RPI_IP}:5001/start`, {
      command: "start_script",
    });

    console.log("✅ Response received:", response.data);
    
    setScriptRunning(response.data.success); // Update running state based on response

    return response.data.success;
  } catch (error) {
    console.error(`🚨 Error: ${error.message}`);
    setScriptRunning(false); // Reset state if an error occurs
    return false;
  }
};

export const stopDeviceScript = async () => {
  const { setScriptRunning } = useDeviceStore.getState();

  try {
    console.log(`🔴 Sending stop request to Raspberry Pi at http://${RPI_IP}:5001/stop`);

    const response = await axios.post(`http://${RPI_IP}:5001/stop`, {
      command: "stop_script",
    });

    console.log("🛑 Response received:", response.data);

    setScriptRunning(false); // Mark script as stopped

    return response.data.success;
  } catch (error) {
    console.error(`🚨 Error stopping device script: ${error.message}`);
    setScriptRunning(false); // Ensure state resets even if an error occurs
    return false;
  }
};
