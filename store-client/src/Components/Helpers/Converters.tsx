import moment from "moment";

const ConvertDateTimeSimple = (date: Date | undefined, format: string = "MM/DD/YYYY hh:mm:ss") => {
    if(date != undefined){
        return moment(date).format(format); 
    }
    else{
        return moment().format(format); 
    }
}

const FormatDate = (date: string | undefined, format: string = "MM/DD/YYYY hh:mm:ss") => {
    if(date != undefined){
        return moment(date).format(format); 
    }
    else{
        return moment().format(format); 
    }
}

const GetActualDate = (format: string = "MM/DD/YYYY") => { 
    return moment().format(format); 
}
const validatePrice = (unitPrice: number|undefined, factorRevenue: number|undefined) => {
    if(unitPrice === undefined ||factorRevenue === undefined)
        return 0
    return unitPrice * factorRevenue
}
const calculateproceGanancia = (precioCompra: number|undefined, precioVenta: number|undefined) => {

    if(precioCompra === undefined ||precioVenta === undefined)
        return `0 %`

    let fraccion = precioCompra/100;
    let porcentaje = Math.round((precioVenta/fraccion)-100)
    if(isNaN(porcentaje)){
        return `0 %`
    }
    return `${porcentaje} %`
}

const validateganancia = (total: number|undefined, priceITem: number|undefined) => {
    if(total === undefined ||priceITem === undefined)
        return 0

    let result = total - priceITem

    if(isNaN(result)){
        return 0
    }
    
    if(result < 0){
        return 0
    }

    return result
}

export {
    ConvertDateTimeSimple,
    GetActualDate,
    FormatDate,
    validatePrice,
    calculateproceGanancia,
    validateganancia,
};