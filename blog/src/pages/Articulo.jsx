import { useEffect, useState } from "react";
import { useBlog } from "../context/blog.context";
import { useNavigate, useParams, Link } from "react-router-dom";
import defaultImgBlog from "../assets/img/defaultBlog.jpg";
import "../assets/css/article.css";

function Articulo() {
  const { getOneArticulos } = useBlog();
  const [articulos, setArticulos] = useState([]);
  const params = useParams();

  useEffect(() => {
    getOneArticulos(params.id).then((response) => {
      console.log(response);
      setArticulos([response]);
    });
  }, []);

  return (
    <>
      {articulos.map((articulo) => (
        <div key={articulo.titulo} className="articulo-content">
          <div className="articulo-title">{articulo.titulo}</div>
          <div className="img-articulo">
            <img src={defaultImgBlog} alt="" />
          </div>
          <div>
            <div className="header-content">
              <div className="articulo-publicado">{articulo.published}</div>
            </div>
            <div className="articulo-body">{articulo.contenido}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Articulo;
