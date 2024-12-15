import React, { useEffect, useState } from 'react';
import AuthService from "../../services/AuthService";

import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useTranslation, i18n } from 'react-i18next';

const PaymentConfirmedContainer = (props) => {
    const [secret, setSecret] = useState(undefined);

    const { orderId } = useParams()
    const navigate = useNavigate()

    const [hover, setHover] = useState(false)
    const { t } = useTranslation();
     
    
    useEffect(() => {
        return () => {
            window.onbeforeunload = null;
        };
    }, []);




    const options = {
        clientSecret: secret,
        appearance: {
            theme: 'stripe'
        }
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="row">
          <p
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {t("payment-confirm.header")}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <i
                style={{
                  color: "green",
                  fontSize: "20px",
                }}
                className="pi pi-check-circle"
              ></i>
              <p
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                {t("payment-confirm.order-success", orderId)}
              </p>
            </div>

            <p
              style={{
                fontSize: "18px",
                textAlign: "center",
                maxWidth: "500px",
              }}
            >
              {t("payment-confirm.message")}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Button
              style={{
                width: "400px",
                textAlign: "center",
              }}
              label={t('payment-confirm.order-details-button-label')}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1%",
            }}
          >
            <i
              className="pi pi-arrow-left"
              style={{
                color: "slateblue",
                fontSize: "13px",
                color: "#7c7d7c",
              }}
            ></i>
            <span
              style={{
                color: hover ? "black" : "#7c7d7c",
                textDecoration: hover ? "underline" : "",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => setHover(true)}
              onMouseLeave={(e) => setHover(false)}
              onClick={(e) => {
                navigate("/");
              }}
            >
              {t('payment-confirm.main-page-redirect-label')}
            </span>
          </div>
          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
              marginTop: "20px",
            }}
          >
           {t('payment-confirm.footer-message')}
          </p>
          {/* <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Zespół Obsługi Klienta
          </p> */}
        </div>
      </div>
    );

};

export default PaymentConfirmedContainer;
