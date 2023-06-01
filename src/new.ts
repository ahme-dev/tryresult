/**
 * A union type that can be either the value or the error.
 */
type Result<T> = T | Error;

/**
 *
 * A function that checks if the **_Result_** type contains an error.
 * Is actually a typeguard.
 *
 * @param result a **_Result_** ttype generated using tryAsync or trySync
 * @returns a boolean indicating whether result was an error
 *
 */
export function isError<T>(result: Result<T>): result is Error {
	return result instanceof Error;
}

/**
 *
 * Function that helps discard errors or set default values in place of errors for **_Result_** types.
 *
 * @param result a **_Result_** type generated using tryAsync or trySync
 * @param defaultValue a value to use when an error occurs
 * @returns either the acquired value or the default value
 *
 * @example
 * // get result as usual
 * let result = trySync(getMyName());
 * // call okOr on result and a default value
 * let name = okOr(result, "Unnamed");
 *
 */
export function okOr<T>(result: Result<T>, defaultValue: T) {
	if (isError(result)) return defaultValue;
	else return result;
}

/**
 *
 * Function that takes in an async function and catches errors in it.
 * Collects either the value or the error in a **_Result_** type.
 *
 * @param promise a promise or a called async function which returns a promise
 * @returns a promise containing a **_Result_** type
 *
 */
export async function tryAsync<T>(promise: Promise<T>): Promise<Result<T>> {
	try {
		const ok = await promise;
		return ok;
	} catch (err) {
		return err as Error;
	}
}

/**
 *
 * Function that takes in a callback and catches errors in it.
 * Collects either the value or the error in a **_Result_** type.
 *
 * @param callback any function that can throw
 * @returns a **_Result_** type
 *
 */
export function trySync<T>(callback: () => T): Result<T> {
	try {
		const ok = callback();
		return ok;
	} catch (err) {
		return err as Error;
	}
}
