import React, { useEffect, useRef, useState } from 'react';
import FinancialTransactionsService from '../services/FinancialTransactionsService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductCardContainer from './ProductCardContainer';
import ProductService from '../services/ProductService';
import AuthService from '../services/AuthService';
import { v4 as uuidv4 } from 'uuid';
import CheckoutService from '../services/CheckoutService';
import { Card } from 'primereact/card';

const UserOrderDetails = (props) => {
    const service = new FinancialTransactionsService();
    const stepperRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        number: '',
        postalCode: '',
        city: '',
        email: '',
        phone: ''
    });
    const authService = new AuthService()

    const navigate = useNavigate();
    const productService = new ProductService();
    const checkoutService = new CheckoutService()
    const [cart, setCart] = useState(undefined)
    const [currency, setCurrency] = useState('zł')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const [intentModel, setIntentModel] = useState({
        amount: '',
        localCurrency: 'eur',
        products: [],
        uuid: '',
        email: '',

        shippingAddressId: '',
        billAddressId: '',
    })


    const fetchSecret = async (uuid) => {
        intentModel.products = cart.products.map((x) => ({
            id: x.id,
            name: x.product.name,
            price: x.product.price,
            quantity: x.quantity,
            imageUrl: '/jeans.jpg'
        }));
        intentModel.amount = cart.totalPrice;
        intentModel.uuid = uuid
        intentModel.email = formData.email
        const response = await service.getClientSecret(intentModel);
        return response
    }





    const handleGoToPayment = async (event) => {
        event.preventDefault();

        const verifySession = async () => {
            props.setLoading(true);
            try {
                const resp = await authService.isLoggedIn()
                const json = await resp.json()
            } catch (err) {
                console.log(err)
                props.setLoading(false);
            }
        }
        props.setLoading(true);
        try {
            verifySession()

            const uuid = uuidv4()
            const tokenResp = await fetchSecret(uuid) //zapisz zamowienie, utworz payment intent, zapisz w bazie klucz: uuid wartosc: client secret
            sessionStorage.setItem(uuid, tokenResp.intentId) //intent id to klucz do client secret z bazy 

            const response = await authService.getPaymentToken(uuid)
            await response
            navigate(`/payment/${uuid}`) // w payment container secret bedzie wyslany z backendu, kluczem jest ten intentId. Autoryzacja operacji tym 1-razowym tokenem.
        } catch (error) {
            props.setLoading(false);
            console.log(error);
        }
    };


    const fetchData = async () => {
        props.setLoading(true)
        try {
            const response = await productService.getCheckoutProducts();
            const json = await response.json();

            setCart(json);
            props.setLoading(false);
        } catch (error) {
            props.setLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const formatMoney = (value) => {
        return (value / 100).toFixed(2);
    }
    const divider = (
        (
            <hr style={{
                marginTop: '1%',
                marginBottom: '1%'
            }} class="solid">
            </hr>
        )
    )

    const renderHeader = () => {
        return <div className='row'>
           <div className=''
                    style={{
                        marginTop:'2%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <div className='col-md-2'>
                        <div className='row'>
                            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Zamowienie 2903098709788</span>
                            <label>Data zamówienia</label>
                            <span>{'hiui'}</span>
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div className='row'>
                            <label>&nbsp;</label> 
                            <label>Metoda płatności</label>
                            <span>{'k'}</span>
                        </div>
                    </div>
                </div>  
        </div>
       
    }

    const renderProductsList = () => {
        return <div className="col-md-4">
            <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Zamówione produkty</span>
            {cart?.products?.map((x, index) => {
                return (
                    <div style={{
                        marginTop: index === 0 ? '0px' : '12px'
                    }}>
                        <ProductCardContainer
                            viewMode={'VIEW'}
                            refresh={fetchData}
                            element={{
                                id: x.product.id,
                                name: x.product.name,
                                brand: x.product?.brand,
                                color: '',
                                price: x.product?.price,
                                quantity: x.quantity,
                                size: '',
                                imageUrl: x.product.imageUrl
                            }} />
                    </div>
                )
            })}
        </div>
    }

    
    const renderTotalCosts = () => {
        return <div className='row'>
            <div className=''
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <div className='col-md-2'>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>Koszt Całkowity</span>
                </div>
                <div className='col-md-2'>
                    <div className='row'>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}>
                            <span>{'Wartość produktów: '}</span>
                            <span style={{
                                marginLeft: 'auto'
                            }}>{`${cart?.totalPrice} ${currency}`}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}>
                            <span>{'Dostawa: '}</span>
                            <span style={{
                                marginLeft: "auto"
                            }}>{`${cart?.totalPrice} ${currency}`}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}>
                            <span>{'Łącznie: '}</span>
                            <span style={{
                                marginLeft: "auto"
                            }}>{`${cart?.totalPrice} ${currency}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    const renderAddresses = () => {
        return <div className='row'>
            <div className=''
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <div className='col-md-2'>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold'

                    }}>Adres dostawy</span>
                    <div className='row'>
                        <span>{'Jakub Świercz'}</span>
                        <span>{'Barcin-Wieś 229/1'}</span>
                        <span>{'88-190 Barcin-Wieś'}</span>
                    </div>
                </div>
                <div className='col-md-2'>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>Adres do rachunku</span>
                    <div className='row'>
                        <label>Adres do rachunku</label>
                        <span>{'Jakub Świercz'}</span>
                        <span>{'Barcin-Wieś 229/1'}</span>
                        <span>{'88-190 Barcin-Wieś'}</span>
                    </div>
                </div>
            </div>
        </div>
    }

    const renderContent = () => {
        return <div className='row' style={{
            display: 'flex',
            justifyContent: 'center',
            //maxWidth:'1500px'
        }}>
            {renderHeader()}
            {divider}
            {renderProductsList()}
            {divider}
            {renderTotalCosts()}
            {divider}
            {renderAddresses()}
        </div>
    }

    return (
        renderContent()
    );
};

export default UserOrderDetails;
