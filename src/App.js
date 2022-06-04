import { useState } from "react";
import GameBoard from "./containers/GameBoard";
import SoloSelectScreen from "./containers/SoloSelectScreen";
import MenuButton from "./components/MenuButton";
import { getTransitionByDifficulty } from "./transitions/util";

import { DIFFICULTY_IGNORAMUS } from "./constants";

const MAIN_MENU = "main_menu";
const SOLO = "solo";
const SOLO_SELECT = "solo_select";
// const ONLINE = "online";
const TABLETOP = "tabletop";

export default function App() {
  const [gameScreen, setGameScreen] = useState(MAIN_MENU);
  const [soloDifficulty, setSoloDifficulty] = useState(DIFFICULTY_IGNORAMUS);

  return (
    <div className="h-screen w-screen bg-indigo-100 flex flex-col items-center">
      {gameScreen === MAIN_MENU && <MainMenu onScreenSet={setGameScreen} />}
      {gameScreen === TABLETOP && (
        <GameBoard onBack={() => setGameScreen(MAIN_MENU)} />
      )}
      {gameScreen === SOLO_SELECT && (
        <SoloSelectScreen
          onBack={() => setGameScreen(MAIN_MENU)}
          onSelectDifficulty={(gameDifficulty) => {
            setSoloDifficulty(gameDifficulty);
            setGameScreen(SOLO);
          }}
        />
      )}
      {gameScreen === SOLO && (
        <GameBoard
          onBack={() => setGameScreen(MAIN_MENU)}
          onTurnTransition={({ board, bank, turnFor }) => {
            return getTransitionByDifficulty(soloDifficulty)({
              board,
              bank,
              turnFor,
            });
          }}
        />
      )}
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

function Version({ number }) {
  return (
    <div className="my-4 flex justify-center font-fancy text-white">
      <a
        href="https://github.com/misterlocations/get-schooled"
        className="underline underline-offset-2 decoration-4
"
      >
        Version {number}
      </a>
    </div>
  );
}

function MainMenu({ onScreenSet }) {
  return (
    <div
      className={`w-full h-screen ${
        false ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"
      } bg-blue-300 flex flex-col`}
    >
      <div className="flex justify-center my-4">
        <span className="font-fancy text-white text-3xl">Get Schooled!</span>
      </div>
      <div className="mx-8 h-full flex flex-col justify-center">
        <MenuButton
          text="solo"
          icon={singlePlayerIcon}
          onClick={() => onScreenSet(SOLO_SELECT)}
        />
        <MenuButton text="online" icon={multiPlayerIcon} disabled />
        <MenuButton
          text="tabletop"
          icon={multiPlayerIcon}
          onClick={() => onScreenSet(TABLETOP)}
        />
      </div>
      <Version number="0.1.0" />
    </div>
  );
}
