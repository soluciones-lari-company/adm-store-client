import { useState } from "react"
import { InputGroup, Form, Button, Modal, Badge } from "react-bootstrap"
import Swal from "sweetalert2"
import { SalesOrderItemDetailsModel, Client, PurchaseOrderItemDetailsModel, ISalesOrderItemCreateModel, SalesOrderItemCreateModel } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import { validatePrice, validateganancia, calculateproceGanancia } from "../Helpers/Converters"
import * as iconsUi from 'react-icons/fa';
import { FormatCurrency } from "../Helpers/FormatCurrency"

const OrderAddLine = (props: {
    docNum: number,
    orderStatus:string,
    onAddLine(newLine: SalesOrderItemDetailsModel): void
}) => {
    const client = new Client()
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const [reqStatusAdd, setReqStatusAdd] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const [showNewLine, setShowNewLine] = useState(false);
    const [itemDetails, setItemDetails] = useState<PurchaseOrderItemDetailsModel | null>(null);
    // const [itemCode, setItemCode] = useState<string>('9MO87')

    const [newLine, setNewline] = useState<ISalesOrderItemCreateModel>({
        docNum: props.docNum,
        itemCode: "9MO87",
        unitPrice: 0,
        quantity: 1,
        total: 0,
        lineNum: 0,
        reference1: "",
        reference2: "",
        comments: "",
    })

    const onAddLine = () => {
        setReqStatusAdd(REQUEST_STATUS.LOADING)
        client.addNewlineOrder(props.docNum, new SalesOrderItemCreateModel(newLine)).then((response) => {
            props.onAddLine(response)
            setReqStatusAdd(REQUEST_STATUS.SUCCESS)
            setShowNewLine(false)
        }).catch((error) => {
            setReqStatusAdd(REQUEST_STATUS.FAILURE)
        })
    }

    const onSearch = () => {
        if(newLine.itemCode !== undefined){
            setReqStatus(REQUEST_STATUS.LOADING)
            client.itemDetails(newLine.itemCode).then((response) => {
                setItemDetails(response)
                console.log(validatePrice(response.unitPrice, response.factorRevenue))
                setNewline({ ...newLine, ['total']: response.publicPrice })
                setNewline({ ...newLine, ['comments']: response.descriptionItem })
                // setNewline({ ...newLine, ['unitPrice']: validatePrice(response.unitPrice, response.factorRevenue) })
                setShowNewLine(true)
                setReqStatus(REQUEST_STATUS.SUCCESS)
                
            }).catch((error) => {
                if(error.status){
                    if(error.status === 404){
                        Swal.fire("Articulo no encontrado", `El articulo: "${newLine.itemCode}" no fue encontrado`, 'error')
                    }
                }
                setReqStatus(REQUEST_STATUS.FAILURE)
            }).finally(() =>{
                
            })
        }
    }
    
    if(props.orderStatus !== 'A'){
        return (<></>)
    }

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Ingresa aqui tu codigo"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={newLine.itemCode}
                    onChange={(event) => { setNewline({ ...newLine, ['itemCode']: event.target.value }) }}
                />
                <Button variant="primary" id="button-addon2" title="Agregar nueva linea" onClick={onSearch}>
                    {
                        reqStatus === REQUEST_STATUS.LOADING
                            ?
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            :
                            <iconsUi.FaPlus className="text-white"></iconsUi.FaPlus>
                    }
                </Button>
            </InputGroup>
            <Modal
                show={showNewLine}
                onHide={() => { setShowNewLine(false) }}
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Badge pill bg="primary">{newLine.itemCode}</Badge>
                    {
                        itemDetails?.isSold === true ? (
                            <div className="alert alert-warning mt-2" role="alert">
                                Este producto ya ha sido vendido o se encuentra en alguna venta activa
                            </div>
                        ) : <></>
                    }
                    <div className="separator separator-dashed my-3"></div>
                    {itemDetails?.descriptionItem}
                    <div className="separator separator-dashed my-3"></div>
                    Precio compra: <FormatCurrency total={itemDetails?.total}></FormatCurrency>
                    <div className="separator separator-dashed my-3"></div>
                    Precio venta: <FormatCurrency total={itemDetails?.publicPrice}></FormatCurrency>
                    <div className="separator separator-dashed my-3"></div>
                    Ganancia: <FormatCurrency total={validateganancia(newLine.total, itemDetails?.total)}></FormatCurrency>
                    <div className="separator separator-dashed my-3"></div>
                    Porcentaje gananacia: {calculateproceGanancia(itemDetails?.total, newLine.total)}
                    <div className="separator separator-dashed my-3"></div>
                    
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Ingresa aqui tu codigo"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            type="number"
                            value={newLine.total}
                            disabled={itemDetails?.isSold}
                            onChange={(event) => { setNewline({ ...newLine, ['total']: parseInt(event.target.value) }) }}
                        />
                        <Button variant="primary" id="button-addon2" title="Agregar nueva linea" onClick={onAddLine} disabled={itemDetails?.isSold || (newLine.total === undefined ? 0 : newLine.total) <= 0}>
                            {
                                reqStatusAdd === REQUEST_STATUS.LOADING
                                    ?
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    :
                                    <iconsUi.FaPlus className="text-white"></iconsUi.FaPlus>
                            }
                            Agregar
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderAddLine;