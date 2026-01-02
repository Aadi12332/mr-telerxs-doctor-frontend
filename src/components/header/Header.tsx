import BellIcon from "../../assets/bellicon.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import Logo from "../../assets/logo.svg";

type Props = {
  count?: number;
  onToggleSidebar: () => void;
};

export default function Header({ count, onToggleSidebar }: Props) {
  const displayCount =
    typeof count === "number" && count > 99 ? "99+" : count;

  return (
    <header className="h-[81px] bg-white flex items-center justify-between lg:px-6 px-3 lg:pl-8 shadow-sm">
      <div className="flex items-center gap-2">
        <button onClick={onToggleSidebar} className="p-2 lg:hidden">
          <div className="space-y-[3px]">
            <span className="block w-5 h-[3px] bg-black"></span>
            <span className="block w-5 h-[3px] bg-black"></span>
            <span className="block w-5 h-[3px] bg-black"></span>
          </div>
        </button>
        <div className="flex gap-2 items-center px-2 border border-[#D1D5DB] rounded-[8px] h-[38px]">
          <img src={SearchIcon} alt="" />
          <input
            type="text"
            placeholder="Search leads, projects..."
            className="text-[14px] outline-none lg:min-w-[256px] sm:w-[130px] w-[100px]"
          />
        </div>
      </div>

      <div className="flex lg:gap-12 gap-3 items-center">
        <div className="relative">
          <img src={BellIcon} className="lg:w-8 w-6 min-w-6" alt="" />

          {typeof count === "number" && count > 0 && (
            <span className="absolute lg:-top-2 -top-1 lg:left-5 left-4 px-1 lg:min-w-5 lg:h-5 min-w-4 h-4 flex items-center justify-center text-white bg-red-500 rounded-full text-[10px]">
              {displayCount}
            </span>
          )}
        </div>

        <img src={Logo} alt="" className="w-[80px] sm:w-[100px] lg:w-[150px]" />
      </div>
    </header>
  );
}
