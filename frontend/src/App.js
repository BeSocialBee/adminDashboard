import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/get");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const cardsData = await response.json();

                setCards(cardsData);
                console.log("API response:", cardsData);  // Log the response
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React and Flask</h1>
                {cards.map((card, index) => (
                    <div key={index}>
                        <p>{card.name}</p>
                        <p>{card.collection}</p>
                        <p>{card.value}</p>
                        <p>{card.number}</p>
                        <hr />
                    </div>
                ))}
            </header>
        </div>
    );
}

export default App;