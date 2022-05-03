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
      <div className="flex items-center pl-2 py-2">
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
      </div>
      <div className="flex flex-1 justify-between items-center px-6 py-2">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between font-fancy select-none">
            <span
              className={`${
                turnFor === "animals"
                  ? "text-orange-200 underline underline-offset-2 decoration-4"
                  : ""
              }`}
            >{`animals: ${scores.animal}`}</span>
            <span
              className={`${
                turnFor === "colors"
                  ? "text-orange-200 underline underline-offset-2 decoration-4"
                  : ""
              }`}
            >{`colors: ${scores.color}`}</span>
          </div>
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
