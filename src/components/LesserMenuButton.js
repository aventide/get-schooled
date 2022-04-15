export default function LesserMenuButton({ icon, text, onClick }) {
  return (
    <div
      className=" border-2 border-blue-500 bg-blue-300 h-4 my-1 py-5 font-fancy text-blue-500 rounded-md flex items-center relative cursor-pointer hover:opacity-75 select-none"
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
