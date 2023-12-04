# NestJS Circuit Breaker

This NestJS module provides a Circuit Breaker pattern implementation using the `opossum` library. It's designed to gracefully handle failures in microservices and distributed systems.

## Features

- Easy-to-use decorator to apply circuit breakers to any asynchronous method.
- Configurable global and per-method circuit breaker options.
- Seamless integration with NestJS Dependency Injection.

## Installation

Install the package using npm:

```bash
npm install nest-circuit-breaker
```

## Usage

### Setup

First, import and configure the `CircuitBreakerModule` in your main module (e.g., `AppModule`). You can provide default circuit breaker options that will apply to all instances.

```typescript
import { Module } from '@nestjs/common';
import { CircuitBreakerModule } from 'nest-circuit-breaker';

@Module({
  imports: [
    CircuitBreakerModule.forRoot({
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000
    }),
    // ... other imports
  ],
})
export class AppModule {}
```

### Applying Circuit Breaker

Use the `@CircuitBreaker` decorator on any asynchronous method to protect it with a circuit breaker. You can override the default options per method.

```typescript
import { Injectable } from '@nestjs/common';
import { CircuitBreaker } from 'nest-circuit-breaker';

@Injectable()
export class SomeService {
  @CircuitBreaker({ timeout: 5000 })
  async someMethod() {
    // ... method logic
  }
}
```

### Advanced Configuration

You can pass additional configuration options to `CircuitBreakerModule.forRoot()` or the `@CircuitBreaker` decorator based on the `opossum` options.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
