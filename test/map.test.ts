import { readFileSync } from "node:fs";
import { assert, describe, test } from "vitest";
import { err, isErr, isOk, mapErr, mapOk, ok, tryFn } from "../src";

describe("map", () => {
	test("should map Ok value and change its type", () => {
		const result = ok(5);
		const mappedResult = mapOk(result, (value) => (value * 2).toString());
		assert.ok(isOk(mappedResult));
		assert.equal(mappedResult.value, "10");
	});

	test("should return Err unchanged", () => {
		const result = err(new Error("A catastrophic error occured"));
		const mappedResult = mapOk(result, () => {
			throw new Error("This should not be called");
		});
		assert.ok(isErr(mappedResult));
		assert.equal(mappedResult.error.message, "A catastrophic error occured");
	});
});

describe("mapErr", () => {
	test("should map Err value and change its type", () => {
		const result = err(new Error("An error occurred"));
		const mappedResult = mapErr(result, (error) => `Error: ${error.message}`);
		assert.ok(isErr(mappedResult));
		assert.equal(mappedResult.error, "Error: An error occurred");
	});

	test("should map unknown Err type", () => {
		function readFileErrorSync() {
			readFileSync("./test/data.txt");
			throw new Error("An unknown error occurred");
		}

		const result = tryFn(readFileErrorSync);
		const mappedResult = mapErr(result, (error) => {
			if (error instanceof Error) {
				return `Error: ${error.message}`;
			}
			if (typeof error === "string") {
				return `Error: ${error}`;
			}
			if (typeof error === "object" && error !== null) {
				return `Error: ${JSON.stringify(error)}`;
			}
		});
		assert.ok(isErr(mappedResult));
		assert.equal(mappedResult.error, "Error: An unknown error occurred");
	});

	test("should return Ok unchanged", () => {
		const result = ok(10);
		const mappedResult = mapErr(result, () => {
			throw new Error("This should not be called");
		});
		assert.ok(isOk(mappedResult));
		assert.equal(mappedResult.value, 10);
	});
});
