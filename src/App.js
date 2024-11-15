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
import CategoryContainer from './containers/ProductListContainer'
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
import NewsLetterComponent from './components/NewsLetterComponent';

function App() {
  const [loading, setLoading] = useState(false);
  const [renderMenuBar, setMenuBar] = useState(true);
  const toast = useRef(null);
  const authService = new AuthService()
 
  const [footerHoover, setFooterHoover] = useState([])
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [showFooter, setShowFooter]=useState(true);

  const showMessage = (type, message, summary, sticky) => {
    toast.current.show({ severity: type, summary: summary, detail: message, life: 3000, sticky: sticky });
  }
  const items = [
    "Wymiana i zwroty",
    "Metody płatności",
    "Reklamacje",
    "Karta podarunkowa",
    "Konto klienta",
    "Lista życzeń"
  ];
  const items2 = [
    "Regulamin",
    "Polityka prywatności",
    "Pliki cookies",
    "FAQ"
  ];

  const genderItems = [
    "Kobieta",
    "Mężczyzna",
    "Dziewczynka",
    "Chłopiec"
  ];

  const divider = (
    (
      <hr style={{
        marginTop: '3%',
        marginBottom: '3%'
      }} class="solid">
      </hr>
    )
  )
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
                  setShowNewsletter={setShowNewsletter}
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
                  setShowNewsletter={setShowNewsletter}
              />}
            />
            <Route path='/checkout'
              element={
                <CheckoutContainer
                  loading={loading}
                  setLoading={setLoading} MainPage
                  showMessage={showMessage}
                  setShowNewsletter={setShowNewsletter}
              />}
            />
            <Route path='/payment/:id'
              element={
                <PaymentContainer
                  setShowFooter={setShowFooter}
                  loading={loading}
                  setLoading={setLoading}
                  showMessage={showMessage}
                  setMenuBar={setMenuBar}
                  setShowNewsletter={setShowNewsletter}
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
        )}
        {showNewsletter ? divider : null}
        {showNewsletter ?
          <div className='row' style={{
            display: 'flex',
            justifyContent: 'center',
            maxHeight: "300px",
            marginLeft: '15%',
            marginRight: '15%',
          }}>
            <div className="col"
              style={{
                backgroundColor: "#f9f9f9",
              }}>
              <div className='row' style={{
                // border: '1px solid',
                // borderColor: 'black'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  marginBottom: '1%'
                }}>O nas</span>
              </div>
              <div className='row' style={{
                // border:'1px solid',
                // borderColor: 'black',
                // borderTop:'none'
              }}>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo

                </p>
              </div>
            </div>
            <div className="col">
              <NewsLetterComponent
                setLoading={setLoading}
                showMessage={showMessage}
              />
            </div>
          </div>
          : null}
        {showFooter ?
        <>
        {divider}
        <div style={{
          marginLeft: '15%',
          marginRight: '15%',
        }}>
          <div className='row'>
            <div className='col-md-3'>
              <ul>
                <span>Obsługa klienta</span>
                {items.map((x, index) => {
                  return (
                    <div style={{
                      marginTop: index === 0 ? '5%' : ''
                    }}>
                      <li>
                        <span style={{
                          textDecoration: footerHoover.id === index &&
                            footerHoover.colIndex === 0 &&
                            footerHoover.status
                            ? 'underline' : '',
                          cursor: 'pointer',
                          width: 'fit-content',
                        }}
                          onMouseEnter={(e) => {
                            setFooterHoover({
                              id: index,
                              colIndex: 0,
                              status: true
                            })
                          }}
                          onMouseLeave={(e) => {
                            setFooterHoover({
                              id: index,
                              colIndex: 0,
                              status: false
                            })
                          }}
                        >
                          {x}
                        </span>
                      </li>
                    </div>
                  )
                })}
              </ul>
            </div>
            <div className='col-md-3'>
              <ul>
                <span style={{
                  marginBottom: '3%'
                }}>Informacje</span>
                {items2.map((x, index) => {
                  return (
                    <div style={{
                      marginTop: index === 0 ? '5%' : ''
                    }}>                      <li>
                        <span style={{
                          textDecoration: footerHoover.id === index &&
                            footerHoover.colIndex === 1 &&
                            footerHoover.status
                            ? 'underline' : '',
                          cursor: 'pointer',
                          marginTop: index === 0 ? '5%' : ''
                        }}
                          onMouseEnter={(e) => {
                            setFooterHoover({
                              id: index,
                              colIndex: 1,
                              status: true
                            })
                          }}
                          onMouseLeave={(e) => {
                            setFooterHoover({
                              id: index,
                              colIndex: 1,
                              status: false
                            })
                          }}
                        >
                          {x}
                        </span>
                      </li>
                    </div>
                  )
                })}
              </ul>
            </div>
            <div className='col-md-3'>
              <ul>
                <span>Kupuj</span>
                {genderItems.map((x, index) => {
                  return (
                    <div style={{
                      marginTop: index === 0 ? '5%' : ''
                    }}>                      <li>
                        <span style={{
                          textDecoration: footerHoover.id === index &&
                            footerHoover.colIndex === 2 &&
                            footerHoover.status
                            ? 'underline' : '',
                          cursor: 'pointer',
                          marginTop: index === 0 ? '5%' : ''
                        }}
                          onMouseEnter={(e) => {
                            setFooterHoover({
                              id: index,
                              colIndex: 2,
                              status: true
                            })
                          }}
                          onMouseLeave={(e) => {
                            setFooterHoover({
                              id: index,
                              colIndex: 2,
                              status: false
                            })
                          }}
                        >
                          {x}
                        </span>
                      </li>
                    </div>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
        </>
        : null}
        </BlockUI>
      </Router>
    </AuthProvider>
    // : null
  );
}

export default App;
