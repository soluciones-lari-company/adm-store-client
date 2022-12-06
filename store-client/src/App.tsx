import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarMenu from './Components/Shared/NavBarMenu';
import GeneralRoutes from './Routes/GeneralRoutes';

function App() {
  return (
    <>
      <NavBarMenu></NavBarMenu>
      <GeneralRoutes></GeneralRoutes>
    </>
  );
}

export default App;
