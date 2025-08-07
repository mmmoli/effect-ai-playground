import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as Data from "effect/Data";
import * as Context from "effect/Context";

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
  createdAt: Schema.DateFromString,
}).pipe(
  Schema.annotations({
    identifier: "GeneratedJoke",
    description: "A joke generated with an inspiration and a joke",
  }),
);

export type GeneratedJoke = Schema.Schema.Type<typeof GeneratedJoke>;

export class JokeGenerationError extends Data.TaggedError(
  "Domain/Joke/JokeGenerationError",
)<{
  data: unknown;
}> {}

export type GeneratedJokeEffect = Effect.Effect<
  GeneratedJoke,
  JokeGenerationError
>;

// GenerateJokeService

export type GenerateJokeServiceImpl = (
  inspiration: InspirationPrompt,
) => GeneratedJokeEffect;

export class GenerateJokeService extends Context.Tag(
  "Domain/Joke/GenerateJokeService",
)<GenerateJokeService, GenerateJokeServiceImpl>() {}

// GenerateJokeUseCase

export interface GenerateJokeUseCaseInput {
  inspiration: InspirationPrompt;
}

export interface GenerateJokeUseCaseServiceImpl {
  readonly execute: (dto: GenerateJokeUseCaseInput) => GeneratedJokeEffect;
}
