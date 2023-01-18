import { useRoutes } from 'react-router-dom'
import Articulo from '../pages/Articulo'
import Home from '../pages/Home'
import MisArticulos from '../pages/MisArticulos'

const ruta = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/article/:id',
    element: <Articulo />,
  },
  {
    path: '/my-article',
    element: <MisArticulos />,
  },
  {
    path: '*',
    element: <Home />,
  },
]

function Rutas() {
  const element = useRoutes(ruta)
  return <div>{element}</div>
}

export default Rutas
