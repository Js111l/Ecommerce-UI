import { Password } from "primereact/password";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from "primereact/button";


const PasswordCredentialsContainer = (props) => {
    const [password, setPassword] = useState(undefined);
    const [login, setLogin] = useState(undefined);


    const renderNewClientRegister = ()=>{
        return (
            <div>   
                Nie masz konta? 
                Zarejestruj sie i otrzymaj dostep do wielu udogodnien!
                Zarejestrowani uztkownicy maja mozliwosc:
                * 15% rabatu na nowości przy pierwszych zakupach
                * Atrakcyjny system zniżek lojalnościowych
                * Oszczędność czasu przy składaniu zamówieni
                * Historia zamowien
                I wiele wiecej ! 
            </div>

        );
    }
    return (
     <div>
        <div className="login label">Logowanie</div> 
        <div className="description">
            Jeśli posiadasz już konto, zaloguj się przy użyciu adresu e-mail.</div>
        
    <InputText
     value={login} 
     onChange={(e) => setLogin(e.target.value)} 
     />
    <Password
       value={password}
        onChange={(e) => setPassword(e.target.value)} 
        feedback={false} 
        tabIndex={1}
      />

      <div>
      <div >
                                            <Button
                                                variant='forgot-password-button'
                                            />
                                        </div>
                                            <Button
                                            label='Zaloguj'
                                            variant='login-button'
                                        />
                                    </div>

     </div>
    );
  };
  
  export default PasswordCredentialsContainer;