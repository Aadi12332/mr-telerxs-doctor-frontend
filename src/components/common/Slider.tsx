import { useRef } from "react";
import Arrow from "../../assets/arrowicon.svg"
import Arrow2 from "../../assets/arrow2.svg"
const sliderData = [
  {
    id: 1,
    name: "Morem ipsum dolor",
    subtitle: "Morem ipsum dolor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    desc:
      "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: 2,
    name: "Morem ipsum dolor",
    subtitle: "Morem ipsum dolor",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    desc:
      "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: 3,
    name: "Morem ipsum dolor",
    subtitle: "Morem ipsum dolor",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    desc:
      "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
];

const CARD_WIDTH = 300 + 24;

const InfiniteSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = [...sliderData, ...sliderData];

  const scroll = (dir: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    container.scrollBy({
      left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH,
      behavior: "smooth",
    });

    setTimeout(() => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    }, 300);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2"
      >
        <img src={Arrow2} alt="" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2"
      >
        <img src={Arrow} alt="" />
      </button>
        <div className="max-w-[1165px] mx-auto overflow-hidden">
            <div
                ref={containerRef}
                className="flex gap-6 px-5 py-10 overflow-x-scroll scroll-smooth no-scrollbar"
            >
                {items.map((item, i) => (
                <div
                    key={i}
                    className="min-w-[360px] rounded-2xl bg-white p-6 shadow-[0px_4px_13.1px_0px_#00000033]"
                >
                    <div className="flex items-center gap-4">
                    <img
                        src={item.image}
                        className="h-[113px] w-[97px] rounded-[4px] object-cover -mt-10"
                    />
                    <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                    </div>

                    <p className="mt-4 text-sm italic text-gray-700">
                    {item.desc}
                    </p>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default InfiniteSlider;
