import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    // acessar
    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2,
    });
    // aferir
    expect(titleNotFound).toBeInTheDocument();

    // acessar
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    // aferir
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
