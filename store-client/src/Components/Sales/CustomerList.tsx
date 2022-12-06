import { useState, useEffect } from "react"
import { CustomerDetailsModel, Client } from "../../api/apiClientBase"
import REQUEST_STATUS from "../../Enums/REQUEST_STATUS"
import CustomerListItem from "./CustomerListItem"
import SimpleFilter from "./SimpleFilter"

const CustomerList = (props: {
    listCustomers: CustomerDetailsModel[],
    showAdminButtons: boolean,
    loadLocally: boolean,
    onSelectCustomer(customer:CustomerDetailsModel): void|undefined
}) => {

    const [listCustomerLocal, setListCustomerLocal] = useState<CustomerDetailsModel[]>(props.listCustomers)
    const [filterPattern, setFilterPattern] = useState<string>('')
    const [reqStatus, setReqStatus] = useState<string>(REQUEST_STATUS.NEW_PROCESS)
    const client = new Client();

    const onLoadListLocally = () => {
        setReqStatus(REQUEST_STATUS.LOADING)
        client.listCustomers().then((response) => {
            setListCustomerLocal(response)
            setReqStatus(REQUEST_STATUS.SUCCESS)
        }).catch((error) => {
            setReqStatus(REQUEST_STATUS.FAILURE)
        })
    }
    useEffect(() => {
        onLoadListLocally()
    }, [])

    return (
        <>
            <SimpleFilter placeholder="Busqueda de clientes" pattern={{ value: filterPattern, onChangeEvt: (event) => { setFilterPattern(event.target.value) } }}></SimpleFilter>
            {
                listCustomerLocal.filter((customer: CustomerDetailsModel) => { 
                    if (customer.fullName?.toLowerCase().includes(filterPattern.toLowerCase()) || 
                    customer.phoneNumber?.toLowerCase().includes(filterPattern.toLowerCase())) 
                        return customer
                }).map((customer: CustomerDetailsModel) => (
                    <CustomerListItem key={`${customer.id}_customer_create`} customer={customer} onSelect={() =>{ if(props.onSelectCustomer != undefined) props.onSelectCustomer(customer) }}></CustomerListItem>
                ))
            }
        </>
    )
}

export default CustomerList;