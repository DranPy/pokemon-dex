import axios, { CancelToken, isCancel } from 'axios'
import get from 'lodash/get'
import humps from 'humps'
import { toast } from 'react-toastify'

import { BASE_URL } from 'utils/env'

const instance = axios.create({
  transformRequest: [
    data => humps.decamelizeKeys(get(data, 'data')),
    ...axios.defaults.transformRequest,
  ],
  transformResponse: [...axios.defaults.transformResponse, data => humps.camelizeKeys(data)],
  baseURL: BASE_URL,
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (!isCancel(error)) {
      toast.error('Something went wrong.')
    }

    return Promise.reject(error)
  },
)

export const normalize = data => humps.camelizeKeys(data)

export const getCanceller = () => CancelToken.source()

export default instance
