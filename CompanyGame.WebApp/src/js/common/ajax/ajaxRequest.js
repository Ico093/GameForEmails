function makeRequest(url, method, options) {
    let newOptions = Object.assign({
        headers: { 'Authorization': localStorage.authorizationKey },
        method: method
    }, options);

    return $.ajax(url, newOptions);
}

export function get(url, options) {
    return makeRequest(url, 'GET', options);
}

export function post(url, options) {
    return makeRequest(url, 'POST', options);
}

export function del(url, options) {
    return makeRequest(url, 'DELETE', options);
}