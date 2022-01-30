import Crab from './animals/Crab';
import Fish from './animals/Fish';
import Jellyfish from './animals/Jellyfish';
import Seahorse from './animals/Seahorse';
import Starfish from './animals/Starfish';
import Turtle from './animals/Turtle';

export default function BankTile({
    animal,
    color,
    onSelect
}) {

    return (<div onClick={onSelect} className="aspect-square bg-blue-800 m-1 border-blue-800 rounded-md border-2 flex justify-center items-center p-2">
        {animal === "crab" && <Crab color={color} />}
        {animal === "jellyfish" && <Jellyfish color={color} />}
        {animal === "seahorse" && <Seahorse color={color} />}
        {animal === "starfish" && <Starfish color={color} />}
        {animal === "turtle" && <Turtle color={color} />}
        {animal === "fish" && <Fish color={color} />}
    </div>);
}