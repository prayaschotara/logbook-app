"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createLogbook } from "@/services/logbookServices";

export function AddLogModal() {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    date: "",
    hours_spent: "",
    project_name: "",
    task_description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const logbookEntry = {
      ...formData,
      user_id: user.id,
      loggedin_user: user.email,
      person_name: user.name,
    };
    try {
      await createLogbook(logbookEntry);
      setFormData({
        date: "",
        hours_spent: "",
        project_name: "",
        task_description: "",
      });
      toast({
        title: "Entry Added",
        description: "Your log book has been updated!",
      });
    } catch (error) {
      console.error("Error creating logbook entry:", error);
    }
  };

  const handleOpen = (isOpen) => {
    if (isOpen) {
      setFormData({
        date: "",
        hours_spent: "",
        project_name: "",
        task_description: "",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="my-2">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle>Add New Log</DialogTitle>
          <DialogDescription>
            Enter the details for your new logbook entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours_spent">Hours Spent</Label>
              <Input
                type="number"
                id="hours_spent"
                name="hours_spent"
                value={formData.hours_spent}
                onChange={handleChange}
                min="0"
                step="0.5"
                max="12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_name">Project Name</Label>
              <Input
                type="text"
                id="project_name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task_description">Task Description</Label>
              <Textarea
                id="task_description"
                name="task_description"
                value={formData.task_description}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Add Entry
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
