import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";


function Subtopic() {
  const { id } = useParams(); // Get the id from the URL
  const [subtopicData, setTopicData] = useState(null);
  

  // Fetch the lifecycle stage data
  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const response = await fetch(`http://tamerlan029100-001-site1.jtempurl.com/subtopics/id?id=${id}`);
        const data = await response.json();
        setTopicData(data); // Set the fetched lifecycle stage data into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStageData();
  }, [id]);

  useEffect(() => {
      document.title = "Subtopic";
    }, []);

  if (!subtopicData) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "auto",
        background: "linear-gradient(135deg, #f39c12, #8e44ad, #3498db)",
        padding: "10% 0",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          padding: "40px",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {subtopicData.subtopicName} {/* Display the linkName or any other dynamic value */}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#7f8c8d",
            lineHeight: "1.8",
            marginBottom: "30px",
            maxWidth: "800px",
            textAlign: "justify",
          }}
        >
          {subtopicData.subtopicDefinition} {/* Display actual data */}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "12px 30px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

    </div>

    
  );
}

export default Subtopic;
