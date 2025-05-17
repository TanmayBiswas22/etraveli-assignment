// This function is used to render a component with a React Query client provider.

import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "./server";
import { rest } from "msw";
import { MovieResponse } from "@/types";

export const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

export const useMockFilms = (mock: MovieResponse) => {
  server.use(
    rest.get("https://swapi.py4e.com/api/films/", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mock));
    })
  );
};
