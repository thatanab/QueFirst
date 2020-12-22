import logo from './logo.svg';
import './App.css';
import Register from './containers/pages/Register/Register'
import NavBar from './components/NavBar/NavBar';
import Layout from './components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/pages/Login/Login';
import UserContext from './context/UserContext';
import { useState } from 'react';
import Reserve from './containers/pages/Reserve/Reserve'
import ShowRoom from '../src/containers/pages/showRoom/showRoom'
import Reserved from '../src/containers/pages/Reserved/Reserved';
import LocalStorageService from './services/localStorage';
import jwtDecode from 'jwt-decode'
import AdminRegister  from './containers/pages/AdminRegister/AdminRegister';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';

function App() {
  const token = LocalStorageService.getToken();

  
  let initialUser = null;
  if (token) {
    initialUser = jwtDecode(token);
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [change, setChange] = useState(false)
  const [card, setCard] = useState([]);
  const [selectRoom, setSelectRoom] = useState("");
  const [payload, setPayload] = useState(initialUser)

  const [role, setRole] = useState(LocalStorageService.getRole());

  

  return (
    <>
      <UserContext.Provider value={{ username, setUsername, password, setPassword, name, setName, lastname, setLastname, email, setEmail, change, setChange, card, setCard, selectRoom, setSelectRoom, payload, setPayload, role, setRole }}>
        <Layout>
          <Switch>
            {/* <HomePage exact path="/" /> */}
            {/* <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reserves/:id" component={Reserve} />
            <Route exact path="/showRoom" component={ShowRoom} />
            <Route exact path="/reserved/:roomName" component={Reserved} />
            <Route exact path="/admin" component={AdminRegister} /> */}
            <PrivateRoutes/>
          </Switch>
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default App;
