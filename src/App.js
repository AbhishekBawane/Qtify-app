import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Section from "./components/Section/Section"
import './App.css';
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
        <Navbar />
        <Hero />
        <Section />
      <Footer/>
    </div>
  );
}

export default App;
