import axios from "axios";
import { createContext, useEffect, useState } from "react";

const userContext = createContext();

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function getProfile() {
      if (!user) {
        const response = await axios.get("/profile");
        setUser(response.data);
        setReady(true);
      }
    }
    getProfile();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, ready }}>
      {children}
    </userContext.Provider>
  );
}
export { Provider };
export default userContext;
