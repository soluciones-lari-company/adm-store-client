import React from "react";
import { Routes, Route } from "react-router-dom";
import SaleMenuApp from "../views/sales/SaleMenuApp";

const Home = () => {
    return <h1>Home</h1>
}

const Loading = () => <p>Loading ...</p>;

const GeneralRoutes = () => {
    return (
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/*' element={<SaleMenuApp></SaleMenuApp>} />
        </Routes>
      </React.Suspense>
    );
  }
  export default GeneralRoutes;