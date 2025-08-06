import * as Effect from "effect/Effect";
import * as Domain from "./Domain.js";
import * as Application from "./Application.js";

export const customGenerateJokeUseCase = new Application.GenerateJokeUseCase({
  execute: Effect.fn("customGenerateJokeUseCase")(function* (dto) {
    const joke = Domain.GeneratedJoke.make({
      inspiration: Domain.InspirationPrompt.make(dto.inspiration),
      joke: Domain.Joke.make("This is really custom funny…"),
    });
  }),
});
