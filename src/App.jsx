import React from "react";
import CalculadoraPrestamos from "./CalculadoraPrestamos";
import "./App.css";

function App() {
  return (
    <div>
      <header className="navbar">
        <h1> Calculadora de Préstamos</h1>
      </header>
      <main className="app">
        <CalculadoraPrestamos />
      </main>
    </div>
  );
}

export default App;
