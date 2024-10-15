import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useEffect, useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import Services from './components/Services/Services';

import CartProvider from './components/store/s.jsx';
import LandingPages from './components/LandingPages.jsx';

import Order from './components/Order/Order.jsx';
import PaymentForm from './components/FormServices/PaymentForm.jsx';
import ServicesFa from './components/Favourite/ServicesFa.jsx';


function App() {
  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <CartProvider>
    <Router location={location} navigator={reactNavigator}>
      
      <Routes>
        <Route path={'/'} element={
          <>
          <LandingPages />

          <Services />
          </>
          }/>




        <Route path={'/order/form'} element={<PaymentForm />}/>
        <Route path={'/order'} element={<Order />}/>
        <Route path={'/login'}  element={<ServicesFa />}/>
        <Route path={'*'} element={<Navigate href={'/'}/>}/>
      </Routes>
    </Router>
  </CartProvider>
  );
}
export default App