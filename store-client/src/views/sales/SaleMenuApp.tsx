import { Routes, Route, Outlet } from "react-router-dom"
import SalesAppMenuItem from "../../Components/SalesAppMenuItem"
import SaleCreateOrder from "./SaleCreateOrder"
import SaleEditOrder from "./SaleEditOrder"
import SaleListActives from "./SaleListActives"

const SalesAppBody = () => {
    return (
        <>
            <div className="card card-docs flex-row-fluid mb-2">
                <div className="card-body fs-6 py-15 px-10 py-lg-15 px-lg-15 text-gray-700">
                    <div className="px-md-10 pt-md-10 pb-md-5">
                        <div className="text-center mb-20">
                            <h1 className="fs-2tx fw-bold mb-8">Bienvenido a
                                <span className="d-inline-block position-relative ms-2">
                                    <span className="d-inline-block mb-2">Sales-App</span>
                                    <span className="d-inline-block position-absolute h-8px bottom-0 end-0 start-0 bg-success translate rounded"></span>
                                </span></h1>
                            <div className="fw-semibold fs-2 text-gray-500 mb-10">The most advanced
                                <span className="fw-bold text-gray-900">Bootstrap 5</span>&#160;foundation with a solid design system,
                            </div>
                            <div className="menu menu-column menu-rounded menu-state-bg menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary mb-10">
                                <SalesAppMenuItem link={`./order/register-new`} text="Nueva venta"></SalesAppMenuItem>
                                <SalesAppMenuItem link={`./order/list-actives`} text="Ordenes activas"></SalesAppMenuItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
const SaleMenuApp = () => {
    return (
        <div className="container">
            <Routes>
                <Route path='/' element={<SalesAppBody />} />
                <Route path='/order/register-new' element={<SaleCreateOrder />} />
                <Route path='/order/list-actives' element={<SaleListActives typeList={"orders-actives"} />} />
                <Route path='/order/:docNum/edit-lines' element={<SaleEditOrder />} />
            </Routes>
            <Outlet />
        </div>
    )
}

export default SaleMenuApp;