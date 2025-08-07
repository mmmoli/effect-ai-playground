import * as Layer from "effect/Layer";
import * as GenerateJokeUseCase from "../Application/GenerateJokeUseCaseService.js";

export const AppLayer = Layer.mergeAll(
  GenerateJokeUseCase.GenerateJokeUseCase.Default,
);
