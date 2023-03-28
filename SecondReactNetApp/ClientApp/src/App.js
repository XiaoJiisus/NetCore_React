import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import Tarjeta from "./components/Tarjeta";

const App = () =>
{
  /*
    numero -> variable para obtener el valor | aqui se suele obtener el estado acutal
    setNumero -> funcion que actualiza el valor | actualizar el estado
  */
  const [numero, setNumero] = useState(0);
  let personaModel = 
  {
    Nombre: 'Maria',
    Correo: 'maria@gmail.com'
  }

  const [persona, setPersona] = useState(personaModel);

  const [nombre, setNombre] = useState('Juan');
  const writeOnConsle = () => 
  {
    setNombre('Maria');
    //async
    console.log(`El nombre no cambia ${nombre}`)
  }

  useEffect(() => { console.log(`El nombre cambiado es ${nombre}`); }, [nombre]);// el nombre ha cambido para la variable por asíncronicidad, ya que está ligado al valor de nombre y se manda llamar cuando cambia el valor
  useEffect(() => { console.log(`La aplicacion ha iniciado`); }, []); //with the empty braces this effect is called once the dom has ended

  return (
    <div className="container-fluid">
      <div className="row justify-content-sm-center">
        <div className="col-sm-4">
            <Tarjeta
              titulo = "BIENVENIDO A MI SITIO WEB"
              parrafo = "Esta es mi primera aplicación con React Js"
              textoboton = "Suscríbete">
              
              <a href="#" className="btn btn-success">Prueba</a>
            </Tarjeta>

            <Tarjeta
              titulo = "BIENVENIDO las propiedades"
              parrafo = "Propiedades de un compomnente"
              textoboton = "Suscríbete y dale like">
              
            </Tarjeta>
        </div>
      </div>
      <br />
      <div id="statesDiv">
        <h1>Valor actual del numero: {numero}</h1>
        <button onClick={() => setNumero(numero + 1)}>Sumar + 1</button>
        <br />
        <br />
        <br />
        <p>Nombre: {persona.Nombre}</p>
        <p>Correo: {persona.Correo}</p>
        <button onClick={() => setPersona(
          {
            ...persona,
            Correo: "ariams@hotmail.com"
          }
        )}>Cambiar correo</button>
        <br />
        <br />
        <br />
        <div className="container-fluid">
          <h1>El nombre actual es: {nombre}</h1>
          <button onClick={writeOnConsle}>Camibar nombre</button>
        </div>
      </div>
    </div>
  );
}

export default App;