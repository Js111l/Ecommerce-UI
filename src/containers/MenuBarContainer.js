import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useEffect, useRef, useState } from "react";
import { Badge } from 'primereact/badge'
import ProductService from "../services/ProductService";
import AuthService from "../services/AuthService";

const MenuBarContainer = (props) => {
  const navigation = useNavigate();
  const [active, setActive] = useState(false);
  const [checkoutCount, setCheckoutCount] = useState(0);
  const service = new ProductService()
  const authService = new AuthService()
  const productService = new ProductService()

  const fetchCheckoutCount = async () => {
    props.setLoading(true);
    try {
      const userId = authService.getUserFromToken().iss
      const response = await service.getCheckoutCount(userId);
      const json = await response.json();
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
      //   command: () => menuBarOnClickFunction('checkout'),
      items: [
        {
          label: "Zaloguj sie", //TODO -> tlumaczenia
          className: "reddy",
          command: () => menuBarOnClickFunction("login"),
        },
        {
          label: "Zarejestruj sie",
          command: () => menuBarOnClickFunction("register"),
        },
      ],
    },

  ];

  const items2 = [
    {
      //icon: ',
      //   command: () => menuBarOnClickFunction('checkout'),
      items: [
        {
          label: "Zaloguj sie", //TODO -> tlumaczenia
          className: "reddy",
          command: () => menuBarOnClickFunction("login"),
        },
        {
          label: "Zarejestruj sie",
          command: () => menuBarOnClickFunction("register"),
        },
      ],
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
            >
              Odziez
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
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <li style={{ padding: "8px 12px" }}>Sukienki</li>
                      <li style={{ padding: "8px 12px" }}>Kurtki i plaszcze</li>
                      <li style={{ padding: "8px 12px" }}>T-shirty</li>
                    </div>
                    <div className="col">
                      <li style={{ padding: "8px 12px" }}>Spodnie</li>
                      <li style={{ padding: "8px 12px" }}>Szorty</li>
                      <li style={{ padding: "8px 12px" }}>Buty</li>
                    </div>
                    <div className="col">
                      <li style={{ padding: "8px 12px" }}>Marynarki</li>
                      <li style={{ padding: "8px 12px" }}>Czapki</li>
                      <li style={{ padding: "8px 12px" }}>Kapelusze</li>
                    </div>
                    <div className="col">
                      <li style={{ padding: "8px 12px" }}>Stroje kapielowe</li>
                      <li style={{ padding: "8px 12px" }}>Koszule</li>
                      <li style={{ padding: "8px 12px" }}>Swetry</li>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </a>
          <a
            href=""
            style={{
              marginRight: "20px",
            }}
          >
            <span>Akcesoria</span>
          </a>
          <a
            href=""
            style={{
              marginRight: "20px",
            }}
          >
            <span>Wyprzedaz</span>
          </a>
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