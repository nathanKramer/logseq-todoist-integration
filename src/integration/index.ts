import { promises } from "fs";
const { readFile, writeFile } = promises;

import { formatISO } from "../logseq";
import { Item } from "../todoist";

/**
 * Syncs the journal for the provided day.
 * @param journalKey YYYY_MM_DD
 * @param newTodoStr the new children of the todoist block
 */
export async function syncJournal(journalKey: string, newTodoStr: string) {
  const lgsqDir = process.env["LOGSEQ_DIR"];
  const journalPath = `${lgsqDir}/journals/${journalKey}.md`;

  let fileContents = "";
  try {
    const data = await readFile(journalPath, "utf-8");
    fileContents = data.toString();
  } catch (err) {
    console.warn(`couldn't find ${journalKey}.md, it will be created`);
  }

  let updatedFile = replaceTodoistBlock(fileContents, newTodoStr);

  try {
    await writeFile(journalPath, updatedFile);
    console.info(`${journalKey}.md ✅`);
  } catch (err) {
    console.warn(`${journalKey}.md 💥`, err);
  }
}

export function groupByDay(todos: Item[]) {
  return todos.reduce((acc, item) => {
    const dateKey = formatISO(item.completed_at);
    const items = acc[dateKey] || [];
    items.push(item);
    return {
      ...acc,
      [dateKey]: items,
    };
  }, {} as Record<string, Item[]>);
}

export function replaceTodoistBlock(journal: string, newTodos: string) {
  const blockMatcher =
    /(- \[\[todoist\]\]$\n((?:\t\w+::\s+(?:true|false)\n)*))((?:\t-.*$\n*)*)/gm;
  // .  block heading   (  metadata, e.g is it collapsed?  )(   each task  )

  if (journal.match(blockMatcher)) {
    return journal.replace(
      // matches the todoist block and its children
      blockMatcher,
      `$1${newTodos}\n`
    );
  }

  return `${journal}\n\n- [[todoist]]\n${newTodos}`;
}
