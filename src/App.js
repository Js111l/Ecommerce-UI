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
import CartContainer from './containers/CartContainer';
import PaymentContainer from './containers/payment/PaymentContainer';
import CheckoutContainer from './containers/CheckoutContainer';



function App() {
  const [loading, setLoading] = useState(false);
  const [rendered, setMenuBar] = useState(true);
  const toast = useRef(null);

  const showMessage = (type, message, summary, sticky) => {
    toast.current.show({ severity: type, summary: summary, detail: message, life: 3000, sticky: sticky });
  }

  return (
    <Router>
      <BlockUI blocked={loading}
        fullScreen={true}
      >
        {rendered ?
        <MenuBarContainer>
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
          <Route path='/category/list'
            element={
              <PaymentContainer
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
          <Route path='/payment'
            element={
              <PaymentContainer
                loading={loading}
                setLoading={setLoading}
                showMessage={showMessage}
                setMenuBar={setMenuBar}
              />}
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
  );
}

export default App;
