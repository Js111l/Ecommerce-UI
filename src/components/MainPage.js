import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import '../App.css'


const MainPage = (props) => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [products, setProducts] = useState();
  const [value, setValue] = useState('');
  const [allProducts, setItems] = useState([]);
  const [suggestionList, setSuggestions] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {

    };

    fetchProducts();
  }, []);



  const openSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  
  const onChange = (e) => {
    setValue(e.value);
  }
  const search = (e) => {

  }

  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const productTemplate =  (product) => {
    return (
      <div className="d-flex align-items-center justify-content-between">
    </div>
    );
  };

  return (
    <div className="page-container">

      <Sidebar visible={sidebarVisible} onHide={closeSidebar}>
        <h2>Sidebar</h2>
        </Sidebar>
      <main className="main-content">
        <header className="header">
        </header>
        {/* <div className="card">
          <Carousel value={allProducts} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        <div className="card">
          <Carousel value={allProducts.splice(10)} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        <div className="card">
          <Carousel value={allProducts.splice(20)} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        <div className="card">
          <Carousel value={allProducts.splice(30)} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        <div className="card">
          <Carousel value={allProducts.splice(40)} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        // </div> */} 
        
        {/* TODO */}
      </main>
    </div>
  );
};

export default MainPage;
