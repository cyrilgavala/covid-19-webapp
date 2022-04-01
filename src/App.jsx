import './App.css';
import Header from "./containers/Header";
import Footer from "./containers/Footer"
import Statistics from "./containers/Statistics";
import Graphs from "./containers/Graphs";

export default function App() {
  return (
    <div className="App">
      <Header/>
      <Statistics/>
      <Graphs/>
      <Footer/>
    </div>
  );
}