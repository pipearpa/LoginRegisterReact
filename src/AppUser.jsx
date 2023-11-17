import { useState, useEffect } from "react";

export default function AppUser() {
  const [posts, setPosts] = useState([]);
  const [cargar, setCargar] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const cargarPost = async () => {
      const response = await fetch("http://localhost:3006/api/v1/users/");
      const { data } = await response.json();
      const desestructura = data;
      setPosts(desestructura);
    };

    if (cargar) {
      cargarPost();
      setCargar(false);
    }
  }, [cargar]);

  const borrarUsuario = async (id) => {
    let response = await fetch(`http://localhost:3006/api/v1/users/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      return;
    }
  };

  const agregarUsuario = async (nombre, correo, password, phone) => {
    let response = await fetch("http://localhost:3006/api/v1/users/  ", {
      method: "POST",
      body: JSON.stringify({
        name: nombre,
        email: correo,
        password: password,
        phone: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await response.json();
    setPosts((posts) => [data, ...posts]);
  };

  const controladorDelEnvio = (e) => {
    e.preventDefault();
    agregarUsuario(name, email, password, phone);
  };

  return (
    <div className="container">
      <div className="row mt-4 text-center">
        <h1>LookStyle</h1>

      </div>
      <div className="row p-2 mt-2">
        <button
          type="button"
          onClick={() => setCargar(true)}
        >
          Cargar Usuarios

        </button>


      </div>
      <br />
      <div className="card mt-3 p-3">
        <form onSubmit={controladorDelEnvio}>
          <input
            className="form-control"
            placeholder="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="form-control"
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="form-control"
            placeholder="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            className="form-control"
            placeholder="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <button className="btn btn-primary mt-3" type="submit">
            Agregar Usuario
          </button>
        </form>
      </div>
      <div>
        {Array.isArray(posts) ? (
          posts.map(post => {
            return (
              <div className="card mt-2 p-3" key={post.id}>
              <h2 className="card-title">{post.name}</h2>
              <h2 className="card-title">{post.email}</h2>
              <h2 className="card-title">{post.password}</h2>
              <h2 className="card-title">{post.phone}</h2>
              <div className="d-grid d-sm-flex justify-content-sm-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => borrarUsuario(post.id)}
                >
                  Borrar Usuario
                </button>
                </div>
                </div>
              
             );
          })
        ) : (
          <p>No hay datos de usuario disponibles</p>
        )
        }
      </div>







    </div>




  );
}
