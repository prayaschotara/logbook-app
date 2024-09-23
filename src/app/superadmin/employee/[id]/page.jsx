"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEmployeeById } from "@/services/employeeServices";

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>{employee.role}</p>
    </div>
  );
}
