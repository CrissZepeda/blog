import { useBlog } from './context/blog.context'
import Content from './layout/Content'
import { NavLink } from 'react-router-dom'

import './assets/css/blogMain.css'
import './assets/css/menu.css'

function App() {
  const { articulos } = useBlog()
  console.log(articulos)
  return (
    <>
      <div className="menu">
        <span>
          <NavLink exact="true" to="/">
            Inicio
          </NavLink>
        </span>
        <span>
          <NavLink exact="true" to="/my-article">
            Iniciar sesion
          </NavLink>
        </span>
        {/* <ul>
          <li>
            <NavLink exact="true" to="/">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/my-article">
              Iniciar sesion
            </NavLink>
          </li>
        </ul> */}
      </div>
      <div className="App">
        <div className="container">
          <Content />
        </div>
      </div>
    </>
  )
}

export default App
