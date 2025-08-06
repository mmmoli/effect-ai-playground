import * as Effect from "effect/Effect";
import * as cli from "@effect/cli";
import * as Command from "@effect/cli/Command";
import * as Domain from "../Domain.js";
import * as Application from "../Application.js";

export const commandGenerate = Command.make(
  "generate",
  {
    inspirationStr: cli.Options.text("inspiration").pipe(
      cli.Options.withDescription("Inspiration for the joke"),
    ),
  },
  ({ inspirationStr }) =>
    Effect.gen(function* (_) {
      const inspiration = Domain.InspirationPrompt.make(inspirationStr);
      const usecase = yield* _(Application.GenerateJokeUseCaseService);
      const result = yield* _(
        usecase.execute({
          inspiration,
        }),
      );
      yield* _(Effect.log(result));
    }),
).pipe(cli.Command.withDescription("Generates a random joke."));

const command = Command.make("joke").pipe(
  cli.Command.withDescription("Devilishly smart financial forecasting."),
  cli.Command.withSubcommands([commandGenerate]),
);

export const run = Command.run(command, {
  name: "Jokester",
  version: "1.0.0",
});
