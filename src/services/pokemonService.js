import Axios from "axios";
import { envConfig } from "../config";
const apiEndpoint = `${envConfig.apiUrl}/pokemon/`;

export async function getPokemonByName(pokemonName) {
  const { data: pokemon } = await Axios.get(`${apiEndpoint}pokemonSearch/` + pokemonName + "");
  return pokemon;
}