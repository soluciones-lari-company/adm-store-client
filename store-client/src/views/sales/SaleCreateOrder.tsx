import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SalesOrderDetailsFullModel } from "../../api/apiClientBase";
import CreateOrder from "../../Components/Sales/CreateOrder";
import TitleCardC from "../../Components/Shared/TitleCardC";

const SaleCreateOrder = () =>{
    const navigate = useNavigate();
    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <TitleCardC>Detalle de venta</TitleCardC>
                    <CreateOrder onSave={function (newOrder: SalesOrderDetailsFullModel): void {
                        navigate(`../order/${newOrder.header?.docNum}/edit-lines`)
                    }} onCancel={function (): void {
                        throw new Error("Function not implemented.");
                    }}></CreateOrder>

                </Card.Body>
            </Card>
        </>
    )
}

export default SaleCreateOrder