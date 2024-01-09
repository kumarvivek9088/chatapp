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
import { useAuth } from './context/authorization';
// import { Authorization } from './context/authorization';
function App() {
  const [authToken,setauthToken] = useAuth();
  // const isAuthenticated = localStorage.getItem("authToken")!=='undefined' && localStorage.getItem("authToken")!==null;
  // if (isAuthenticated){
  //   setauthToken(localStorage.getItem("authToken"));
  // }
  return (
    // <Router>
    //   {/* <Navbar /> */}
    //     <Routes>
    //       <Route path='/login' element={!isAuthenticated?<Login />:<Navigate to="/" replace/>} />
    //       <Route path='/' element={isAuthenticated?<Merepaths />:<Navigate to="/login" replace/>} />
    //     </Routes>
    // </Router>
    <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path='/login' element={!authToken?<Login />:<Navigate to="/" replace/>} />
          <Route path='/' element={authToken?<Merepaths />:<Navigate to="/login" replace/>} />
        </Routes>
    </Router>
  );
}
export default App;
