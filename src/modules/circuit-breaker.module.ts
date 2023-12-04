import { DynamicModule, Global, Module } from '@nestjs/common';
import CircuitBreaker from 'opossum';
import { CircuitBreakerService } from '../services/circuit-breaker.service';

@Global()
@Module({})
export class CircuitBreakerModule {
  static forRoot(options: CircuitBreaker.Options): DynamicModule {
    return {
      module: CircuitBreakerModule,
      providers: [
        {
          provide: CircuitBreakerService,
          useValue: new CircuitBreakerService(options),
        },
      ],
      exports: [CircuitBreakerService],
    };
  }
}
