// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonDataView, PokemonInfoFallback} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemonInfo, setPokemonInfo] = React.useState(null)
  React.useEffect(() => {
    // check pokemon is not an empty string
    if (Boolean(pokemonName)) {
      fetchPokemon(pokemonName).then(
        pokemonData => {
          setPokemonInfo(pokemonData)
        }
      )
    }

  }, [pokemonName])

  if (Boolean(pokemonName) === false) {
    return (
      <p>
        Submit a pokemon
      </p>
    )
  }

  if (pokemonInfo !== null) {
    return (
      <PokemonDataView pokemon={pokemonInfo} />
    )
  }

  // on error or loading? 
  return (
    <PokemonInfoFallback name={pokemonName} />
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
