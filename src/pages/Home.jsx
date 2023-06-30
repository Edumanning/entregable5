import { useRef } from "react"
import { setTrainerNameG } from "../store/slices/trainerName.slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/home.css'

function Home() {

    const trainerNameRef = useRef()

    const navigate = useNavigate()
    
    const {trainerName} = useSelector(states => states)

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
        navigate('/pokedex')
    }

    console.log(trainerName);


    return (
    <>
        <div className="home">
            <img className="home__img" src="./public/image 11.svg" alt="" />
            <h2 className="home__title">Welcome Trainer</h2>

            <form className="home__form" onSubmit={handleSubmit}>
                <input className="home__input" ref={trainerNameRef} type="text" placeholder='Your name' />
                <button className="home__btn">Catch them all</button>
            </form>
        </div>

        <footer className="home__footer">
            <img className="pokeball__footer" src="pokebola.svg" alt="" />
        </footer>
    </>
    )
}

export default Home
