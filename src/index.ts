/**
 *
 * takes in a function, and catches any errors in it
 * then returns either the function's returned or the error
 *
 * @param func The function to run, should typically look like ()=>yourfunction(2)
 * @returns A promise containing a union of the value and the error
 */
export async function resultAll<T>(func: () => T): Promise<T | Error> {
	return new Promise((resolve) => {
		try {
			const ok = func();
			resolve(ok);
		} catch (err) {
			resolve(err as Error);
		}
	});
}

/**
 *
 * Takes in an async function and catches errors in it
 * then returns either the function's returned or the error
 *
 * @param promise Can be a promise or a called async function which returns a promise
 * @returns A promise containing a union of the value and the error
 */
export async function resultAsync<T>(promise: Promise<T>): Promise<T | Error> {
	try {
		const ok = await promise;
		return ok;
	} catch (err) {
		return err as Error;
	}
}

// checks if a variable is of type Error
// used to type guard against results being errors

/**
 *
 * Takes in a value which can possibly be of type error and returns a boolean indicating if it was or not.
 * Also it'll act as a type constraint, making the variable change from union type to the value type, in subsequent code.
 *
 * @param possibleErr Any value which can possibly be an error
 * @returns A boolean indicating whether the value was of type error
 */
export function hasError(possibleErr: unknown): possibleErr is Error {
	return possibleErr instanceof Error;
}
