import * as Effect from "effect/Effect";
import * as cli from "@effect/cli";
import * as Command from "@effect/cli/Command";
import * as Domain from "../../Domain/Joke.js";
import * as Application from "../../Application/GenerateJokeUseCaseService.js";
import * as GenerateJokeService from "../GenerateJokeServiceFactory.js";

export const commandGenerate = Command.make(
  "generate",
  {
    inspirationStr: cli.Options.text("inspiration").pipe(
      cli.Options.withDescription("Inspiration for the joke"),
      cli.Options.withAlias("I"),
    ),
    provider: cli.Options.choice("provider", ["naive", "llm"]).pipe(
      cli.Options.withDescription("Provider to use for the joke"),
      cli.Options.withAlias("p"),
      cli.Options.withDefault("naive"),
    ),
  },
  ({ inspirationStr, provider }) =>
    Effect.gen(function* (_) {
      const inspiration = Domain.InspirationPrompt.make(inspirationStr);
      const usecase = yield* _(Application.GenerateJokeUseCase);
      const result = yield* _(usecase.execute({ inspiration }));
      yield* _(Effect.log(result));
    }).pipe(
      Effect.provide(Application.GenerateJokeUseCase.Default),
      Effect.provideServiceEffect(
        Domain.GenerateJokeService,
        provider === "llm"
          ? GenerateJokeService.makeGenerateJokeServiceLLM
          : GenerateJokeService.makeGenerateJokeServiceNaive,
      ),
    ),
).pipe(Command.withDescription("Generates a random joke."));
