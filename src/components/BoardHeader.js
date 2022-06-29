import StyledModal from "./StyledModal";
import MenuButton from "./MenuButton";
import { useState } from "react";

export default function BoardHeader({ scores, turnFor, onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function AnimalPlayerInfo() {
    return (
      <div
        className={`flex flex-1 px-2  ${
          turnFor === "animals" ? "text-orange-200" : "white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-full w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
        <div className="flex flex-col px-2 w-28">
          <span className="text-xl">{scores.animal}</span>
          <span className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
            Player
          </span>
        </div>
      </div>
    );
  }

  function ColorPlayerInfo() {
    return (
      <div
        className={`flex flex-1 px-2  flex-row-reverse ${
          turnFor === "colors" ? "text-orange-200" : "white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex flex-col px-2 w-28 text-right">
          <span className="text-xl">{scores.color}</span>
          <span className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
            Computer
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full py-4 px-2 bg-blue-600 rounded-b-md flex text-white font-fancy`}
    >
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
      </button>
      <div className="flex-1 flex justify-between">
        <AnimalPlayerInfo />
        <ColorPlayerInfo />
      </div>
      <StyledModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reset"
      >
        <p className="font-sspRegular font-bold mb-8">
          Going back will reset the game. Continue?
        </p>
        <MenuButton onClick={onBack} text="Do it" />
      </StyledModal>
    </div>
  );
}
