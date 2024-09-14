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
  return (
    <div className="row">

      <div className='column-md-12'>
        <ProductsShowcaseComponent
          loading={props.loading}
          setLoading={props.setLoading}        
        />
      </div>
    </div>
  );
};

export default MainPage;
