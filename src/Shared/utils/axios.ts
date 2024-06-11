import axios from 'axios';
import Cookies from 'js-cookie';
import AppConfig from '../../config';
import toast from 'react-hot-toast';
import { showToast } from './alert';



//Bullet proof to make sure that token is everywhere no need to worry about token issues any
export const authHeader = () => ({
    ...(Cookies.get('token') ? { Authorization: `Bearer ${Cookies.get('token')}` } : {}),
});

const client = axios.create({
    baseURL: AppConfig.api.base,
    headers: {
        ...authHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

class AxiosDataService {
    static get(path = '', params = {},) {
        return client({
            method: 'GET',
            url: path,
            params,
            headers: { ...authHeader() },
        });
    }

    static post(path = '', data = {}, optionalHeader = {}) {
        return client({
            method: 'POST',
            url: path,
            data,
            headers: { ...authHeader(), ...optionalHeader },
        });
    }

    static patch(path = '', data = {}) {
        return client({
            method: 'PATCH',
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }

    static put(path = '', data = {}) {
        return client({
            method: 'PUT',
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }

    static delete(path = '',) {
        return client({
            method: 'DELETE',
            url: path,
            headers: { ...authHeader() },
        });
    }
}

// /**
//  * axios interceptors runs before and after a request, letting the developer modify req,req more
//  * For more details on axios interceptor see https://github.com/axios/axios#interceptors
//  */
// client.interceptors.request.use((config) => {
//     // do something before executing the request
//     // For example tag along the bearer access token to request header or set a cookie
//     const requestConfig = config;
//     return requestConfig;
// });

// client.interceptors.response.use(
//     (response) => {

//         return response
//     },
//     (error) => {
//         /**
//          * Do something in case the response returns an error code [3**, 4**, 5**] etc
//          * For example, on token expiration retrieve a new access token, retry a failed request etc
//          */
//         const { response } = error;
//         const originalRequest = error.config;
//         if (response) {
//             if (response.status === 500) {
//                 // do something here
               
//             } else {
//                 return originalRequest;
//             }
//         }
//         return Promise.reject(error);
//     },
// );
export { AxiosDataService };