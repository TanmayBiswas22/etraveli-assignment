import { mockMoviesResponse } from "@/mocks/movies";
import { rest } from "msw";

export const handlers = [
  rest.get("https://swapi.py4e.com/api/films/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockMoviesResponse));
  }),
];
