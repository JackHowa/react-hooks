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
    if (Boolean(pokemonName) == false) {
      // check for empty string to return out
      return
    }

    // reset back to initial state before submitting
    // otherwise will persist last successful search
    setPokemonInfo(null)
    // implicitly set output to the setter
    // ~ fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
    fetchPokemon(pokemonName).then(setPokemonInfo)
  }, [pokemonName])

  if (Boolean(pokemonName) == false) {
    return (
      <p>
        Submit a pokemon
      </p>
    )
  } else if (pokemonInfo !== null) {
    return (
      <PokemonDataView pokemon={pokemonInfo} />
    )
  } else {
    // on error or loading? 
    return (
      <PokemonInfoFallback name={pokemonName} />
    )
  }
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
