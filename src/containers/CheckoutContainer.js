import React, { useEffect, useRef, useState } from 'react';
import FinancialTransactionsService from '../services/FinancialTransactionsService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductCardContainer from './ProductCardContainer';
import ProductService from '../services/ProductService';

const CheckoutContainer = (props) => {
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
    const navigate = useNavigate();
    const productService = new ProductService();
    const [cart, setCart] = useState(undefined)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
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
        <div className="checkout-container card flex justify-content-center"
            style={{
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
            }}>
            <div className="row" style={{ width: '100%' }}>
                <div className="col-md-3">
                    <div className="login-label">Dostawa</div>
                    <div className="login-description">Twoje dane</div>
                    <div className="column">
                        <InputText
                            name="firstName"
                            value={formData.firstName}
                            placeholder='IMIĘ *'
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <InputText
                            name="lastName"
                            value={formData.lastName}
                            placeholder='NAZWISKO *'
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <InputText
                                name="address"
                                value={formData.address}
                                placeholder='ADRES *'
                                onChange={handleInputChange}
                                style={{ width: '70%', marginRight: '5px' }}
                            />
                            <InputText
                                name="number"
                                value={formData.number}
                                placeholder='NUMER *'
                                onChange={handleInputChange}
                                style={{ width: '30%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <InputText
                                name="postalCode"
                                value={formData.postalCode}
                                placeholder='KOD POCZTOWY *'
                                onChange={handleInputChange}
                                style={{ width: '30%', marginRight: '5px' }}
                            />
                            <InputText
                                name="city"
                                value={formData.city}
                                placeholder='MIASTO *'
                                onChange={handleInputChange}
                                style={{ width: '70%' }}
                            />
                        </div>
                        <InputText
                            name="email"
                            value={formData.email}
                            placeholder='EMAIL *'
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <InputText
                            name="phone"
                            value={formData.phone}
                            placeholder='TELEFON *'
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="login-label">Metody dostawy</div>
                    <div className="login-description">Twoje dane</div>
                    <div className="column">
                        <InputText
                            name="firstName"
                            value={formData.firstName}
                            placeholder='IMIĘ *'
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <InputText
                            name="lastName"
                            value={formData.lastName}
                            placeholder='NAZWISKO *'
                            onChange={handleInputChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <span style={{ fontWeight: 'bold', fontSize: '26px' }}>Podsumowanie</span>
                    {cart?.products.map((x) => {
                        return (
                            <ProductCardContainer
                                // selectedAll={selectedAll}
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

                <div className="col-md-2" style={{ backgroundColor: '#e8e8e8', padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Wartość produktów</span>
                            <span>{formatMoney(cart?.totalPrice)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Dostawa</span>
                            <span>0,00 zł</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px' }}>
                            <span>Do zapłaty</span>
                            <span>{formatMoney(cart?.totalPrice)}</span>
                        </div>
                    </div>
                    <Button
                        style={{ width: '100%' }}
                        onClick={() => navigate('/payment')}
                    >Kupuje i płacę</Button>
                    <div
                        style={{
                            marginTop: '10%'
                        }}>
                        <span>Akceptujemy</span>
                    </div>
                </div>
             
            </div>
        </div>
    );
};

export default CheckoutContainer;
