import axios from 'axios'

export const getAllArticulosRequest = async () => await axios.get('/post')

export const getOneArticuloRequest = async (id) =>
  await axios.get('/post/' + id)
