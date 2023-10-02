import { replaceTodoistBlock } from ".";

const topOfJournal = `
- foo
	- more stuff
		- more stuff again`;

const todoistBlock = `
- [[todoist]]
	- DONE confirm I've got the app running
	- DONE confirm the tests are passing
`;

const collapsedBlock = `
- [[todoist]]
\tcollapsed:: true
\t- DONE confirm I've got the app running
\t- DONE confirm the tests are passing
`;

const bottomOfJournal = `- unrelated other stuff
- at the bottom
- that shouldn't be replaced`;

const replacementTasks = `\t- DONE new task
\t- DONE another new task
\t- DONE yet another new task`;

describe("replaceTodoistBlock", () => {
  test("simple case", () => {
    expect(
      replaceTodoistBlock(
        `${topOfJournal}${todoistBlock}${bottomOfJournal}`,
        replacementTasks
      )
    ).toEqual(
      `${topOfJournal}
- [[todoist]]
\t- DONE new task
\t- DONE another new task
\t- DONE yet another new task
${bottomOfJournal}`
    );
  });

  test("collapsed case", () => {
    // this case makes the regex more complicated.
    expect(
      replaceTodoistBlock(
        `${topOfJournal}${collapsedBlock}${bottomOfJournal}`,
        replacementTasks
      )
    ).toEqual(`${topOfJournal}
- [[todoist]]
\tcollapsed:: true
\t- DONE new task
\t- DONE another new task
\t- DONE yet another new task
${bottomOfJournal}`);
  });
});
