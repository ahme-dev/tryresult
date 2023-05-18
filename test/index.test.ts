import { test, assert } from "vitest";
import { result } from "../src";

test("result", () => {
	// temporary
	result(() => 0);
	assert.equal(true, true);
});
