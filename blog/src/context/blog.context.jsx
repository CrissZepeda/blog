import { useState, createContext, useContext, useEffect } from 'react'
import { getAllArticulosRequest, getOneArticuloRequest } from '../api/blog.api'

const contextBlog = createContext()

export const useBlog = () => {
  const context = useContext(contextBlog)
  return context
}

export const BlogProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([])

  // Articulos //
  const getAllArticulos = async () => {
    const result = await getAllArticulosRequest()
    setArticulos(result.data)
  }

  const getOneArticulos = async (id) => {
    const result = await getOneArticuloRequest(id)
    console.log(result.data)
    return result.data
  }

  useEffect(() => {
    getAllArticulos()
  }, [])

  return (
    <contextBlog.Provider
      value={{ articulos, getAllArticulos, getOneArticulos }}
    >
      {children}
    </contextBlog.Provider>
  )
}
