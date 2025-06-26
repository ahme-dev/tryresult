import { err, isErr, isOk, ok, type Result } from "./result";

/**
 * Maps the value of a successful Result, while leaving an error Result unchanged.
 * @param result The Result to map.
 * @param fn The mapping function.
 * @returns A new Result with the mapped value or the original error.
 * @example
 * ```ts
 * import { mapOk, ok, err, Result } from "tryresult";
 *
 * function getName(): Result<string, Error> {
 *   return ok("tryresult");
 * }
 *
 * const result = getName();
 * const mapped = mapOk(result, (value) => value.toUpperCase());
 * if (isOk(mapped)) {
 *   console.log(mapped.value); // TRYRESULT
 * } else {
 *   console.error(mapped.error); // unchanged error
 * }
 * ```
 */
export function mapOk<T, U, E>(
	result: Result<T, E>,
	fn: (value: T) => U,
): Result<U, E> {
	if (isOk(result)) {
		return ok(fn(result.value));
	}
	return result as unknown as Result<U, E>;
}

/**
 * Maps the error of a Result, while leaving a successful Result unchanged.
 * You can provide a custom mapper, or use {@link mapErrToError} or {@link mapErrToString}.
 * @param result The Result to map.
 * @param fn The mapping function for the error.
 * @returns A new Result with the mapped error or the original value.
 * @example
 * ```ts
 * import { mapErr, ok, err, Result } from "tryresult";
 *
 * function getError(): Result<string, Error> {
 *   return err(new Error("An error occurred"));
 * }
 *
 * const result = getError();
 * const mapped = mapErr(result, (error) => `Error Prefix: ${error.message}`);
 * if (isErr(mapped)) {
 *   console.error(mapped.error); // Error Prefix: An error occurred
 * } else {
 *   console.log(mapped.value); // unchanged value
 * }
 * ```
 */
export function mapErr<T, E, F>(
	result: Result<T, E>,
	fn: (error: E) => F,
): Result<T, F> {
	if (isErr(result)) {
		return err(fn(result.error));
	}
	return result as unknown as Result<T, F>;
}

//
// Mappers
//

/**
 * Maps an error to an Error object. To be used with {@link mapErr}.
 * If the error is already an Error, it returns it unchanged.
 * If the error is a string, it creates a new Error with that string.
 * If the error is an object, it converts it to a JSON string and creates a new Error.
 * @param error The error to map.
 * @returns An Error object.
 * @example
 * ```ts
 * import { mapErrToError } from "tryresult";
 *
 * function getError(): Result<string, string> {
 *   return "An error occurred";
 * }
 *
 * const result = getError();
 * const mapped = mapErrToError(result.error);
 * console.error(mapped.error); // error type
 * ```
 */
export function mapErrToError<E>(error: E): Error {
	if (error instanceof Error) {
		return error;
	}
	if (typeof error === "string") {
		return new Error(error);
	}
	if (typeof error === "object" && error !== null) {
		return new Error(JSON.stringify(error));
	}
	return new Error(String(error));
}

/**
 * Maps an error to a string representation. To be used with {@link mapErr}.
 * @param error The error to map.
 * @returns A string representation of the error.
 * @example
 * ```ts
 * import { mapErrToString } from "tryresult";
 *
 * function getError(): Result<string, Error> {
 *   return err(new Error("An error occurred"));
 * }
 *
 * const result = getError();
 * const mapped = mapErrToString(result.error);
 * console.error(mapped.error); // string type
 * ```
 */
export function mapErrToString<E>(error: E): string {
	if (typeof error === "string") {
		return error;
	}
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === "object" && error !== null) {
		return JSON.stringify(error);
	}
	return String(error);
}
