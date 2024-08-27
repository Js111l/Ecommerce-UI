import { useEffect, useState } from "react";

const ProductDetailsContainer = (props) => {
    const [register, setRegister] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {

        };
        fetchProducts();
    }, []);

    return (
        <div className="content-container"
        //   style={{
        //     paddingTop: '140px'
        //   }}
        >

        </div>
    );
};

export default ProductDetailsContainer;