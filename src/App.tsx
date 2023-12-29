import { useEffect, useState } from "react";

import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { Provider } from "react-redux";
import "./App.css";
import Sigin from "./auth/Sigin";
import Broadcast from "./components/Broadcast";
import Countdown from "./components/Motion/Countdown";
import BottomNavbar from "./layout/BottomNavbar";
import TopNavbar from "./layout/TopNavbar";
import Motrip from "./pages/Motrip";
import Profile from "./pages/Profile";
import Rental from "./pages/Rental";
import { store } from "./redux/store";

function App() {
  const cookies = parseCookies();
  const [auth, setAuth] = useState<any>(false);
  const [user, setUser] = useState<any>(cookies.name);
  const [pages, setPages] = useState<any>("motrip");
  const handleLogged = () => {
    setAuth(true);
  };
  const handleLogOut = () => {
    setCookie(null, "userId", "", {
      maxAge: 3600, // 1 hour in seconds
      path: "/",
    });
    setCookie(null, "username", "", {
      maxAge: 3600, // 1 hour in seconds
      path: "/",
    });
    setCookie(null, "nohp", "", {
      maxAge: 3600, // 1 hour in seconds
      path: "/",
    });
    setAuth(false);
    setUser(undefined)
  }
  useEffect(() => {
    if (cookies.userId) {
      console.log(cookies.userId);
      axios
        .post(
          import.meta.env.VITE_REACT_APP_URL + `users/userCheck`,
          {
            nohp: cookies.nohp,
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_REACT_APP_TOKEN,
            },
          }
        )
        .then(function (result) {
          console.log(result);
          if (result.data._id === cookies.userId) {
            setAuth(true);
          } else {
            destroyCookie(null, "userId");
            destroyCookie(null, "name");
            destroyCookie(null, "nohp");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="bg-gray-50 container mx-auto h-full">
        {auth === true && user !== null ? (
          <>
            {pages === "motrip" && (
              <>
                <div className="border-t-8 border-primary container mx-auto h-auto  mt-2 rounded-t-xl">
                  <div className="flex justify-center pt-3 mb-3 z-50">
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
                  <div className="fixed container h-full -z-10 bg-green-500">
                    <Motrip />
                  </div>
                </div>
                 <Countdown />
                <Broadcast />
                <BottomNavbar setPages={setPages} />
              </>
            )}
            {pages === "scan" && <Rental setPages={setPages} />}
            {pages === "profile" && <Profile setPages={setPages} handleLogOut={handleLogOut}/>}
          </>
        ) : (
          <Sigin handleLogged={handleLogged} />
        )}
      </div>
    </Provider>
  );
}

export default App;
