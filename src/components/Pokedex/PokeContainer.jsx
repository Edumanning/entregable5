import PokeCard from "./PokeCard"
import './styles/PokeContainer.css'

function PokeContainer({pokemons}) {

    return (
        <>
            <div className="poke__container">
                {
                pokemons?.map(pokemon => (
                    <PokeCard 
                        key={pokemon.name}
                        url={pokemon.url}/>
            ))
        }
        </div>
        </>
    )
}

export default PokeContainer
