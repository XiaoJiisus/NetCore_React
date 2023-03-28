import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

const App = () =>
{
    const [description, setDescription] = useState("");
    const [redisData, setRedisData] = useState([]);

    const ShowRedisData = async () =>
    {
        const response = await fetch('api/redisdata/getredisdata');
        
        if (response.ok)
        {
            const data = await response.json();
            setRedisData(data);
        }
        else
            console.log(`Status code ${response.status}`);
    };
    
    const formatDate = (string) =>
    {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + ' | ' + hora;
    }

    const SaveToRedis = async (e) =>
    {
        e.preventDefault();
        
        const response = await fetch('api/redisdata/savetoredis/' + description,
        {
            method: 'POST'
        });

        if (response.ok)
        {
            setDescription('');
            await ShowRedisData();
        }
    };

    const DeleteRedisKey = async (description) =>
    {
        const response = await fetch('api/redisdata/deleterediskey/' + description,
        {
            method: 'DELETE'
        });

        if (response.ok)
        {
            setDescription('');
            await ShowRedisData();
        }
    }

    useEffect(() => { ShowRedisData(); }, []);

    return (
        
        <div className="container">
            <div className="container p-4">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={SaveToRedis}>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Ingrese la descripcion a gardar en caché" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                                <button className="btn btn-success" type="submit">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Descripcion</th>
                            <th>Fecha registro</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {redisData.map((item) =>
                                (
                                    <tr key={item.counterInt}>
                                        <td>{item.counterInt}</td>
                                        <td>{item.descriptionStr}</td>
                                        <td>{formatDate(item.savedDtb)}</td>
                                        <td><button className="btn btn-danger" onClick={() => DeleteRedisKey(item.descriptionStr)}>Eliminar</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;