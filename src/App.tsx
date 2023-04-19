import { useContext, useEffect, useState } from "react";

import "./App.css";
import Sigin from "./auth/Sigin";
import { AuthContext } from "./context/authContext";
import Motrip from "./pages/Motrip";
import Rental from "./pages/Rental";
import BottomNavbar from "./layout/BottomNavbar";

function App() {
  const { status, userId, handleLogOut, displayName, email, photoURL } =
    useContext(AuthContext);
  const [auth, setAuth] = useState<any>(status);
  const [user, setUser] = useState<any>(userId);
  const [pages, setPages] = useState<any>("motrip");

  useEffect(() => {
    console.log(auth);
    setAuth(status);
    setUser(userId);
  }, [status]);
  return (
    <div className="bg-gray-50 w-full h-screen">
      {auth === "authenticated" && user !== null ? (
        <>
          {pages === "motrip" && (
            <>
              <Motrip />
              <BottomNavbar setPages={setPages} />
            </>
          )}
          {pages === "scan" && <Rental setPages={setPages} />}
        </>
      ) : (
        <Sigin />
      )}
    </div>
  );
}

export default App;
