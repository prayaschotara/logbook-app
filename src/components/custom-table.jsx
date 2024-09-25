"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import LogView from "./log-view";
import { supabase } from "@/config/supabase";
import { toast } from "@/hooks/use-toast";

export default function CustomTable({
  isLoading,
  data,
  columns,
  itemsPerPage = 5,
  title = "Table",
  AddNewModal = <></>,
  action = false,
}) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.slice(startIndex, endIndex);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  const [logs, setLogs] = useState([]);
  const getLogs = async (employee) => {
    try {
      const { data, error } = await supabase
        .from("logbook")
        .select("*")
        .eq("user_id", employee.id);
      console.log("user logs", data);
      setSelectedEmployee(employee);
      setIsModalOpen(true);
      setLogs(data);
    } catch (error) {
      console.log(error);
      if (employee !== null) {
        toast({
          title: "Failed",
          variant: "destructive",
          description: "Failed to get logs",
        });
      }
    }
  };

  return (
    <div className="container mx-auto pb-10">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {AddNewModal}
        </CardHeader>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns?.map((column, index) => (
                    <TableHead key={index} className={column?.className}>
                      {column?.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems?.map((item) => (
                  <TableRow key={item.id}>
                    {columns?.map((column, index) => (
                      <TableCell key={index} className={column?.className}>
                        {typeof column?.accessor === "function"
                          ? column?.accessor(item)
                          : item[column?.accessor]}
                      </TableCell>
                    ))}
                    {action && (
                      <TableCell>
                        <Button onClick={() => getLogs(item)}>
                          View Logbook
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
        {action && (
          <LogView
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedEmployee={selectedEmployee}
            logs={logs}
          />
        )}
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={firstPage}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={lastPage}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
