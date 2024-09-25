import { style } from "@mui/system";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { useRef, useState } from "react";
import { Panel } from 'primereact/panel';
import { PanelMenu } from 'primereact/panelmenu';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from "primereact/button";
import { act } from "react";
import AuthService from "../services/AuthService";

const MenuBarContainer = (props) => {
    const navigation = useNavigate();
    const [active,setActive]=useState(false);
    const authService = new AuthService();
    const userRole = useState(authService.getCurrentUserRole())


    const menuBarOnClickFunction = (path) => {
        navigation('/'+path);
      }
      const regularUserItems = [
        {
          icon: 'pi pi-fw pi-search',
        //   command: () => menuBarOnClickFunction('checkout')
        },
        {
          icon: 'pi pi-fw pi-heart',
        //   command: () => menuBarOnClickFunction('checkout')
         
        },
        {
          icon: 'pi pi-fw pi-user',
        //   command: () => menuBarOnClickFunction('checkout'),
          items: [
            {
                label: 'Zaloguj sie', //TODO -> tlumaczenia
                className:'reddy',
                command: () => menuBarOnClickFunction('login')
            },
            {
                label: 'Zarejestruj sie',
              command: () => menuBarOnClickFunction('register'),
            },
          ],
        },
        {
          icon: 'pi pi-fw pi-shopping-cart',
          command: () => menuBarOnClickFunction('checkout')
        },
      ];

      const adminItems =[
        {
          icon: 'pi pi-fw pi-search',
        //   command: () => menuBarOnClickFunction('checkout')
        },
        {
          icon: 'pi pi-fw pi-user',
        //   command: () => menuBarOnClickFunction('checkout'),
          items: [
            {
                label: 'Zaloguj sie', //TODO -> tlumaczenia
                className:'reddy',
                command: () => menuBarOnClickFunction('login')
            },
            {
                label: 'Zarejestruj sie',
              command: () => menuBarOnClickFunction('register'),
            },
          ],
        },
      ];
      
      
      const regularUserStartItems = () => {
        return (
          <div style={{

          }}>
            <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" />
            <div style={{
              display:'flex',
              justifyContent: 'center',
            }}>
           
            <a href="" style={{
              marginRight: '20px',
            }}>
              <span onMouseEnter={(e)=>{setActive(true)}}>Odziez</span>
                {active ? (
                  <div
                    style={{
                      position: 'absolute',
                      paddingTop: '8px',
                      width: '100vw', 
                      left: 0,  
                      zIndex: 10,
                    }}
                  >
                    <div
                      onMouseLeave={(e)=>{setActive(false)}}
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyleType: 'none',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'white',
                        
                      }}
                    >
                      <div className="row">
                  
                      <div className="col">
                          <li style={{ padding: '8px 12px' }}>Sukienki</li>
                          <li style={{ padding: '8px 12px' }}>Kurtki i plaszcze</li>
                          <li style={{ padding: '8px 12px' }}>T-shirty</li>
                        </div>
                        <div className="col">
                          <li style={{ padding: '8px 12px' }}>Spodnie</li>
                          <li style={{ padding: '8px 12px' }}>Szorty</li>
                          <li style={{ padding: '8px 12px' }}>Buty</li>
                        </div>
                        <div className="col">
                          <li style={{ padding: '8px 12px' }}>Marynarki</li>
                          <li style={{ padding: '8px 12px' }}>Czapki</li>
                          <li style={{ padding: '8px 12px' }}>Kapelusze</li>
                        </div>
                        <div className="col">
                          <li style={{ padding: '8px 12px' }}>Stroje kapielowe</li>
                          <li style={{ padding: '8px 12px' }}>Koszule</li>
                          <li style={{ padding: '8px 12px' }}>Swetry</li>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </a>
              <a href="" style={{
                marginRight: '20px'
              }}>
                <span>Akcesoria</span>
            </a>
            <a href="" style={{
              marginRight: '20px'
            }}>
              <span>Wyprzedaz</span>
            </a>
            </div>
          </div>
          
        );
      }

      const showProductsMenu = () => {
        return active ? (
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
        ) : null;
      };

      const adminStartItems = () => {
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
                <span onClick={(e)=>{
                navigation('/products/list')
                }} >Produkty</span>
              </a>
              <a
                href=""
                style={{
                  marginRight: "20px",
                }}
              >
                <span>Sprzedaż</span>
              </a>
              <a
                href=""
                style={{
                  marginRight: "20px",
                }}
              >
                <span>Promocje</span>
              </a>
              <a
                href=""
                style={{
                  marginRight: "20px",
                }}
              >
                <span>Klienci</span>
              </a>
              <a
                href=""
                style={{
                  marginRight: "20px",
                }}
              >
                <span>Konfiguracja</span>
              </a>
            </div>
          </div>
        );
      };



    const items = userRole && userRole[0] === "ADMIN" ? adminItems : regularUserItems;
    const startItems = userRole && userRole[0] === "ADMIN" ? adminStartItems : regularUserStartItems;
    return (
      <Menubar model={items} start={startItems} className="custom-menubar" />
    );
  };
  
  export default MenuBarContainer;