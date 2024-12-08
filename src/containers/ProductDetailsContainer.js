import { useEffect, useRef, useState } from "react";
import { Galleria } from 'primereact/galleria';
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import CheckoutService from "../services/CheckoutService";
import { useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailsContainer = (props) => {
    const [register, setRegister] = useState(false);
    const [product, setProduct] = useState(undefined);
    const [images, setImages] = useState(null);
    const [size, setSize] = useState(null);
    const authService = new AuthService();
    const checkoutService = new CheckoutService()
    const service = new ProductService()
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    const galleria = useRef(null);
    const [fullScreen, setFullScreenMode] = useState(false);
    const [isZoomed, setZoomed] = useState(false)


    const fetchProduct = async () => {
        props.setLoading(true);
        try {
            const response = await service.getProductDetails(id);
            const json = await response.json();
            setProduct(json);
            //TODO
            console.log(json,2137)
            const images = json.imageUrls?.map((url) => ({
                itemImageSrc: url,
                thumbnailImageSrc: url,
                // alt: imageModel.description,
                // title: imageModel.title,
            }));
            
            setImages(images)

            props.setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const [position, setPosition] = useState("bottom");

  
    const responsiveOptions = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    const itemTemplate = (item) => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                style={{
                    width: '50%',
                    display: "block",
                    cursor: 'pointer',
                }}
                onClick={(e) => {
                    galleria.current.show()
                    setZoomed(false)
                    setFullScreenMode(true)
                }}
            />
        )
    }

    
    const fullScreenTemplate = (item) =>{

        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                className={isZoomed ? 'zoomed' : ''}
                style={{
                    width:isZoomed ? '140%' : '70%',
                    display: "block",
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                }}
                onClick={(e) => {
                    setZoomed(!isZoomed)
                }}
            />
        )
    }

    const thumbnailTemplate = (item) => {
        return (
            <img
                src={item.thumbnailImageSrc}
                alt={item.alt}
                style={{ width: "110px", display: "block" }}
            />
        )
    }


    const addProduct = async () => {
        props.setLoading(true)
        const resp = await checkoutService.addProduct({
            product: { id: id },
            quantity: quantity
        });
        await resp
        fetchProduct()
        props.setLoading(false)
    }
    

    const renderImages = () => {
        const resultArray = [];
        for (let i = 0; i < images.length; i += 2) {
            const firstElement = images[i];
            const secondElement = i + 1 < images.length ? images[i + 1] : null;

            resultArray.push(
                <div
                    key={i} // Added unique key for each div
                    className="col"
                    style={{
                        display: 'flex',
                        gap: '2px',
                        justifyContent: 'start',
                        marginTop:'1%',
                        gap:'1%'
                    }}
                >
                    {itemTemplate(firstElement)}
                    {secondElement && itemTemplate(secondElement)}
                </div>
            );
        }
        return resultArray;
    };


    return (
        <div className="content-container">
            <Galleria
                ref={galleria}
                value={images}
                responsiveOptions={responsiveOptions}
                numVisible={9}
                style={{ maxWidth: '50%' }}
                circular
                fullScreen
                showItemNavigators
                item={fullScreenTemplate}
                thumbnail={thumbnailTemplate}
                thumbnailsPosition={'left'}
                closeIcon={(e) => {
                    return (
                        <CloseIcon
                            onClick={() => {
                                setFullScreenMode(false)
                                setZoomed(false)
                                galleria.current.hide()
                            }}
                            style={{
                                fontSize: "36px",
                                cursor: "pointer",
                            }}
                        />
                    );
                }}
            /> 
            <div className="row">
                <div className="col" style={{
                    cursor:'pointer'
                }}
                onClick={(e)=>{
                    setFullScreenMode(true)
                }}
                >
                    {images ? renderImages(images) : null}
                </div>
                <div className="col" style={{ marginLeft: "80px" }}>
                    <label style={{ marginTop: "40px" }}>{product?.name}</label>
                    <div className="row">
                        <Dropdown
                            placeholder="Rozmiar"
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value)
                            }}
                            options={product?.sizes}
                            style={{
                                width: "270px",
                                marginLeft: '12px'
                            }}
                        ></Dropdown>
                    </div>
                    <div className="row">
                        <label>KOLOR: Czarny</label>
                        <div
                            className="col"
                            style={{ display: "flex", justifyContent: "start" }}
                        >
                            {product?.colorImgUrls?.map((x) => {
                                <img
                                    src="https://primefaces.org/cdn/primereact/images/galleria/galleria14.jpg"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        marginRight: "10px",
                                    }}
                                />
                            })}

                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col">
                            <Button
                                style={{
                                    width: "220px",
                                }}
                                label={"Dodaj do koszyka"}
                                onClick={(e) => {
                                    addProduct()
                                }}
                            />
                            <Button
                                icon={"pi pi-heart"}
                                style={{
                                    marginLeft: "12px",
                                }}
                                onClick={()=>{
                                    service.addToFavorite(Number(id))
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsContainer;