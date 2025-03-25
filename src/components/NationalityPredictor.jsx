import { useState, useEffect, useRef } from "react";

function NameToNationality() {
  // State for storing the name entered
  const [inputName, setInputName] = useState("");

  // The State to hold the nationality prediction result
  const [prediction, setPrediction] = useState(null);

  // Ref to automatically focus on the input field when the component mounts
  const nameInputRef = useRef(null);

  // Automatically focus the input field after the component mounts
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  // Fetch nationality prediction from Nationalize API
  async function getNationalityPrediction() {
    if (!inputName) return; // Prevent fetching if input is empty

    try {
      const response = await fetch(`https://api.nationalize.io?name=${inputName}`);
      const data = await response.json();

      if (data.country && data.country.length > 0) {
        setPrediction(data.country[0]); // Storing the first country prediction
      } else {
        setPrediction(null); // Resets prediction if there are no result
      }
    } catch (err) {
      console.error("Error during API call:", err); // Handles any errors
    }
  }

  // Handle name input changes
  const onNameChange = (e) => {
    setInputName(e.target.value);
    setPrediction(null); // Clearing previous result on new input
  };

  // Submit the name and fetch the nationality prediction
  const onFormSubmit = (e) => {
    e.preventDefault();
    getNationalityPrediction(); // Trigger nationality fetching
  };

  // Converting country code to country name using internationalization
  function countryCodeToName(countryCode) {
    try {
      const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
      return displayNames.of(countryCode);
    } catch (err) {
      console.error("Error fetching country name:", err);
      return "Unknown";
    }
  }

  return (
    <div>
      <h1>Predict Nationality from Name</h1>
      <form onSubmit={onFormSubmit}>
        <input
          ref={nameInputRef}
          type="text"
          value={inputName}
          onChange={onNameChange}
          placeholder="Enter name here"
        />
        <button type="submit">Get Nationality</button>
      </form>

      {/* Displaying prediction if available */}
      {prediction && (
        <div>
          <h2>Nationality Prediction</h2>
          <p><strong>Name:</strong> {inputName}</p>
          <p><strong>Predicted Country:</strong> {countryCodeToName(prediction.country_id)}</p>
          <p><strong>Probability:</strong> {(prediction.probability * 100).toFixed(0)}%</p>
        </div>
      )}
    </div>
  );
}

export default NameToNationality;