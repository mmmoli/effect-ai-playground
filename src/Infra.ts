import * as Effect from "effect/Effect";
import * as Domain from "./Domain.js";
import * as Application from "./Application.js";

export const GenerateJokeUseCaseLLM = Application.GenerateJokeUseCaseService.of(
  {
    execute: (dto) =>
      Effect.gen(function* (_) {
        return Domain.GeneratedJoke.make({
          inspiration: Domain.InspirationPrompt.make(dto.inspiration),
          joke: Domain.Joke.make("LLM…"),
        });
      }),
  },
);

export const GenerateJokeUseCaseDumb =
  Application.GenerateJokeUseCaseService.of({
    execute: (dto) =>
      Effect.succeed(
        Domain.GeneratedJoke.make({
          inspiration: Domain.InspirationPrompt.make(dto.inspiration),
          joke: Domain.Joke.make("This is really funny…"),
        }),
      ),
  });
