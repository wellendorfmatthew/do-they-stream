import { useEffect, useState } from "react";
import TWITCH from "./assets/twitch.png";
import "./App.css";

function App() {
  const [streamer, setStreamer] = useState(false); // Displays streamer info if available
  const [input, setInput] = useState(""); // Takes users input
  const [picture, setPicture] = useState(""); // Retrieves streamer picture if available
  const [link, setLink] = useState(""); // Creates a link for users to go to the stream
  const [error, setError] = useState(false); // Creates error message

  // Makes a call to twitch api to grab streamer profile picture and link
  const handleStreamer = async (broadcaster) => {
    try {
      const response = await fetch(`http://localhost:4090/${broadcaster}`);
      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const data = await response.json();
      setStreamer(true);
      setPicture(data.data[0].thumbnail_url);
      setLink("https://www.twitch.tv/" + data.data[0].display_name);
      setError(false);
    } catch (error) {
      console.log(error);
      setStreamer(false);
      setPicture("");
      setLink("");
      setError(true);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <p className="title">Do they stream?</p>l
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button className="find-button" onClick={() => handleStreamer(input)}>
          Find
        </button>
        {error && <p className="error-message">Couldn't find streamer</p>}
        {streamer && (
          <>
            <img src={picture} alt="" className="streamer-picture" />
            <div className="streamer-info">
              <img src={TWITCH} alt="" className="twitch-icon" />
              <p className="twitch-title">Twitch: </p>
              {link && (
                <a href={link} className="twitch-link">
                  {`twitch.tv/${streamer}`}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
