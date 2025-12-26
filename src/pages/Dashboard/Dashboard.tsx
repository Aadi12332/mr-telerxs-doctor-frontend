import { removeToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Welcome Dashboard 🎉</h1>

      <button
        onClick={() => {
          removeToken();
          navigate("/login");
        }}
        className="bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
