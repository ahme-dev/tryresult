// takes in a function, and catches any errors in it
// then returns either the function's returned or the error
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

// takes in an async function and catches errors in it
// then returns either the function's returned or the error
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
export function hasError(err: unknown): err is Error {
	return err instanceof Error;
}
