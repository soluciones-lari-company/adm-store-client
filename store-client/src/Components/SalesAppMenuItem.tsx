import { Link } from "react-router-dom";
import * as iconCust from '../Components/Shared/IconCustom'

const SalesAppMenuItem = (props: { 
    text: string, link: string
}) =>{
    return (
        <Link className="menu-item mb-3" to={props.link}>
            <span className="menu-link active">
                <span className="menu-icon">
                    <iconCust.mailOpen></iconCust.mailOpen>
                </span>
                <span className="menu-title fw-bold">{props.text}</span>
            </span> 
        </Link>
    )
}

export default SalesAppMenuItem;