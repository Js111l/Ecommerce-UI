import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import '../App.css'
import Toggle from 'react-toggle';
import "react-toggle/style.css" // for ES6 modules
import ProductService from '../services/ProductService';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import ProductCardContainer from '../containers/ProductCardContainer';
import { useAuth } from '../containers/auth/AuthContext';


const ProductsShowcaseComponent = (props) => {
  const navigation = useNavigate();
  const [allProducts, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const {isLoggedIn} = useAuth();
  const service = new ProductService();

  useEffect(() => {
    const fetchData = async () => {
      props.setLoading(true)
      try {
        const response = await service.getDashboard();
        const json = await response.json();
        setItems(json);
        props.setLoading(false);
      } catch (error) {
        props.setLoading(false);
        console.log("error", error);
      }
    };
      fetchData();
    
  }, []);

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


  const [hoverStatus, setHoverStatus] = useState({});
  const productTemplate = (product, index) => {
    return (
      <div
        style={{
          width: '300px'
        }}>
        <div className="mb-3">
          <img src={hoverStatus?.status && hoverStatus?.id === index
            ? product.detailUrl : product.imageUrl} alt={product.name} style={{
              width: '300px',
              height: '350px',
              cursor: 'pointer',
              marginTop: '5%'
            }}
            onClick={() => {
              navigation(`/product/details/${product.id}`)
            }}
            onMouseEnter={() => {
              setHoverStatus({
                status: true,
                id: index
              });
            }}
            onMouseLeave={() => {
              setHoverStatus({
                status: false,
                id: index
              });
            }}
          />
        </div>
        <div className='container'>
          <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
            {product.name}
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '5%', color: 'gray' }}>
            {product.category}
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '5%', color: 'gray' }}>
            {product.price}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div style={{
      marginLeft: '24%',
      marginRight: '10%'
    }}>

      <div className='row'>
        <div className='col-md-5'>
          <Card
            className="col"
            style={{
              width: "100%",
              border: "1px solid #ccc", // Border to distinguish
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Padding inside the card
              backgroundColor: "#f9f9f9", // Light background color
              height: '730px'
            }} />
        </div>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-6'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9",
                  height: '350px'
                }} />
            </div>
            <div className='col-md-6'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9", // Light background color
                  height: '350px'
                }} />
            </div>
          </div>
          <div className='row' style={{
            marginTop: '3%'
          }}>
            <div className='col-md-6'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9",
                  height: '350px'
                }} />
            </div>
            <div className='col-md-6'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9", // Light background color
                  height: '350px'
                }} />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* BESTSELLERS/ NEW PRODUCTS */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginLeft: '100px',
            marginTop: '5%'
          }}
        >
          <span style={{ marginRight: '20px' }}>Bestsellery</span>
          <Toggle
            defaultChecked={toggle}
            icons={false}
            onChange={() => {
              setToggle(!toggle)
            }} />
          <span style={{ marginLeft: '20px' }}>Nowości</span>
        </div>
        <Carousel value={allProducts} numVisible={4} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={(x) => productTemplate(x, x.id)} />
      </div>
      <div>
        <Carousel value={allProducts} numVisible={4} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={(x) => productTemplate(x, x.id)} />
      </div>
      <div>
        {/* <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-4'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9",
                  height:'350px'
                }} />
            </div>
            <div className='col-md-4'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9", // Light background color
                  height:'350px'
                }} />
            </div>
          </div>
          <div className='row' style={{
            marginTop:'3%'
          }}>
            <div className='col-md-6'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9",
                  height:'350px'
                }} />
            </div>
            <div className='col-md-6'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9",
                  height:'350px'
                }} />
            </div> */}
        <div className='col'
          style={{
            display: 'flex',
            justifyContent: 'start',
            gap: '10px'
          }}>
          <Card
            className="col"
            style={{
              width: "100%",
              border: "1px solid #ccc", // Border to distinguish
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Padding inside the card
              backgroundColor: "#f9f9f9",
              height: '250px'
            }} />
          <Card
            className="col"
            style={{
              width: "100%",
              border: "1px solid #ccc", // Border to distinguish
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Padding inside the card
              backgroundColor: "#f9f9f9",
              height: '250px'
            }} />
          <Card
            className="col"
            style={{
              width: "100%",
              border: "1px solid #ccc", // Border to distinguish
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Padding inside the card
              backgroundColor: "#f9f9f9",
              height: '250px'
            }} />
          <Card
            className="col"
            style={{
              width: "100%",
              border: "1px solid #ccc", // Border to distinguish
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Padding inside the card
              backgroundColor: "#f9f9f9",
              height: '250px'
            }} />

        </div>
        <div className='row' style={{
          marginTop: '10%',
          gap: '30px'
        }}>
          <div className='col-md-5'>
            <Card
              className="col"
              style={{
                width: "100%",
                border: "1px solid #ccc", // Border to distinguish
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                borderRadius: "8px", // Rounded corners
                padding: "10px", // Padding inside the card
                backgroundColor: "#f9f9f9", // Light background color
                height: '330px'
              }} />
          </div>
          <div className='col-md-6'>
            <div className='row'>
              <Card
                className="col"
                style={{
                  width: "100%",
                  border: "1px solid #ccc", // Border to distinguish
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  borderRadius: "8px", // Rounded corners
                  padding: "10px", // Padding inside the card
                  backgroundColor: "#f9f9f9", // Light background color
                  height: '330px'
                }} />
            </div>
          </div>
        </div>
        <div> 
              //FOOTER KONTAKT, LINKI DO SOCIALI OBSLUGA KLIENTA, INFORMACJE, ITP.
        </div>
      </div>
    </div>
  );
};

export default ProductsShowcaseComponent;
