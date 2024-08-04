import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import MenuBarContainer from './containers/MenuBarContainer';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <Router>
          <MenuBarContainer>
          </MenuBarContainer>
      <main>
        <Routes>
          <Route path='/'
            Component={MainPage}
          />
          <Route path='/login'
            Component={LoginContainer}
          />
          <Route path='/register'
            Component={RegisterContainer}
          />
        
  
        </Routes>
      </main>
    </Router>
  );
}

export default App;
