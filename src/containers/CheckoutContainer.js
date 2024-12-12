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
import { useAuth } from './auth/AuthContext';
import { Dialog } from 'primereact/dialog';
import { PiPencilSimple } from 'react-icons/pi'; // Example for PrimeIcons

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
    const authService = new AuthService()

    const navigate = useNavigate();
    const productService = new ProductService();
    const checkoutService = new CheckoutService()
    const [cart, setCart] = useState(undefined)
    const { isLoggedIn } = useAuth();
    const [billingAddressViewMode, setBillingAddressViewMode] = useState('VIEW');
    const [shippingAddressViewMode, setShippingAddressViewMode] = useState('VIEW');
    const [visible, setVisible] = useState(false);
    const [userAddresses, setUserAddresses]= useState([])

    const [userDefaultShippingAddress, setUserDefaultSHippingAddress]=useState(undefined);
    const [userDefaultBillinggAddress, setUserDefaultBillingAddress]=useState(undefined);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [intentModel, setIntentModel] = useState({
        amount: '',
        localCurrency: 'eur',
        products: [],
        uuid: '',
        email: ''
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

            const userAddressesResponse = await authService.getCurrentUserAddresses();
            const addressJson = await userAddressesResponse.json();


            const userDefaultAddressResponse = await authService.getCurrentUserDefaultAddresses();
            const defaultAddressesJson = await userDefaultAddressResponse.json();

            setCart(json);
            setUserAddresses(addressJson);

            setUserDefaultBillingAddress(defaultAddressesJson?.a)
            setUserDefaultSHippingAddress(defaultAddressesJson?.b)

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

    const renderAddressDialog = () => {
        return <Dialog header="Adres" visible={visible} style={{ width: '400px' }} onHide={() => { if (!visible) return; setVisible(false); }}
            footer={() => {
                return <div style={{
                    display: 'flex',
                    justifyContent: 'start'
                }}>
                    <Button onClick={()=>{
                        setBillingAddressAddNew(false)
                        setShippingAddNew(false)
                        setVisible(false)
                    }} label='Anuluj'></Button>
                    <Button style={{
                        marginLeft: "auto"
                    }} onClick={(e)=>{
                        userAddresses.push(formData)// dodawanie tych adresow Jeszcze usuwanie w tamtej zakladce. Ten sam komponent co tu, w tamtej zakladce. I juz w sumie wszystko, jesli jeszcze zrobie te zamowienia.Lista/szczegol
                        authService.updateAddresses(userAddresses)
                    }}
                     label='Zapisz'></Button>
                </div>
            }}
        >
            <>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <InputText
                        name="address"
                        value={formData.address}
                        placeholder="ADRES *"
                        onChange={handleInputChange}
                        style={{ width: '70%', marginRight: '5px' }}
                    />
                    <InputText
                        name="number"
                        value={formData.number}
                        placeholder="NUMER *"
                        onChange={handleInputChange}
                        style={{ width: '30%' }}
                    />
                </div>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <InputText
                        name="postalCode"
                        value={formData.postalCode}
                        placeholder="KOD POCZTOWY *"
                        onChange={handleInputChange}
                        style={{ width: '30%', marginRight: '5px' }}
                    />
                    <InputText
                        name="city"
                        value={formData.city}
                        placeholder="MIASTO *"
                        onChange={handleInputChange}
                        style={{ width: '70%' }}
                    />
                </div>
                <InputText
                    name="email"
                    value={formData.email}
                    placeholder="EMAIL *"
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <InputText
                    name="phone"
                    value={formData.phone}
                    placeholder="TELEFON *"
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px' }}
                /></>
        </Dialog>
    }

    const [selectedAddress, setSelected]=useState(0);
    const [shippingAddNew,setShippingAddNew]=useState(false)


    const renderShippingAddress = () => {
        let mapped=userAddresses?.map((address,index) => {
            return addressTemplate(address,index)
        })
        mapped.push(
            <div style={{
                //maxWidth:'200px'
            }}>
                <label
                    className="option"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                
                    }}
                >
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="custom-radio"
                        checked={shippingAddNew}
                    />
                    <div style={{
                        display: "flex",
                        justifyContent: "start"
                    }}>
                        <span style={{
                            cursor:'pointer'
                        }}onClick={()=>{
                            setShippingAddNew(true)
                            setVisible(true)
                        }}>Dodaj nowy adres</span> 
                    </div>
                </label>
                {userAddresses.length >= 1 ? //todo jak jest jakis wybor to dopiero zapisz 
                    <Button onClick={() => {
                        setShippingAddressViewMode('VIEW')
                    }} style={{
                        //marginLeft:'100%'
                    }} label='Zapisz'></Button>
                    : null}
            </div>
        )
        return shippingAddressViewMode === 'VIEW' && userDefaultShippingAddress ? <div className="column" style={{
            maxWidth: '400px'
        }}>
            <div className="row" style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ marginTop: '20px' }}>
                    <span>Adres dostawy</span>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'start' }}>
                        <strong>Ulica:</strong> 123 Main Street
                        <span style={{
                            marginLeft: 'auto',
                            cursor: 'pointer'
                        }} onClick={() => {
                            setShippingAddressViewMode('EDIT')
                        }}>Edytuj</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Miasto:</strong> {userDefaultShippingAddress?.city}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Kod pocztowy:</strong> {userDefaultShippingAddress?.postalCode}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Numer telefonu:</strong> {userDefaultShippingAddress?.phoneNumber}
                    </div>
                </div>
            </div>
        </div> : mapped
    }

    const [billingAddressAddNewSelected, setBillingAddressAddNew]=useState(false)
    const renderBillingAddress = () => {
        let mapped=userAddresses?.map(address => {
            return addressTemplate(address)
        })
        mapped.push(
            <div>
                <label
                    className="option"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="custom-radio"
                        checked={billingAddressAddNewSelected}
                    />
                    <div style={{
                        display: "flex",
                        justifyContent: "start"
                    }}>
                        <strong onClick={()=>{
                            setBillingAddressAddNew(true)
                            setVisible(true)
                        }}>Dodaj nowy adres</strong> 
                    </div>
                </label>
                <Button onClick={()=>{
                    setBillingAddressViewMode('VIEW')
                }} style={{
                    marginLeft:'100%'
                }} label='Zapisz'></Button>
            </div>
        )
        return billingAddressViewMode === 'VIEW' && userDefaultBillinggAddress ? <div className="column" style={{
            maxWidth: '400px'
        }}>
            <div className="row" style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ marginTop: '20px' }}>
                    <span>Adres dostawy</span>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'start' }}>
                        <strong>Ulica:</strong> 123 Main Street
                        <span style={{
                            marginLeft: 'auto',
                            cursor: 'pointer'
                        }} onClick={() => {
                            setBillingAddressViewMode('EDIT')
                        }}>Edytuj</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Miasto:</strong> {userDefaultBillinggAddress?.city}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Kod pocztowy:</strong> {userDefaultBillinggAddress?.postalCode}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Numer telefonu:</strong> {userDefaultBillinggAddress?.phoneNumber}
                    </div>
                </div>
            </div>
        </div> : userDefaultShippingAddress ? mapped : null //TODO moze se ustawic shipping jako billing adres, (do rachunku ten sam co do wysylki)
    }


    const renderAddresses = () => {
        return <div className="column" style={{
            maxWidth: '400px'
        }}>
            <div className="row" style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '20px',
                marginTop: '1%'
            }}>
                {renderShippingAddress()}
                {renderBillingAddress()}
            </div>
        </div>
    }

    const [editedAddress, setEditedAddress] = useState('')
    const [selectedBillingAddress, setSelectedBillingAddress]=useState('')

    const addressTemplate = (address, index, shippingAddress) => {
        return <div className="column">
            <div className="row" style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '20px',
                marginTop: '1%',
            }}>
                <label
                    className="option"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="custom-radio"
                        checked={shippingAddress ? selectedAddress === index : selectedBillingAddress === index}
                        onChange={() => {shippingAddress ? setSelected(index): setSelectedBillingAddress(index)}}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "start"
                        }}>
                            <strong>Ulica:</strong> 123 Main Street
                            <PiPencilSimple style={{
                                marginLeft: 'auto',
                                cursor: "pointer",
                                fontSize: '20px'
                            }} onClick={() => {
                                setEditedAddress('')
                                setVisible(true)
                            }}></PiPencilSimple>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Miasto:</strong> Warszawa
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Kod pocztowy:</strong> 00-001
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Numer telefonu:</strong> 123-456-789
                        </div>
                    </div>
                </label>
            </div>
        </div>
    }


    return (
        <div className="checkout-container card flex justify-content-center"
            style={{
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
            }}>
            <div className="row" style={{ width: '100%' }}>
                {renderAddressDialog()}
                <div className="col-md-3">
                    <div className="login-description">Twoje dane</div>
                    <div className="column">
                        {isLoggedIn ? renderAddresses() : (
                            <>
                                <InputText
                                    name="firstName"
                                    value={formData.firstName}
                                    placeholder="IMIĘ *"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                                <InputText
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder="NAZWISKO *"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <InputText
                                        name="address"
                                        value={formData.address}
                                        placeholder="ADRES *"
                                        onChange={handleInputChange}
                                        style={{ width: '70%', marginRight: '5px' }}
                                    />
                                    <InputText
                                        name="number"
                                        value={formData.number}
                                        placeholder="NUMER *"
                                        onChange={handleInputChange}
                                        style={{ width: '30%' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <InputText
                                        name="postalCode"
                                        value={formData.postalCode}
                                        placeholder="KOD POCZTOWY *"
                                        onChange={handleInputChange}
                                        style={{ width: '30%', marginRight: '5px' }}
                                    />
                                    <InputText
                                        name="city"
                                        value={formData.city}
                                        placeholder="MIASTO *"
                                        onChange={handleInputChange}
                                        style={{ width: '70%' }}
                                    />
                                </div>
                                <InputText
                                    name="email"
                                    value={formData.email}
                                    placeholder="EMAIL *"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                                <InputText
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="TELEFON *"
                                    onChange={handleInputChange}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                            </>
                        )}

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="login-description">Metody dostawy</div>

                    <div className="column">
                        {/* <Button label='Kurier'></Button>
                        <Button label='Odbior wlasny'></Button> */}
                        <div className="row" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            gap: '20px',
                            marginTop: '1%'
                        }}>
                            <label
                                className="option"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="custom-radio"
                                />
                                <span className="radio-button">Kurier 14,99 zł</span>
                            </label>
                            <label className="option"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="custom-radio"
                                //checked={selected === 'male'}
                                //onChange={() => setSelected('male')}
                                />
                                <span className="radio-button">
                                    Odbior wlasny
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <span style={{ fontWeight: 'bold', fontSize: '26px' }}>Podsumowanie</span>
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

                <div className="col-md-2" style={{ backgroundColor: '#e8e8e8', padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Wartość produktów</span>
                            <span>{cart?.totalPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Dostawa</span>
                            <span>0,00 zł</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px' }}>
                            <span>Do zapłaty</span>
                            <span>{cart?.totalPrice}</span>
                        </div>
                    </div>
                    <Button
                        style={{ width: '100%' }}
                        onClick={handleGoToPayment}
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
