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
          console.log(pokemonData)
          // setPokemonInfo(pokemonData)
        }
      )
    }

  }, [pokemonName])


  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  if (Boolean(pokemonName) === false) {
    return (
      <p>
        Submit a pokemon
      </p>
    )
  }

    return (
      <PokemonDataView pokemon={pokemonInfo} />
    )

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
