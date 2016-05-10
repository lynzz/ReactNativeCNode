'use strict';

const API = 'https://cnodejs.org/api/v1'

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseData = (res) => {
  return res.json()
}

const processData = (json) => {
  return json.success ? Promise.resolve(json.data) : Promise.reject(json.message || '接口异常');
}

export function fetchData (api, params = {}) {
  let queryString = []

  Object.keys(params).forEach((key) => {
    queryString.push(`${key}=${params[key]}`)
  })
  queryString = queryString.length ? '?' + queryString.join('&') : ''
  
  api = `${API}/${api}${queryString}`
  return fetch(api)
    .then(checkStatus)
    .then(parseData)
    .then(processData)
    .then(data => {
      return data
    }).catch(error => {
      return Promise.reject(error)
    })
}
