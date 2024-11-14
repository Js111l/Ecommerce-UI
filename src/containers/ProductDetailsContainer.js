import { useEffect, useState } from "react";
import { Galleria } from 'primereact/galleria';
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import CheckoutService from "../services/CheckoutService";
import { useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";

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

    useEffect(() => {
        const fetchProduct = async () => {
            props.setLoading(true);
            try {
                const response = await service.getProductDetails(id);
                const json = await response.json();
                setProduct(json);
                //TODO
                const images = json.images?.map((imageModel) => ({
                    itemImageSrc: imageModel.url,
                    thumbnailImageSrc: imageModel.url,
                    alt: imageModel.description,
                    title: imageModel.title,
                }));
                
                setImages(images)

                props.setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    const [position, setPosition] = useState("bottom");

    const positionOptions = [
        {
            label: "Bottom",
            value: "bottom",
        },
        {
            label: "Top",
            value: "top",
        },
        {
            label: "Left",
            value: "left",
        },
        {
            label: "Right",
            value: "right",
        },
    ];
    const responsiveOptions = [
        {
            breakpoint: "991px",
            numVisible: 4,
        },
        {
            breakpoint: "767px",
            numVisible: 3,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
        },
    ];

    const itemTemplate = (item) => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                style={{ width: "100%", display: "block" }}
            />
        );
    };

    const thumbnailTemplate = (item) => {
        return (
            <img
                src={item.thumbnailImageSrc}
                alt={item.alt}
                style={{ width: "100%", display: "block" }}
            />
        );
    };

    return (
        <div className="content-container">
            <div className="row">
                <div className="col">
                    <Galleria
                        style={{
                            maxWidth: "440px",
                            marginLeft: "190px",
                            marginTop: "40px",
                        }}
                        value={images}
                        responsiveOptions={responsiveOptions}
                        numVisible={5}
                        item={itemTemplate}
                        thumbnailsPosition={position}
                        thumbnail={thumbnailTemplate}
                    />
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
                                    checkoutService.addProduct({
                                        product: {id: id},
                                        //authService.getUserIdFromToken(),
                                        quantity: quantity
                                    });
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