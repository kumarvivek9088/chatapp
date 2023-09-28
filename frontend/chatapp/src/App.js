// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/about' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
    </Router>
  );
}
export default App;
