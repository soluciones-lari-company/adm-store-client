import { useState } from "react"
import { Form, Alert, Button, Modal } from "react-bootstrap"
import { ISalesOrderCreateModel, SalesOrderDetailsModel, Client, CustomerDetailsModel, SalesOrderCreateModel } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import { GetActualDate } from "../Helpers/Converters"
import TitleCardC from "../Shared/TitleCardC"
import CreateCustomer from "./CreateCustomer"
import CustomerDetails from "./CustomerDetails"
import CustomerList from "./CustomerList"

const orderDefault: ISalesOrderCreateModel = {
    customer: 0,
    docDate: GetActualDate("YYYY-MM-DD"),
    docTotal: 0,
    docStatus: '',
    paymentMethod:'XXX'
}

const CreateOrder = (props: {
    onSave(newOrder: SalesOrderDetailsModel): void,
    onCancel(): void
}) => {
    const [newOrder, setNewOrder] = useState<ISalesOrderCreateModel>(orderDefault)
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const client = new Client();

    const [showNewCustomer, setShowNewCustomer] = useState(false);
    const [showListCustomer, setShowListCustomer] = useState(false);


    const onSelectCustomer = (newCustomer: CustomerDetailsModel) => {
        setNewOrder({ ...newOrder, ['customer']: newCustomer.id })
        setShowNewCustomer(false);
        setShowListCustomer(false);
    }

    const onCancel = () => {
        setReqStatus(REQUEST_STATUS.NEW_PROCESS)
        setNewOrder(orderDefault)
    }
    const onSave = () => {
        setReqStatus(REQUEST_STATUS.LOADING)
        setNewOrder({ ...newOrder, ['paymentMethod']: 'XXX' })
        client.registerOrder(new SalesOrderCreateModel(newOrder)).then((response) => {
            props.onSave(response)
            // setCustomerRegistered(response)
            // setNewCustomer(defaultCustomer)C0nnect+1#!%
            setReqStatus(REQUEST_STATUS.SUCCESS)
        }).catch((error) => {
            setReqStatus(REQUEST_STATUS.FAILURE)
        })
    }

    return (
        <>

            <Form.Group className="mb-3 mt-4">
                <Form.Label htmlFor="f_order_customer">Cliente</Form.Label>
                {
                    newOrder.customer === 0 ?
                        <>
                            <Alert variant="warning" className="border-start border-warning">
                                Ningun cliente ha sido seleccionado
                            </Alert>
                        </>
                        :
                        <CustomerDetails customerNumber={newOrder.customer}></CustomerDetails>
                }

                <div className="">
                    <Button variant="link" className="btn btn-icon btn-active-light-primary me-1" onClick={() => { setShowNewCustomer(true) }}>Nuevo</Button>
                    <Button variant="link" className="btn btn-icon btn-active-light-primary me-1" onClick={() => { setShowListCustomer(true) }}>Lista </Button>
                </div>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Fecha de venta</Form.Label>
                <Form.Control size="sm" type="date" placeholder="Fecha de la venta" value={newOrder.docDate} onChange={(event) => { setNewOrder({ ...newOrder, ['docDate']: event.target.value }) }} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="f_order_status">Estatus de la venta</Form.Label>
                <Form.Select size="sm" id="f_order_status" value={newOrder.docStatus} onChange={(event) => { setNewOrder({ ...newOrder, ['docStatus']: event.target.value }) }} >
                    <option>Selecciona un estatus</option>
                    <option value={'A'}>Activa</option>
                </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end pt-7 mb-5">
                <Button variant="default" type="reset" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="primary" type="button" onClick={onSave} disabled={newOrder.customer === 0 || newOrder.docStatus === ''}>
                    Guardar {reqStatus === REQUEST_STATUS.LOADING ? <span className="spinner-border spinner-border-sm align-middle ms-2"></span> : <></>}
                </Button>
            </div>

            <Modal show={showNewCustomer} onHide={() => { setShowNewCustomer(false) }}>
                <Modal.Body><CreateCustomer onCancel={() => { setShowNewCustomer(false) }} onSave={onSelectCustomer} mode=""></CreateCustomer></Modal.Body>
            </Modal>
            <Modal show={showListCustomer} onHide={() => { setShowListCustomer(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title><TitleCardC>Lista de clientes</TitleCardC></Modal.Title>
                </Modal.Header>
                <Modal.Body><CustomerList onSelectCustomer={onSelectCustomer} listCustomers={[]} loadLocally={true} showAdminButtons={false}></CustomerList></Modal.Body>
            </Modal>
        </>
    )
}

export default CreateOrder;