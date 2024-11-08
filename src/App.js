import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginContainer from './containers/LoginContainer';
import MenuBarContainer from './containers/MenuBarContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlockUI } from 'primereact/blockui';
import LoaderContainer from './containers/LoaderContainer';
import { Toast } from 'primereact/toast';
import CartContainer from './containers/CartContainer';
import PaymentContainer from './containers/payment/PaymentContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import ProductDetailsContainer from './containers/ProductDetailsContainer';
import CategoryContainer from './containers/CategoryContainer'
import UserDetailsContainer from './containers/user/UserDetailsContainer';
import UserReturnsContainers from './containers/user/UserReturnsContainers';
import UserReturnFormContainer from './containers/user/UserReturnFormContainer';
import UserOrdersList from './containers/user/UserOrdersList';
import UserAddressesContainer from './containers/user/UserAddressesContainer';
import UserFavoriteProductsContainer from './containers/user/UserFavoriteProductsContainer';
import NotFoundComponent from './containers/NotFoundComponent';
import PaymentConfirmedContainer from './containers/payment/PaymentConfirmedContainer';
import { AuthProvider, useAuth } from './containers/auth/AuthContext';
import AuthService from './services/AuthService';

function App() {
  const [loading, setLoading] = useState(false);
  const [renderMenuBar, setMenuBar] = useState(true);
  const toast = useRef(null);
  const authService = new AuthService()
 

  const showMessage = (type, message, summary, sticky) => {
    toast.current.show({ severity: type, summary: summary, detail: message, life: 3000, sticky: sticky });
  }
  const [sessionChecked, setSessionChecked] = useState(false)
  const hasFetchedData = useRef(false)


  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    const verifySession = async () => {
      setLoading(true)
      try {
        const resp = await authService.isLoggedIn()
        const json = await resp.json()

        if (json.loggedIn) { //jesli user zalogowany
          setLoading(false)
          setSessionChecked(true)
        } else {
          setLoading(false)
          setSessionChecked(true)
        }
      } catch (err) {
        setLoading(false)
      }
    }
    verifySession()
  }, [])


  return (
    // sessionChecked ?
    <AuthProvider
    sessionChecked={sessionChecked}
    >
      <Router>
        <BlockUI blocked={loading}
          fullScreen={true}
        >
          {renderMenuBar ?
            <MenuBarContainer
              setLoading={setLoading}
            >
            </MenuBarContainer>
            : null}
          <div>
            <Toast ref={toast} position={'top-center'} />
          </div>
          <Routes>
            <Route path='/login'
              element={
                <LoginContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                />}
            />
            <Route path='/product/details/:id'
              element={
                <ProductDetailsContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                />}
            />
            <Route path='/category/list'
              element={
                <CategoryContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                />}
            />
            <Route path='/'
              element={
                <MainPage
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                />}
            />
            <Route path='/cart'
              element={
                <CartContainer
                  loading={loading}
                  setLoading={setLoading} MainPage
                  showMessage={showMessage}
                />}
            />
            <Route path='/checkout'
              element={
                <CheckoutContainer
                  loading={loading}
                  setLoading={setLoading} MainPage
                  showMessage={showMessage}
                />}
            />
            <Route path='/payment/:id'
              element={
                <PaymentContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/user/account'
              element={
                <UserDetailsContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/user/returns'
              element={
                <UserReturnsContainers
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/user/return-form'
              element={
                <UserReturnFormContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/user/orders'
              element={
                <UserOrdersList
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/user/addresses'
              element={
                <UserAddressesContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/confirm/:orderId'
              element={
                <PaymentConfirmedContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />
            <Route path='/user/favorites'
              element={
                <UserFavoriteProductsContainer
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                />}
            />


            <Route
              path='*'
              element={
                <NotFoundComponent
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
          </Routes>
          {loading && (
            <div style={{
              position: 'absolute',
              height: '100px',
              width: '100px',
              top: '70%',
              left: '50%',
              marginLeft: '-50px',
              marginTop: '-50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            >
              <LoaderContainer />
            </div>
          )
          }
        </BlockUI>
      </Router>
    </AuthProvider>
    // : null
  );
}

export default App;
