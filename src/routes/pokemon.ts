import { Router, type Request, type Response } from 'express';
import { httpClient } from '../plugins/httpClient.plugin.js';

const routes = Router();

const getPokemons = async (req: Request, res: Response): Promise<void> => {
  const pokemonId = req.params.pokeId ?? '';
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  const response = await httpClient.get(url);
  res.send(response);
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/get/:pokeId?', getPokemons);

export { routes };
