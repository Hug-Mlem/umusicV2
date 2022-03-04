import axios from 'axios';
import { Domain } from './config';


export default (method, url, params={}, headers = {}, responseType) => {
    method = method.toLowerCase();


    let opts = {
        method: method,
        url: url,
        headers: {
          
            "Access-Control-Allow-Origin": "*",
            "Vary": "Origin",
            "Vary": "Access-Control-Request-Method",
            "Vary": "Access-Control-Request-Headers",
            "Client-Type": "Android",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Revision": "1234",
            "Accept-language": "en",
            ...headers,   
        }
    };

    if (method === 'get')
        opts.params = params;
    else
        opts.params = params;

    if (headers) {
        opts.headers = Object.assign(opts.headers, headers);
    }

    if (responseType) {
        opts.responseType = responseType;
    }

    opts.validateStatus = (status) => {
        return true;
    }

    return axios(opts);
}