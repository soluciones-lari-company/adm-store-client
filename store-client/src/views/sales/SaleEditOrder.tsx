import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditOrder from "../../Components/Sales/EditOrder";
import TitleCardC from "../../Components/Shared/TitleCardC";

const SaleEditOrder = () =>{
    const { docNum } = useParams()

    return (
       <Card className="mt-3">
            <Card.Body>
                <TitleCardC>Agregar articulos</TitleCardC>
                <EditOrder docNum={parseInt(docNum === undefined || docNum === '' ? '0' : docNum)}></EditOrder>
            </Card.Body>
        </Card>
    )
}

export default SaleEditOrder;