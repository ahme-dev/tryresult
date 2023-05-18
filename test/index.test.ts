import { test, assert } from "vitest";
import { resultAll } from "../src";

test("result", () => {
	// temporary
	resultAll(() => 0);
	assert.equal(true, true);
});
