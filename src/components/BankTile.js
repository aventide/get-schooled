import Crab from "./animals/Crab";
import Jellyfish from "./animals/Jellyfish";
import Seahorse from "./animals/Seahorse";
import Starfish from "./animals/Starfish";
import Turtle from "./animals/Turtle";
import Fish from "./animals/Fish";

export default function BankTile({ animal, color, onSelect, mystery }) {
  return (
    <div
      onClick={onSelect}
      className={`aspect-square ${
        mystery ? "bg-gray-500 border-gray-500" : "bg-blue-800 border-blue-800"
      } m-1 rounded-md border-2 flex justify-center items-center p-1 md:p-1.5 overflow-hidden`}
    >
      {animal === "crab" && <Crab title="crab" color={color} />}
      {animal === "jellyfish" && <Jellyfish color={color} />}
      {animal === "seahorse" && <Seahorse color={color} />}
      {animal === "starfish" && <Starfish color={color} />}
      {animal === "turtle" && <Turtle color={color} />}
      {animal === "fish" && <Fish color={color} />}
      {mystery && <span className="text-white text-2xl">?</span>}
    </div>
  );
}
