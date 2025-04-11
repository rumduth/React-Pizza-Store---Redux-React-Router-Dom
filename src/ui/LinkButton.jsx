import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  if (to === "-1")
    return (
      <button
        className="text-sm text-blue-400 hover:text-blue-600"
        onClick={() => navigate(-1)}
      >
        {children}
      </button>
    );
  return (
    <Link to={to} className="text-sm text-blue-400 hover:text-blue-600">
      {children}
    </Link>
  );
}
