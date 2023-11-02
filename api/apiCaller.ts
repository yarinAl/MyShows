import axios from 'axios'

const getFromApi = async <T>(url: string) => {
  const res = await axios.get<T>(url)
  const resTyped = res.data
  return resTyped
}

const api = {
  get: getFromApi,
}

export default api
