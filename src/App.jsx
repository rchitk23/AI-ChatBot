import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=Your_Secret_Key",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }]
            },
          ],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Error generating answer.");
    }
  }

  useEffect(() => {
    const stars = Array.from({ length: 100 }, (_, i) => ({
      id: `star-${i}`,
      style: {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDelay: `${Math.random() * 2}s`,
      },
    }));
    setStars(stars);
  }, []);

  const [stars, setStars] = useState([]);

  return (
    <>
      <img src="https://www.teahub.io/photos/full/16-161519_blue-bubble-wallpapers-blue-bubbles-background-hd.jpg" alt="Night Scenery" className="background-image" />
      <div className="stars" id="stars1">
        {stars.map(star => (
          <div key={star.id} className="star" style={star.style}></div>
        ))}
      </div>
      <div className="stars" id="stars2">
        {stars.map(star => (
          <div key={star.id} className="star" style={star.style}></div>
        ))}
      </div>
      <div className="stars" id="stars3">
        {stars.map(star => (
          <div key={star.id} className="star" style={star.style}></div>
        ))}
      </div>
      <div className="main-container">
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full transform transition-all duration-500 hover:scale-105 bg-opacity-90">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Chat AI</h1>
          <textarea
            className="border border-gray-300 rounded-lg w-full p-4 mb-6 focus:outline-none focus:ring-4 focus:ring-cyan-300 resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything to me"
            rows="4"
          ></textarea>
          <button
            onClick={generateAnswer}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-300"
          >
            Generate Answer
          </button>
          <pre className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg whitespace-pre-wrap text-gray-800 scrollable-answer">{answer}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
