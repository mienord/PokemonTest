import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    sprites: string;
    type: string;
  }>({ id: 1, name: "bulbasaur", sprites: "", type: "" });
  const input = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<number>(1);
  console.log(count);

  const fetchPokemon = (id: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) =>
      setPokemon({
        id: data.id,
        name: data.name,
        sprites: data.sprites.front_default,
        type: data.types[0].type.name,
      })
    );
  }

  //kjøres når siden refresher
  useEffect(() => {
    fetchPokemon(1);
  }, []);

  useEffect(() => {
    fetchPokemon(count);
  }, [count])

  //gjør egt det samme som useEffect, men vi kan kalle når som helst
  const onSubmit = async () => {
    console.log(input.current?.value);
    fetch(`https://pokeapi.co/api/v2/pokemon/${input.current?.value}`)
      .then((response) => response.json())
      .then((data) =>
        setPokemon({
          id: data.id,
          name: data.name,
          sprites: data.sprites.front_default,
          type: data.types[0].type.name,
        })
      );
  };

  return (
    <div className="pokemon">
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites} alt={pokemon.name} className="pokemon__img" />
      <p>{pokemon.type}</p>
      <input type="numer" max={800} min={1} ref={input} />
      <button onClick={(e) => { onSubmit();}}>Search</button>
      <button onClick={() => setCount((count) => count+1)}>+1</button>

      
      
    </div>
  );
}

export default App;