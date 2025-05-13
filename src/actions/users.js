import { toast } from "react-toastify";
import { STORAGE_KEY } from "../constants";
import axios, { endpoints } from "../utils/axios";

export const updateMe = async (data) => {
    try {
        const res = await axios.put(endpoints.users.updateMe, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY)}`,
            }
        })

        return res
    } catch (error) {
        console.error("❌ Error during order creation:", error);
    }
}

export const changePassword = async (data) => {
    try {
        const res = await axios.put(endpoints.users.changePassword, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY)}`,
            }
        })
        return res;
    }catch(error) {
        console.error("❌ Error during order creation:", error);
    }
}