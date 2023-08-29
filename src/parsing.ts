const config = {
  todoistLineDescriptor: "todoist",
};

const todoistLine = `- [[${config.todoistLineDescriptor}]]`;

export function parseJournal(contents: string): string[] {
  let todoistBlock: string[] = [];
  let insideTodoistBlock = false;

  contents.split("\n").forEach((line) => {
    if (insideTodoistBlock && line.charAt(0) !== "\t") {
      insideTodoistBlock = false;
      console.log("Ended Todoist block");
      return;
    }

    if (line === todoistLine) {
      insideTodoistBlock = true;
      console.log("Started Todoist Block");
      return;
    }

    if (!insideTodoistBlock) {
      return;
    }

    todoistBlock.push(line);
  });

  return todoistBlock;
}
