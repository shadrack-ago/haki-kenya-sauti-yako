
import React from "react";

interface Props {
  urgent: boolean;
  onEscalate?: () => void;
}

const EmergencyAlert: React.FC<Props> = ({ urgent, onEscalate }) => {
  if (!urgent) return null;
  return (
    <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-4 mb-4 rounded flex flex-col gap-2">
      <strong>It sounds like you may need urgent help!</strong>
      <span>
        Do you want us to escalate this to a legal support hotline or start an emergency call?
      </span>
      <button
        className="self-start bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        onClick={onEscalate}
      >
        Escalate / Emergency Call
      </button>
    </div>
  );
};

export default EmergencyAlert;
