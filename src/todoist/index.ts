import axios from "axios";

const accessToken = process.env["TODOIST_API_TOKEN"];
const baseURL = "https://api.todoist.com/sync/v9";
const headers = {
  Authorization: `Bearer ${accessToken}`,
};

export type Item = {
  completed_at: string;
  content: string;
  id: string;
  project_id: string;
  task_id: string;
  user_id: string;
};

export async function fetchTodos(since: string): Promise<Item[]> {
  const response = await axios.get("/completed/get_all", {
    params: {
      since,
    },
    baseURL,
    headers,
  });
  return response.data.items as Item[];
}
