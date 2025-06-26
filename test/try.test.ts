import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { assert, describe, test } from "vitest";
import { isErr, isOk, tryFn } from "../src";

describe("tryFn - Sync", () => {
	test("should return value on simple function with no error", () => {
		const actual = tryFn(() => readFileSuccessSync());
		const expectedValue = "This is example testing text";

		assert.ok(isOk(actual));
		assert.equal(actual.value, expectedValue);
	});

	test("should return error on simple function with error", () => {
		const result = tryFn(() => readFileErrorSync());

		assert.ok(isErr(result));
		assert.equal(result.error.message, "An error has occured");
	});

	test("should catch anything else that's thrown ", () => {
		const result = tryFn(() => readFileStringErrorSync());

		assert.ok(isErr(result));
	});
});

describe("tryFn - Async", async () => {
	test("should return value on async function", async () => {
		const result = await tryFn(() => readFileSuccessAsync());

		assert.ok(isOk(result));
		assert.equal(result.value, "This is example testing text");
	});

	test("should catch error in async function", async () => {
		const result = await tryFn(() => readFileErrorAsync());

		assert.ok(isErr(result));
		assert.equal(result.error.message, "An error has occured");
	});

	test("should catch anything else that's thrown ", async () => {
		const result = await tryFn(() => readFileStringErrorAsync());

		assert.ok(isErr(result));
	});
});

//
// Helpers
//

function readFileSuccessSync() {
	const content = readFileSync("./test/data.txt");
	return content.toString();
}

function readFileErrorSync() {
	readFileSync("./test/data.txt");
	throw new Error("An error has occured");
}
function readFileStringErrorSync() {
	readFileSync("./test/data.txt");
	throw "An error has occured";
}

async function readFileSuccessAsync() {
	const content = await readFile("./test/data.txt");
	return content.toString();
}

async function readFileErrorAsync() {
	await readFile("./test/data.txt");
	throw new Error("An error has occured");
}

async function readFileStringErrorAsync() {
	await readFile("./test/data.txt");
	throw "This is a string error";
}
