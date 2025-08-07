import * as Effect from "effect/Effect";
import * as Domain from "../Domain/Joke.js";

export class GenerateJokeUseCase extends Effect.Service<GenerateJokeUseCase>()(
  "GenerateJokeUseCase",
  {
    effect: Effect.gen(function* (_) {
      const jokeGenerator = yield* _(Domain.GenerateJokeService);

      const execute = Effect.fn(function* (
        dto: Domain.GenerateJokeUseCaseInput,
      ) {
        const inspiration = Domain.InspirationPrompt.make(dto.inspiration);
        const joke = yield* _(jokeGenerator(inspiration));
        return joke;
      });

      return {
        execute,
      } satisfies Domain.GenerateJokeUseCaseServiceImpl;
    }),
  },
) {}
