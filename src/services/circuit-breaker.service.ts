// circuit-breaker.service.ts
import { Injectable, Scope } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';

@Injectable({ scope: Scope.DEFAULT })
export class CircuitBreakerService {
  private breakers = new Map<string, CircuitBreaker>();
  private defaultOptions: CircuitBreaker.Options;

  constructor(options: CircuitBreaker.Options) {
    this.defaultOptions = options;
  }

  createBreaker(key: string, options: CircuitBreaker.Options): CircuitBreaker {
    if (!this.breakers.has(key)) {
      const breaker = new CircuitBreaker(
        async () => {
          // This logic injectable in run time
        },
        { ...this.defaultOptions, ...options },
      );

      this.breakers.set(key, breaker);
    }

    return this.breakers.get(key);
  }
}
