// import SelectionButton from '../components/SelectionButton';

export default function SoloSelectScreen({ onBack }) {
  return (
    <div
      className={`w-full h-screen ${
        false ? "md:w-4/5" : "md:w-3/5 lg:w-2/5"
      } bg-blue-300 flex flex-col`}
    >
      <div className="m-2 text-white flex items-center">
        <button onClick={onBack} className="bg-blue-500 rounded-md">
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
        <span className="font-fancy text-xl text-center flex-1 mr-10">
          Solo Mode
        </span>
      </div>
    </div>
  );
}
