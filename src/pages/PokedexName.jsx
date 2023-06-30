import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from "../hooks/useFetch"
import './styles/PokedexName.css'

function PokedexName() {

    const {name} = useParams()

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const [ pokemon, getPokemonByName, hasError] = useFetch(url)

    useEffect(() => {
        getPokemonByName()
    }, [name])

    return (
        <div>
        {
            hasError
            ? <h1 className="textError">👀 the pokemon "<span className="searchNameFail">{name}</span>" doesn't exist'</h1>
                : (
                    <>
                    <div className='pokedexName'>
                        <div className='imagen'></div>
                    <article className='pokedexName__article'>
                        <section className='pokedexName__sec'>
                            <header className='pokedexName__header'>
                                <img className='pokedexName__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                            </header>

                            <section className='pokedexName__info'>
                                <p className='pokedexName__info-id'>#{pokemon?.id}</p>
                                <h2 className='pokedexName__info-name'>{pokemon?.name}</h2>

                                <ul className='pokedexName__details'>
                                    <div className='pokedexName__weight'>
                                        <h3 className='pokedexName__weight-title'>Weight</h3>
                                        <li className='ppokedexName__weight-data'>{pokemon?.weight}</li>
                                    </div>
                                    <div className='pokedexName__height'>
                                        <h3 className='pokedexName__height-title'>Height</h3>
                                        <li className='pokedexName__height-data'>{pokemon?.height}</li>
                                    </div>
                                </ul>
                            </section>

                            <section className='pokedexName__details2'>
                                <div className='pokedexName__type'>
                                    <h2 className='pokedexName__type-title'>Type</h2>
                                        {
                                            <ul className='pokedexName__type-data'>
                                                {pokemon?.types?.map((typeInfo, index) => (
                                                    <li className='list__type' key={index}>{typeInfo.type.name}</li>
                                                ))}
                                            </ul>
                                        }
                                </div>
                            </section> 

                            <section className='pokedexName__ability'>   
                                <div className='pokedexName__ability-cont'>
                                <h2 className='pokedexName__ability-title'>Ability</h2>
                                        {
                                            <ul className='pokedexName__ability-data'>
                                                {pokemon?.abilities.map((abilityInfo, index) => (
                                                    <li className='list__ability' key={index}>{abilityInfo.ability.name}</li>
                                                ))}
                                            </ul>
                                        }
                                </div>
                            </section>
                        </section>

                        <section className='pokedexName__stats'>
                            <h2 className='pokedexName__stats-title'>Stats</h2>
                                <div className='pokedexName__stats-data'>
                                    {pokemon?.stats.map((statsInfo, index) => (
                                        <li className='list__stats' key={index}>{statsInfo.stat.name}
                                            <span className='pokeCard__stats-item-level'>{statsInfo.base_stat}</span>
                                            <span className='pokeCard__stats-item-relleno'>
                                            <span 
                                                className={`pokeCard__stats-item-barra`}
                                                style={{width: `${((statsInfo.base_stat * 100)/150 > 150) ? 150 : ((statsInfo.base_stat * 100)/150)}%`}}
                                            ></span>
                                            </span>
                                        </li>                                        
                                    ))
                                        
                                    }
                                </div>
                        </section>

                        <section className='pokedexName__moves'>
                            <h2 className='pokedexName__moves-title'>Moves</h2>
                                <div className='pokedexName__moves-data'>
                                    {pokemon?.moves.map((movesInfo, index) => (
                                        <li className='list__moves' key={index}>{movesInfo.move.name}</li>
                                    )
                                    )}
                                </div>
                        </section>
                    </article>
                    </div>
                    </>
                )
        }

        </div>        
    )
}

export default PokedexName
