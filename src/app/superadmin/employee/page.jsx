"use client";
import { AddEmployeeModal } from "@/components/add-employee-modal";
import CustomTable from "@/components/custom-table";
import { getEmployees } from "@/services/employeeServices";
import { useEffect, useState } from "react";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch employees",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const cols =
    employees.length > 0
      ? Object.keys(employees[0])?.map((key) => {
          if (["id", "created_at", "email", "password"].includes(key)) return;
          return {
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key,
          };
        })
      : [];

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={employees}
        title="All Employees"
        columns={cols}
        isAddButton={true}
        AddNewModal={<AddEmployeeModal getAllEmployees={getAllEmployees} />}
        action={employees.length > 0 ? true : false}
        refresh={getAllEmployees}
      />
    </div>
  );
}

export default EmployeesPage;
