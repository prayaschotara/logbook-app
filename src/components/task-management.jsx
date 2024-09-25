import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Trash } from "lucide-react";
import useUser from "@/hooks/use-user";
import {
  createTask,
  deleteTask,
  getTaskByUserId,
  updateTask,
} from "@/services/taskServices";
import { toast } from "@/hooks/use-toast";

export default function TaskManagementWidget() {
  const user = useUser();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (newTask.trim() !== "") {
      await createTask({
        user_id: user.id,
        task: newTask,
      });

      const data = await getTaskByUserId(user.id);
      if (data) {
        setTasks(data);
        setNewTask("");
        toast({
          title: "Task added successfully",
          variant: "default",
        });
      }
    }
  };
  const toggleTask = async (id, task) => {
    await updateTask(id, { isComplete: !task.isComplete });
    const data = await getTaskByUserId(user.id);
    if (data) {
      setTasks(data);
    }
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    const data = await getTaskByUserId(user.id);
    if (data) {
      setTasks(data);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const data = await getTaskByUserId(user.id);
        if (data) {
          setTasks(data);
        }
      };
      fetchTasks();
    }
  }, [user]);

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
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center mb-2 justify-between"
              >
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`mr-2 ${task.isComplete ? "bg-green-500" : ""}`}
                    onClick={() => toggleTask(task.id, task)}
                  >
                    <Check
                      className={`h-4 w-4 ${
                        task.isComplete ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  <span className={task.isComplete ? "line-through" : ""}>
                    {task.task}
                  </span>
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`mr-2 hover:bg-red-500 text-muted-foreground hover:text-white`}
                    onClick={() => removeTask(task.id)}
                  >
                    <Trash className={`h-4 w-4`} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center mb-2">
              <span className="text-muted-foreground">No tasks found</span>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
