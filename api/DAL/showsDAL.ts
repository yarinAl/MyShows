import axios from 'axios'

export const getShows = () => {
  return axios.get('https://api.tvmaze.com/shows')
}

export const getShow = (id) => {
  return axios.get(`https://api.tvmaze.com/shows/${id}`)
}
