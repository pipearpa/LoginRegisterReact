import { useState, useEffect } from "react";

export default function AppLogin() {
  const [posts, setPosts] = useState([]);
  const [cargar, setCargar] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const cargarPost = async () => {
      const response = await fetch("http://localhost:3006/api/v1/users/");
      const { data } = await response.json();
      const desestructura = data;
      setPosts(desestructura);
    };

    if (cargar) {
     // cargarPost();
      setCargar(false);
    }
  }, [cargar]);

 

  const ValidarUsuario = async (nombre, password) => {
    let response = await fetch(`http://localhost:3006/api/v1/users/${nombre}/${password}`, {
      method: "POST",
    });
    if (response.status === 200) {
      alert("inicie sesion");
    } else {
      alert("usuario o contraseña incorrecta");
    }
  };

  const controladorDelEnvio = (e) => {
    e.preventDefault();
    ValidarUsuario(name, password);
  };

  return (
    <div className="container">
      <div className="row mt-4 text-center">
        <h1>Iniciar sesion</h1>

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
            placeholder="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn btn-primary mt-3" type="submit">
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
}
