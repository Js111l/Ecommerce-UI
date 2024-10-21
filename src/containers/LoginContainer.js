import { useEffect, useState } from "react";
import PasswordCredentialsContainer from "./PasswordCredentialsContainer";
import { Button } from "primereact/button";

const LoginContainer = (props) => {
  const [register, setRegister] = useState(false);
  useEffect(() => {
    props.setShowNewsletter(false);              
  }, []);

    const renderNewClientRegister = () => {
      return (
        <div style={{
          paddingLeft: '10px'
        }}>
          <div>
            <p style={{
              fontWeight: 'bold',
              fontSize: 'medium'
            }}>Nie masz konta? <br />
            </p>
            <p className="register-welcome-text">
              Zarejestruj się i otrzymaj dostęp do wielu udogodnień! <br />
              Zarejestrowani użytkownicy mają dostęp do wielu udogodnień:  <br />
            </p>
            <ul>
              <li>15% rabatu na nowości przy pierwszych zakupach <br /></li>
              <li>Atrakcyjny system zniżek lojalnościowych <br /></li>
              <li>  Oszczędność czasu przy składaniu zamówień <br /></li>
              <li> Historia zamówień <br /></li>
              <p style={{
                paddingTop: '10px'
              }}> I wiele więcej !</p>
            </ul>
          </div>
          <div className="row">
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginRight: '20px',
            }}>
              <div style={{
                marginRight: '20px'
              }}>
                <Button label="Załóż konto" variant="login-button" onClick={()=>{
                  setRegister(true)
                }} />
              </div>
              <Button label="Kontynuuj jako gość" variant="login-button" />
            </div>
          </div>
        </div>
      );
    }

  const renderRegisterForm = () => {
    return (
      <div className="col-md-6">
        <div className="login-label">Rejestracja</div>
        <div className="login-description">
           Wypełnij formularz, aby ukończyć proces rejestracji
        </div>
        <div className="column">
          <PasswordCredentialsContainer
            setLoading={props.setLoading}
            showMessage={props.showMessage}
            register={register}
            setRegister={setRegister}
          />
        </div>
      </div>
    )
  }

    return (
        <div className="content-container"
          style={{
            paddingTop: '140px'
          }}> 
          <div className="row">
            <div className="col-md-6">
            <div className="login-label"> Logowanie</div>
              <div className="login-description">
                Jeśli posiadasz już konto, zaloguj się przy użyciu adresu e-mail.
              </div>
              <div className="column">
                <PasswordCredentialsContainer
                  setLoading={props.setLoading}
                  showMessage={props.showMessage}
                />
              </div>
            </div>
            <div className="col-md-6">
              {register ?
                renderRegisterForm()
                :
                renderNewClientRegister()
            }
            </div>
          </div>
      </div>
    );
  };
  
  export default LoginContainer;