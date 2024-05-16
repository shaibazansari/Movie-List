import create from "./http-service";
import { MOVIES_URL } from "../utils/constant";

export default create(MOVIES_URL, {
  sort_by: "popularity.desc",
  primary_release_year: 2023,
  page: 1,
  "vote_count.gte": 100,
});
