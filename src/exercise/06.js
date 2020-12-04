// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonDataView, PokemonInfoFallback} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = React.useState('idle')
  const [pokemonInfo, setPokemonInfo] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    if (Boolean(pokemonName) === false) {
      // check for empty string to return out
      return
    }
    setStatus('pending')

    // reset back to initial state before submitting
    // otherwise will persist last successful search
    setError(null)
    setPokemonInfo(null)
    // implicitly set output to the setter
    // ~ fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
    fetchPokemon(pokemonName).then((data) => {
      setPokemonInfo(data)
      setStatus('resolved')
    }).catch((error) => {
      setError(error)
      setStatus('rejected')
    })
  }, [pokemonName])

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (status === 'idle') {
    return (
      <p>
        Submit a pokemon
      </p>
    )
  } else if (status === 'resolved') {
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
