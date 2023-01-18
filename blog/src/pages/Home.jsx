import React from 'react'
import { useBlog } from '../context/blog.context'
import defaultImgBlog from '../assets/img/defaultBlog.jpg'
import { NavLink } from 'react-router-dom'

function Home() {
  const { articulos } = useBlog()
  return (
    <>
      {articulos.map((articulo) => (
        <NavLink key={articulo.id} exact="true" to={`/article/${articulo.id}`}>
          <div className="content">
            <div className="img">
              <img src={defaultImgBlog} alt="" />
            </div>
            <div>
              <div className="header">
                <div className="title">{articulo.titulo}</div>
                <div className="publicado">{articulo.published}</div>
              </div>
              <div className="body">{articulo.contenido}</div>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  )
}

export default Home
