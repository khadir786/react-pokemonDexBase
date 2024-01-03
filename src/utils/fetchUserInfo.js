import { getUserInfo } from "../apiService";


export const fetchUserInfo = async () => {
    try {
        const response = await getUserInfo();
        if (response && response.data) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
};

