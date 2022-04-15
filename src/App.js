import { useState } from "react";
import GameBoard from "./containers/GameBoard";
import MenuButton from "./components/MenuButton";
import LesserMenuButton from "./components/LesserMenuButton";

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

// const settingsIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// </svg>

function Version({ number }) {
  return (
    <div className="fixed bottom-0 w-screen my-4 flex justify-center font-fancy text-white">
      <a
        href="https://github.com/misterlocations/get-schooled"
        className="underline underline-offset-4 decoration-2 decoration-dashed
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
      <div className="w-full flex justify-center my-4">
        <span className="font-fancy text-white text-3xl">Get Schooled!</span>
      </div>
      <div className="mx-8 h-full flex flex-col justify-center">
        <MenuButton text="solo" icon={singlePlayerIcon} />
        <MenuButton text="online" icon={multiPlayerIcon} />
        <MenuButton
          text="tabletop"
          icon={multiPlayerIcon}
          onClick={() => onScreenSet(TABLETOP)}
        />
        {/* <LesserMenuButton text="how to play"/>
        <LesserMenuButton text="settings" icon={settingsIcon} /> */}
      </div>
      <Version number="0.1.0" />
    </div>
  );
}
