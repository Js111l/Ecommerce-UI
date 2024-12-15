import { Password } from "primereact/password";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from "primereact/button";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from "primereact/card";
import { useTranslation, i18n } from 'react-i18next';


const NewsLetterComponent = (props) => {
  const [password, setPassword] = useState(undefined);
  const [login, setLogin] = useState(undefined);
  const { t } = useTranslation();

  const service = new AuthService();
  const navigate=useNavigate();

    return (
        <Card
            style={{
                maxWidth: '600px',
                backgroundColor: "#f9f9f9",
            }}
        >
            <div className="row">
                <span style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign:'center'
                }}>{t('newsletter.header')}</span>
                <span style={{
                    fontWeight: 'bold',
                    textAlign:'center',
                    marginTop:'3%',
                    marginBottom:'3%'
                }}>
                    {t('newsletter.message')}
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
                    {t('newsletter.female')}
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
                    {t('newsletter.male')}
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
                    <span>{t('newsletter.save')}</span>
                </Button>
            </div>
        </Card>
        
    );
};

export default NewsLetterComponent;



