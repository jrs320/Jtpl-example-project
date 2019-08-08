/**
 * http request
 * @author jrs
 */
import qs from 'qs'

/**
 * http request
 * @param {*} opts
 */
const request = opts => {
  return window.fetch ? requestFetch(opts) : requestXhr(opts)
}

/**
 * fetch
 * @param {*} opts
 */
const requestFetch = opts => {
  let {
    url,
    params = {},
    method = 'get',
    headers = {}
  } = opts

  let options = {
    method,
    mode: 'cors',
    headers: Object.assign({
      'content-type': 'application/json;charset=UTF-8'
    }, headers)
  }

  method = method.toLocaleLowerCase()
  if (method === 'get') {
    url += `?${qs.stringify(params)}`
  }
  else {
    options.body = JSON.stringify(params)
  }

  return fetch(url, options).then(res => {
    return res.json().then(data => {
      return data
    })
  })
} 

/**
 * xhr
 * @param {*} opts 
 */
const requestXhr = opts => {
  return new Promise((resolve, reject) => {
    let {
      url,
      params = {},
      method = 'get',
      headers = {}
    } = opts

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 304 || (xhr.status >= 200 && xhr.status < 300)) {
          resolve(JSON.parse(xhr.responseText))
        }
        else {
          reject(xhr)
        }
      }
    }

    let body = null
    method = method.toLocaleLowerCase()
    if (method === 'get') {
      url += `?${qs.stringify(params)}`
    }
    else {
      body = JSON.stringify(params)
    }

    xhr.open(method, url, true)
    headers = Object.assign({
      'content-type': 'application/json;charset=UTF-8'
    }, headers)

    for (let key in headers){
      xhr.setRequestHeader(key, headers[key])
    }
    
    xhr.send(body)
  })
} 

export {
  request
}