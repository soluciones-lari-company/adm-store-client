import { useState } from "react"
import { Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { SalesOrderDetailsFullModel, Client } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"

const EditOrderBtnCancel = (props:{
    docNum: number,
    disabled: boolean,
    orderStatus:string,
    onComplete?():void,
    orderDetails?: SalesOrderDetailsFullModel
})=>{
    const client = new Client()
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)

    const onMovetoComplete = () => {
        Swal.fire({
            title: `Deseas cancelar esta venta?`,
            text: ``,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
        }).then((result) => {
            if (result.isConfirmed) {
                setReqStatus(REQUEST_STATUS.LOADING)
                client.cancelOrder(props.docNum).then((response) => {
                    setReqStatus(REQUEST_STATUS.SUCCESS)
                    if(props.onComplete != undefined){
                        props.onComplete()
                    }
                }).catch((error) => {
                    if(error.status){
                        if(error.status === 404){
                            //TODO: 404 order not found
                        }
                    }
                    setReqStatus(REQUEST_STATUS.FAILURE)
                }).finally(() =>{
                    
                })
            }
        })
       
    }

    if(props.orderStatus === 'C'){
        return (<></>)
    }

    return(
        <>
            <Button variant="primary" className="w-100" title="eliminar orden" onClick={onMovetoComplete} disabled={props.disabled || reqStatus === REQUEST_STATUS.LOADING} >
                Cancelar
            </Button>
        </>
    )
}

export default EditOrderBtnCancel;