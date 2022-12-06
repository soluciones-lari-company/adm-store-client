import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { CustomerDetailsModel, Client } from "../../api/apiClientBase";
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS";

const CustomerDetails = (props: {
    customerNumber: number | undefined
}) => {
    const [customer, setCustomer] = useState<CustomerDetailsModel | null>(null)
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const client = new Client();

    const onLoadCustomer = () => {
        if (props.customerNumber != undefined) {
            setReqStatus(REQUEST_STATUS.LOADING)
            client.detailsCustomer(props.customerNumber).then((response) => {
                setCustomer(response)
                setReqStatus(REQUEST_STATUS.SUCCESS)
            }).catch((error) => {
                setReqStatus(REQUEST_STATUS.FAILURE)
            })
        }
    }
    useEffect(() => {
        onLoadCustomer()
    }, [props.customerNumber])

    if (reqStatus === REQUEST_STATUS.LOADING) {
        return (
            <><span className="spinner-border spinner-border-sm align-middle ms-2"></span></>
        )
    }
    if (reqStatus === REQUEST_STATUS.FAILURE) {
        return (
            <>
                <Alert variant="danger" className="border-start border-danger">
                    El cliente seleccionado no fue encontrado, por favor intenta seleccionar otro o registrar uno nuevo, gracias!!
                </Alert>
            </>
        )
    }

    if (reqStatus === REQUEST_STATUS.SUCCESS) {
        return (
            <>
                <div className="d-flex border p-3">
                    <img src="https://preview.keenthemes.com/good/assets/media/svg/brand-logos/google-icon.svg" className="w-30px me-6" alt="" />
                    <div className="d-flex flex-column">
                        <a href="#" className="fs-5 text-dark text-hover-primary fw-bold">{`${customer?.fullName}`}</a>
                        <div className="fs-6 fw-semibold text-muted">{customer?.phoneNumber}</div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <></>
    )
}


export default CustomerDetails;