#!/usr/bin/env node

import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { AppLayer } from "./Infra/AppLayer.js";
import * as Config from "effect/Config";
import * as Platform from "@effect/platform-node";
import * as PlatformEffect from "@effect/platform";
import * as Domain from "./Domain/Joke.js";
import * as GenerateJokeServiceFactory from "./Infra/GenerateJokeServiceFactory.js";
import { run } from "./Infra/Cli.js";
import * as Anthropic from "@effect/ai-anthropic";

const GenerateJokeServiceLive = Layer.effect(
  Domain.GenerateJokeService,
  GenerateJokeServiceFactory.makeGenerateJokeServiceLLM,
);

const AiModelLayer = Anthropic.AnthropicLanguageModel.layer({
  model: "claude-3-5-haiku-latest",
});

const AnthropicClient = Anthropic.AnthropicClient.layerConfig({
  apiKey: Config.redacted("ANTHROPIC_API_KEY"),
});

const AnthropicWithHttp = Layer.provide(
  AnthropicClient,
  Platform.NodeHttpClient.layerUndici,
);

const AiLayer = AiModelLayer.pipe(Layer.provide(AnthropicWithHttp));

const ConfigProviderLive = Layer.unwrapEffect(
  PlatformEffect.PlatformConfigProvider.fromDotEnv(".env").pipe(
    Effect.map(Layer.setConfigProvider),
    Effect.provide(NodeContext.layer),
  ),
);

export const LiveLayer = Layer.mergeAll(
  AiLayer.pipe(Layer.provide(ConfigProviderLive)),
  AppLayer.pipe(Layer.provide(GenerateJokeServiceLive)).pipe(
    Layer.provide(AiLayer),
    Layer.provide(ConfigProviderLive),
  ),
  NodeContext.layer,
);

const program = run(process.argv).pipe(Effect.provide(LiveLayer));

program.pipe(NodeRuntime.runMain({ disableErrorReporting: false }));
