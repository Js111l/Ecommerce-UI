import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAuth } from "./auth/AuthContext";
import { useTranslation, i18n } from "react-i18next";

const PasswordCredentialsContainer = (props) => {
  const [password, setPassword] = useState("");
  const [userLogin, setLogin] = useState("");
  const { login } = useAuth();
  const { t } = useTranslation();
  const service = new AuthService();
  const navigate = useNavigate();

  const loginUser = () => {
    service
      .login({
        email: userLogin,
        password: password,
      })
      .then((response) => {
        props.setLoading(false);
        props.showMessage("success", t("user-auth.loginSuccess"));

        login();

        props.setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        props.setLoading(false);
        console.log(err);
        props.showMessage("error", t("user-auth.loginError") + err);
      });
  };

  const registerUser = () => {
    service
      .register({
        email: userLogin,
        password: password,
      })
      .then((response) => {
        props.setLoading(false);
        props.setRegister(false);
        props.showMessage(
          "success",
          t("user-auth.registerSuccess"),
          null,
          true
        );
      })
      .catch((err) => {
        props.setLoading(false);
        console.log(err);
        props.showMessage("error", t("user-auth.registerError") + err);
      });
  };

  return (
    <div className="column">
      <label>{t("password-credentials.emailLabel")}</label>
      <InputText
        value={userLogin}
        onChange={(e) => {
          setLogin(e.target.value);
        }}
        style={{
          width: "100%",
        }}
      />
      <label>{t("password-credentials.passwordLabel")}</label>
      <Password
        value={password}
        className="p-password"
        onChange={(e) => setPassword(e.target.value)}
        feedback={false}
        tabIndex={1}
        inputStyle={{ width: "100%" }}
      />
      <div className="row">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          {props.register ? null : (
            <a href="" style={{ marginRight: "auto" }}>
              <span>{t("password-credentials.forgotPassword")}</span>
            </a>
          )}

          <Button
            label={
              props.register
                ? t("password-credentials.registerButton")
                : t("password-credentials.loginButton")
            }
            variant="login-button"
            onClick={() => {
              props.register ? registerUser() : loginUser();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordCredentialsContainer;
