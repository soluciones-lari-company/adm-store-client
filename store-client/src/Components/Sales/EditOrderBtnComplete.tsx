import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { SalesOrderDetailsFullModel, Client } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import * as iconsUi from 'react-icons/fa';

const EditOrderBtnComplete = (props: {
    docNum: number,
    disabled: boolean,
    orderStatus: string,
    onComplete?(): void,
    orderDetails?: SalesOrderDetailsFullModel
}) => {
    const client = new Client()
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onMovetoComplete = () => {
        setReqStatus(REQUEST_STATUS.LOADING)
        client.completeOrder(props.docNum, paymentMethod).then((response) => {
            setReqStatus(REQUEST_STATUS.SUCCESS)
            if (props.onComplete != undefined) {
                props.onComplete()
            }
        }).catch((error) => {
            if (error.status) {
                if (error.status === 404) {
                    //TODO: 404 order not found
                }else if (error.status === 400) {
                    //TODO: 404 order not found
                }
            }
            setReqStatus(REQUEST_STATUS.FAILURE)
        }).finally(() => {

        })
    }
    if (props.orderStatus === 'F' || props.orderStatus === 'C') {
        return (<></>)
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <label className="d-flex align-items-center fs-5 fw-semibold mb-4">
                        <span className="required">Tipo de pago:</span>
                    </label>
                    <div className="fv-row">
                        <label className="d-flex flex-stack mb-5 cursor-pointer">
                            <span className="d-flex align-items-center me-2">
                                <span className="symbol symbol-50px me-6">
                                    <span className="symbol-label bg-light-primary">
                                        <span className="svg-icon svg-icon-1 svg-icon-primary">
                                            <iconsUi.FaCheckDouble></iconsUi.FaCheckDouble>
                                        </span>
                                    </span>
                                </span>
                                <span className="d-flex flex-column">
                                    <span className="fw-bold fs-6">Unico pago</span>
                                    <span className="fs-7 text-muted">Se generara un pago unico para esta compra</span>
                                </span>
                            </span>
                            <span className="form-check form-check-custom form-check-solid">
                                <input className="form-check-input" type="radio" name="category" value="PUE" onChange={(event) =>{ setPaymentMethod(event.target.value) }}  />
                            </span>
                        </label>
                    </div>
                    <div className="fv-row">
                        <label className="d-flex flex-stack mb-5 cursor-pointer">
                            <span className="d-flex align-items-center me-2">
                                <span className="symbol symbol-50px me-6">
                                    <span className="symbol-label bg-light-success">
                                        <span className="svg-icon svg-icon-1 svg-icon-success">
                                           <iconsUi.FaAdjust></iconsUi.FaAdjust>
                                        </span>
                                    </span>
                                </span>
                                <span className="d-flex flex-column">
                                    <span className="fw-bold fs-6">Parcialidades</span>
                                    <span className="fs-7 text-muted">Se ejecutara una compra a su cuenta, la cual puede ser </span>
                                </span>
                            </span>
                            <span className="form-check form-check-custom form-check-solid">
                                <input className="form-check-input" type="radio" name="category" value="PPD" onChange={(event) =>{ setPaymentMethod(event.target.value) }} />
                            </span>
                        </label>
                    </div>
                    <Button variant="primary" className="w-100" title="completar orden" onClick={onMovetoComplete} disabled={props.disabled || reqStatus === REQUEST_STATUS.LOADING || paymentMethod === ''} >
                        Completar!
                    </Button>
                </Modal.Body>
            </Modal>
            <Button variant="primary" className="w-100" title="Agregar nueva linea" onClick={handleShow} disabled={props.disabled || reqStatus === REQUEST_STATUS.LOADING} >
                {
                    reqStatus === REQUEST_STATUS.LOADING
                        ?
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        :
                        <></>
                }
                Completar venta
            </Button>
        </>

    )
}

export default EditOrderBtnComplete;