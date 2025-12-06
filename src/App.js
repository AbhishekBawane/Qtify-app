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
        <Section
        title = "Top Albums"
        fetchUrl="https://qtify-backend.labs.crio.do/albums/top"
      />
      <Footer/>
    </div>
  );
}

export default App;
