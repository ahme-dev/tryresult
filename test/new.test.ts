import { test, assert } from "vitest";
import { tryAsync, trySync } from "../src/new";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";

test("trySync :: with simple function", () => {
	function readOneFileSync() {
		const content = readFileSync("./test/data.txt");
		return content.toString();
	}

	const actual = trySync(() => readOneFileSync());

	const expected = "This is example testing text";

	assert.equal(actual, expected);
});

test("trySync :: with simple function and error in it", () => {
	function readOneFileSync() {
		const content = readFileSync("./test/data.txt");
		throw new Error("An error has occured");
		return content.toString();
	}

	const actual = trySync(() => readOneFileSync()) as Error;

	const expected = new Error("An error has occured");

	assert.equal(actual.message, expected.message);
});

test("tryAsync :: with async function ran inside", async () => {
	async function readOneFileAsync() {
		const content = await readFile("./test/data.txt");
		return content.toString();
	}

	const actual = await tryAsync(readOneFileAsync());

	const expected = "This is example testing text";

	assert.equal(actual, expected);
});

test("tryAsync :: with async function ran inside", async () => {
	async function readOneFileAsync() {
		const content = await readFile("./test/data.txt");
		throw new Error("An error has occured");
		return content.toString();
	}

	const actual = (await tryAsync(readOneFileAsync())) as Error;

	const expected = new Error("An error has occured");

	assert.equal(actual.message, expected.message);
});
