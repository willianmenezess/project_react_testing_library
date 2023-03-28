import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    // acessar links
    const allLinks = screen.getAllByRole('link');
    // aferir se links estao renderizados na tela
    expect(allLinks[0].innerHTML).toBe('Home');
    expect(allLinks[1].innerHTML).toBe('About');
    expect(allLinks[2].innerHTML).toBe('Favorite Pokémon');
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL "/" ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    // acessar links
    const allLinks = screen.getAllByRole('link');
    // interagir com o link home
    userEvent.click(allLinks[0]);
    const { pathname } = history.location;
    // aferir se está na home
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página About, na URL "/about" ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    // acessar links
    const allLinks = screen.getAllByRole('link');
    // interagir com o link about
    userEvent.click(allLinks[1]);
    const { pathname } = history.location;
    // aferir se está na home
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página Pokémon Favoritados, na URL "/favorites" ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    // acessar links
    const allLinks = screen.getAllByRole('link');
    // interagir com o link Favorite Pokémon
    userEvent.click(allLinks[2]);
    const { pathname } = history.location;
    // aferir se está na home
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao digitar uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    // interagir
    act(() => { history.push('/abcdefg'); });
    // acessar
    const { pathname } = history.location;
    // aferir
    expect(pathname).toBe('/abcdefg');
    // acessar
    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });
});
