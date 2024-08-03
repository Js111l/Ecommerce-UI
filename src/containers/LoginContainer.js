import { useEffect, useState } from "react";
import { useNavigate } from "react";
import { Password } from 'primereact/password';
import PasswordCredentialsContainer from "./PasswordCredentialsContainer";

const LoginContainer = (props) => {
    //const navigation = useNavigate();
    const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
      const fetchProducts = async () => {
  
      };
  
      fetchProducts();
    }, []);
  
  
    return (
      <div>
      <PasswordCredentialsContainer>
      </PasswordCredentialsContainer>
      </div>
    );
  };
  
  export default LoginContainer;