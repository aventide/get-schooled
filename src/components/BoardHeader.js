import StyledModal from "./StyledModal";
import MenuButton from "./MenuButton";
import { useState } from "react";

export default function BoardHeader({
  isTableTopMode,
  scores,
  turnFor,
  onBack,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`w-full ${
        isTableTopMode ? "" : "md:w-3/5 lg:w-2/5"
      } bg-blue-600 flex justify-evenly text-white font-sspRegular`}
    >
      <div className="flex items-center px-4">
        <button onClick={() => setIsModalOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white hover:opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 justify-between px-6 py-2">
        <div
          className={`flex items-center justify-between ${
            turnFor === "animals" ? "text-orange-200" : ""
          }`}
        >
          <span className="pr-6 text-3xl">{scores.animal}</span>
          <div className="flex flex-col items-center">
            <span className="text-xl">P1</span>
            <span className="text-xs font-fancy">Animals</span>
          </div>
        </div>
        <div
          className={`flex items-center justify-between ${
            turnFor === "colors" ? "text-orange-200" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl">P2</span>
            <span className="text-xs font-fancy">Colors</span>
          </div>
          <span className="pl-6 text-3xl">{scores.color}</span>
        </div>
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
