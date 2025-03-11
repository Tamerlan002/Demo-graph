// App.js
import React, { useEffect, useRef, useState } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import { Routes, Route, useLocation } from "react-router-dom";

function HomePage() {
  const sigmaContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataArr, setDataArr] = useState([]);
  const location = useLocation();
  const [graphInstance, setGraphInstance] = useState(null); // Track the graph instance
  const graphInitialized = useRef(false);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch("http://tamerlan029100-001-site1.jtempurl.com/lcstages/id?id=6");
        const data = await response.json(); // Assuming the response is JSON
        setDataArr([data]); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // This will run once when the component mounts

  useEffect(() => {
    document.title = "Homepage";
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && !graphInitialized.current) {
      if (dataArr.length > 0) {
        const graph = new Graph();

        dataArr.forEach((data, index) => {
          const nodeId = `${index + 1}`;
          graph.addNode(nodeId, {
            label: data.lifeCycleStage,
            id: data.id,
            linkName: data.linkName,
            x: Math.random(),
            y: Math.random(),
            size: 15,
            color: "black",
          });
        });

        for (let i = 0; i < dataArr.length - 1; i++) {
          graph.addEdge(`${i + 1}`, `${i + 2}`, {
            size: Math.random() * 5 + 1,
            color: "gray",
          });
        }

        const renderer = new Sigma(graph, sigmaContainerRef.current);
        setGraphInstance(renderer.graph);

        graphInitialized.current = true;

        renderer.on("clickNode", (event) => {
          const nodeId = event.node;
          const nodeLinkName = graph.getNodeAttribute(nodeId, "id"); // Get the linkName
          const newTab = window.open(`lcstage/${nodeLinkName}`, "_blank");
          newTab.focus();
        });

        return () => {
          renderer.kill();
          graphInitialized.current = false;
        };
      }
    }
  }, [location, dataArr]);

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
      {/* Conditionally render the search bar */}
      {location.pathname === "/" && (
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
      )}

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
      {/* <Routes>
        <Route path="/topic/:id" element={<TopicPage />} />
      </Routes> */}
    </div>
  );
}

export default HomePage;
