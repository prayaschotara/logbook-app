import { useState, useEffect } from "react";

function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return user;
}

export default useUser;
