import { useContext } from 'react';
import { AuthContext, AuthContextValues } from '../helpers/AuthContextProvider';
import axios from 'axios'


let AxiosInstance = axios.create();
const Auth = (): AuthContextValues => {
    const authContext = useContext(AuthContext);
    return authContext;
}
AxiosInstance.interceptors.request.use(
config => {
    console.log('here now')
    return config;
}, 
error => {
    Promise.reject(error);
});
AxiosInstance.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
})

export default AxiosInstance;