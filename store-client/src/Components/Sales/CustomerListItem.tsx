import * as iconsUi from 'react-icons/fa';
import { CustomerDetailsModel } from '../../api/apiClientBase';

const CustomerListItem = (props: {
    customer: CustomerDetailsModel|undefined,
    onSelect(): void|undefined
}) => {

    

    return (
        <>
            <div className="d-flex border p-3">
                <img src="https://preview.keenthemes.com/good/assets/media/svg/brand-logos/google-icon.svg" className="w-30px me-6" alt="" />
                <div className="d-flex flex-column">
                    <a href="#" className="fs-5 text-dark text-hover-primary fw-bold" onClick={props.onSelect}>{`${props.customer?.fullName}`}</a>
                    <div className="fs-6 fw-semibold text-muted"> <iconsUi.FaPhone></iconsUi.FaPhone> {props.customer?.phoneNumber}</div>
                </div>
            </div>
        </>
    )
}

export default CustomerListItem;