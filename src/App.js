import { useState } from "react";
import GameBoard from "./containers/GameBoard";

const NONE_SELECTED = "none_selected";
const MAIN_MENU = "main_menu";
const SOLO = "solo";
const ONLINE = "online";
const TABLETOP = "tabletop";

const availableGameModes = [SOLO, ONLINE, TABLETOP];

export default function App() {
  const [gameScreen, setGameScreen] = useState(MAIN_MENU);

  return (
    <div className="h-screen w-screen bg-indigo-100 flex flex-col items-center">
      {gameScreen === MAIN_MENU && <MainMenu onScreenSet={setGameScreen} />}
      {gameScreen === TABLETOP && (
        <GameBoard onBack={() => setGameScreen(MAIN_MENU)} />
      )}
    </div>
  );
}

function MenuButton({ icon, text, onClick }) {
  return (
    <div
      className="bg-blue-500 h-4 mx-8 my-2 py-6 font-fancy text-blue-100 rounded-md flex items-center relative cursor-pointer hover:opacity-75 select-none"
      onClick={onClick}
    >
      <div className="absolute left-4">{icon}</div>
      <div className="flex flex-1 justify-center">
        <button className="flex">
          <span className="px-3">{text}</span>
        </button>
      </div>
    </div>
  );
}

const singlePlayerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const multiPlayerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

function MainMenu({ onScreenSet }) {
  return (
    <div
      className={`w-full h-screen ${
        false ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"
      } bg-blue-300 flex flex-col`}
    >
      <MenuButton text="solo" icon={singlePlayerIcon} />
      <MenuButton text="online" icon={multiPlayerIcon} />
      <MenuButton
        text="tabletop"
        icon={multiPlayerIcon}
        onClick={() => onScreenSet(TABLETOP)}
      />
    </div>
  );
}
