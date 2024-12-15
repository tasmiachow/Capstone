import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Example = () => {
  const webcamRef = useRef(null);
  const [framesSent, setFramesSent] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const sessionId = "unique_session_id"; // Use a unique identifier per user/session
  const intervalRef = useRef(null); // To store the interval reference

  useEffect(() => {
    // Start capturing frames
    intervalRef.current = setInterval(() => {
      captureFrame();
    }, 500); // Capture frame every 500ms

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  const captureFrame = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());

      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");
      formData.append("session_id", sessionId);

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/predict-action/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("API Response:", response.data);

        if (response.data.predicted_action !== undefined) {
          setPrediction(response.data);  // Update state with prediction
          clearInterval(intervalRef.current);  // Stop capturing frames
          console.log("Prediction set:", response.data);
        } else {
          setFramesSent((prev) => prev + 1);  // Increment frame count if not yet predicted
        }
      } catch (error) {
        console.error("Error sending frame:", error);
      }
    }
  };

  return (
    <div>
      <h1>Real-Time Prediction</h1>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <p>Frames Sent: {framesSent}</p>
      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>Action: {prediction.predicted_label}</p>
          <p>Confidence: {prediction.confidence.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Example;
