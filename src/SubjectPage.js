import React from "react";
import { useParams } from "react-router-dom";

function SubjectPage() {
    const { title } = useParams(); // Get the title parameter from the URL


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
                background: "linear-gradient(135deg, #f39c12, #8e44ad, #3498db)", // Colorful gradient background
                padding: "20px",
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
                    {title}
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet urna sit amet orci mollis volutpat. Nunc ac vestibulum ante, nec tempor mauris. Etiam id magna non lorem elementum facilisis. Integer fringilla nibh eget ullamcorper consectetur. Phasellus consequat purus orci, nec congue libero dignissim nec. Sed vehicula nulla et nisl consequat, vel lacinia mauris fringilla. Cras suscipit turpis nec purus tincidunt, ut suscipit sem hendrerit. Nulla facilisi.
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
                        onMouseEnter={(e) => (e.target.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.3)")}
                        onMouseLeave={(e) => (e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)")}
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubjectPage;
