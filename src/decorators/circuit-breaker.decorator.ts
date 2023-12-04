// circuit-breaker.decorator.ts
import { Inject } from '@nestjs/common';

import CircuitBreaker from 'opossum';
import { CircuitBreakerService } from '../services/circuit-breaker.service';

export function CircuitBreakerDecorator(
  options: CircuitBreaker.Options,
): MethodDecorator {
  const injectCircuitBreakerService = Inject(CircuitBreakerService);
  return function (
    target: any,
    propertyName: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    injectCircuitBreakerService(target, 'CircuitBreakerService');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const breaker = this.circuitBreakerService.createBreaker(
        propertyName.toString(),
        options,
      );

      breaker.action = originalMethod.bind(this, ...args);

      return breaker.fire(() => originalMethod.apply(this, args));
    };

    return descriptor;
  };
}
