import { createContext, useEffect, useState } from "react";
import axios from "axios";

const INITIAL_STATE = {
  data: null,
  loading: true,
  error: null,
};

const UserContext = createContext(INITIAL_STATE);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_STATE);

  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: res } = await axios.get("http://localhost:8000/auth/me");

    if (res.data && res.data.user) {
      setUser({
        data: {
          id: res.data.user.id,
          email: res.data.user.email,
        },
        loading: false,
        error: null,
      });
    } else if (res.data && res.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: res.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
