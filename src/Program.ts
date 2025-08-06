import * as Effect from "effect/Effect";
import * as Domain from "./Domain.js";
import * as Application from "./Application.js";

const program = Effect.gen(function* (_) {
  const inspiration = Domain.InspirationPrompt.make(
    "Why did the tomato turn red?",
  );
  const usecase = yield* _(Domain.GenerateJokeUseCase);
  const result = yield* _(
    usecase.execute({
      inspiration,
    }),
  );
  yield* _(Effect.log(result));
});

const runnable = program.pipe(
  Effect.provide(Application.GenerateJokeUseCase.Default),
  // Effect.provideService(
  //   Domain.GenerateJokeUseCase,
  //   Domain.customGenerateJokeUseCase,
  // ),
);

Effect.runPromise(runnable);
