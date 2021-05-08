import {API_BASE_URL, CLIENT_ID} from '@env'
import store from '../Store';

class APIClient {
    constructor(resource) {
        this.resource = resource
    }

    setMethod(method) {
        this.method = method
    }

    call(callback) {

        const state = store.getState();
        
        let locale = "locale="+ state.selectedLanguage + "-AE"
        var url = API_BASE_URL + this.resource;
        if (url.includes('?')) {
            url = url + "&" + locale
        } else {
            url = url + "?" + locale
        }
        fetch(url, {
            method: this.method,
            headers: {
              'Content-Type': 'application/json',
              'x-dw-client-id': CLIENT_ID
            }
          })
            .then((response) => response.json())
            .then((json) => {
                console.log("------------------------");
                console.log("[URL]: " + url);
                //console.log("[Response]: " + JSON.stringify(json));
                callback(json, null)
            })
            .catch((error) => {
                console.error("------------------------");
                console.error("[URL]: " + url);
                console.error(error);
                callback(null, error);
            });
    }
}

export default APIClient;