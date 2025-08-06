import * as Effect from "effect/Effect";
import * as Context from "effect/Context";
import * as Domain from "./Domain.js";

export type GenerateJokeEffect = Effect.Effect<Domain.GeneratedJoke>;

export interface GenerateJokeUseCaseInput {
  inspiration: Domain.InspirationPrompt;
}

export interface GenerateJokeUseCaseServiceImpl {
  readonly execute: (dto: GenerateJokeUseCaseInput) => GenerateJokeEffect;
}

export class GenerateJokeUseCaseService extends Context.Tag(
  "Application/GenerateJokeUseCaseService",
)<GenerateJokeUseCaseService, GenerateJokeUseCaseServiceImpl>() {}
