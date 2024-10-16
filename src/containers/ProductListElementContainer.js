import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const ProductListElementContainer = (props) => {
    const [product, setProduct] = useState(undefined);
    const [hoverStatus,setHoverStatus]=useState(false);
    const navigation = useNavigate()
    
    useEffect(() => {

       setProduct(props.product)
    }, [product]);

    return (
        <Card
        className="col"
        style={{
          width: "100px",
        }}
        onClick={(e)=>{
          navigation(`/product/details/${product?.id}`)
        }}
      >
        <div
          style={{
            width: "300px",
          }}
        >
          <div className="mb-3">
            <img
              src={hoverStatus ? product?.detailUrl : product?.imageUrl}
              alt={product?.name}
              style={{
                width: "300px",
                height: "350px",
                cursor: "pointer",
                marginTop: "5%",
              }}
              onClick={() => {}}
              onMouseEnter={() => {
                 setHoverStatus(true)
              }}
              onMouseLeave={() => {
                setHoverStatus(false)
              }}
            />
          </div>
          <div className="container">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
              }}
            >
              {product?.name+product?.id}
            </div>
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5%",
                color: "gray",
              }}
            >
              {product?.category}
            </div>
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5%",
                color: "gray",
              }}
            >
              {product?.price}
            </div>
           
          </div>
        </div>
      </Card>
    );
};

export default ProductListElementContainer;