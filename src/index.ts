export async function result<T>(func: () => T): Promise<T | Error> {
	return new Promise((resolve) => {
		try {
			const ok = func();
			resolve(ok);
		} catch (err) {
			resolve(err as Error);
		}
	});
}

export async function resultAsync<T>(promise: Promise<T>): Promise<T | Error> {
	try {
		const data = await promise;
		return data;
	} catch (err) {
		return err as Error;
	}
}

export function hasError(err: unknown): err is Error {
	return err instanceof Error;
}
