// Get Task
const api = `http://localhost:5000/api/task`;

export const getTasks = async ({ category, favorite }) => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (favorite) params.append("favorite", "true");

  const res = await fetch(`${api}?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// Delete Task
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${api}/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return res.json();
};

// Toggle favorite task
export const toggleFavorite = async (taskId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${api}/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to toggle favorite");
  return res.json();
};

// Update Task

export const updateTaskApi = async (id, updatedData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update task");
  }

  return data;
};