import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

import { faCrown } from "@fortawesome/free-solid-svg-icons";

import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { faCog } from "@fortawesome/free-solid-svg-icons";

import { faBell } from "@fortawesome/free-solid-svg-icons";

import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Nav({
  isTyping,
  handleReset,
  warning,
  text,
  showWarning,
  setFinished,
  setAbout,
}: {
  isTyping: boolean;
  handleReset: () => void;
  warning: boolean;
  text: string;
  showWarning: (message: string) => void;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setAbout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const iconsActions = [
    {
      icon: faKeyboard,
      onClick: () => {
        setFinished(false);
        setAbout(false);
        handleReset();
      },
    },
    {
      icon: faCrown,
      onClick: () => {
        showWarning("This page is not ready yet");
      },
    },
    {
      icon: faInfo,
      onClick: () => {
        setFinished(false);
        setAbout(true);
      },
    },
    {
      icon: faCog,
      onClick: () => {
        showWarning("This page is not ready yet");
      },
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center w-full my-div mx-auto h-auto">
        <div className="flex justify-center items-center gap-2">
          <div className="py-[5.6px] px-1 flex justify-center items-center gap330 gap-2">
            <img
              src="/monkeyLite.svg"
              className={`max-w-10 ${isTyping ? "hidden" : ""}`}
            ></img>
            <img
              src="/monkeyLiteGray.svg"
              className={`max-w-10 ${isTyping ? "" : "hidden"}`}
            ></img>

            <h1
              className={`at-721 text-[24px] cursor-default xl:text-[32px] leading-none font-normal  whitespace-nowrap ${
                isTyping ? "text-[#646669]" : "text-[#d1d0c5]"
              }`}
              style={{ fontFamily: '"Lexend Deca", sans-serif' }}
            >
              monkeyLite
            </h1>
            <div
              className={`justify-center items-center gap-5 gap425 gap330 ml-2 ${
                isTyping ? "hidden" : "flex"
              }`}
            >
              {iconsActions.map(({ icon, onClick }, i) => (
                <a
                  className="flex leading-none w-full cursor-pointer h-full justify-center items-center"
                  key={i}
                  onClick={onClick}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-[#646669] hover:text-[#d1d0c5] "
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className={` h-full justify-center items-center gap-5 gap425 gap330 ${
            isTyping ? "hidden" : "flex"
          }`}
        >
          <a
            onClick={() => {
              showWarning("This page is not ready yet");
            }}
            className="flex w-full cursor-pointer h-full justifty-center items-center"
          >
            <FontAwesomeIcon
              icon={faBell}
              className="text-[#646669] hover:text-[#d1d0c5]"
            />
          </a>
          <a
            onClick={() => {
              showWarning("This page is not ready yet");
            }}
            className="flex w-full cursor-pointer h-full justifty-center items-center"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-[#646669] hover:text-[#d1d0c5]"
            />
          </a>
        </div>
      </div>
      <div
        className={`absolute justify-center cursor-default items-center top-4 right-6 p-5 border-[#0081f9] border-2 rounded-xl bg-[#054a8a] text-[#f9fbfc] ${
          warning ? "flex" : " hidden"
        }`}
        style={{ fontFamily: '"Roboto Mono", monospace' }}
      >
        {text}
      </div>
    </>
  );
}
