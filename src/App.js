import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import {  Routes, Route, Link } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Tabl from "./components/Tabl";
function App() {
  return (
    <div className="App">


    
      <Navigation />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/two" element={<Tabl />} />
      </Routes>
  
    </div>
  );
}

export default App;
