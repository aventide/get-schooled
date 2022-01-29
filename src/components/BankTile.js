import Crab from './animals/Crab';
import Jellyfish from './animals/Jellyfish';

export default function BankTile({
    animal,
    color
}) {

    return (<div className="aspect-square bg-blue-800 m-1 border-blue-800 rounded-md border-2 flex justify-center items-center p-1 md:p-1.5">
        {animal === "crab" && <Crab color={color} />}
        {animal === "jellyfish" && <Jellyfish color={color} />}
    </div>);
}