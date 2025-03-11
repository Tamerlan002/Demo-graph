import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Graph from "graphology";
import Sigma from "sigma";

function LCStage() {
  const { id } = useParams(); // Get the id from the URL
  const [searchQuery, setSearchQuery] = useState("");
  const [lcstageData, setstageData] = useState(null); // State to store fetched lifecycle stage data
  const [topicArr, setTopicData] = useState(null); // State to store fetched topic data
  const [graphCreated, setGraphCreated] = useState(false); // State to track if graph has been created
  const [graphInstance, setGraphInstance] = useState(null); // Track the graph instance
  const sigmaContainerRef = useRef(null); // Ref to hold the container for Sigma graph
  const graphInitialized = useRef(false);
  

  // Fetch the lifecycle stage data
  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const response = await fetch(`http://tamerlan029100-001-site1.jtempurl.com/lcstages/id?id=${id}`);
        const data = await response.json();
        setstageData(data); // Set the fetched lifecycle stage data into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStageData();
  }, [id]);

  useEffect(() => {
    document.title = "Life Cycle Stage";
  }, []);

  // Fetch additional topic data when Learn More button is clicked
  const handleLearnMoreClick = async () => {
    if (graphCreated) return; // Don't fetch data or create graph again if it has already been done

    try {
      const response = await fetch(`http://tamerlan029100-001-site1.jtempurl.com/topics/byStageId?stageId=${id}`);
      const data = await response.json();
      setTopicData(data); // Set the fetched topic data into state
      setGraphCreated(true); // Mark graph as created
    } catch (error) {
      window.alert("Error fetching data:", error);
    }
  };


  // Create the Sigma graph
  useEffect(() => {
    if (!topicArr || topicArr.length === 0 || !graphCreated) return;

    const graph = new Graph();

    // Add nodes to the graph based on fetched data
    topicArr.forEach((data, index) => {
      const nodeId = `${index + 1}`;
      graph.addNode(nodeId, {
        label: data.topicName,
        id: data.id,
        x: Math.random(),
        y: Math.random(),
        size: 15,
        color: "blue",
      });
    });

    // Add edges between nodes (if any)
    for (let i = 0; i < topicArr.length - 1; i++) {
      graph.addEdge(`${i + 1}`, `${i + 2}`, {
        size: Math.random() * 5 + 1,
        color: "gray",
      });
    }

    // Initialize the Sigma renderer
    const renderer = new Sigma(graph, sigmaContainerRef.current);
    renderer.refresh();
    setGraphInstance(renderer.graph);
    graphInitialized.current = true;


    renderer.on("clickNode", (event) => {
          const nodeId = event.node;
          const nodeLinkName = graph.getNodeAttribute(nodeId, "id"); // Get the linkName
          const newTab = window.open(`/topic/${nodeLinkName}`, "_blank");
          newTab.focus();
        });

        return () => {
          renderer.kill();
          graphInitialized.current = false;
        };

  }, [topicArr, graphInitialized, graphCreated]); // Re-run the effect only when topicArr or graphCreated changes


  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


   useEffect(() => {
      // If the graph instance is set and searchQuery changes
      if (graphInstance) {
        graphInstance.nodes().forEach((node) => {
          const nodeTitle = graphInstance.getNodeAttribute(node, "label");
          const isVisible = nodeTitle.toLowerCase().includes(searchQuery.toLowerCase());
          graphInstance.setNodeAttribute(node, "hidden", !isVisible);
        });
      }
    }, [searchQuery, graphInstance]);

  if (!lcstageData) {
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
          {lcstageData.lifeCycleStage} {/* Display the linkName or any other dynamic value */}
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
          {lcstageData.lifeCycleStageDefinition} {/* Display actual data */}
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
            onClick={handleLearnMoreClick}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Conditionally render the Related Topics section */}
      {graphCreated && topicArr.length > 0 && (
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            padding: "20px",
            marginTop: "40px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Related Topics
          </h2>

          {/* Search Bar for Related Topics */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Search related topics..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                padding: "12px 20px",
                width: "60%",
                borderRadius: "50px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                outline: "none",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)")}
              onBlur={(e) => (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")}
            />
          </div>

          {/* Sigma Graph Container */}
          <div
            ref={sigmaContainerRef}
            style={{
              width: "100%",
              height: "500px", // Adjust the height as needed
              borderRadius: "15px",
              border: "2px solid #3498db",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              marginTop: "30px",
              position: "relative", // Ensure the content doesn't overflow
              display: "flex", // Use flexbox to center the content
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
            }}
          ></div>
        </div>
      )}

      {/* Set up routing */}
    </div>
  );
}

export default LCStage;
