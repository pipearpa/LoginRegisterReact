import { useState, useEffect } from "react";
import './index.css'


export default function App() {

  const [posts, setPosts] = useState([]);
  const [cargar, setCargar] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [cuerpoMsj, setCuerpoMsj] = useState("");

  useEffect(() => {

    const cargarPost = async () => {
      const response = await fetch(
        mode= 'no-cors',
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
        
      );
      const data = await response.json();
       console.log(data);
      setPosts(data);
    };
    if (cargar) {
      cargarPost();
      setCargar(false);
    }

  }, [cargar]);

  const borrarPost = async (id) => {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE"
      }
    );
    if (response.status === 200) {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    } else {
      return;
    }
  };

  const agregarPosts = async (titulo, mensaje) => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: titulo,
        body: mensaje,
        userId: Math.random().toString(36).slice(2)
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    let data = await response.json();
    setPosts((posts) => [data, ...posts]);
    setTitulo("");
    setCuerpoMsj("");
  };

  const controladorDelEnvio = (e) => {
    e.preventDefault();
    agregarPosts(titulo, cuerpoMsj);
  };





  return (
    <div className="container">
      <div className="row mt-4 text-center">
        <h1> Mini Blog React + fetch API </h1>
      </div>
      <div className="row p-2 mt-2">
        <button
          type="button"
          onClick={() => setCargar(true)}
        >
          Cargar Post Iniciales API
        </button>
      </div>
      <br />
      <div className="card mt-3 p-3">
        <form onSubmit={controladorDelEnvio}>
          <input
            className="form-control"
            placeholder="Título"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <br />
          <textarea
            className="form-control mt-2"
            placeholder="Cuerpo del Mensaje"
            name=""
            id=""
            cols="21"
            rows="3"
            value={cuerpoMsj}
            onChange={(e) => setCuerpoMsj(e.target.value)}
          />
          <br />
          <button className="btn btn-primary mt-3" type="submit">
            Agregar Post
          </button>
        </form>
      </div>
      <div className="mt-5 mb-5">
        {posts.map((post) => {
          return (
            <div className="card mt-2 p-3" key={post.id}>
              <h2 className="card-title">{post.title}</h2>
              <p className="card-text">{post.body}</p>
              <div className="d-grid d-sm-flex justify-content-sm-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => borrarPost(post.id)}
                >
                  Borrar Post
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
