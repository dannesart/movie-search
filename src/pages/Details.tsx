import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export default function Details() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex gap-4 items-center">
        <div className="w-12 aspect-square rounded-full bg-rose-50 text-rose-900 flex items-center justify-center">
          <FaAngleLeft />
        </div>
        Go back
      </button>
    </div>
  );
}
