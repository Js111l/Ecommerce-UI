import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { t } from "i18next";

const NotFoundComponent = (props) => {
    const [number, setNumber] = useState(Math.floor(Math.random() * 4))
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        
    }, []);

    return (
        <div>
          <p style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            {t('not-found-page.title')}
          </p>
          <p style={{
            textAlign: 'center'
          }}>
            {t('not-found-page.message')}
          </p>
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
              onClick={(e) => {
                navigate('/')
              }}
            >
              {t('not-found-page.goHome')}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img src={`404_page${number}.jpg`} style={{
              width: '25%',
              height: '20%'
            }} />
          </div>
        </div>
      );
      
};

export default NotFoundComponent;