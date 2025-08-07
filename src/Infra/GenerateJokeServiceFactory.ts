import * as Effect from "effect/Effect";
import * as Domain from "../Domain/Joke.js";
import * as Ai from "@effect/ai";

export const makeGenerateJokeServiceNaive = Effect.gen(function* (_) {
  return Domain.GenerateJokeService.of(
    Effect.fn("Infra/GenerateJokeServiceFactory/makeGenerateJokeServiceNaive")(
      function* (inspiration) {
        return Domain.GeneratedJoke.make({
          inspiration,
          joke: Domain.Joke.make("Why did the chicken cross the road?"),
          createdAt: new Date(),
        });
      },
    ),
  );
});

export const makeGenerateJokeServiceLLM = Effect.gen(function* (_) {
  const AiLanguageModel = yield* _(Ai.AiLanguageModel.AiLanguageModel);

  return Domain.GenerateJokeService.of(
    Effect.fn("Infra/GenerateJokeServiceFactory/makeGenerateJokeServiceLLM")(
      function* (inspiration) {
        const { text } = yield* _(
          AiLanguageModel.generateText({
            system: `You are a comedian. Return just the joke. No confirmation. No preamble.

              Example: "Why did the chicken cross the road? To see his flat mate"`,
            prompt:
              "Generate a joke based on the following inspiration: " +
              inspiration,
          }),
        ).pipe(
          Effect.catchTags({
            AiError: (err) =>
              Effect.fail(
                new Domain.JokeGenerationError({
                  data: err,
                }),
              ),
          }),
        );

        const joke = Domain.Joke.make(text);

        return Domain.GeneratedJoke.make({
          inspiration,
          joke,
          createdAt: new Date(),
        });
      },
    ),
  );
});
