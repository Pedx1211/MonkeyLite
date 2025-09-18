import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import { faFont } from "@fortawesome/free-solid-svg-icons";

import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import { faCog } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef } from "react";

type SettingsProps = {
  isFinished: boolean;
  isAbout: boolean;
  isTyping: boolean;
  isSettingsOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  testType: number;
  setTestType: React.Dispatch<React.SetStateAction<number>>;
  typeSetting: number;
  setTypeSetting: React.Dispatch<React.SetStateAction<number>>;
};

export default function Settings({
  isFinished,
  isAbout,
  isTyping,
  isSettingsOpen,
  setSettingsOpen,
  testType = 1,
  setTestType,
  typeSetting = 1,
  setTypeSetting,
}: SettingsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        setSettingsOpen(false);
        dialog.close();
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 720px)");

    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSettingsOpen(false);
        dialog.close();
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    dialog.addEventListener("click", handleOutsideClick);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      dialog.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const testTypes = [
    {
      text: "time",
      icon: faClock,
      settingType: 1,
    },
    {
      text: "words",
      icon: faFont,
      settingType: 2,
    },
    {
      text: "quote",
      icon: faQuoteLeft,
      settingType: 3,
    },
  ];

  const timeSettings = [
    {
      text: "15",
      typeSettings: 1,
    },
    {
      text: "30",
      typeSettings: 2,
    },
    {
      text: "60",
      typeSettings: 3,
    },
    {
      text: "120",
      typeSettings: 4,
    },
  ];

  const wordsSettings = [
    {
      text: "10",
      typeSettings: 5,
    },
    {
      text: "25",
      typeSettings: 6,
    },
    {
      text: "50",
      typeSettings: 7,
    },
    {
      text: "100",
      typeSettings: 8,
    },
  ];

  const quoteSettings = [
    {
      text: "short",
      typeSettings: 9,
    },
    {
      text: "medium",
      typeSettings: 10,
    },
    {
      text: "long",
      typeSettings: 11,
    },
    {
      text: "thicc",
      typeSettings: 12,
    },
  ];

  type Setting = { text: string; typeSettings: number };

  const settingsMap: Record<number, Setting[]> = {
    1: timeSettings,
    2: wordsSettings,
    3: quoteSettings,
  };

  const currentSettings = settingsMap[testType] || [];

  return (
    <>
      <div
        className={`w-fit justify-center items-center min-h-10 h-10 mb-4 bg-[#2c2e31] hide-settings rounded-lg ${
          isFinished ? "hidden" : " flex"
        } ${isAbout ? "hidden" : "flex"}`}
      >
        <div
          className={` justify-center items-center h-full ${
            isTyping ? "hidden" : "flex"
          }`}
        >
          {testTypes.map(({ text, icon, settingType }, i) => (
            <a
              key={i}
              onClick={() => {
                testType === settingType
                  ? ""
                  : (() => {
                      setTestType(settingType);

                      if (settingType === 1) {
                        if (typeSetting === 0 || typeSetting > 4) {
                          setTypeSetting(1);
                        }
                      }
                      if (settingType === 2) {
                        if (typeSetting < 5 || typeSetting > 8) {
                          setTypeSetting(5);
                        }
                      }
                      if (settingType === 3) {
                        if (typeSetting < 9) {
                          setTypeSetting(9);
                        }
                      }
                    })();
              }}
              className={`p-3 cursor-pointer group gap-1.5 text-xs hover:text-[#d1d0c5] flex justify-center items-center ${
                testType === settingType ? "text-[#cf9b1d]" : "text-[#646669]"
              }`}
              style={{ fontFamily: '"Roboto Mono", monospace' }}
            >
              <FontAwesomeIcon
                icon={icon}
                className={` group-hover:text-[#d1d0c5] ${
                  testType === settingType ? "text-[#e2b614]" : "text-[#646669]"
                }`}
              />
              {text}
            </a>
          ))}

          <div className="w-1.5 h-[55%] mx-3 rounded-[4px] bg-[#323437] flex"></div>
          <div className="flex justify-center items-center h-full">
            {currentSettings.map(({ text, typeSettings }, i) => (
              <a
                key={i}
                onClick={() => {
                  typeSetting === typeSettings
                    ? ""
                    : setTypeSetting(typeSettings);
                }}
                className={`p-3 cursor-pointer group gap-1.5 text-xs hover:text-[#d1d0c5] flex justify-center items-center ${
                  typeSetting === typeSettings
                    ? "text-[#cf9b1d]"
                    : "text-[#646669]"
                }`}
                style={{ fontFamily: '"Roboto Mono", monospace' }}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`justify-center items-center w-full min-h-[52px] ${
          isFinished ? "hidden" : "flex"
        }`}
      >
        <a
          onClick={() => {
            dialogRef.current?.showModal();
            setSettingsOpen(true);
          }}
          className={`w-fit justify-center items-center mb-4 group px-6 cursor-pointer gap-[6px] font-normal hover:bg-[#d1d0c5] hover:text-[#2c2e31] text-[12px] text-[#646669] leading-none py-3 bg-[#2c2e31] show-settings rounded-lg ${
            isTyping ? "hidden" : "flex"
          }`}
          style={{ fontFamily: '"Roboto Mono", monospace' }}
        >
          <FontAwesomeIcon
            icon={faCog}
            className="text-[#646669] group-hover:text-[#2c2e31]"
          />
          Test settings
        </a>
      </div>

      <dialog
        className={`backdrop:w-full backdrop:h-full outline-none justify-center items-center  bg-transparent show-settings h-full w-full pt-8 pl-8 backdrop:bg-black/50 ${
          isSettingsOpen ? "open:flex" : "hidden"
        }`}
        ref={dialogRef}
      >
        <div className=" flex-col mydialog flex justify-start border-[3px] outline-none border-[#2c2e31] gap-8 p-4 max-w-[300px] rounded-[8px] overflow-y-auto bg-[#323437] items-start w-full h-full max-h-[361px] ">
          <div className="flex flex-col justify-center items-center gap-2 w-full h-auto">
            {testTypes.map(({ text, settingType }) => (
              <a
                key={settingType}
                onClick={() => {
                  testType === settingType
                    ? ""
                    : (() => {
                        setTestType(settingType);

                        if (settingType === 1) {
                          if (typeSetting === 0 || typeSetting > 4) {
                            setTypeSetting(1);
                          }
                        }
                        if (settingType === 2) {
                          if (typeSetting < 5 || typeSetting > 8) {
                            setTypeSetting(5);
                          }
                        }
                        if (settingType === 3) {
                          if (typeSetting < 9) {
                            setTypeSetting(9);
                          }
                        }
                      })();
                }}
                className={`flex bg-[#2c2e31] leading-none cursor-pointer justify-center  max-w-[268px] w-full items-center rounded-[8px] p-2.5 hover:text-[#2c2e31] hover:bg-[#d1d0c5] ${
                  testType === settingType
                    ? "bg-[#cf9b1d] text-[#2c2e31]"
                    : "text-[#d1d0c5]"
                }`}
                style={{ fontFamily: '"Roboto Mono", monospace' }}
              >
                {text}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center w-full h-auto gap-2">
            {currentSettings.map(({ text, typeSettings }, i) => (
              <a
                key={i}
                onClick={() => {
                  typeSetting === typeSettings
                    ? ""
                    : setTypeSetting(typeSettings);
                }}
                className={`flex bg-[#2c2e31] leading-none cursor-pointer justify-center  max-w-[268px] w-full items-center rounded-[8px] p-2.5 hover:text-[#2c2e31] hover:bg-[#d1d0c5] ${
                  typeSetting === typeSettings
                    ? "bg-[#cf9b1d] text-[#2c2e31]"
                    : "text-[#d1d0c5]"
                }`}
                style={{ fontFamily: '"Roboto Mono", monospace' }}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
