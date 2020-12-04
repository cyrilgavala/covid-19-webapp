import React from 'react';
import './App.css';
import Header from "./containers/Header";
import Visualizations from "./containers/Visualizations";

function App() {
    return (
        <div className="App">
            <Header/>
            <Visualizations/>
            <div id="copyright">
                <p>&copy; {new Date().getFullYear()} Copyright: Cyril Gavala</p>
            </div>
        </div>
    );
}

export default App;
