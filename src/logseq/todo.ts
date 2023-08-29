export type TodoStatus = "DONE" | "TODO";
export interface Todo {
  status: TodoStatus;
  name: string;
}

export function serialize(todo: Todo): string {
  return `\t- ${todo.status} ${todo.name}`;
}

export function deserialize(todoString: string): Todo {
  const regex = /^\t-\s+(DONE|TODO)\s+(.*)$/;
  const match = todoString.match(regex);

  const status = match![1] as TodoStatus;
  const name = match![2];

  return {
    status,
    name,
  };
}
