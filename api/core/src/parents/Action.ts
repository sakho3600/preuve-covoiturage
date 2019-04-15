import { MiddlewareInterface } from '../interfaces/MiddlewareInterface';
import { CallInterface } from '../interfaces/CallInterface';

export abstract class Action {
  protected signature: string;

  protected middlewares: MiddlewareInterface[] = [];

  protected handle(call: CallInterface):void {
    throw new Error('No implementation found');
  }

  public cast(call: CallInterface):void {
    function callStack(call: CallInterface, ...steps: MiddlewareInterface[]): void {
      const [ currentStep, ...nextSteps ] = steps;
      if (currentStep) {
        currentStep(call, () => { callStack(call, ...nextSteps) });
      }
    }

    callStack(call, ...this.middlewares, this.handle);
  }
}