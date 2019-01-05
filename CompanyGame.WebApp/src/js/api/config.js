function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return 'http://' + hostname;
}

function extractHostnameWithPort(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }


    //find & remove "?"
    hostname = hostname.split('?')[0];

    return 'http://' + hostname;
}


export default {
    apiBaseUrl: extractHostname(location.href),
    apiURL: '/api',
    returnUrl: extractHostnameWithPort(location.href),
    mockApiDelay: 1000
}