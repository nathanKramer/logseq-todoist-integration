import { deserialize, Todo } from "./todo";

const config = {
  todoistLineDescriptor: "todoist",
};

const todoistLine = `- [[${config.todoistLineDescriptor}]]`;

export function parseJournal(contents: string): Todo[] {
  let todoistBlock: string[] = [];
  let insideTodoistBlock = false;

  contents.split("\n").forEach((line) => {
    if (insideTodoistBlock && line.charAt(0) !== "\t") {
      insideTodoistBlock = false;
      return;
    }

    if (line === todoistLine) {
      insideTodoistBlock = true;
      return;
    }

    if (!insideTodoistBlock) {
      return;
    }

    todoistBlock.push(line);
  });

  return todoistBlock.map(deserialize);
}

export function formatISO(isoDateString: string) {
  const isoDate = new Date(isoDateString);

  const year = isoDate.getFullYear();
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const day = String(isoDate.getDate()).padStart(2, "0");

  return `${year}_${month}_${day}`;
}
