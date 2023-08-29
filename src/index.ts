import { fetchTodos } from "./todoist";
import { groupByDay, syncJournal } from "./integration";
import { Todo, serialize } from "./logseq/todo";

// 1. Get todos
// 2. group by day
// 3. get journals for corresponding days
// 4. replace todoist block with the new todoist block according to current todos
export async function main() {
  const todos = await fetchTodos(`${daysAgo(1)}T00:00:00.000000Z`);
  const grouped = groupByDay(todos);

  for (const [key, todos] of Object.entries(grouped)) {
    const logseqTodos: Todo[] = todos.map((todo) => ({
      status: todo.completed_at ? "DONE" : "TODO",
      name: todo.content,
    }));

    const newTodoStr = logseqTodos.map(serialize).join("\n");
    await syncJournal(key, newTodoStr);
  }
}

function daysAgo(n: number) {
  // 1. Get today's date
  const today = new Date();

  // 2. Subtract 5 days.
  // Note: Date objects automatically adjust for month/year boundaries when you subtract days.
  today.setDate(today.getDate() - n);

  // 3. Format as ISO8601 without time component
  return today.toISOString().split("T")[0];
}
