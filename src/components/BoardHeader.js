import StyledModal from "./StyledModal";
import MenuButton from "./MenuButton";
import { useState } from "react";

export default function BoardHeader({ scores, turnFor, onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function ColorPlayerInfo() {
    return (
      <div
        className={`flex flex-1 items-center px-2  ${
          turnFor === "colors" ? "text-orange-200" : "white"
        }`}
      >
        <span className="text-2xl border-r-2 pr-2">{scores.color}</span>
        <div className="flex flex-col flex-1 items-start px-2 w-28">
          <span className="text-base text-ellipsis overflow-hidden whitespace-nowrap">
            Colors
          </span>
          <span className="text-2xs leading-3">Player</span>
        </div>
      </div>
    );
  }

  function AnimalPlayerInfo() {
    return (
      <div
        className={`flex flex-1 items-center px-2 flex-row-reverse ${
          turnFor === "animals" ? "text-orange-200" : "white"
        }`}
      >
        <span className="text-2xl border-l-2 pl-2">{scores.animal}</span>
        <div className="flex flex-col flex-1 items-end px-2 w-28">
          <span className="text-base text-ellipsis overflow-hidden whitespace-nowrap">
            Animals
          </span>
          <span className="text-2xs leading-3">Player</span>
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
        <ColorPlayerInfo />
        <AnimalPlayerInfo />
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
