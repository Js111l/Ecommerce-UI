import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useEffect, useRef, useState } from "react";
import { Badge } from 'primereact/badge'
import ProductService from "../services/ProductService";
import AuthService from "../services/AuthService";
import { useAuth } from "./auth/AuthContext";

const MenuBarContainer = (props) => {
  const navigation = useNavigate();
  const [active, setActive] = useState(false);
  const [checkoutCount, setCheckoutCount] = useState(0);
  const [parentCategories, setCategories] = useState([])
  const [hovered,setHovered]=useState({})
  const service = new ProductService()
  const authService = new AuthService()
  const productService = new ProductService()
    const { isLoggedIn } = useAuth();
    const { login } = useAuth();
    const { logout } = useAuth()
  
  const fetchCheckoutCount = async () => {

    const verifySession = async () => {
      try {
        const resp = await authService.isLoggedIn()
        const json = await resp.json()

        if (json.loggedIn) { //jesli user zalogowany
          login() //ustaw w context ze jest zalogowany
        } else {
          logout() //ustaw w context ze nie jest zalogowany
        }
      } catch (err) {
        logout()
      }
    }

    try {
      //const userId = authService.getUserFromToken().iss
      const categories = await productService.getParentCategories();
      const categoriesJson = await categories.json();

      setCategories(categoriesJson)

      const response = await service.getCheckoutCount(1);
      const json = await response.json();

      props.setLoading(true);
      verifySession()
      setCheckoutCount(json);

      props.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCheckoutCount();
  }, []);


  const menuBarOnClickFunction = (path) => {
    navigation("/" + path);
  };
  const op = useRef(null);


  const updateCount = async () => {
    try {
      const userId = authService.getUserFromToken().iss
      const response = await service.getCheckoutCount(userId);
      const json = await response.json();
      setCheckoutCount(json);
    } catch (error) {
      console.log(error);
    }
  }

  const items = [
    {
      command: () => menuBarOnClickFunction("cart"),
      className: 'cart',
      template: (item, options) => (
        <div
          className={options.className}
          onMouseEnter={() => {
            updateCount()
          }
          }
        >
          <> <i className="pi pi-fw pi-shopping-cart" />
            <Badge value={checkoutCount} severity="warning" />
          </>
        </div>
      )
    },
    {
      icon: "pi pi-fw pi-heart",
      //   command: () => menuBarOnClickFunction('checkout')
    },
    {
      icon: "pi pi-fw pi-user",
      
      items: isLoggedIn ? 
      [
        {
          label: "Moje konto", //TODO -> tlumaczenia
          className: "reddy",
          command: () => menuBarOnClickFunction("user/account"),
        },
        {
          label: "Zamówienia", //TODO -> tlumaczenia
          className: "reddy",
          command: () => menuBarOnClickFunction("user/orders"),
        },
        {
          label: "Adresy", //TODO -> tlumaczenia
          //className: "reddy",
          command: () => menuBarOnClickFunction("user/addresses"),
        },
        {
          label: "Wyloguj sie", //TODO -> tlumaczenia
          //className: "reddy",
          command: () => {
            authService.logout()
          },
        },

      ]
      :
      [
        {
          label: "Zaloguj sie", //TODO -> tlumaczenia
          //className: "reddy",
          command: () => menuBarOnClickFunction("login"),
        },
      ]
    },

  ];


  const start = () => {
    return (
      <div style={{}}>
        <img
          alt="logo"
          src="https://primefaces.org/cdn/primereact/images/logo.png"
          height="40"
          className="mr-2"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {parentCategories.map((parent) => {
            return (
              <a
                href=""
                style={{
                  marginRight: "20px",
                }}
              >
                <span
                  onMouseEnter={(e) => {
                    setActive(true);
                  }}
                  style={{
                    color:'black',

                  }}
                >
                  {parent.label}
                </span>
               {active ? (
              <div
                style={{
                  position: "absolute",
                  paddingTop: "8px",
                  width: "100vw",
                  left: 0,
                  zIndex: 10,
                }}
              >
                <div
                  onMouseLeave={(e) => {
                    setActive(false);
                  }}
                  style={{
                    listStyleType: "none",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                >
                      <div className="row">
                        {Array.from({ length: Math.ceil(parent.firstLevelChildren.length / 3) }).map((_, colIndex) => (
                          <div className="col" key={colIndex}>
                            <ul>
                              {parent.firstLevelChildren.slice(colIndex * 3, colIndex * 3 + 3).map((x, index) => (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'start',
                                  alignItems: 'center',
                                }}>
                                  <i className="pi pi-angle-right" style={{ color: 'slateblue' }}></i>
                                  <li
                                    key={index}
                                    style={{ 
                                      padding: "8px 12px", 
                                      color: 'black',
                                      textDecoration: hovered.id === index && hovered.status
                                      && hovered.colIndex === colIndex  ? 'underline' : 'none'
                                    }}
                                    onMouseEnter={(e)=>{
                                      setHovered({
                                        id: index,
                                        colIndex: colIndex,
                                        status: true
                                      })
                                    }}
                                    onMouseLeave={(e)=>{
                                      setHovered({
                                        id: index,
                                        colIndex: colIndex,
                                        status: false
                                      })
                                    }}
                                    onClick={(e) => {
                                      navigation(`/category/list?category=${x.path}`)
                                    }}
                                  >
                                    {x.label}
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
              </div>
                ) : null}   
              </a>
            )
          })}         
        </div>
      </div>
    );
  };

  return (
    <Menubar
      style={{ maxWidth: "100%" }}
      model={items}
      start={start}
      className="custom-menubar"
    />
  );
};

export default MenuBarContainer;