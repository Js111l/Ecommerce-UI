import { Password } from "primereact/password";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from "primereact/button";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';

const PasswordCredentialsContainer = (props) => {
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
    <div className="column">
      <label>E-mail</label>
      <InputText
        value={login}
        onChange={(e) => {
          setLogin(e.target.value)
        }}
        style={{
          width: '100%'
        }}
      />
      <label>Haslo</label>
      <Password
        value={password}
        className="p-password"
        onChange={(e) => setPassword(e.target.value)}
        feedback={false}
        tabIndex={1}
        inputStyle={{ width: "100%" }}
      />
      <div className="row">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '20px',
        }}>
          {props.register ?
            null :
            <a href="" style={{
              marginRight: 'auto'
            }}>
              <span>Nie pamiętasz hasła?</span>
            </a>
          }

          <Button label={props.register ? "Zarejestruj" : "Zaloguj"} variant="login-button"
          onClick={()=>{
            props.register ? registerUser() : loginUser()
          }} />
        </div>
      </div>
      </div>
  );
};

export default PasswordCredentialsContainer;



