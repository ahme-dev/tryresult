import { test, assert } from "vitest";
import { resultAll, resultAsync } from "../src/old";

test("resultAll :: with function that throws", async () => {
	const actual = await resultAll(() => {
		throw new Error("An error");
	});

	const expected = new Error("An error");

	assert.equal(actual.message, expected.message);
});

test("resultAsync :: with function that throws", async () => {
	const res = async () => {
		throw new Error("An error");
	};

	const actual = await resultAsync(res());

	const expected = new Error("An error");

	assert.equal(actual.message, expected.message);
});

test("resultAsync :: with function that returns promise", async () => {
	const res = async () => {
		throw new Error("An error");
	};

	const actual = await resultAsync(res());

	const expected = new Error("An error");

	assert.equal(actual.message, expected.message);
});
