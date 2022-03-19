import Modal from "react-modal";

export default function StyledModal({ isOpen, onClose, title, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="In-Game Settings"
      className="bg-blue-100 fixed inset-8 md:inset-32 lg:inset-72 m-auto p-8 border-blue-400 border-4 rounded-lg h-max"
    >
      <div className="flex justify-between text-blue-400 w-full mb-12">
        <span className="font-fancy">{title}</span>
        <button className="hover:opacity-75" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {children}
    </Modal>
  );
}
