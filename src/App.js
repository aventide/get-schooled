import { useState } from "react";
import GameBoard from "./containers/GameBoard";
import BoardHeader from "./components/BoardHeader";
import SoloSelectScreen from "./containers/SoloSelectScreen";
import MenuButton from "./components/MenuButton";
import { getTransitionByDifficulty } from "./transitions/util";

import { DIFFICULTY_IGNORAMUS, MATCH_ANIMALS, MATCH_COLORS } from "./constants";

const MAIN_MENU = "main_menu";
const SOLO = "solo";
const SOLO_SELECT = "solo_select";
// const ONLINE = "online";
const TABLETOP = "tabletop";

export default function App() {
  const [gameScreen, setGameScreen] = useState(MAIN_MENU);
  const [localPlayer, setLocalPlayer] = useState(MATCH_ANIMALS);
  const [soloDifficulty, setSoloDifficulty] = useState(DIFFICULTY_IGNORAMUS);

  function handleReturnToMain() {
    setGameScreen(MAIN_MENU);
    setLocalPlayer(MATCH_ANIMALS);
  }

  return (
    <div className="h-[100dvh] w-screen flex justify-center">
      <div className="h-full w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
        {gameScreen === MAIN_MENU && <MainMenu onScreenSet={setGameScreen} />}
        {gameScreen === TABLETOP && (
          <GameBoard
            initialTurnFor={Math.random() < 0.5 ? MATCH_ANIMALS : MATCH_COLORS}
            onBack={handleReturnToMain}
            BoardHeader={(props) => (
              <BoardHeader {...props} onBack={handleReturnToMain} />
            )}
          />
        )}
        {gameScreen === SOLO_SELECT && (
          <SoloSelectScreen
            onBack={handleReturnToMain}
            onSelectMatchType={(matchType) => setLocalPlayer(matchType)}
            onSelectDifficulty={(gameDifficulty) => {
              setSoloDifficulty(gameDifficulty);
              setGameScreen(SOLO);
            }}
          />
        )}
        {gameScreen === SOLO && (
          <GameBoard
            onBack={handleReturnToMain}
            initialTurnFor={Math.random() < 0.5 ? MATCH_ANIMALS : MATCH_COLORS}
            localPlayer={localPlayer}
            BoardHeader={(props) => (
              <BoardHeader
                {...props}
                onBack={handleReturnToMain}
                localPlayer={localPlayer}
                labels={{
                  localPlayer: "player",
                  otherPlayer: "computer",
                }}
              />
            )}
            onTransition={({ board, bank, turnFor }) => {
              return getTransitionByDifficulty(soloDifficulty)({
                board,
                bank,
                turnFor,
              });
            }}
          />
        )}
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

function Version({ number }) {
  return (
    <div className="my-8 flex justify-center items-end font-fancy text-white row-span-1">
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
    <div className={`w-full h-full bg-blue-300`}>
      <div className="grid grid-cols-1 grid-rows-6 h-full">
        <div className="flex flex-col justify-center items-center row-span-3">
          <span className="font-fancy text-white text-4xl">Get</span>
          <span className="font-fancy text-white text-4xl">Schooled</span>
        </div>
        <div className="mx-8 flex flex-col justify-center row-span-2">
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
    </div>
  );
}
