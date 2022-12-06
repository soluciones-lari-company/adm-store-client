import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { ICustomerCreateModel, CustomerDetailsModel, Client, CustomerCreateModel } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import TitleCardC from "../Shared/TitleCardC"

const defaultCustomer: ICustomerCreateModel = {
    fullName: '',
    phoneNumber: '',
    email: '',
    group1: 0,
    group2: 0,
    group3: 0,
}
const CreateCustomer = (
    props: {
        onSave(response: CustomerDetailsModel): void | undefined,
        onCancel(): void | undefined,
        mode: string
    }
) => {

    const [newCustomer, setNewCustomer] = useState<ICustomerCreateModel>(defaultCustomer)
    const [customerRegistered, setCustomerRegistered] = useState<CustomerDetailsModel>(new CustomerDetailsModel())
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const client = new Client();

    const onSave = () => {
        setReqStatus(REQUEST_STATUS.LOADING)
        client.registerCustomer(new CustomerCreateModel(newCustomer)).then((response) => {
            props.onSave(response)
            setCustomerRegistered(response)
            setNewCustomer(defaultCustomer)
            setReqStatus(REQUEST_STATUS.SUCCESS)
        }).catch((error) => {
            setReqStatus(REQUEST_STATUS.FAILURE)
        })
    }

    const onReset = () => {
        setReqStatus(REQUEST_STATUS.NEW_PROCESS)
        setNewCustomer(defaultCustomer)
    }
    const onCancel = () => {
        onReset()
        props.onCancel()
    }

    if (reqStatus === REQUEST_STATUS.SUCCESS) {
        return (
            <div className="w-100 text-center">
                <div className="text-center px-4 py-15">
                    <img src="https://cdn-icons-png.flaticon.com/512/786/786405.png?w=826&t=st=1669324329~exp=1669324929~hmac=6f38a57a8e6915694ef443619fad1be94bdc89840fa44b0ed86e35b922399c96" alt="" className="w-25" />
                </div>
                <h1 className="fw-bold text-dark mb-3 mt-4">Cliente registrado</h1>
                <div className="text-muted fw-semibold fs-3">Un nuevo cliente ha sido registrado a tu cartera de clientes</div>
                {
                    props.mode === 'ADMIN' ? <>
                        <Button variant="outline-primary" type="reset" className="me-3 mt-5" onClick={onReset}>
                            Registrar otro
                        </Button>
                        <Button variant="primary" type="reset" className="btn btn-primary mt-5" onClick={onReset}>
                            Registrar orden
                        </Button>
                    </> : <></>
                }

            </div>
        )
    }

    return (
        <>
            <Form>
                <div className="card-px text-left mt-4 mb-4">
                    <TitleCardC>Registrar nuevo cliente</TitleCardC>
                    <p className="text-gray-400 ">Por favor completa la siguiente informacion
                    </p>
                </div>
                <hr></hr>
                <Form.Group className="mb-3" controlId="customer_name">
                    <Form.Label>Nombre(s)</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del cliente" value={newCustomer.fullName} onChange={(event) => { setNewCustomer({ ...newCustomer, ['fullName']: event.target.value }) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="customer_firtname">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="text" placeholder="Telefono" value={newCustomer.phoneNumber} onChange={(event) => { setNewCustomer({ ...newCustomer, ['phoneNumber']: event.target.value }) }} />
                </Form.Group>
                <hr></hr>
                <div className="d-flex justify-content-end pt-7 mb-5">
                    <Button variant="default" type="reset" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="button" onClick={onSave} disabled={reqStatus === REQUEST_STATUS.LOADING || newCustomer.fullName?.trim() === '' || newCustomer.phoneNumber?.trim() === ''}>
                        Guardar {reqStatus === REQUEST_STATUS.LOADING ? <span className="spinner-border spinner-border-sm align-middle ms-2"></span> : <></>}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default CreateCustomer;