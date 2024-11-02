import Tarjeta from '../../Componentes/Tarjeta/index'


function Inicio () {
    return (
        <div>
            <Tarjeta
                imagen="https://media.admagazine.com/photos/6239341e83e0740e83d095a3/16:9/w_2240,c_limit/glamping.jpg"
                nombre="Glamperos Paradise"
                ciudad="Medellín"
                precio={150}
                calificacion={4.5}
                favorito={false}
                onFavoritoChange={(nuevoEstado) => console.log('Favorito:', nuevoEstado)}
            />
            

        </div>
    );
};

export default Inicio;
