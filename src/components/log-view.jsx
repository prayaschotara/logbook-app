import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

const LogView = ({
  isModalOpen,
  setIsModalOpen,
  selectedEmployee,
  logbookEntries,
  logs,
}) => {
  //   useEffect(() => {
  //     getLogs();
  //   }, []);
  return (
    <Dialog className="" open={isModalOpen} onOpenChange={setIsModalOpen}>
      {selectedEmployee && (
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedEmployee.name}&apos;s Logbook</DialogTitle>
            <DialogDescription>
              Recent entries from {selectedEmployee.name}&apos;s logbook
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {logs.map((entry, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {entry.date} - {entry.project_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-semibold">Hours Spent:</p>
                      <p>{entry.hours_spent}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Employee:</p>
                      <p>{selectedEmployee.name}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold">Task Description:</p>
                    <p>{entry.task_description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default LogView;
