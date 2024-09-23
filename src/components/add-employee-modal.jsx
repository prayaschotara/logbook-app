"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEmployee } from "@/services/employeeServices"; // Import the service
import { Loader2 } from "lucide-react";

export function AddEmployeeModal() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(""); // Reset error state
    try {
      const newEmployee = { name, role, designation, email, password };
      await createEmployee(newEmployee);
      setMessage(`${name} has been added as a ${designation} (${role}).`);
      // Reset form
      setName("");
      setRole("");
      setDesignation("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (err) {
      setError("Failed to add employee. Please try again.");
      console.error("Error adding employee:", err);
      setIsLoading(false);
    }
  };

  const handleOpen = (isOpen) => {
    if (isOpen) {
      setName("");
      setRole("");
      setDesignation("");
      setEmail("");
      setPassword("");
      setError("");
      setMessage("");
    }
  };

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="my-2">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Superadmin">Superadmin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Select value={designation} onValueChange={setDesignation} required>
              <SelectTrigger id="designation">
                <SelectValue placeholder="Select a designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BDE">BDE</SelectItem>
                <SelectItem value="Software Dev">Software Dev</SelectItem>
                <SelectItem value="UI/UX">UI/UX</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && (
            <div
              className="my-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          {error && (
            <div
              className="my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" className="w-full my-2" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
