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


const ProductsShowcaseComponent = (props) => {
  const navigation = useNavigate();
  const [allProducts, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);

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


  const [hoverStatus,setHoverStatus]=useState({});
  const productTemplate = (product,index) => {
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
          <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
            {product.name}
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
            {product.category}
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
            {product.price}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>
      {/* BESTSELLERS/ NEW PRODUCTS */}
        <div
        style={{
          display:'flex',
          justifyContent:'flex-start',
          marginLeft:'100px',
          marginTop:'5%'
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
  );
};

export default ProductsShowcaseComponent;
