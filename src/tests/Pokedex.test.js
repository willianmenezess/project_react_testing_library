import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import data from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    // acessar
    const titleH2 = screen.getByRole('heading', {
      name: /encountered pokémon/i, level: 2,
    });
    // aferir
    expect(titleH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      pokemonList={ [data[0], data[1]] }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    // acessar botão next
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    // aferir se está renderizado
    expect(buttonNextPokemon.innerHTML).toBe('Próximo Pokémon');
    expect(buttonNextPokemon).toHaveTextContent('Próximo Pokémon');

    // interagir com o botao
    userEvent.click(buttonNextPokemon);
    // acessar nome do próximo pokemon
    const NamePokemon = screen.getByText(data[1].name);
    // aferir se o próximo pokemon tá na tela
    expect(NamePokemon).toBeInTheDocument();
    // interagir com o botão
    userEvent.click(buttonNextPokemon);
    // acessar nome do próximo pokemon
    const NamePokemonNext = screen.getByText(data[0].name);
    // aferir se o próximo pokemon tá na tela
    expect(NamePokemonNext).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemonList={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    // acessar todos os links detailsPokemon
    const details = screen.getAllByRole('link');
    // aferir quantos details tem renderizado
    expect(details).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<Pokedex
      pokemonList={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    // acessa e afere se há 7 botões
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    const buttonsTypes = data.map((pokemon) => pokemon.type);
    expect(buttonsFilter).toHaveLength(7);
    // afere se cada um desses botões está na lista de tipos de pokemons
    buttonsFilter.forEach((buttonFilter) => expect(buttonsTypes)
      .toContain(buttonFilter.innerHTML));

    // acessa e afere se ao clicar no botão só circula pokemon daquele tipo <========
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(buttonsFilter[4]);
    // const ekans = screen.getByText(/ekans/i);
    // expect(ekans).not.toBeInTheDocument();
    const psychic = screen.getByText(/alakazam/i);
    expect(psychic).toBeInTheDocument();

    // acessa e afere o botão all, se ele está sempre vusível na tela
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeVisible();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<Pokedex
      pokemonList={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    // acessar
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    // interagir
    userEvent.click(allBtn);
    // aferir
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).toBeVisible();
    // acessar
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    // aferir
    data.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(buttonNextPokemon);
    });
  });
});
