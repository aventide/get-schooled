import CrabIcon from '../assets/crab.svg';
import JellyfishIcon from '../assets/jellyfish.svg';

export default function Tile({
    animal,
    color
}) {

    return (<div className="aspect-square bg-blue-800 m-2 border-blue-800 rounded-md border-2 flex justify-center items-center p-2">
        <img src={animal === 'crab' ? CrabIcon : JellyfishIcon} alt="" />
    </div>);
}