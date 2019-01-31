
import _ from 'lodash';
import axios from 'axios';
import querystring from 'querystring';

// export const API_URI = "http://realapiendpoint/api/v1";
export const API_URI = "mocked";

class api {

    call(url, method, params = {}, onCancel = function() {}, onUploadProgress = function() {}) {

        const CancelToken = axios.CancelToken;
        method = _.lowerCase(method);

        if (method == 'get') {
            url = url + "?" + this.getQueryString(params);
            params = {};
        }

        return axios({
            url : url,
            method : method,
            baseURL : API_URI,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify(params),
            onUploadProgress : onUploadProgress,
            cancelToken: new CancelToken(onCancel),
        }).then(function(response) {
            return response.data
        });
    }

    getQueryString = (object) => {
        let query = [];
        Object.keys(object).forEach((k) => {
            query.push(k + "=" + object[k]);
        });
        return query.join("&");
    }





}

export default new api();