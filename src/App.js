import React, { useRef, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginContainer from './containers/LoginContainer';
import MenuBarContainer from './containers/MenuBarContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Messages } from 'primereact/messages';
import { BlockUI } from 'primereact/blockui';
import LoaderContainer from './containers/LoaderContainer';
import { Toast } from 'primereact/toast';
import CategoryContainer from './containers/CategoryContainer';
import AuthService from './services/AuthService';
import AdminPanelContainer from './containers/admin-panel/AdminPanelContainer';
import AdminProductsList from './containers/admin-panel/AdminProductsList';



function App() {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const authService= new AuthService();
  const userRole = authService.getCurrentUserRole();
  const isAdmin = userRole.toUpperCase() === "ADMIN";


  const showMessage = (type, message, summary, sticky) => {
    toast.current.show({ severity: type, summary: summary, detail: message, life: 3000, sticky: sticky});
  }

  return (
    <Router>
      <BlockUI blocked={loading} fullScreen={true}>
        <MenuBarContainer></MenuBarContainer>
        <div>
          <Toast ref={toast} position={"top-center"} />
        </div>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginContainer
                loading={loading}
                setLoading={setLoading}
                showMessage={showMessage}
              />
            }
          />

          {isAdmin ? (
            <>
              <Route
                path="/"
                element={
                  <AdminPanelContainer
                    loading={loading}
                    setLoading={setLoading}
                    showMessage={showMessage}
                  />
                }
              />
              <Route
                path="/products/list"
                element={
                  <AdminProductsList
                    loading={loading}
                    setLoading={setLoading}
                    showMessage={showMessage}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/category/list"
                element={
                  <CategoryContainer
                    loading={loading}
                    setLoading={setLoading}
                    showMessage={showMessage}
                  />
                }
              />
              <Route
                path="/product/details/:id"
                element={
                  <CategoryContainer
                    loading={loading}
                    setLoading={setLoading}
                    showMessage={showMessage}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <MainPage
                    loading={loading}
                    setLoading={setLoading}
                    showMessage={showMessage}
                  />
                }
              />
            </>
          )}
        </Routes>
        {loading && (
          <div
            style={{
              position: "absolute",
              height: "100px",
              width: "100px",
              top: "70%",
              left: "50%",
              marginLeft: "-50px",
              marginTop: "-50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <LoaderContainer />
          </div>
        )}
      </BlockUI>
    </Router>
  );
}

export default App;
