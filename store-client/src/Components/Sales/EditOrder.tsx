import { useState, useEffect } from "react"
import { Badge, ButtonGroup } from "react-bootstrap"
import { Client, SalesOrderDetailsFullModel, SalesOrderItemDetailsModel } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import { FormatDate } from "../Helpers/Converters"
import { FormatCurrency } from "../Helpers/FormatCurrency"
import LoadingBanner from "../Shared/LoadingBanner"
import EditOrderBtnCancel from "./EditOrderBtnCancel"
import EditOrderBtnComplete from "./EditOrderBtnComplete"
import EditOrderLineBtnDelete from "./EditOrderLineBtnDelete"
import OrderAddLine from "./OrderAddLine"
import OrderItemList from "./OrderItemList"

const EditOrder = (props: {
    docNum: number,
}) => {
    const client = new Client()
    const [orderDetails, setOrderDetails] = useState<SalesOrderDetailsFullModel>(new SalesOrderDetailsFullModel())
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)

    const onLoadLocally = () => {
        setReqStatus(REQUEST_STATUS.LOADING)
        client.detailsOrder(props.docNum).then((response) => {
            setOrderDetails(response)
            setReqStatus(REQUEST_STATUS.SUCCESS)
        }).catch((error) => {
            setReqStatus(REQUEST_STATUS.FAILURE)
        })
    }
    useEffect(() => {
        onLoadLocally()
    }, [props.docNum])

    if (reqStatus === REQUEST_STATUS.LOADING) {
        return <LoadingBanner title="Buscando informacion" message="Por favor espere mientras es cargada la informacion"></LoadingBanner>
    }

    return (
        <>
            <div className="separator separator-dashed my-3"></div>
            <div className="pb-5 fs-6">
                <div className="fw-bold mt-5">Folio</div>
                <div className="text-gray-600">{`O${String(orderDetails.header?.docNum).padStart(4, "0")}`} <Badge pill bg="primary">{orderDetails.header?.docStatus}</Badge></div>

                <div className="fw-bold mt-5">Cliente</div>
                <div className="text-gray-600">{`C#${String(orderDetails.header?.docNum).padStart(4, "0")}`} - {`${orderDetails.header?.customer?.fullName}`}</div>

                <div className="fw-bold mt-5">Fecha</div>
                <div className="text-gray-600">{FormatDate(orderDetails.header?.docDate, "LL")}</div>

                <div className="fw-bold mt-5">Total</div>
                <div className="text-gray-600"><FormatCurrency total={orderDetails.header?.docTotal}></FormatCurrency></div>

                <div className="fw-bold mt-5">Pago</div>
                <div className="text-gray-600">{
                    orderDetails.header?.methodPayment === '' || orderDetails.header?.methodPayment === "XXX" ?
                        "No se ha definido aun la forma de pago" : ""
                }</div>
            </div>
            <div className="separator separator-dashed my-3"></div>
            <OrderAddLine
                orderStatus={orderDetails.header?.docStatus === undefined ? '' : orderDetails.header?.docStatus}
                docNum={props.docNum}
                onAddLine={function (newLine: SalesOrderItemDetailsModel): void {
                    setOrderDetails(orderDetails)
                    onLoadLocally()
                }}
            ></OrderAddLine>
            <div className="separator separator-dashed my-3"></div>
            <h3> Articulos: </h3>
            <div className="separator separator-dashed my-3"></div>
            <OrderItemList 
                docNum={props.docNum} 
                docStatus={orderDetails.header?.docStatus === undefined ? '' : orderDetails.header?.docStatus}
                lines={orderDetails.lines === undefined ? [] : orderDetails.lines}
                btnDeleteAction={onLoadLocally}
            ></OrderItemList>
            <div className="separator separator-dashed my-3"></div>
            <ButtonGroup className="w-100">
                <EditOrderBtnCancel
                    orderStatus={orderDetails.header?.docStatus === undefined ? '' : orderDetails.header?.docStatus}
                    docNum={props.docNum}
                    disabled={false}
                    onComplete={() => { onLoadLocally() }}
                ></EditOrderBtnCancel>
                <EditOrderBtnComplete
                    orderStatus={orderDetails.header?.docStatus === undefined ? '' : orderDetails.header?.docStatus}
                    docNum={props.docNum}
                    disabled={orderDetails.lines === undefined ? true : orderDetails.lines?.length <= 0}
                    onComplete={() => { onLoadLocally() }}
                ></EditOrderBtnComplete>
            </ButtonGroup>
        </>
    )

}

export default EditOrder;