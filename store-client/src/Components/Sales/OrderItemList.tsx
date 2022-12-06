import { SalesOrderItemDetailsModel } from "../../api/apiClientBase";
import { FormatCurrency } from "../Helpers/FormatCurrency";
import EditOrderLineBtnDelete from "./EditOrderLineBtnDelete";
import * as iconsUi from 'react-icons/fa';

const OrderItemList = (props: {
    lines: SalesOrderItemDetailsModel[],
    docStatus: string|undefined,
    docNum: number,
    btnDeleteAction?(): void
}) =>{
    if(props.lines.length === 0){
        return (
            <>
                <div className="alert alert-dismissible bg-light-primary d-flex flex-column flex-sm-row p-5 mb-10">
                    <span className="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
                        <iconsUi.FaNotesMedical></iconsUi.FaNotesMedical>
                    </span>

                    <div className="d-flex flex-column pe-0 pe-sm-10">
                        <h4 className="fw-semibold">Sin Articulos</h4>
                        <span>Estimado usuario esta orden de venta no cuenta con articulos, por favor registra alguno para poder continuar con la venta</span>
                    </div>
                </div>
            </>
        )
    }
    return(
        <>
            {
                props.lines.map((item: SalesOrderItemDetailsModel) => (
                    <>
                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-stack flex-row-fluid d-grid gap-2">
                                <div className="me-5">
                                    <span className="text-gray-800 fw-bold text-hover-primary fs-6">{item.itemCode}</span>
                                    <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">{`${item.comments}`}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className=" badge badge-light-success fs-base"><FormatCurrency total={item.total}></FormatCurrency></span>
                                    <div className="m-0">
                                        <EditOrderLineBtnDelete
                                            orderStatus={props.docStatus}
                                            docNum={props.docNum}
                                            onComplete={props.btnDeleteAction} 
                                            itemCode={item.itemCode}
                                        ></EditOrderLineBtnDelete>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="separator separator-dashed my-3"></div>
                    </>
                ))
            }
        </>
    )
}

export default OrderItemList