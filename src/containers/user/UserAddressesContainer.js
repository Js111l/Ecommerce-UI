import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useAuth } from '../auth/AuthContext';
import AuthService from '../../services/AuthService';
import { PiPencilSimple } from 'react-icons/pi'; // Example for PrimeIcons
import { Dialog } from 'primereact/dialog';



const UserAddressesContainer = (props) => {

    const [hover, setHover] = useState({})
    const { isLoggedIn } = useAuth();
    const [billingAddressViewMode, setBillingAddressViewMode] = useState('VIEW');
    const [shippingAddressViewMode, setShippingAddressViewMode] = useState('VIEW');
    const [visible, setVisible] = useState(false);
    const [userAddresses, setUserAddresses]= useState([])

    const [userDefaultShippingAddress, setUserDefaultSHippingAddress]=useState(undefined);
    const [userDefaultBillinggAddress, setUserDefaultBillingAddress]=useState(undefined);
    const navigation = useNavigate()

    const authService=new AuthService()
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

    useEffect(() => {

        const fetchData = async () => {

            const userAddressesResponse = await authService.getCurrentUserAddresses();
            const addressJson = await userAddressesResponse.json();


            const userDefaultAddressResponse = await authService.getCurrentUserDefaultAddresses();
            const defaultAddressesJson = await userDefaultAddressResponse.json();

            setUserAddresses(addressJson);
            setUserDefaultBillingAddress(defaultAddressesJson?.a)
            setUserDefaultSHippingAddress(defaultAddressesJson?.b)
         }

         fetchData();
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const sidebar = (
        <div className='col-md-2'>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 0 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 0, status: true })}
                onMouseLeave={() => setHover({ id: 0, status: false })}
                onClick={(e) => {
                    navigation('/user/account')
                }}
            >
                <span>Moje dane</span>
            </div>
            {/* <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 1 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 1, status: true })}
                onMouseLeave={() => setHover({ id: 1, status: false })}
                onClick={(e) => {
                    navigation('/user/returns')
                }}
            >
                <span>Zwroty</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 2 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 2, status: true })}
                onMouseLeave={() => setHover({ id: 2, status: false })}
                onClick={(e) => {
                    navigation('/user/return-form')
                }}
            >

                <span>Wykonaj zwrot</span>
            </div> */}
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 3 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 3, status: true })}
                onMouseLeave={() => setHover({ id: 3, status: false })}
                onClick={(e) => {
                    navigation('/user/orders')
                }}
            >

                <span>Zamówienia</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 4 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 4, status: true })}
                onMouseLeave={() => setHover({ id: 4, status: false })}
                onClick={(e) => {
                    navigation('/user/addresses')
                }}
            >

                <span>Adresy</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 5 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 5, status: true })}
                onMouseLeave={() => setHover({ id: 5, status: false })}
                onClick={(e) => {
                    navigation('/user/favorites')
                }}
            >
                <span>Lista życzeń</span>
            </div>
        </div>
    )

    const divider = (
        (
            <hr style={{
                marginTop: '3%',
                marginBottom: '3%'
            }} class="solid">
            </hr>
        )
    )

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
        </div> : <div>
                {userAddresses.length == 0 ?
                    <span style={{
                        textAlign: 'left',
                        width: '400%'
                    }}>
                        Nie masz dodanych adresów do swojego konta. Zapisz adres teraz i składaj kolejne zamówienia szybciej.
                    </span>
                    : null}
            {mapped}
        </div>
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


    const content = (
        <>
        {renderAddressDialog()}
        {renderAddresses()}
        </>
    )


    return (
        <div className='row'
            style={{
                marginLeft: '20%',
                marginRight: '20%',
                marginTop: '5%'
            }}>
            {sidebar}
            <div className='col-md-6' style={{
                marginLeft: "12%"
            }}>
                {content}
            </div>

        </div>
    )
}

export default UserAddressesContainer;
