import { promises } from "fs";
const { readFile } = promises;

import { parseJournal } from "./parsing";

async function main() {
  const data = await readFile("./example-journal.md", "utf-8");
  const fileContents = data.toString();

  const todos = parseJournal(fileContents);

  console.log("TODOS", todos);
}

main();
