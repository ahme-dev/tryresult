import { test, assert } from "vitest";
import { tryAsync, trySync } from "../src/alternative";
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

test("tryAsync :: with async function ran inside", async () => {
	async function readOneFileAsync() {
		const content = await readFile("./test/data.txt");
		return content.toString();
	}

	const actual = await tryAsync(readOneFileAsync());

	const expected = "This is example testing text";

	assert.equal(actual, expected);
});
