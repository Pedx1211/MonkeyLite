import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About() {
  return (
    <>
      <div className="w-full flex justify-center items-center mb-6">
        {" "}
        <h1
          className=" text-[18px] text-[#636568] text-center"
          style={{
            fontFamily: '"Roboto Mono" , monospace',
          }}
        >
          Created with love by{"   "}
          <a
            href="https://discord.com/users/448171207070842903"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#cccbc0]"
          >
            Pedx
          </a>
          .
          <br />
          <a
            href="https://github.com/Pedx1211/MonkeyLite"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#cccbc0]"
          >
            github
          </a>
        </h1>
      </div>

      <div
        className="flex justify-start gap-4 items-center text-[#636568] leading-none text-[32px]"
        style={{
          fontFamily: '"Roboto Mono" , monospace',
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} className="text-[#646669]" />
        about
      </div>
      <h2
        className="text-[#cccbc0]  text-[16px]"
        style={{
          fontFamily: '"Roboto Mono" , monospace',
        }}
      >
        Monkeylite is a lite clone of{" "}
        <a
          href="https://monkeytype.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[#636568]"
        >
          Monkeytype
        </a>{" "}
        . It keeps the spirit of minimalistic typing practice while stripping
        things down to the basics. With fewer modes and a simpler design, it’s
        built for those who just want to jump in, type, and see how fast their
        fingers can go — no distractions.<br></br>
        <br></br> Challenge yourself with clean, straightforward tests, enjoy
        the smooth typing experience, and track your improvement without the
        extra fluff. Monkeylite is typing made light, simple, and fun.
      </h2>
    </>
  );
}
