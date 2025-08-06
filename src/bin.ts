#!/usr/bin/env node

import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Application from "./Application.js";
import * as GenerateJokeUseCase from "./Infra/GenerateJokeUseCaseService.js";
import { run } from "./Infra/Cli.js";
import { AppLayer } from "./Infra/AppLayer.js";

const GenerateJokeUseCaseLive = Layer.succeed(
  Application.GenerateJokeUseCaseService,
  GenerateJokeUseCase.GenerateJokeUseCaseLLM,
);

export const LiveLayer = Layer.mergeAll(
  AppLayer,
  GenerateJokeUseCaseLive,
  NodeContext.layer,
);

run(process.argv).pipe(
  Effect.provide(LiveLayer),
  NodeRuntime.runMain({ disableErrorReporting: true }),
);
