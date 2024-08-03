import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';


function App() {

  const items = [
    {
      icon: 'pi pi-fw pi-search',
      command: () => menuBarOnClickFunction('checkout')
    },
    {
      icon: 'pi pi-fw pi-heart',
      command: () => menuBarOnClickFunction('checkout')
    },
    {
      icon: 'pi pi-fw pi-user',
      command: () => menuBarOnClickFunction('checkout'),
      items: [
        {
            label: 'Zaloguj sie', //TODO -> tlumaczenia
        },
        {
            label: 'Zarejestruj sie',
        },
      ]
    },
    {
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => menuBarOnClickFunction('checkout')
    },
  ];
  const menuBarOnClickFunction = (e) => {
    //navigation('/'+e);
  }

  return (
    <Router>
           <Menubar model={items}/>
      <main>
        <Routes>
          <Route path='/'
            Component={MainPage} />
        
  
        </Routes>
      </main>
    </Router>
  );
}

export default App;
