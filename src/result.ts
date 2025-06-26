/**
 * Result type representing a computation that can either succeed with a value of type T or fail with an error of type E.
 */
export type Result<T, E> =
	| { readonly _tag: "Ok"; readonly value: T }
	| { readonly _tag: "Err"; readonly error: E };

/**
 * Create a successful Result.
 * @param value The value to wrap in the Result.
 * @returns A Result representing success.
 * @example
 * ```ts
 * import { ok, Result } from "tryresult";
 *
 * function doSomething(): Result<string, Error> {
 *   // ...
 *   return ok("Success!");
 * }
 */
export function ok<T>(value: T): Result<T, never> {
	return { _tag: "Ok", value };
}

/**
 * Create a failed Result.
 * @param value The value to wrap in the Result.
 * @returns A Result representing failure.
 * @example
 * ```ts
 * import { err, Result } from "tryresult";
 *
 * function doSomething(): Result<string, Error> {
 *   // ...
 *   return err(new Error("Failure!"));
 *   // ...
 * }
 */
export function err<E>(error: E): Result<never, E> {
	return { _tag: "Err", error };
}

/**
 * Check if a Result is Ok.
 * @param result The Result to check.
 * @returns True if the Result is Ok, false otherwise.
 * @example
 * ```ts
 * import { isOk, ok, err, Result } from "tryresult";
 *
 * function fetchData(): Result<string, Error> {
 *   // ...
 * }
 *
 * function handleData(result: Result<string, Error>) {
 *   const result = fetchData();
 *   if (isOk(result)) {
 *     console.log("Operation succeeded with value:", result.value);
 *   } else {
 *     console.error("Operation failed with error:", result.error);
 *   }
 * }
 */
export function isOk<T, E>(
	result: Result<T, E>,
): result is { _tag: "Ok"; value: T } {
	return result._tag === "Ok";
}

/**
 * Check if a Result is Err.
 * @param result The Result to check.
 * @returns True if the Result is Err, false otherwise.
 * @example
 * ```ts
 * import { isErr, ok, err, Result } from "tryresult";
 *
 * function fetchData(): Result<string, Error> {
 *   // ...
 * }
 *
 * function handleData(result: Result<string, Error>) {
 *   const result = fetchData();
 *   if (isErr(result)) {
 *     console.error("Operation failed with error:", result.error);
 *   } else {
 *     console.log("Operation succeeded with value:", result.value);
 *   }
 * }
 */
export function isErr<T, E>(
	result: Result<T, E>,
): result is { _tag: "Err"; error: E } {
	return result._tag === "Err";
}

/**
 * Unwraps the value from an Ok Result or throws the error from an Err Result.
 * @param result The Result to unwrap.
 * @returns The value if the Result is Ok.
 * @throws The error if the Result is Err.
 * @example
 * ```ts
 * import { okOrThrow, ok, err, Result } from "tryresult";
 *
 * function fetchData(): Result<string, Error> {
 *   // ...
 * }
 *
 * const result = fetchData();
 * const value = okOrThrow(result); // will throw if result is Err
 * console.log("Fetched data:", value);
 * ```
 */
export function okOrThrow<T, E>(result: Result<T, E>): T {
	if (isOk(result)) {
		return result.value;
	}
	if (isErr(result)) {
		throw result.error;
	}
	throw new Error("Invalid result type");
}

/**
 * Unwraps the value from an Ok Result or returns a default value if the Result is Err.
 * This will essentially provide a fallback value while ignoring the error.
 * @param result The Result to unwrap.
 * @param defaultValue The default value to return if the Result is Err.
 * @returns The value if the Result is Ok, otherwise the default value.
 * @example
 * ```ts
 * import { okOr, ok, err, Result } from "tryresult";
 *
 * function fetchData(): Result<string, Error> {
 *   // ...
 * }
 *
 * const result = fetchData();
 * const value = okOr(result, "Default Value"); // will return "Default Value" if result is Err
 * console.log("Fetched data:", value);
 * ```
 */
export function okOr<T, E>(result: Result<T, E>, defaultValue: T): T {
	if (isOk(result)) {
		return result.value;
	}
	return defaultValue;
}

/**
 * Matches a Result and executes the corresponding handler based on whether it is Ok or Err.
 * @param result The Result to match.
 * @param handlers An object containing `ok` and `err` handlers.
 * @returns The result of the executed handler.
 * @example
 * ```ts
 * import { match, ok, err, Result } from "tryresult";
 *
 * function fetchData(): Result<string, Error> {
 *   // ...
 * }
 *
 * const result = fetchData();
 * const output = match(result, {
 *   ok: (value) => `Success: ${value}`,
 *   err: (error) => `Error: ${error.message}`,
 * });
 * console.log(output);
 * ```
 */
export function match<T, E, U>(
	result: Result<T, E>,
	handlers: { ok: (value: T) => U; err: (error: E) => U },
): U {
	if (isOk(result)) {
		return handlers.ok(result.value);
	}
	if (isErr(result)) {
		return handlers.err(result.error);
	}
	throw new Error("Invalid result type");
}
