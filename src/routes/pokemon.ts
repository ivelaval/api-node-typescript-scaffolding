import { Router, type Request, type Response } from 'express';
import { httpClient } from '../plugins/httpClient.plugin.js';

const routes = Router();

const getPokemons = async (req: Request, res: Response): Promise<void> => {
  const pokemonId = req.params.pokeId ?? '';
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  const response = await httpClient.get(url);
  res.send(response);
};

/**
 * @openapi
 * '/pokemon/get/{pokeId}':
 *  get:
 *     tags:
 *     - Pokemons
 *     summary: Get a all specific pokemon data
 *     parameters:
 *      - name: pokeId
 *        in: path
 *        description: The id of the pokemon
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Product not found
 *
 * @openapi
 *  '/pokemon/get':
 *  get:
 *     tags:
 *     - Pokemons
 *     summary: Get a all pokemons
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Product not found
 */
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/get/:pokeId?', getPokemons);

export { routes };
