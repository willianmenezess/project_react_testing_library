import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
import data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ data[0] }
      showDetailsLink
      isFavorite
    />);
    // acessar e aferir pikachu na tela
    const textPikachu = screen.getByText(/pikachu/i);
    expect(textPikachu).toBeInTheDocument();
    const textElectric = screen.getByTestId('pokemon-type');
    expect(textElectric.innerHTML).toBe('Electric');
    const weightPikachu = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weightPikachu).toBeInTheDocument();
    const imgPikachu = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imgPikachu).toBeInTheDocument();
    expect(imgPikachu.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', async () => {
    const { history } = renderWithRouter(<App />);
    // acessa e afere se possui o link de detalhes do pokemon
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const titleSummary = await screen.findByRole('heading', {
      name: /summary/i,
    });
    expect(titleSummary).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const checkFavorite = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkFavorite);

    const starFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(starFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
