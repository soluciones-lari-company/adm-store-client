import { Form } from "react-bootstrap";
import { IInputsValChange } from "../../Interfaces/IInputsValChange";

const SimpleFilter = (props: {
    pattern: IInputsValChange<string, HTMLInputElement>,
    placeholder: string
}) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Control size="sm" type="text" placeholder={props.placeholder} value={props.pattern.value} onChange={props.pattern.onChangeEvt} />
            </Form.Group>
        </>
    )
}

export default SimpleFilter;