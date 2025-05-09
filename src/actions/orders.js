import { STORAGE_KEY } from "../constants";
import axios, { endpoints } from "../utils/axios";

export const submitOrderHandler = async (formData, order) => {
    console.log(formData, order)
    try{
        const params = {"user":{...formData}, order};
        
        const res = await axios.post(endpoints.orders.submit, params, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY)}`,
            },
    });
        console.log(res)
    } catch (error) {
        console.error('Error during creating order:', error);
        throw error;
    }
}