import axios from "axios";

// Replace with your Raspberry Pi's actual IP
const RPI_IP = "100.96.222.60";  // Example Tailscale IP
// const RPI_IP = "192.168.1.123";  // Example local Wi-Fi IP

export const startDeviceScript = async () => {
  try {
    console.log(`🔗 Sending request to Raspberry Pi at http://${RPI_IP}:5001/start`);

    const response = await axios.post(`http://${RPI_IP}:5001/start`, {
      command: "start_script",
    });

    alert(`✅ Response received: ${response.data}`);

    return response.data.success;
  } catch (error) {
    alert(`🚨 Error starting device script: ${error.message}`);
    return false;
  }
};

export const stopDeviceScript = async () => {
  try {
    console.log(`🔴 Sending stop request to Raspberry Pi at http://${RPI_IP}:5001/stop`);

    const response = await axios.post(`http://${RPI_IP}:5001/stop`, {
      command: "stop_script",
    });

    alert(` Response received: ${response.data}`);

    return response.data.success;
  } catch (error) {
    alert(`🚨 Error stopping device script, ${error.message}`);
    return false;
  }
};
