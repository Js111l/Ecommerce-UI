import { Password } from "primereact/password";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from "primereact/button";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from "primereact/card";

const NewsLetterComponent = (props) => {
  const [password, setPassword] = useState(undefined);
  const [login, setLogin] = useState(undefined);

  const service = new AuthService();
  const navigate=useNavigate();

 const loginUser = () => {
  props.setLoading(true);
    service
      .login({
        email: login,
        password: password
      }).then((response) => {
          service.setToken(response);
          props.setLoading(false);
          props.showMessage('success','Pomyślnie zalogowano')
          navigate('/');
      }).catch((err) => {
        props.setLoading(false);
        //error message TODO
        console.log(err);
        props.showMessage('error','Wystapil blad poczas logowania '+err)
      })
  }
  const registerUser = () => {
    console.log(props)

    props.setLoading(true);
    service
      .register({
        email: login,
        password: password
      }).then((response) => {
        service.setToken(response);
        props.setLoading(false);
        props.setRegister(false);
        props.showMessage('success', 'Aby dokończyć proces rejestracji prosimy o kliknięcie w link aktywacyjny wysłany na podany adres e-mail', null, true)
      }).catch((err) => {
        props.setLoading(false);
        //error message TODO
        console.log(err);
        props.showMessage('error', 'Wystapil blad poczas rejestracji ' + err)
      })
  }

    return (
        <Card
            style={{
                maxWidth: '600px',
                
                //borderRadius: "8px", 
                backgroundColor: "#f9f9f9",
            }}
        >
            <div className="row">
                <span style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign:'center'
                }}>Nie przegap niczego!</span>
                <span style={{
                    fontWeight: 'bold',
                    textAlign:'center',
                    marginTop:'3%',
                    marginBottom:'3%'
                }}>Zapisz się do newslettera i otrzymuj ekskluzywne oferty oraz 10% rabatu!
                </span>
            </div>
            <div className="options" style={{
                display:'flex',
                justifyContent:'center',
                gap:'20px',
                marginBottom:'3%'
            }}>
                <label className="option">
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="custom-radio"
                        //checked={selected === 'female'}
                        //onChange={() => setSelected('female')}
                    />
                    <span className="radio-button"></span>
                    Dla kobiet
                </label>
                <label className="option">
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="custom-radio"
                        //checked={selected === 'male'}
                        //onChange={() => setSelected('male')}
                    />
                    <span className="radio-button"></span>
                    Dla mężczyzn
                </label>
            </div>

            <div className="column">
                <InputText
                    value={login}
                    variant="filled"
                    placeholder="E-mail"
                    onChange={(e) => {
                        setLogin(e.target.value)
                    }}
                    style={{
                        width: '100%'
                    }}
                />
                <div className="row">

                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop:'3%'
            }}>
                <Button>
                    <span>Zapisz sie</span>
                </Button>
            </div>
        </Card>
        
    );
};

export default NewsLetterComponent;



