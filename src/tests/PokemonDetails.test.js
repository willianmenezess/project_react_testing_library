import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    renderWithRouter(<App />);
    // acessa e afere se possui o link de detalhes do pokemon
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const titlePikachuDetails = await screen.findByRole('heading', {
      name: /pikachu details/i,
    });
    expect(titlePikachuDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i, level: 2,
    });
    expect(summary).toBeInTheDocument();
    const paragraph = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(paragraph).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    renderWithRouter(<App />);
    // acessa e afere se possui o link de detalhes do pokemon
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    // espera o tempo de carregar a página e vai para a página dos detalhes do pokemon (pikachu)
    const titleGameLocations = await screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(titleGameLocations).toBeInTheDocument();

    // acessa e afere todas as localizações do pikachu
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    const locationsRender = [location1.innerHTML, location2.innerHTML];
    const locations = data[0].foundAt.map((locationMap) => locationMap.location);
    locations.forEach((location) => expect(locationsRender).toContain(location));
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    // capturando as imagens de localização do pikachu em data.js
    const imgsLocationData = data[0].foundAt.map((locationMap) => locationMap.map);
    // aferindo se as imagens renderizadas são todas que tinha em data
    const imgsLocations = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(imgsLocations[0].src).toBe(imgsLocationData[0]);
    expect(imgsLocations[1].src).toBe(imgsLocationData[1]);
    expect(locationsRender).toHaveLength(2);
    expect(imgsLocations).toHaveLength(2);
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const pikachuDetails = '/pokemon/25';
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pikachuDetails);
    });

    const checkboxFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);
    const starFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);
    expect(starFavorite).not.toBeInTheDocument();
  });
});
