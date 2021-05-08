import { connect } from 'react-redux';

const apiBase = 'https://development-eu01-chalhoub.demandware.net/s/Faces_AE/dw/shop/v19_1/'

class APIClient {
    constructor(resource) {
        this.resource = resource
    }

    setMethod(method) {
        this.method = method
    }

    call(callback) {
        let locale = "locale="+ currentLanguage + "-AE"
        var url = apiBase + this.resource;
        if (url.includes('?')) {
            url = url + "&" + locale
        } else {
            url = url + "?" + locale
        }
        fetch(url, {
            method: this.method,
            headers: {
              'Content-Type': 'application/json',
              'x-dw-client-id': 'b2f6f2b2-0159-4cc3-b3ec-c4a9ae246d61'
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