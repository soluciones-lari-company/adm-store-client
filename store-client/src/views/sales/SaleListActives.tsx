import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Client, SalesOrderDetailsModel } from "../../api/apiClientBase"
import { FormatCurrency } from "../../Components/Helpers/FormatCurrency"
import SimpleFilter from "../../Components/Sales/SimpleFilter"
import LoadingBanner from "../../Components/Shared/LoadingBanner"
import TitleCardC from "../../Components/Shared/TitleCardC"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"

const SaleListActives = (props: {
    typeList: string
}) =>{
    const client =  new Client()
    const [listOrders, setListOrders] = useState<SalesOrderDetailsModel[]>([])
    const [filterPattern, setFilterPattern] = useState<string>('')
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)

    const onLoadListLocally = () => {
        if(props.typeList === "orders-actives"){
            setReqStatus(REQUEST_STATUS.LOADING)
            client.listOrdersActive().then((response) => {
                setListOrders(response)
                setReqStatus(REQUEST_STATUS.SUCCESS)
            }).catch((error) => {
                setReqStatus(REQUEST_STATUS.FAILURE)
            })
        }
    }
    
    useEffect(() => {
        onLoadListLocally()
    }, [])

    if(reqStatus === REQUEST_STATUS.LOADING){
        return <LoadingBanner title="Buscando ordenes" message="Por favor espere mientras es cargada la lista"></LoadingBanner>
    }

    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <TitleCardC>Lista de ordenes activas</TitleCardC>
                    <div className="separator separator-dashed my-3"></div>
                    <SimpleFilter placeholder="Busqueda de ordenes" pattern={{ value: filterPattern, onChangeEvt: (event) => { setFilterPattern(event.target.value) } }}></SimpleFilter>
                    {
                        listOrders.filter((salesOrder: SalesOrderDetailsModel) => { 
                            if (salesOrder.customer?.fullName?.toLowerCase().includes(filterPattern.toLowerCase()))
                                return salesOrder
                        }).map((salesOrder: SalesOrderDetailsModel) => (
                            <>
                            <div className="d-flex flex-stack">
                                    <div className="d-flex flex-stack flex-row-fluid d-grid gap-2">
                                        <div className="me-5">
                                            <Link to={`../order/${salesOrder.docNum}/edit-lines`} className="text-gray-800 fw-bold text-hover-primary fs-6">{`O${String(salesOrder.docNum).padStart(4,"0")}`}</Link>
                                            <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">{`${salesOrder.customer?.fullName}`}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="text-gray-800 fw-bold fs-6 me-3 d-block"></span>
                                            <div className="m-0">
                                                <span className="badge badge-light-success fs-base"><FormatCurrency total={salesOrder.docTotal}></FormatCurrency></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-3"></div>
                            </>
                        ))
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default SaleListActives