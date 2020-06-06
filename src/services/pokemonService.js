import Axios from "axios";
// import { getToken } from "../services/tokenService";
import { envConfig } from "../config";
const apiEndpoint = `${envConfig.apiUrl}/pokemon/`;
// const token = getToken();

export async function getPokemonByName(pokemonName) {
  const { data: pokemon } = await Axios.get(`${apiEndpoint}` + pokemonName + "");
  return pokemon;
}

// export async function getVehicles() {
//   const { data } = await Axios.get(apiEndpoint, { headers: { Authorization: token } });
//   return data;
// }

// export async function getVehicleById(_id) {
//   const { data: vehicle } = await Axios.get(apiEndpoint + "/" + _id + "", {
//     headers: { Authorization: token }
//   });

//   return vehicle;
// }

// export async function getVehicleByDriver(_id) {
//   const { data: vehicle } = await Axios.get(apiEndpoint + "/getByDriver/" + _id + "", {
//     headers: { Authorization: token }
//   });

//   return vehicle;
// }

// export async function getVehicleByClientGroup(_id) {
//   const { data: vehicle } = await Axios.get(apiEndpoint + "/getByClientGroup/" + _id + "", {
//     headers: { Authorization: token }
//   });

//   return vehicle;
// }

// export async function putVehicle(_id, data) {
//   return await Axios.put(apiEndpoint + "/" + _id + "", data, {
//     headers: { Authorization: token }
//   });
// }

// export async function deleteVehicle(_id) {
//   await Axios.delete(apiEndpoint + "/" + _id + "", {
//     headers: { Authorization: token }
//   });
// }

// export async function getById(id) {
//   let result = await Axios.get(apiEndpoint + "/" + id, {
//     headers: { Authorization: token }
//   });
//   return result;
// }

// export async function getExcelVehicle(query, filterParams) {
//   const data = {
//     query,
//     filterParams
//   };
//   let response = await Axios.post(apiEndpoint + '/createExcel/', data, {
//     headers: { Authorization: token }, responseType: 'blob'
//   });
//   return response;
// }

// export async function requestData(pageSize, page, columns, filtered, length) {
//   const data = {
//     pageSize,
//     page,
//     columns,
//     filtered
//   };

//   const url = apiEndpoint + "/search";
//   let result = await Axios.post(url, data, {
//     headers: { Authorization: token }
//   });
//   return result;
// }
