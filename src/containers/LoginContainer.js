import { useEffect, useState } from "react";
import PasswordCredentialsContainer from "./PasswordCredentialsContainer";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigationType } from "react-router-dom";
import { t } from 'i18next';

const LoginContainer = (props) => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate()
  const navigationType = useNavigationType();


  const goBack = () => {
    if (navigationType === 'PUSH') {
      navigate(-1)
    } else {
      navigate('/')
    }
  }


  useEffect(() => {
    props.setShowNewsletter(false);              
  }, []);

    const renderNewClientRegister = () => {
      return (
        <div
          style={{
            paddingLeft: "10px",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "medium",
              }}
            >
              {t("login.noAccount")} <br />
            </p>
            <p className="register-welcome-text">
              {t("login.registerWelcomeText")} <br />
              {t("login.registerBenefitsIntro")} <br />
            </p>
            <ul>
              <li>
                {t("login.benefits.discount")} <br />
              </li>
              <li>
                {t("login.benefits.loyaltyDiscounts")} <br />
              </li>
              <li>
                {t("login.benefits.timeSaving")} <br />
              </li>
              <li>
                {t("login.benefits.orderHistory")} <br />
              </li>
              <p
                style={{
                  paddingTop: "10px",
                }}
              >
                {t("login.benefits.more")}
              </p>
            </ul>
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                }}
              >
            <Button
    label={t('login.buttons.register')}
    variant="login-button"
    onClick={() => {
        setRegister(true);
    }}
/>
</div>
<Button
    label={t('login.buttons.continueAsGuest')}
    variant="login-button"
    onClick={goBack}
/>

            </div>
          </div>
        </div>
      );
    };

    const renderRegisterForm = () => {
      return (
        <div className="col-md-6">
          <div className="login-label">{t('register.title')}</div>
          <div className="login-description">
            {t('register.description')}
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
      );
    };
    
    return (
      <div
        className="content-container"
        style={{
          paddingTop: '140px',
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="login-label">{t('login.title')}</div>
            <div className="login-description">
              {t('login.description')}
            </div>
            <div className="column">
              <PasswordCredentialsContainer
                setLoading={props.setLoading}
                showMessage={props.showMessage}
              />
            </div>
          </div>
          <div className="col-md-6">
            {register ? renderRegisterForm() : renderNewClientRegister()}
          </div>
        </div>
      </div>
    );
}    
  
  export default LoginContainer;