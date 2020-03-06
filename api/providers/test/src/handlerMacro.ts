import { ContextType, ServiceContainerInterface, NewableType } from '@ilos/common';
import { Macro, TestInterface, ExecutionContext } from 'ava';

import { makeKernel, KernelTestInterface } from './helpers';

interface HandlerConfigInterface {
  service: string;
  method: string;
}

export function handlerMacro<ActionParams, ActionResult, ActionError extends Error = Error, TestContext = unknown>(
  anyTest: TestInterface,
  serviceProviderCtor: NewableType<ServiceContainerInterface>,
  handlerConfig: HandlerConfigInterface,
): {
  test: TestInterface<TestContext & KernelTestInterface>;
  success: Macro<[ActionParams, ActionResult, Partial<ContextType>?], TestContext & KernelTestInterface>;
  error: Macro<[ActionParams, string, Partial<ContextType>?], TestContext & KernelTestInterface>;
} {
  const test = anyTest as TestInterface<TestContext & KernelTestInterface>;

  test.before(async (t) => {
    t.context.kernel = makeKernel(serviceProviderCtor);
    await t.context.kernel.bootstrap();
  });

  test.after.always(async (t) => {
    await t.context.kernel.shutdown();
  });

  const emptyContext = {
    call: {
      user: {},
    },
    channel: {
      service: '',
    },
  };

  const success: Macro<[ActionParams, ActionResult, Partial<ContextType>], TestContext & KernelTestInterface> = async (
    t: ExecutionContext<TestContext & KernelTestInterface>,
    params: ActionParams,
    response: ActionResult,
    currentContext: Partial<ContextType> = {},
  ) => {
    const context = {
      ...emptyContext,
      ...currentContext,
    };

    const kernel = t.context.kernel;
    const result = await kernel.call<ActionParams, ActionResult>(
      `${handlerConfig.service}:${handlerConfig.method}`,
      params,
      context,
    );
    t.deepEqual(result, response);
  };
  success.title = (providedTitle = '', input, expected): string => `${providedTitle} ${input} = ${expected}`.trim();

  const error: Macro<[ActionParams, string, Partial<ContextType>], TestContext & KernelTestInterface> = async (
    t: ExecutionContext<TestContext & KernelTestInterface>,
    params: ActionParams,
    message: string,
    currentContext: Partial<ContextType> = {},
  ) => {
    const context = {
      ...emptyContext,
      ...currentContext,
    };

    const kernel = t.context.kernel;
    const err = await t.throwsAsync<ActionError>(async () =>
      kernel.call<ActionParams>(`${handlerConfig.service}:${handlerConfig.method}`, params, context),
    );
    t.is(err.message, message);
  };
  error.title = (providedTitle = '', input, expected): string => `${providedTitle} ${input} = ${expected}`.trim();

  return {
    success,
    error,
    test,
  };
}
