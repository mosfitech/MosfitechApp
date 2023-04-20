import { useContext, useEffect, useState } from "react";

import "./App.css";
import Sigin from "./auth/Sigin";
import { AuthContext } from "./context/authContext";
import Motrip from "./pages/Motrip";
import Rental from "./pages/Rental";
import BottomNavbar from "./layout/BottomNavbar";
import TopNavbar from "./layout/TopNavbar";
import Profile from "./pages/Profile";

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
    <div className="bg-gray-50 container mx-auto h-screen">
      {auth === "authenticated" && user !== null ? (
        <>
          {pages === "motrip" && (
            <>
              <div className="border-t-8 border-primary container mx-auto h-96 bg-gray-100 mt-2 rounded-t-xl">
                <div className="flex justify-center pt-3 mb-3">
                  <svg
                    width="64"
                    height="3"
                    viewBox="0 0 64 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="64" height="3" rx="1.5" fill="#C4C4C4" />
                  </svg>
                </div>
                <TopNavbar setPages={setPages} />
                <Motrip />
              </div>
              <BottomNavbar setPages={setPages} />
            </>
          )}
          {pages === "scan" && <Rental setPages={setPages} />}
          {pages === "profile" && <Profile setPages={setPages} />}
        </>
      ) : (
        <Sigin />
      )}
    </div>
  );
}

export default App;
