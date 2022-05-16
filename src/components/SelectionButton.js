export default function SelectionButton({
  disabled,
  icon,
  text,
  onClick,
  selected,
}) {
  return (
    <div
      className={`
        ${
          disabled
            ? "bg-gray-400 text-gray-300"
            : "bg-blue-500 text-white cursor-pointer hover:opacity-75"
        }
        ${selected ? "border-orange-200 text-orange-200" : "border-transparent"}
        border-4 h-4 my-1 py-5 font-fancy rounded-md flex items-center relative select-none`}
      onClick={!disabled && onClick}
    >
      <div className="absolute left-4">{icon}</div>
      <div className="flex flex-1 justify-center">
        <button className="flex" disabled={disabled}>
          <span className="px-3">{text}</span>
        </button>
      </div>
    </div>
  );
}
