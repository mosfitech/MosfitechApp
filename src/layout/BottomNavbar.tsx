import React from "react";
import { useDispatch, useSelector } from "react-redux";
import geolocationSlice, {
  selectGeolocationActive,
  setGeolocationActive,
} from "../redux/geolocationSlice";
import { LongPressEventType, useLongPress } from "use-long-press";
import { sosActive } from "../redux/sosSlice";
type BottomNavbarProps = {
  setPages: any;
};
export default function BottomNavbar({ setPages }: BottomNavbarProps) {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = React.useState(true);
  const [longPressed, setLongPressed] = React.useState(false);

  const geolocationActive = useSelector(selectGeolocationActive);
  const handleClick = (e: any) => {
    setPages(e);
  };

  const handleActiveLocation = () => {
    const currentStatus = localStorage.getItem("sharelok");
    if (currentStatus === "active") {
      localStorage.setItem("sharelok", "inactive");
      dispatch(setGeolocationActive(false));
    } else {
      localStorage.setItem("sharelok", "active");
      dispatch(setGeolocationActive(true));
    }
  };
  const callback = React.useCallback(() => {
    dispatch(sosActive(true));
  }, []);
  
  const bind = useLongPress(enabled ? callback : null, {
    onStart: (event, meta) => {
      dispatch(sosActive(true));
      console.log("Press started", meta);
    },
    onFinish: (event, meta) => {
      setLongPressed(false);
      dispatch(sosActive(false));
      console.log("Long press finished", meta);
    },
    onCancel: (event, meta) => {
      console.log("Press cancelled", meta);
    },
    //onMove: () => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    cancelOutsideElement: true,
    detect: LongPressEventType.Pointer,
  });
  const handlers = bind("test context");
  return (
    <>
      <div className="fixed z-50 w-full h-20 max-w-lg -translate-x-1/2 bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="w-full h-14 absolute b-0 -z-10 flex justify-center px-4">
          <div className="w-full bg-opacity-50 bg-gray-200 h-full rounded-full" />
        </div>
        <div className="flex h-full max-w-lg justify-between px-5 py-1">
          <div className="text-center">
            {geolocationActive ? (
              <>
                <button
                  onClick={handleActiveLocation}
                  type="button"
                  className="shadow-md bg-motempat rounded-full w-28 h-12  inline-flex flex-col items-center justify-center px-5 hover:bg-motempat-400 dark:hover:bg-gray-800 group"
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clip-rule="evenodd"
                      fill="white"
                    />
                  </svg>
                  <div className="text-xs px-auto text-center text-gray-50 font-bold">
                    Active
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleActiveLocation}
                  type="button"
                  className="shadow-md bg-gray-600 rounded-full w-28 h-12 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-700 dark:hover:bg-gray-800 group"
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clip-rule="evenodd"
                      fill="white"
                    />
                  </svg>
                  <div className="text-xs px-auto text-center text-gray-50 font-bold">
                    Nonactive
                  </div>
                </button>
              </>
            )}
          </div>
          <div className="flex items-center justify-center ">
            <button
              onClick={() => handleClick("scan")}
              data-tooltip-target="tooltip-new"
              type="button"
              className="border-4 border-opacity-90 border-gray-200 inline-flex items-center justify-center w-16 h-16 font-medium bg-scanner-600 rounded-full hover:bg-primary-400 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.7973 7.74724C5.7973 7.23007 6.00274 6.73408 6.36844 6.36838C6.73414 6.00269 7.23013 5.79724 7.7473 5.79724H13.5973C14.1145 5.79724 14.6105 6.00269 14.9762 6.36838C15.3419 6.73408 15.5473 7.23007 15.5473 7.74724V13.5972C15.5473 14.1144 15.3419 14.6104 14.9762 14.9761C14.6105 15.3418 14.1145 15.5472 13.5973 15.5472H7.7473C7.23013 15.5472 6.73414 15.3418 6.36844 14.9761C6.00274 14.6104 5.7973 14.1144 5.7973 13.5972V7.74724ZM9.6973 11.6472V9.69724H11.6473V11.6472H9.6973ZM5.7973 25.2972C5.7973 24.7801 6.00274 24.2841 6.36844 23.9184C6.73414 23.5527 7.23013 23.3472 7.7473 23.3472H13.5973C14.1145 23.3472 14.6105 23.5527 14.9762 23.9184C15.3419 24.2841 15.5473 24.7801 15.5473 25.2972V31.1472C15.5473 31.6644 15.3419 32.1604 14.9762 32.5261C14.6105 32.8918 14.1145 33.0972 13.5973 33.0972H7.7473C7.23013 33.0972 6.73414 32.8918 6.36844 32.5261C6.00274 32.1604 5.7973 31.6644 5.7973 31.1472V25.2972ZM9.6973 29.1972V27.2472H11.6473V29.1972H9.6973ZM25.2973 5.79724C24.7801 5.79724 24.2841 6.00269 23.9184 6.36838C23.5527 6.73408 23.3473 7.23007 23.3473 7.74724V13.5972C23.3473 14.1144 23.5527 14.6104 23.9184 14.9761C24.2841 15.3418 24.7801 15.5472 25.2973 15.5472H31.1473C31.6645 15.5472 32.1605 15.3418 32.5262 14.9761C32.8919 14.6104 33.0973 14.1144 33.0973 13.5972V7.74724C33.0973 7.23007 32.8919 6.73408 32.5262 6.36838C32.1605 6.00269 31.6645 5.79724 31.1473 5.79724H25.2973ZM27.2473 9.69724V11.6472H29.1973V9.69724H27.2473Z"
                  fill="white"
                />
                <path
                  d="M21.45 7.79998C21.45 7.2828 21.2446 6.78681 20.8789 6.42112C20.5132 6.05542 20.0172 5.84998 19.5 5.84998C18.9828 5.84998 18.4868 6.05542 18.1211 6.42112C17.7554 6.78681 17.55 7.2828 17.55 7.79998V9.74998C17.55 10.2671 17.7554 10.7631 18.1211 11.1288C18.4868 11.4945 18.9828 11.7 19.5 11.7C20.0172 11.7 20.5132 11.4945 20.8789 11.1288C21.2446 10.7631 21.45 10.2671 21.45 9.74998V7.79998ZM19.5 13.65C20.0172 13.65 20.5132 13.8554 20.8789 14.2211C21.2446 14.5868 21.45 15.0828 21.45 15.6V17.55H25.35C25.8672 17.55 26.3632 17.7554 26.7289 18.1211C27.0946 18.4868 27.3 18.9828 27.3 19.5C27.3 20.0171 27.0946 20.5131 26.7289 20.8788C26.3632 21.2445 25.8672 21.45 25.35 21.45H19.5C18.9828 21.45 18.4868 21.2445 18.1211 20.8788C17.7554 20.5131 17.55 20.0171 17.55 19.5V15.6C17.55 15.0828 17.7554 14.5868 18.1211 14.2211C18.4868 13.8554 18.9828 13.65 19.5 13.65V13.65ZM31.2 17.55C30.6828 17.55 30.1868 17.7554 29.8211 18.1211C29.4554 18.4868 29.25 18.9828 29.25 19.5C29.25 20.0171 29.4554 20.5131 29.8211 20.8788C30.1868 21.2445 30.6828 21.45 31.2 21.45C31.7172 21.45 32.2132 21.2445 32.5789 20.8788C32.9446 20.5131 33.15 20.0171 33.15 19.5C33.15 18.9828 32.9446 18.4868 32.5789 18.1211C32.2132 17.7554 31.7172 17.55 31.2 17.55ZM17.55 25.35C17.55 24.8328 17.7554 24.3368 18.1211 23.9711C18.4868 23.6054 18.9828 23.4 19.5 23.4H21.45C21.9672 23.4 22.4632 23.6054 22.8289 23.9711C23.1946 24.3368 23.4 24.8328 23.4 25.35C23.4 25.8671 23.1946 26.3631 22.8289 26.7288C22.4632 27.0945 21.9672 27.3 21.45 27.3V31.2C21.45 31.7171 21.2446 32.2131 20.8789 32.5788C20.5132 32.9445 20.0172 33.15 19.5 33.15C18.9828 33.15 18.4868 32.9445 18.1211 32.5788C17.7554 32.2131 17.55 31.7171 17.55 31.2V25.35ZM13.65 21.45C14.1672 21.45 14.6632 21.2445 15.0289 20.8788C15.3946 20.5131 15.6 20.0171 15.6 19.5C15.6 18.9828 15.3946 18.4868 15.0289 18.1211C14.6632 17.7554 14.1672 17.55 13.65 17.55H7.8C7.28283 17.55 6.78684 17.7554 6.42114 18.1211C6.05545 18.4868 5.85 18.9828 5.85 19.5C5.85 20.0171 6.05545 20.5131 6.42114 20.8788C6.78684 21.2445 7.28283 21.45 7.8 21.45H13.65ZM33.15 25.35C33.15 25.8671 32.9446 26.3631 32.5789 26.7288C32.2132 27.0945 31.7172 27.3 31.2 27.3H27.3C26.7828 27.3 26.2868 27.0945 25.9211 26.7288C25.5554 26.3631 25.35 25.8671 25.35 25.35C25.35 24.8328 25.5554 24.3368 25.9211 23.9711C26.2868 23.6054 26.7828 23.4 27.3 23.4H31.2C31.7172 23.4 32.2132 23.6054 32.5789 23.9711C32.9446 24.3368 33.15 24.8328 33.15 25.35ZM31.2 33.15C31.7172 33.15 32.2132 32.9445 32.5789 32.5788C32.9446 32.2131 33.15 31.7171 33.15 31.2C33.15 30.6828 32.9446 30.1868 32.5789 29.8211C32.2132 29.4554 31.7172 29.25 31.2 29.25H25.35C24.8328 29.25 24.3368 29.4554 23.9711 29.8211C23.6054 30.1868 23.4 30.6828 23.4 31.2C23.4 31.7171 23.6054 32.2131 23.9711 32.5788C24.3368 32.9445 24.8328 33.15 25.35 33.15H31.2Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="text-center">
            <button
              {...handlers}
              data-tooltip-target="tooltip-settings"
              type="button"
              className="shadow-md bg-mobarang  rounded-full w-28 h-12  inline-flex flex-col items-center justify-center px-5 hover:bg-mobarang-400 dark:hover:bg-gray-800 group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.636 4.575a.75.75 0 0 1 0 1.061 9 9 0 0 0 0 12.728.75.75 0 1 1-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 0 1 1.06 0Zm12.728 0a.75.75 0 0 1 1.06 0c4.101 4.1 4.101 10.75 0 14.85a.75.75 0 1 1-1.06-1.061 9 9 0 0 0 0-12.728.75.75 0 0 1 0-1.06ZM7.757 6.697a.75.75 0 0 1 0 1.06 6 6 0 0 0 0 8.486.75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 1 0-10.606.75.75 0 0 1 1.06 0Zm8.486 0a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.606.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06ZM9.879 8.818a.75.75 0 0 1 0 1.06 3 3 0 0 0 0 4.243.75.75 0 1 1-1.061 1.061 4.5 4.5 0 0 1 0-6.364.75.75 0 0 1 1.06 0Zm4.242 0a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  fill="white"
                />
              </svg>
              <div className="text-xs px-auto text-center text-gray-50 font-bold">
                SOS
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
