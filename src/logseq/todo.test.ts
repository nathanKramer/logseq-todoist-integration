import { deserialize, serialize, TodoStatus } from "./todo";

describe("serialize", () => {
  it("writes out the todo as a logseq line", () => {
    const example = {
      status: "DONE" as TodoStatus,
      name: "confirm I've got the app running",
    };

    expect(serialize(example)).toEqual(
      "	- DONE confirm I've got the app running"
    );
  });
});

describe("deserialize", () => {
  test("DONE example", () => {
    const example = "	- DONE confirm I've got the app running";

    expect(deserialize(example)).toEqual({
      status: "DONE",
      name: "confirm I've got the app running",
    });
  });

  test("TODO example", () => {
    const example = "	- TODO something that needs to be done";

    expect(deserialize(example)).toEqual({
      status: "TODO",
      name: "something that needs to be done",
    });
  });
});
