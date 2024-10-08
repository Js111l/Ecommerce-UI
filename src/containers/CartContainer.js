import React, { useEffect, useRef, useState } from 'react';
import FinancialTransactionsService from '../services/FinancialTransactionsService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductCardContainer from './ProductCardContainer';


const CartContainer = (props) => {
    const service = new FinancialTransactionsService();
    const stepperRef = useRef(null);
    const [element,setElement] = useState(undefined);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
         //TODO 
        };
        fetchData();
    }, []);


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
                        marginLeft: '30%'
                    }}>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '26px'
                    }}>Koszyk</span>
                    <ProductCardContainer
                        element={{
                            name: '',
                            brand: '',
                            color: '',
                            price: '',
                            quantity: '',
                            size: ''
                        }}>
                    </ProductCardContainer>
                    <ProductCardContainer>
                    </ProductCardContainer>
                </div>
                <div className='col-md-2'
                    style={{
                        backgroundColor: '#e8e8e8',
                        width:'15%'
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
                            >300,00 zł
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
                                    fontWeight:'bold',
                                    fontSize:'20px'
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
                            >318,00 zł
                            </span>
                        </div>
                        <div style={{
                           paddingLeft: '5%',
                           marginTop: '5%',
                        }}>
                            <Button
                            style={{
                                width:'100%',
                                justifyContent:'center',
                            }}
                            onClick={(e)=>{
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
