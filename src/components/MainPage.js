import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import '../App.css'
import Toggle from 'react-toggle';
import "react-toggle/style.css" // for ES6 modules
import ProductsShowcaseComponent from './ProductsShowcaseComponent';


const MainPage = (props) => {
  const navigation = useNavigate();
  // const [products, setProducts] = useState();
  // const [allProducts, setItems] = useState([]);
  // const [suggestionList, setSuggestions] = useState([]);
  // const [toggle, setToggle] = useState(false);
  return (
    <div className="row" style={{ maxWidth: "100%" }}>
      <div className="column-md-12">
        {/* BESTSELLERS/ NEW PRODUCTS */}
        <ProductsShowcaseComponent
          loading={props.loading}
          setLoading={props.setLoading}
        />
      </div>
    </div>
  );
};

export default MainPage;
