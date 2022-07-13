import React, { useState, useEffect } from 'react'
import PokemonThumbnail from './components/PokeThumbNail'
const App = () => {
    const [allPokemon, setAllPokemon] = useState([])
    const [loadPokemon, setLoadPokemon] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [filteredPoekmon, setFilteredPokemon] = useState([])
    const getAllPokemon = async () => {
        const res = await fetch(loadPokemon)
        const data = await res.json()
        setLoadPokemon(data.next)


        const createPokemonObject = (result) => {
            result.forEach(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()
                setAllPokemon(currentList => [...currentList, data])
            })
        }
        createPokemonObject(data.results)
    }
    useEffect(() => {
        getAllPokemon()
    })
    const handleSearch = (event) => {
        const searchText = event.target.value
        const filtered = allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredPokemon(filtered)
        console.log(filtered.length)
    }
    const outputPokes = filteredPoekmon.length !== 0 ? filteredPoekmon : allPokemon
    return (

        <div className="app-container">
            <h1>Pokemon Kingdom .</h1>
            <input type="search" onChange={handleSearch} className="search" />
            <div className="pokemon-container">
                <div className="all-container">
                    {outputPokes.map((pokemon, index) =>
                        <PokemonThumbnail
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.sprites.other.dream_world.front_default}
                            type={pokemon.types[0].type.name}
                            key={index}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            stat1={pokemon.stats[0].stat.name}
                            stat2={pokemon.stats[1].stat.name}
                            stat3={pokemon.stats[2].stat.name}
                            stat4={pokemon.stats[3].stat.name}
                            stat5={pokemon.stats[4].stat.name}
                            stat6={pokemon.stats[5].stat.name}
                            bs1={pokemon.stats[0].base_stat}
                            bs2={pokemon.stats[1].base_stat}
                            bs3={pokemon.stats[2].base_stat}
                            bs4={pokemon.stats[3].base_stat}
                            bs5={pokemon.stats[4].base_stat}
                            bs6={pokemon.stats[5].base_stat}

                        />
                    )}
                </div>
                <button className="load-more" onClick={() => getAllPokemon()}>More Pokemons</button>
            </div>
        </div>
    )
}

export default App
