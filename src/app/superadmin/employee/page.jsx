import { AddEmployeeModal } from "@/components/add-employee-modal";
import CustomTable from "@/components/custom-table";
import { getEmployees } from "@/services/employeeServices";

export default async function EmployeesPage() {
  const employees = await getEmployees();
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
  return (
    <div>
      <CustomTable
        data={employees}
        title="All Employees"
        columns={cols}
        isAddButton={true}
        AddNewModal={<AddEmployeeModal />}
        action={employees.length > 0 ? true : false}
      />
    </div>
  );
}
