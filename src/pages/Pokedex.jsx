import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import PokeContainer from "../components/Pokedex/PokeContainer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './styles/pokedex.css'

function Pokedex() {

  const [selectValue, setSelectValue] = useState('all-pokemons')

  const trainerName = useSelector(states => states.trainerName)
  
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'

  const [pokemons, getPokemons, hasError, setPokemons] = useFetch(url)
  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [types, getAllTypes] = useFetch(urlTypes)

  useEffect(() => {
    if(selectValue === 'all-pokemons'){
      getPokemons()
    } else { 
      axios.get(selectValue)
        .then(res => {
          const data = {
            results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
          }
          setPokemons(data)
        })
        .catch(err => console.log(err))
    }
  }, [selectValue])

  useEffect(() => {
    getAllTypes()
  }, [])

  const searchPokemon = useRef()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
  }

  const handleChangeType = e => {
    setSelectValue(e.target.value)
  }

  return (
    <>
      <div className="pokedex">
        <div className="pokedex__header">
          <img className="pokedex__logo" src="logopokedex.svg" alt="" />
      </div>

      <p className="pokedex__welcome">Welcome <span>{trainerName}</span>, you can find your favorite pokemon</p>
      
      <form className="pokedex__form" onSubmit={handleSubmit}>
        <div className="pokedex__body">
        <input className="pokedex__input" ref={searchPokemon} type="text" placeholder="Search your Pokemon" />
          <button className="pokedex__btn">Search</button>
          <select className="pokedex__select" onChange={handleChangeType}>
            <option value='all-pokemons'>All Pokemons</option>
              {
                types?.results.map(typeInfo => (
                  <option 
                  value={typeInfo.url}
                  key={typeInfo.url}
                  >{typeInfo.name}</option>
                ))
              }
          </select>
        </div>
      </form>

      <PokeContainer pokemons={pokemons?.results} />
    </div>
    </>
  )
}

export default Pokedex
