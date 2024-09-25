"use client";
import React, { useEffect, useState } from "react";
import { AddLogModal } from "@/components/add-log-modal";
import CustomTable from "@/components/custom-table";
import { getLogbooksByUser } from "@/services/logbookServices";

const LogbookContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logbooks, setLogbooks] = useState([]);
  const [cols, setCols] = useState([]);

  const getLogbooks = async (userId) => {
    setIsLoading(true);
    try {
      const logbooks = await getLogbooksByUser(userId);
      const cols =
        logbooks.length > 0
          ? Object.keys(logbooks[0])?.map((key) => {
              if (
                ["id", "created_at", "email", "password", "user_id"].includes(
                  key
                )
              )
                return;
              return {
                header:
                  key.charAt(0).toUpperCase() + key.slice(1).replace("_", " "),
                accessor: key,
              };
            })
          : [];
      setLogbooks(logbooks);
      setCols(cols);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(sessionStorage.getItem("user"));
      getLogbooks(user.id);
    }
  }, []);
  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={logbooks}
        title="All Logs"
        columns={cols}
        isAddButton={true}
        AddNewModal={<AddLogModal />}
      />
    </div>
  );
};

export default LogbookContainer;
