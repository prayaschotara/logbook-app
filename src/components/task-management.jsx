import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export default function TaskManagementWidget({ initialTasks }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review Q3 financial report", completed: false },
    { id: 2, text: "Prepare for team meeting", completed: true },
    { id: 3, text: "Update product roadmap", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, text: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="mr-2"
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        <ScrollArea className="h-[300px] w-full">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center mb-2">
              <Button
                variant="outline"
                size="icon"
                className={`mr-2 ${task.completed ? "bg-green-500" : ""}`}
                onClick={() => toggleTask(task.id)}
              >
                <Check
                  className={`h-4 w-4 ${
                    task.completed ? "text-white" : "text-muted-foreground"
                  }`}
                />
              </Button>
              <span className={task.completed ? "line-through" : ""}>
                {task.text}
              </span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
