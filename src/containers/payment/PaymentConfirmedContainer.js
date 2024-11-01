import React, { useEffect, useState } from 'react';
import AuthService from "../../services/AuthService";

import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const PaymentConfirmedContainer = (props) => {
    const [secret, setSecret] = useState(undefined);
    const params = useParams()
    const queryParams = new URLSearchParams(window.location.search);

    const token = queryParams.get('token');
   // const token = sessionStorage.getItem('token')
    const payment_intent_client_secret = queryParams.get('payment_intent_client_secret');

    const { orderId } = useParams()
    const navigate = useNavigate()

    const [hover, setHover] = useState(false)
     
    const authService = new AuthService()
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        const fetchData = async () => {
            try {
                authService.verifyOneTimeToken(token, payment_intent_client_secret)
            } catch (error) {
                console.log("error", error);
                navigate('/wtf')
            }
        };

        fetchData()

        return () => {
            window.onbeforeunload = null;
        };
    }, []);




    const options = {
        clientSecret: secret,
        appearance: {
            theme: 'stripe'
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div className='row'>
                <p style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>Dziękujemy za zakupy!</p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px'
                    }}>
                        <i style={{
                            color: "green",
                            fontSize: '20px'
                        }} className='pi pi-check-circle'></i>
                        <p style={{
                            fontSize: '20px',
                            textAlign: 'center'
                        }}>Twoje zamówienie o numerze <strong>{orderId}</strong> zostało pomyślnie złożone!</p>
                    </div>

                    <p style={{
                        fontSize: '18px',
                        textAlign: 'center',
                        maxWidth: '500px'
                    }}>Wkrótce otrzymasz wiadomość e-mail z potwierdzeniem oraz wszelkimi szczegółami dotyczącymi zamówienia. 
                    W razie potrzeby możesz sprawdzić status swojego zamówienia na swoim koncie w zakładce <strong>"Moje Zamówienia"</strong>.</p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    <Button style={{
                        width: "400px",
                        textAlign: 'center'
                    }} label='SPRAWDŹ SZCZEGÓŁY' />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '1%'
                }}>
                    <i className="pi pi-arrow-left" style={{ 
                        color: 'slateblue',
                        fontSize: '13px',
                        color: '#7c7d7c'
                    }}></i>
                    <span style={{
                        color: hover ? 'black' : '#7c7d7c',
                        textDecoration: hover ? 'underline' : '',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => setHover(true)}
                        onMouseLeave={(e) => setHover(false)}
                        onClick={(e)=>{
                            navigate('/')
                        }}
                    >Przejdź do strony głównej</span>
                </div>
                <p style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                    marginTop: '20px'
                }}>Dziękujemy, że nam zaufałeś!
                 Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt z naszym Biurem Obsługi Klienta.
                Mamy nadzieję, że nasz produkt spełni Twoje oczekiwania i umili Ci czas!</p>

                <p style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    marginTop: '20px'
                }}>Zespół Obsługi Klienta</p>
            </div>

        </div>
    )

};

export default PaymentConfirmedContainer;
