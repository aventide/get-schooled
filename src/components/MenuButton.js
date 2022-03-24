export default function MenuButton({ icon, text, onClick }) {
  return (
    <div
      className="bg-blue-500 h-4 my-2 py-6 font-fancy text-blue-100 rounded-md flex items-center relative cursor-pointer hover:opacity-75 select-none"
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
