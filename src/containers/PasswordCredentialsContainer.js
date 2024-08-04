import { Password } from "primereact/password";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from "primereact/button";


const PasswordCredentialsContainer = (props) => {
  const [password, setPassword] = useState(undefined);
  const [login, setLogin] = useState(undefined);

  return (
    <div className="column">
      <label>E-mail</label>
      <InputText
        value={login}
        onChange={(e) => setLogin(e.target.value)}
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
          <a href="" style={{
            marginRight: 'auto'
          }}>
            <span>Nie pamiętasz hasła?</span>
          </a>
          <Button label="Zaloguj" variant="login-button" />
        </div>
      </div>
    </div>
  );
};

export default PasswordCredentialsContainer;



