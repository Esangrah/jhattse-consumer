import { OperationResult } from "urql";

export const handleResponse = (funcName?: string) => {
    return (res:OperationResult) => {
        if(res.error) 
            throw res.error
        return funcName?.length > 0 ? res.data[funcName]: res.data
    }
}