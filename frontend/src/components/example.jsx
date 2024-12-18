import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Example = () => {
  const webcamRef = useRef(null);
  const [framesSent, setFramesSent] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [modelType, setModelType] = useState("model_1"); // Default to model_1
  const [isCapturing, setIsCapturing] = useState(false); // State to control frame capturing
  const sessionId = "unique_session_id"; // Unique session identifier
  const intervalRef = useRef(null); // Reference to the interval

  useEffect(() => {
    if (isCapturing) {
      // Start capturing frames at an interval
      intervalRef.current = setInterval(captureFrame, 500); // Every 500ms
    } else {
      clearInterval(intervalRef.current); // Clear the interval if not capturing
    }

    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, [isCapturing]);

  const captureFrame = async () => {
    if (webcamRef.current) {
      try {
        // Get the current frame as a blob
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          console.warn("Webcam screenshot not available.");
          return;
        }
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Prepare the form data
        const formData = new FormData();
        formData.append("frame", blob, "frame.jpg");
        formData.append("session_id", sessionId);
        formData.append("model_type", modelType); // Add the selected model type

        // Send the frame to the backend
        const response = await axios.post("http://127.0.0.1:8000/api/predict-action/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Handle the response
        console.log("API Response:", response.data);
        if (response.data.predicted_action !== undefined) {
          setPrediction(response.data); // Set the prediction
          setIsCapturing(false); // Stop capturing frames after prediction
          clearInterval(intervalRef.current);
        } else {
          setFramesSent((prev) => prev + 1); // Increment frames sent count
        }
      } catch (error) {
        console.error("Error sending frame:", error);
      }
    }
  };

  const handleModelChange = (e) => {
    setModelType(e.target.value); // Update the model type
    setIsCapturing(false); // Pause capturing while changing models
  };

  const startCapture = () => {
    setPrediction(null); // Clear any previous prediction
    setFramesSent(0); // Reset frame counter
    setIsCapturing(true); // Start capturing frames
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Dropdown to select model type */}
      <select onChange={handleModelChange} value={modelType} style={{ marginBottom: "1em" }}>
        <option value="model_1">Model 1 (Hello, Bye, Good Morning)</option>
        <option value="model_2">Model 2 (Happy, Sad, Surprised)</option>
        <option value="model_3">Model 3 (Let's Go, Help Me, What's Your Name)</option>
      </select>

      {/* Button to confirm model selection and start capturing */}
      <button onClick={startCapture} style={{ marginBottom: "1em" }}>
        Start Prediction
      </button>

      {/* Webcam Feed */}
          <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      style={{
        width: "52.5%",
        maxWidth: "500px",
        transform: "scaleX(-1)", // Flip horizontally. THIS WILL MIRROR THE VIDEO
        WebkitTransform: "scaleX(-1)", // Safari support. THIS WILL MIRROR THE VIDEO
      }}
    />

      {/* Prediction Results */}
      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>Action: {prediction.predicted_label}</p>
          <p>Confidence: {prediction.confidence.join(", ")}</p>  {/* You can get rid of this line */}
        </div>
      )}

      {/* Frames Sent Count */}
      {!prediction && isCapturing && <p>Frames Sent: {framesSent}</p>}
    </div>
  );
};

export default Example;
