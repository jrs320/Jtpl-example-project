import { baseUrl } from './base.js'
import { request } from '@/httpRequest/index.js'

/**
 * getList
 * @param {*} type 
 */
const apiGetList = type => {
  return request({
    url: `${baseUrl}/agents`,
    params:  type ? { type } : {}
  })
}

/**
 * update
 * @param {*} data 
 */
const apiUpdate = (data = {}) => {
  let url =  `${baseUrl}/agents`
  if (data.id != undefined) {
    url = `${url}/${data.id}`
  }
  return request({
    method: 'put',
    url,
    params: data
  })
}

export {
  apiGetList,
  apiUpdate
}