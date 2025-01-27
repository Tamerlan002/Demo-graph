import React, { useEffect, useRef, useState } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import { Routes, Route, useLocation } from "react-router-dom";
import SubjectPage from "./SubjectPage";

function App() {
  const sigmaContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Track the current location (route)
  const [graphInstance, setGraphInstance] = useState(null); // Track the graph instance

  // Dummy data array with 25 entries
  const dataArr = [
    { title: "Research about water", color: "orange" },
    { title: "Study of animals", color: "green" },
    { title: "Graph theory basics", color: "blue" },
    { title: "React and state management", color: "purple" },
    { title: "Web development trends", color: "red" },
    { title: "Machine learning advancements", color: "cyan" },
    { title: "Artificial intelligence in 2025", color: "yellow" },
    { title: "Understanding deep learning", color: "violet" },
    { title: "The future of virtual reality", color: "pink" },
    { title: "Blockchain and cryptocurrency", color: "black" },
    { title: "Cloud computing growth", color: "brown" },
    { title: "Big data analysis techniques", color: "teal" },
    { title: "Cybersecurity trends in 2025", color: "gray" },
    { title: "IoT revolution", color: "magenta" },
    { title: "Data privacy laws", color: "blueviolet" },
    { title: "5G network rollout", color: "indigo" },
    { title: "Quantum computing basics", color: "peru" },
    { title: "Augmented reality applications", color: "slateblue" },
    { title: "Digital transformation in enterprises", color: "firebrick" },
    { title: "Next-gen programming languages", color: "crimson" },
    { title: "Natural language processing", color: "forestgreen" },
    { title: "Autonomous vehicles", color: "gold" },
    { title: "Smart cities and infrastructure", color: "seagrseen" },
    { title: "The rise of 3D printing", color: "salmon" },
    { title: "Renewable energy sources", color: "darkgreen" },
    { title: "Genomics and bioinformatics", color: "darkslategray" },
  ];

  const graphInitialized = useRef(false);

  useEffect(() => {
    if (location.pathname === "/" && !graphInitialized.current) {
      // Only initialize the graph if it's not already initialized
      const graph = new Graph();
  
      // Add nodes and edges to the graph
      dataArr.forEach((data, index) => {
        const nodeId = `${index + 1}`;
        graph.addNode(nodeId, {
          label: data.title,
          x: Math.random(),
          y: Math.random(),
          size: 5 + Math.random() * 10,
          color: data.color,
        });
      });
  
      // Add edges between nodes
      for (let i = 0; i < dataArr.length - 1; i++) {
        graph.addEdge(`${i + 1}`, `${i + 2}`, {
          size: Math.random() * 5 + 1,
          color: "gray",
        });
      }
  
      // Initialize Sigma.js and the graph
      const renderer = new Sigma(graph, sigmaContainerRef.current);
      setGraphInstance(renderer.graph);
  
      // Set flag to true once the graph has been initialized
      graphInitialized.current = true;
  
      // Handle node click event
      renderer.on("clickNode", (event) => {
        const nodeId = event.node;
        const nodeTitle = graph.getNodeAttribute(nodeId, "label");
        const newTab = window.open("/subject/" + nodeTitle, "_blank");
        newTab.focus();
      });
  
      // Cleanup on unmount or location change
      return () => {
        renderer.kill();
        graphInitialized.current = false; // Reset flag when cleaning up
      };
    }
  }, [location]);
  

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className="App"
      style={{
        background: "linear-gradient(135deg, #f39c12, #8e44ad)", // Colorful background gradient
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="search-bar-container"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: "12px 20px",
            width: "50%",
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

      {location.pathname === "/" && ( // Only show Sigma on main page
        <div
          className="containerHolder"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            margin: "0",
          }}
        >
          <div
            ref={sigmaContainerRef}
            style={{
              width: "80%",
              height: "80vh",
              borderRadius: "20px",
              border: "2px solid #1abc9c", // Teal color for the border
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Larger shadow for depth
              background: "white",
              margin: "auto",
              display: "block",
            }}
          ></div>
        </div>
      )}

      {/* Set up routing */}
      <Routes>
        <Route path="/subject/:title" element={<SubjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
