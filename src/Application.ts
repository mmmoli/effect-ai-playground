import * as Effect from "effect/Effect";
import * as Domain from "./Domain.js";

export type GenerateJokeEffect = Effect.Effect<Domain.GeneratedJoke>;

export interface GenerateJokeUseCaseInput {
  inspiration: Domain.InspirationPrompt;
}

export interface GenerateJokeUseCaseService {
  readonly execute: (dto: GenerateJokeUseCaseInput) => GenerateJokeEffect;
}

export class GenerateJokeUseCase extends Effect.Service<GenerateJokeUseCase>()(
  "GenerateJokeUseCase",
  {
    effect: Effect.gen(function* (_) {
      const execute = Effect.fn(function* (dto: GenerateJokeUseCaseInput) {
        const joke = Domain.GeneratedJoke.make({
          inspiration: Domain.InspirationPrompt.make(dto.inspiration),
          joke: Domain.Joke.make("Why did the chicken cross the road?"),
        });
        return joke;
      });

      return {
        execute,
      } satisfies GenerateJokeUseCaseService;
    }),
  },
) {}

export const customGenerateJokeUseCase = new GenerateJokeUseCase({
  execute: Effect.fn("customGenerateJokeUseCase")(function* (dto) {
    const joke = Domain.GeneratedJoke.make({
      inspiration: Domain.InspirationPrompt.make(dto.inspiration),
      joke: Domain.Joke.make("This is really funny…"),
    });
    return joke;
  }),
});
