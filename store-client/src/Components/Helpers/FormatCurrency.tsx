const FormatCurrency = (props: {total:number|undefined}) =>{
    const defaultValue = 0
    if (props.total === undefined)
    return <>
        {defaultValue.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            })}
    </>
    return <>
        {props.total.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            })}
    </>
}

export {
    FormatCurrency
}