 function request(url, data = false, method = 'GET', ContentType='') {
    const options = {
        method,
        credentials: 'include'
    }
    if (data && method !== 'GET') {
        options.body = data
        if(ContentType !== ''){
            options.headers = {
            'Content-Type': ContentType
            }
        }
        
    }
    return fetch(url, options)
}

export const post = (url, data,ContentType) => request(url, data, 'POST', ContentType)
export const put = (url, data,ContentType) => request(url, data, 'PUT', ContentType)
export const del = (url, data,ContentType) => request(url, data, 'DELETE',ContentType)
export const get = url => request(url)