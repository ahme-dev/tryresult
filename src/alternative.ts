type Result<T> = T | Error;

export function isError<T>(possibleErr: Result<T>): possibleErr is Error {
	return possibleErr instanceof Error;
}

export async function tryAsync<T>(promise: Promise<T>): Promise<Result<T>> {
	try {
		const ok = await promise;
		return ok;
	} catch (err) {
		return err as Error;
	}
}

export function trySync<T>(func: () => T): Result<T> {
	try {
		const ok = func();
		return ok;
	} catch (err) {
		return err as Error;
	}
}
