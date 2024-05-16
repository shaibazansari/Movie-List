import axios, { CanceledError } from "axios";
import { TMDB_URL } from "../utils/constant";

// https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100
const apiClient = axios.create({
  baseURL: TMDB_URL,
  params: {
    api_key: "2dca580c2a14b55200e784d157207b4d",
  },
});

class HttpService {
  endpoint;
  params;

  constructor(endpoint, params) {
    this.endpoint = endpoint;
    this.params = params;
  }

  getAll = (params) => {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint, {
      signal: controller.signal,
      params: { ...this.params, ...params },
    });
    return { request, cancel: () => controller.abort() };
  };
}

const create = (endpoint, params) => new HttpService(endpoint, params);

export default create;
export { CanceledError };
