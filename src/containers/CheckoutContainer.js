import React, { useEffect, useRef, useState } from "react";
import FinancialTransactionsService from "../services/FinancialTransactionsService";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import ProductCardContainer from "./ProductCardContainer";
import ProductService from "../services/ProductService";
import AuthService from "../services/AuthService";
import { v4 as uuidv4 } from "uuid";
import CheckoutService from "../services/CheckoutService";
import { useTranslation, i18n } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";

const CheckoutContainer = (props) => {
  const service = new FinancialTransactionsService();
  const stepperRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: undefined,
    lastName: "",
    address: "",
    number: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
  });
  const authService = new AuthService();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const productService = new ProductService();
  const checkoutService = new CheckoutService();
  const [cart, setCart] = useState(undefined);

  SimpleReactValidator.addLocale('pl', {
    required: 'Pole :attribute  jest wymagane '
  });

  const validator = useRef(
    new SimpleReactValidator({
      locale:'pl'
    })
  );//TODO dodac tez tlumaczenie pól!

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [shippingMethod,setShippingMethod]=useState(undefined)
  const [dataSubmitted, setDataSubmitted] = useState(false)
  const [editFormData, setEditFormData]=useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value && value.length >= 1) {
      validator.current.hideMessageFor(name);
    }
    setFormData({ ...formData, [name]: value });
  };

  const [intentModel, setIntentModel] = useState({
    amount: "",
    localCurrency: "eur",
    products: [],
    uuid: "",
    email: "",
  });

  const fetchSecret = async (uuid) => {
    intentModel.products = cart.products.map((x) => ({
      id: x.id,
      name: x.product.name,
      price: x.product.price,
      quantity: x.quantity,
      imageUrl: "/jeans.jpg",
    }));
    intentModel.amount = cart.totalPrice;
    intentModel.uuid = uuid;
    intentModel.email = formData.email;
    const response = await service.getClientSecret(intentModel);
    return response;
  };

  const handleGoToPayment = async (event) => {
    event.preventDefault();

    const verifySession = async () => {
      props.setLoading(true);
      try {
        const resp = await authService.isLoggedIn();
        const json = await resp.json();
      } catch (err) {
        console.log(err);
        props.setLoading(false);
      }
    };
    props.setLoading(true);
    try {
      verifySession();

      const uuid = uuidv4();
      const tokenResp = await fetchSecret(uuid); //zapisz zamowienie, utworz payment intent, zapisz w bazie klucz: uuid wartosc: client secret
      sessionStorage.setItem(uuid, tokenResp.intentId); //intent id to klucz do client secret z bazy

      const response = await authService.getPaymentToken(uuid);
      await response;
      navigate(`/payment/${uuid}`); // w payment container secret bedzie wyslany z backendu, kluczem jest ten intentId. Autoryzacja operacji tym 1-razowym tokenem.
    } catch (error) {
      props.setLoading(false);
      console.log(error);
    }
  };

  const fetchData = async () => {
    props.setLoading(true);
    try {
      const response = await productService.getCheckoutProducts();
      const json = await response.json();

      setCart(json);
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatMoney = (value) => {
    return (value / 100).toFixed(2);
  };

  const divider = (
    <hr
      style={{
        marginTop: "3%",
        marginBottom: "3%",
      }}
      class="solid"
    ></hr>
  );

  return (
    <div
      className="checkout-container card flex justify-content-center"
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="row" >
        <div className="col-md-3" style={{
                transition: "width 0.5s ease", 
                width: !editFormData ? "20%" : "", 
        }}>
          <div className="login-description">{t("checkout.your-data")}</div>
          <div
            className="column"
            style={{
              opacity: editFormData ? 1 : 0.5,
            }}
          >
            <InputText
              name="firstName"
              value={formData.firstName}
              placeholder={t("global.firstName")}
              onChange={handleInputChange}
              style={{ width: "100%" }}
              disabled={!editFormData}
              invalid={
                formSubmitted && !validator.current.fieldValid("firstName")
              }
            />
            {validator.current.message(
              "firstName",
              formData.firstName,
              "required",
              {
                className: "error-message",
              }
            )}
            <InputText
              name="lastName"
              value={formData.lastName}
              placeholder={t("global.lastName")}
              onChange={handleInputChange}
              style={{ width: "100%" }}
              disabled={!editFormData}
              invalid={
                formSubmitted && !validator.current.fieldValid("lastName")
              }
            />
            {validator.current.message(
              "lastName",
              formData.lastName,
              "required",
              {
                className: "error-message",
              }
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                gap: "10px",
                marginBottom: "5px",
              }}
            >
              <div>
                <InputText
                  name="address"
                  value={formData.address}
                  placeholder={t("global.address")}
                  onChange={handleInputChange}
                  disabled={!editFormData}
                  invalid={
                    formSubmitted && !validator.current.fieldValid("address")
                  }
                />
                {validator.current.message(
                  "address",
                  formData.address,
                  "required",
                  {
                    className: "error-message",
                  }
                )}
              </div>
              <div>
                <InputText
                  name="number"
                  value={formData.number}
                  placeholder={t("global.number")}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  disabled={!editFormData}
                  invalid={
                    formSubmitted && !validator.current.fieldValid("number")
                  }
                />
                {validator.current.message(
                  "number",
                  formData.number,
                  "required",
                  {
                    className: "error-message",
                  }
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginBottom: "5px",
                gap: "10px",
              }}
            >
              <div>
                <InputText
                  name="postalCode"
                  value={formData.postalCode}
                  placeholder={t("global.postalCode")}
                  onChange={handleInputChange}
                  disabled={!editFormData}
                  invalid={
                    formSubmitted && !validator.current.fieldValid("postalCode")
                  }
                />
                {validator.current.message(
                  "postalCode",
                  formData.postalCode,
                  "required",
                  {
                    className: "error-message",
                  }
                )}
              </div>
              <div
                style={{
                  width: "90%",
                }}
              >
                <InputText
                  name="city"
                  value={formData.city}
                  placeholder={t("global.city")}
                  onChange={handleInputChange}
                  disabled={!editFormData}
                  style={{
                    width: "100%",
                  }}
                  invalid={
                    formSubmitted && !validator.current.fieldValid("city")
                  }
                />
                {validator.current.message("city", formData.city, "required", {
                  className: "error-message",
                })}
              </div>
            </div>
            <InputText
              name="email"
              value={formData.email}
              placeholder={t("global.email")}
              onChange={handleInputChange}
              disabled={!editFormData}
              invalid={formSubmitted && !validator.current.fieldValid("email")}
            />
            {validator.current.message("email", formData.email, "required", {
              className: "error-message",
            })}
            <InputText
              name="phone"
              value={formData.phone}
              placeholder={t("global.phone")}
              onChange={handleInputChange}
              style={{ width: "100%" }}
              disabled={!editFormData}
              invalid={formSubmitted && !validator.current.fieldValid("phone")}
            />
            {validator.current.message("phone", formData.phone, "required", {
              className: "error-message",
            })}
          </div>
          <div
            style={{
              marginTop: "100%x",
              marginLeft: "150%",
            }}
          >
            {editFormData ? (
              <Button
                onClick={() => {
                  if (validator.current.allValid()) {
                    setDataSubmitted(true);
                    setEditFormData(false);
                  } else {
                    validator.current.showMessages(true);
                    setDataSubmitted(false);
                    setFormSubmitted(true);
                  }
                }}
                label="Dalej"
              ></Button>
            ) : (
              <Button
                style={{
                  opacity: 1,
                }}
                onClick={() => {
                  if (validator.current.allValid()) {
                    setEditFormData(true);
                  } else {
                    validator.current.showMessages(true);
                    setDataSubmitted(false);
                    setFormSubmitted(true);
                  }
                }}
                label="Edytuj"
              ></Button>
            )}
          </div>
        </div>
        <div className="col-md-3" style={{
            transition: "width 0.5s ease", 
            width: !editFormData ? "15%" : "", 
        }}>
          <div className="login-description">
            {t("checkout.shipping-methods")}
          </div>

          <div
            className="column"
            style={{
              opacity: editFormData ? 1 : 0.5,
            }}
          >
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                gap: "20px",
                marginTop: "1%",
              }}
            >
              <label
                className="option"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="shipping-method"
                  value="COURIER"
                  className="custom-radio"
                  disabled={!editFormData}
                  style={{
                    cursor: !editFormData ? "initial" : "pointer",
                  }}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <span className="radio-button">
                  {t("checkout.courier") + " 14,99 zł"} //TODO
                </span>
              </label>
              <label
                className="option"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="shipping-method"
                  value="PERSONAL"
                  className="custom-radio"
                  disabled={!editFormData}
                  style={{
                    cursor: !editFormData ? "initial" : "pointer",
                  }}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <span className="radio-button">{t("checkout.personal")}</span>
              </label>
            </div>
          </div>
          {validator.current.message(
            "shipping-method",
            shippingMethod,
            "required",
            {
              className: "error-message",
            }
          )}
        </div>

        <div
          className="col-md-3"
          style={{
            opacity: editFormData ? 0.5 : 1,
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "26px",
            }}
          >
            {t("global.summary")}
          </span>
          {cart?.products?.map((x, index) => {
            return (
              <div
                style={{
                  marginTop: index === 0 ? "0px" : "12px",
                }}
              >
                <ProductCardContainer
                  viewMode={"VIEW"}
                  refresh={fetchData}
                  element={{
                    id: x.product.id,
                    name: x.product.name,
                    brand: x.product?.brand,
                    color: "",
                    price: x.product?.price,
                    quantity: x.quantity,
                    size: "",
                    imageUrl: x.product.imageUrl,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="col-md-2"
          style={{
            backgroundColor: "#e8e8e8",
            padding: "20px",
            opacity: editFormData ? 0.5 : 1,
            marginTop:'40px',
            maxHeight: 'fit-content'
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>{t("checkout.products-total")}</span>
              <span>{cart?.totalPrice}</span>
            </div>
            {divider}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>{t("checkout.shipping")}</span>
              <span>0,00 zł</span>
            </div>
            {divider}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <span>{t("checkout.total")}</span>
              <span>{cart?.totalPrice}</span>
            </div>
          </div>
          <Button style={{ width: "100%", }} onClick={handleGoToPayment}>
            {t("checkout.pay")}
          </Button>
          <div
            style={{
              marginTop: "10%",
            }}
          >
            <span>Akceptujemy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
