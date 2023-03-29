import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import data from '../data';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const favoritePokemon = [];
    renderWithRouter(<FavoritePokemon pokemonList={ favoritePokemon } />);
    // acessar
    const textNotFavPokemon = screen.getByText(/no favorite pokémon found/i);
    // aferir
    expect(textNotFavPokemon).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os pokemons favoritados', () => {
    const favoritePokemon = [data[0], data[1]];
    renderWithRouter(<FavoritePokemon pokemonList={ favoritePokemon } />);
    // acessar
    const pokemon1 = screen.getByText(/pikachu/i);
    const pokemon2 = screen.getByText(/charmander/i);
    // aferir
    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).toBeInTheDocument();
  });
});
