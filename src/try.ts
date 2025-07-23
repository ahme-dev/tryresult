import { err, isErr, ok, type Result } from "./result";

/**
 * Run a function, catching whatever's thrown and return a Result.
 * Works with both synchronous and asynchronous functions.
 *  If the function throws an error, it will be caught and set as unknown under Err.
 *  If the function returns a value, it will be set as Ok.
 * @param fn function to run (sync or async)
 * @returns result of the function wrapped in Result (or Promise<Result> if async)
 * @example
 * ```ts
 * import { tryFn, ok, err, isErr } from "tryresult";
 *
 * const result = tryFn(() => {
 *   return "Hello from tryFn!";
 * });
 * if (isErr(result)) {
 *   // result.error is unknown and must be checked
 *   you can check `mapErr` for easier error mapping
 * 	 // or just use `tryFn` to auto convert thrown values to Error
 *   if (result.error instanceof Error) {
 *     console.error("An error occurred:", result.error.message);
 *   } else {
 *     console.error("An error occurred:", result.error);
 *   }
 * }
 *
 * const value = result.value; // "Hello from tryFn!"
 */
export function tryUnknownFn<T, E = unknown>(
	fn: () => Promise<T>,
): Promise<Result<T, E>>;
export function tryUnknownFn<T, E = unknown>(fn: () => T): Result<T, E>;
export function tryUnknownFn<T, E = unknown>(
	fn: () => T | Promise<T>,
): Result<T, E> | Promise<Result<T, E>> {
	try {
		const r = fn();
		if (r instanceof Promise) {
			return r.then((value) => ok(value)).catch((error) => err(error as E));
		}
		return ok(r as T);
	} catch (error) {
		return err(error as E);
	}
}

/**
 * Run a function, catching whatever's thrown and return a Result.
 * Note that this function will change thrown values to Error type. If you'd prefer to explicitly map errors, use {@link `tryUnknownFn`}.
 *  If the function throws an error, it will be caught and set as an Error under Err.
 *  If the function returns a value, it will be set as Ok.
 * @param fn function to run (sync or async)
 * @returns result of the function wrapped in Result (or Promise<Result> if async)
 * @example
 * ```ts
 * import { tryFn, ok, err, isErr } from "tryresult";
 *
 * const result = tryFn(() => {
 *   return "Hello from tryFn!";
 * });
 * if (isErr(result)) {
 *   // result.error is guranteed to be an Error
 *   console.error("An error occurred:", result.error);
 * }
 *
 * const value = result.value; // "Hello from tryFn!"
 */
export function tryFn<T, E = Error>(
	fn: () => Promise<T>,
): Promise<Result<T, E>>;
export function tryFn<T, E = Error>(fn: () => T): Result<T, E>;
export function tryFn<T, E = Error>(
	fn: () => T | Promise<T>,
): Result<T, E> | Promise<Result<T, E>> {
	const r = tryUnknownFn(fn);

	if (r instanceof Promise) {
		return r.then((res) => {
			if (isErr(res)) {
				if (res.error instanceof Error) {
					return err(res.error as E);
				}
				return err(new Error(String(res.error)) as E);
			}

			return res;
		});
	}

	if (isErr(r)) {
		if (r.error instanceof Error) {
			return err(r.error as E);
		}
		return err(new Error(String(r.error)) as E);
	}

	return r as Result<T, E>;
}
