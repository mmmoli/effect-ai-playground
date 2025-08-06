import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

export const InspirationPrompt = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("InspirationPrompt"),
  Schema.annotations({
    identifier: "InspirationPrompt",
    description: "A prompt for generating inspiration",
  }),
);

export type InspirationPrompt = Schema.Schema.Type<typeof InspirationPrompt>;

export const Joke = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("Joke"),
  Schema.annotations({
    identifier: "Joke",
  }),
);

export type Joke = Schema.Schema.Type<typeof Joke>;

export const GeneratedJoke = Schema.Struct({
  inspiration: InspirationPrompt,
  joke: Joke,
}).pipe(
  Schema.annotations({
    identifier: "GeneratedJoke",
    description: "A joke generated with an inspiration and a joke",
  }),
);

export type GeneratedJoke = Schema.Schema.Type<typeof GeneratedJoke>;

export type GenerateJokeEffect = Effect.Effect<GeneratedJoke>;

export interface GenerateJokeUseCaseInput {
  inspiration: InspirationPrompt;
}

export interface GenerateJokeUseCaseService {
  readonly execute: (dto: GenerateJokeUseCaseInput) => GenerateJokeEffect;
}
