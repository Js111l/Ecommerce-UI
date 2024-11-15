import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductCardContainer from './ProductCardContainer';
import ProductService from '../services/ProductService';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useAuth } from './auth/AuthContext';
import CheckoutService from '../services/CheckoutService';

const CartContainer = (props) => {
    const navigate = useNavigate()
    const productService = new ProductService();
    const [cart, setCart] = useState(undefined)
    const [selectedAll, setSelectedAll] = useState(true);
    const { isLoggedIn } = useAuth()
    const [selectedProducts, setSelectedProducts] = useState(new Map())
    const [totalPrice, setTotalPrice] = useState({})
    const checkoutService = new CheckoutService()

    const fetchData = async () => {
        //TODO 
        props.setLoading(true);
        try {
            const response = await productService.getCheckoutProducts();
            const json = await response.json();
            setCart(json);
            setTotalPrice(json.totalPrice)
            setSelectedProducts(new Map(
                json.products.map(x => [x.product.id,true])
            ))
            props.setShowNewsletter(false);
            props.setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);


    const onSelectProduct = (checked, id)=>{
        selectedProducts.set(id, checked);
        setSelectedProducts(selectedProducts)
        console.log(selectedProducts)
    }
    const formatMoney = (value) => {
        //return (value / 100).toFixed(2);
        return value
    }

    const deleteProducts = async (ids) => {
        try {
            const resp = await checkoutService.deleteProducts(ids)
            await resp
            fetchData()
        } catch (err) {

        }
    }

    return (
       cart?.products.length >= 1 ?
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
                            marginRight: '30px'
                        }}>
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: '26px'
                        }}>Koszyk</span>
                        {/* <div
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                border: "1px solid #ccc",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                                borderRadius: "8px", 
                                padding: "10px", 
                                backgroundColor: "#f9f9f9",
                                display: 'flex',
                                justifyContent: "start",
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: '10px',
                                    marginLeft: '15px'
                                }}>
                                <Checkbox checked={selectedAll} onChange={(e) => setSelectedAll(e.checked)}></Checkbox>
                            </div>

                            <span style={{
                                marginLeft: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '10px'
                            }}>Cały koszyk</span>
                            <Dropdown placeholder='USUŃ' style={{ marginLeft: 'auto' }} options={[
                                {
                                    label: 'Wszystkie zaznaczone',
                                    value: 'ALL_SELECTED',
                                    onClick: (e) => {
                                        console.log('yoo yoyo')
                                    }
                                },
                                {
                                    label: 'Wszystkie w koszyku',
                                    value: 'ALL'
                                },
                            ]}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === 'ALL_SELECTED') {

                                        const idsToDelete = Array.from(selectedProducts)
                                            .filter(([key, value]) => value === true)
                                            .map(([key]) => key);
                                        console.log(idsToDelete);
                                        deleteProducts(idsToDelete)
                                    }
                                    if (value === 'ALL') {

                                    }
                                }}

                            ></Dropdown>
                        </div> */}
                        {cart?.products?.map((x, index) => {
                            return (
                                <div style={{
                                    marginTop: index === 0 ? '0px' : '12px'
                                }}>
                                    <ProductCardContainer
                                        selectedAll={selectedAll}
                                        refresh={fetchData}
                                        onSelectProduct={onSelectProduct}
                                        element={{
                                            id: x.product.id,
                                            name: x.product.name,
                                            brand: x.product?.brand,
                                            color: '',
                                            price: x.product?.price,
                                            quantity: x.quantity,
                                            size: ''
                                        }} /></div>

                            )
                        })}
                    </div>
                    <div className='col-md-2'
                        style={{
                            backgroundColor: '#e8e8e8',
                            width: '15%',
                            maxHeight: '200px'
                        }}>
                        <div className='row'>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'start',
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
                                >{formatMoney(totalPrice)}
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
            :
            cart ?
            <div className='row' style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: '1%',
            }}>
                <img src='/empty-cart.jpg' style={{
                    maxHeight: '300px',
                    maxWidth: '350px'
                }} />
                <span style={{
                    marginTop: '2%',
                    fontWeight: 'bold',
                    fontSize: '25px'
                }}>Twój koszyk jest pusty!</span>
                {!isLoggedIn ?
                    <Button
                        style={{
                            width: '10%',
                            marginTop: '1%'
                        }}
                        label='Zaloguj sie'
                        onClick={()=>{
                            navigate('/login')
                        }}
                        >
                    </Button>
                    :
                    null
                }
            </div>
            :null

    )
};

export default CartContainer;
