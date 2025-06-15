
import React from "react";
import { AlertTriangle, Phone } from "lucide-react";

interface Props {
  urgent: boolean;
  onEscalate?: () => void;
}

const EmergencyAlert: React.FC<Props> = ({ urgent, onEscalate }) => {
  if (!urgent) return null;
  return (
    <div className="bg-red-50 border-2 border-red-200 text-red-800 p-6 rounded-xl shadow-md animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <strong className="block text-lg font-semibold mb-2">
            It sounds like you may need urgent help!
          </strong>
          <p className="mb-4">
            Do you want us to escalate this to a legal support hotline or start an emergency call?
          </p>
          <button
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
            onClick={onEscalate}
          >
            <Phone className="w-4 h-4" />
            Escalate / Emergency Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
