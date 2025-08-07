import * as Command from "@effect/cli/Command";

import { commandGenerate } from "./Generate.js";

const command = Command.make("joke").pipe(
  Command.withDescription("Devilishly smart financial forecasting."),
  Command.withSubcommands([commandGenerate]),
);

export const run = Command.run(command, {
  name: "Jokester",
  version: "1.0.0",
});
