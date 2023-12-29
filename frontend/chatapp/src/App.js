// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
// import Home from './components/Home';
// import Navbar from './components/Navbar';
import Merepaths from './components/Merepaths';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
function App() {
  const isAuthenticated = localStorage.getItem("authToken")!=='undefined' && localStorage.getItem("authToken")!==null;
  return (
    <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path='/login' element={!isAuthenticated?<Login />:<Navigate to="/" replace/>} />
          <Route path='/' element={<Merepaths />} />
        </Routes>
    </Router>
  );
}
export default App;
