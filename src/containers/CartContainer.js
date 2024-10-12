import React, { useEffect, useRef, useState } from 'react';
import FinancialTransactionsService from '../services/FinancialTransactionsService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductCardContainer from './ProductCardContainer';
import ProductService from '../services/ProductService';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';


const CartContainer = (props) => {
    const service = new FinancialTransactionsService();
    const stepperRef = useRef(null);
    const [element,setElement] = useState(undefined);
    const navigate = useNavigate()
    const productService = new ProductService();
    const [cart, setCart] = useState(undefined)
    const [checked, setChecked] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
         //TODO 
         props.setLoading(true);
         try {
             const response = await productService.getCheckoutProducts();
             const json = await response.json();
             setCart(json);
             props.setLoading(false);
         } catch (error) {
             console.log(error);
         }
        };
        fetchData();
    }, []);


    const formatMoney=(value)=>{
        return (value / 100).toFixed(2);
    }
    return (
        <div className="card flex justify-content-center"
            style={{
                display: 'flex',
                justifyContent: 'center',

            }}>
            <div className="row"
                style={{
                    paddingTop: '40px'
                }}>

                <div className="col-md-3"
                    style={{
                        marginLeft: '30%',
                        marginRight:'30px'
                    }}>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '26px'
                    }}>Koszyk</span>
                    <div
                    style={{
                        width: '100%',
                        marginBottom:'10px',
                        border: "1px solid #ccc", // Border to distinguish
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                        borderRadius: "8px", // Rounded corners
                        padding: "10px", // Padding inside the card
                        backgroundColor: "#f9f9f9",
                        display:'flex',
                        justifyContent:"start",
                    }}
                    >   
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '10px',
                                marginLeft:'15px'
                            }}>
                            <Checkbox checked={selectedAll} onChange={(e) => setSelectedAll(e.checked)}></Checkbox>
                        </div>

                        <span style={{
                            marginLeft: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '10px'
                        }}>Cały koszyk</span>                 
                    <Dropdown placeholder='USUŃ' style={{marginLeft:'auto'}}></Dropdown>       
                    </div>
                    {cart?.products.map((x) => {
                        return (
                            <ProductCardContainer
                                selectedAll={selectedAll}
                                element={{
                                    id: x.product.id,
                                    name: x.product.name,
                                    brand: x.product?.brand,
                                    color: '',
                                    price: x.product?.price,
                                    quantity: x.quantity,
                                    size: ''
                                }} />
                        )
                    })}
                    </div>
                    <div className='col-md-2'
                        style={{
                            backgroundColor: '#e8e8e8',
                            width: '15%'
                        }}>
                        <div className='row'>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}>
                                <span
                                    style={{
                                        marginTop: '5%',
                                        paddingLeft: '5%'
                                    }}
                                >Wartość produktów
                                </span>
                                <span
                                    style={{
                                        marginTop: '5%',
                                        marginLeft: 'auto',

                                    }}
                                >{formatMoney(cart?.totalPrice)}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}>
                                <span
                                    style={{
                                        marginTop: '5%',
                                        paddingLeft: '5%'
                                    }}
                                >Dostawa
                                </span>
                                <span
                                    style={{
                                        marginTop: '5%',
                                        marginLeft: 'auto',

                                    }}
                                >0,00 zł
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}>
                                <span
                                    style={{
                                        marginTop: '5%',
                                        paddingLeft: '5%',
                                        fontWeight: 'bold',
                                        fontSize: '20px'
                                    }}
                                >Do zapłaty
                                </span>
                                <span
                                    style={{
                                        marginTop: '5%',
                                        marginLeft: 'auto',
                                        fontWeight: 'bold',
                                        fontSize: '20px'

                                    }}
                                >{formatMoney(cart?.totalPrice)}
                                </span>
                            </div>
                            <div style={{
                                paddingLeft: '5%',
                                marginTop: '5%',
                            }}>
                                <Button
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                    }}
                                    onClick={(e) => {
                                        navigate('/checkout')
                                    }}
                                >Przejdź do kasy</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default CartContainer;
