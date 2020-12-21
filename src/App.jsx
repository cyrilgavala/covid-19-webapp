import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./containers/Header";
import Footer from "./containers/Footer"
import Statistics from "./containers/Statistics";
import Graphs from "./containers/Graphs";

function App() {
    return (
        <div className="App">
            <Header/>
            <Statistics/>
            <Graphs/>
            <Footer/>
        </div>
    );
}

export default App;
