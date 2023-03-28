import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    // acessar
    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    const textsAbout = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const imgAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });
    // aferir
    expect(titleAbout).toBeInTheDocument();
    expect(textsAbout).toBeInTheDocument();
    expect(imgAbout).toBeInTheDocument();
  });

  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    // acessar
    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i, level: 2,
    });
    // aferir
    expect(titleAbout).toBeInTheDocument();

    // acessar
    const imgAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });
    // aferir
    expect(imgAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    const textAbout1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    const textAbout2 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    expect(textAbout1).toBeInTheDocument();
    expect(textAbout2).toBeInTheDocument();
  });
});
