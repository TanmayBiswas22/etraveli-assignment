import "whatwg-fetch";
import "@testing-library/jest-dom";
import { server } from "./src/test/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
