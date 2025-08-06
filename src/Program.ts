import * as Effect from "effect/Effect";
import * as Domain from "./Domain.js";
import * as Application from "./Application.js";
import * as Infra from "./Infra.js";

const program = Effect.gen(function* (_) {
  const inspiration = Domain.InspirationPrompt.make(
    "Why did the tomato turn red?",
  );
  const usecase = yield* _(Application.GenerateJokeUseCaseService);
  const result = yield* _(
    usecase.execute({
      inspiration,
    }),
  );
  yield* _(Effect.log(result));
});

const runnable = program.pipe(
  Effect.provideService(
    Application.GenerateJokeUseCaseService,
    Infra.GenerateJokeUseCaseLLM,
  ),
);

Effect.runPromise(runnable);
