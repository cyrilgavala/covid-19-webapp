import './App.css';
import Header from "./containers/Header";
import Footer from "./containers/Footer"
import Statistics from "./containers/Statistics";
import Graphs from "./containers/Graphs";
import {useState} from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";

export default function App() {

    const [theme, setTheme] = useState(false)

    return (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <div className="App">
                <button id={"toggleTheme"} className={theme ? "fa fa-sun-o" : "fa fa-moon-o"} onClick={() => setTheme(!theme)}/>
                <Header/>
                <Statistics/>
                <Graphs/>
                <Footer/>
            </div>
        </ThemeProvider>

    );
}