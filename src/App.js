import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Homepage />
      </div>

      <div className="footer-copyright light-blue darken-4">
        <div className="container">
        <p style={{color: 'white'}}>
          © 2014 Copyright YouFrame
        </p> 
        </div>
      </div>
      
    </div>
  );
}

export default App;
