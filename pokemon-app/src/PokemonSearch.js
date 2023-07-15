import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function PokemonSearch() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      setPokemon(response.data);
      setError(null);
    } catch (error) {
      setPokemon(null);
      setError("Pokemon not found");
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {pokemon && (
        <div className="card">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <img
            className="pokemon-image"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <p className="pokemon-power">Power: {pokemon.base_experience}</p>
          <p className="pokemon-weight">Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;
