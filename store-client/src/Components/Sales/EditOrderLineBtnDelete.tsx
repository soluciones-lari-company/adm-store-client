import { useState } from "react"
import { Client } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import * as iconsUi from 'react-icons/fa';

const EditOrderLineBtnDelete = (props:{
    docNum: number,
    itemCode: string| undefined,
    orderStatus:string| undefined,
    onComplete?():void,
}) =>{
    const client = new Client()
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    
    const onDelete = () =>{
        if(props.itemCode !== undefined){
            setReqStatus(REQUEST_STATUS.LOADING)
            client.deletelineOrder(props.docNum, props.itemCode).then((response) => {
                if(props.onComplete != undefined){
                    props.onComplete()
                }
                setReqStatus(REQUEST_STATUS.SUCCESS)
            }).catch((error) => {
                setReqStatus(REQUEST_STATUS.FAILURE)
            })
        }
    }

    if(props.orderStatus != 'A' ||props.itemCode === undefined){
        return (<></>)
    }
    return (

        <span className="badge badge-light-danger fs-base" onClick={onDelete}>
            {
                reqStatus === REQUEST_STATUS.LOADING
                    ?
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    :
                    <iconsUi.FaTrash></iconsUi.FaTrash>
            }
        </span>
    )
}

export default EditOrderLineBtnDelete;