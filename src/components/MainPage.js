import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css'
import "react-toggle/style.css" // for ES6 modules
import ProductsShowcaseComponent from './ProductsShowcaseComponent';
const MainPage = (props) => {

  return (
      <div className="row" style={{ maxWidth: "100%" }}>
        <div className="column-md-12">
          <ProductsShowcaseComponent
            loading={props.loading}
            setLoading={props.setLoading}
          />
        </div>
      </div>
  );
};

export default MainPage;
