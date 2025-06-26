import { assert, describe, test } from "vitest";
import { err, isErr, isOk, match, ok, okOr, okOrThrow } from "../src";

describe("Ok and Err", () => {
	test("should create an Ok result with the correct value", () => {
		const result = ok("tryresult");

		assert.equal(result._tag, "Ok");
		assert.ok(isOk(result));
		assert.equal(result.value, "tryresult");
	});

	test("should create an Err result with the correct error", () => {
		const error = new Error("Test error");
		const result = err(error);

		assert.equal(result._tag, "Err");
		assert.ok(isErr(result));
		assert.equal(result.error, error);
	});
});

describe("isOk and isErr", () => {
	test("isOk should return true for Ok results", () => {
		const result = ok("tryresult");

		assert.ok(isOk(result));
		assert.notOk(isErr(result));
		assert.equal(result.value, "tryresult");
	});

	test("isErr should return true for Err results", () => {
		const error = new Error("File not found");
		const result = err(error);

		assert.ok(isErr(result));
		assert.notOk(isOk(result));
		assert.equal(result.error.message, "File not found");
	});
});

describe("unwrapOrThrow", () => {
	test("should return the value from an Ok result", () => {
		const result = ok("Example testing text");
		const value = okOrThrow(result);
		assert.equal(value, "Example testing text");
	});

	test("should throw the error from an Err result", () => {
		const error = new Error("File not found");
		const result = err(error);

		assert.throws(() => {
			okOrThrow(result);
		}, error);
	});
});

describe("unwrapOr", () => {
	test("should return the value from an Ok result", () => {
		const result = ok("Example testing text");
		const value = okOr(result, "Default content");
		assert.equal(value, "Example testing text");
	});

	test("should return the default value for an Err result", () => {
		const error = new Error("File access error");
		const result = err(error);

		const value = okOr(result, "Default content");
		assert.equal(value, "Default content");
	});
});

describe("match", () => {
	test("should call the ok handler for an Ok result", () => {
		const result = ok("tryresult");
		const matched = match(result, {
			ok: (content) => `String: ${content}`,
			err: (error: Error) => `Error: ${error.message}`,
		});

		assert.equal(matched, "String: tryresult");
	});

	test("should call the err handler for an Err result", () => {
		const error = new Error("Permission denied");
		const result = err(error);

		const matched = match(result, {
			ok: (content) => `String: ${content}`,
			err: (error: Error) => `Error: ${error.message}`,
		});

		assert.equal(matched, "Error: Permission denied");
	});
});
