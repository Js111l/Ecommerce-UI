import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const MenuBarContainer = (props) => {
    const navigation = useNavigate();
    const menuBarOnClickFunction = (path) => {
        navigation('/'+path);
      }

      const items = [
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
                command: () => menuBarOnClickFunction('login'),
            },
            {
                label: 'Zarejestruj sie',
              command: () => menuBarOnClickFunction('register'),
            },
          ]
        },
        {
          icon: 'pi pi-fw pi-shopping-cart',
          command: () => menuBarOnClickFunction('checkout')
        },
      ];
  
    return (
  <Menubar model={items}/>
    );
  };
  
  export default MenuBarContainer;