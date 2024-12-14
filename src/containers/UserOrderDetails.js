import React, { useEffect, useRef, useState } from 'react';
import FinancialTransactionsService from '../services/FinancialTransactionsService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductCardContainer from './ProductCardContainer';
import ProductService from '../services/ProductService';
import AuthService from '../services/AuthService';
import { v4 as uuidv4 } from 'uuid';
import CheckoutService from '../services/CheckoutService';
import { Card } from 'primereact/card';
import moment from 'moment/moment';

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
    const { id } = useParams();
    const [element, setElement]=useState(undefined)

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

            const orderResponse = await service.getUserOrderDetails(id)
            const details = await orderResponse//.json()

            const response = await productService.getCheckoutProducts();
            const json = await response.json();

            setCart(json);
            setElement(details)

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
                            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{`Zamowienie ${element?.id}`}</span>
                            <label>Data zamówienia</label>
                            <span>{moment(element?.orderDate).format('YYYY-MM-DD')}</span>
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div className='row'>
                            <label>&nbsp;</label> 
                            <label>Metoda płatności</label>
                            <span>{element?.paymentMethod}</span>
                        </div>
                    </div>
                </div>  
        </div>
       
    }

    const renderProductsList = () => {
        return <div className="col-md-4">
            <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Zamówione produkty</span>
            {element?.products?.map((x, index) => {
                return (
                    <div style={{
                        marginTop: index === 0 ? '0px' : '12px'
                    }}>
                        <ProductCardContainer
                            viewMode={'VIEW'}
                            refresh={fetchData}
                            element={{
                                id: x.productId,
                                name: x.name,
                                // brand: x.product?.brand,
                                // color: '',
                                price: x?.price,
                                quantity: x.quantity,
                                // size: '',
                                imageUrl: x.imageUrl
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
                            }}>{`${element?.totalPrice} ${currency}`}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}>
                            <span>{'Dostawa: '}</span>
                            <span style={{
                                marginLeft: "auto"
                            }}>{`${element?.totalPrice} ${currency}`}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}>
                            <span>{'Łącznie: '}</span>
                            <span style={{
                                marginLeft: "auto"
                            }}>{`${element?.totalPrice} ${currency}`}</span>
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
                        <span>{element?.shippingAddress}</span>
                    </div>
                </div>
                <div className='col-md-2'>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>Adres do rachunku</span>
                    <div className='row'>
                        <span>{element?.billingAddress}</span>
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
