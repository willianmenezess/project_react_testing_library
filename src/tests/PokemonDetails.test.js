// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../renderWithRouter';
// import { PokemonDetails } from '../pages';
// import data from '../data';

// const isPokemonFavoriteById = {
//   4: false,
//   10: false,
//   23: false,
//   25: true,
//   65: false,
//   78: false,
//   143: false,
//   148: false,
//   151: false,
// };

// describe('Testa o componente <PokemonDetails.js />', () => {
//   test('', () => {
//     const { match } = renderWithRouter(<PokemonDetails
//       isPokemonFavoriteById={ isPokemonFavoriteById }
//       match={ match }
//       pokemonList={ data }
//       onUpdateFavoritePokemon={ onUpdateFavoritePokemon }
//     />);
//   });

//   const { params: { id } } = match;

//   const textPikachuDetails = screen.getByRole('heading', {
//     name: /pikachu details/i,
//   });
//   expect(textPikachuDetails).toBeInTheDocument();
// });
