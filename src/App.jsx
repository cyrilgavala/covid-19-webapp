import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./containers/Header";
import Footer from "./containers/Footer"
import Statistics from "./containers/Statistics";

function App() {
    return (
        <div className="App">
            <Header/>
            <Statistics/>
            <Footer/>
        </div>
    );
}

export default App;
