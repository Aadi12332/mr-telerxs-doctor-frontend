
export default function Communication() {
  return (
    <div className="h-[calc(100vh-130px)]">
      <div className="h-full bg-white rounded-xl overflow-hidden flex border border-[#E5E7EB]">
        <div className="w-[320px] border-r flex flex-col">
          <div className="p-4 flex items-center gap-3 border-b">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-[#111827]">Sarah Johnson</p>
              <p className="text-sm text-[#6B7280]">Marketing</p>
            </div>
            <span className="ml-auto w-3 h-3 bg-green-500 rounded-full" />
          </div>

          <div className="p-4">
            <div className="flex items-center border rounded-lg px-3 py-2 text-sm text-[#6B7280]">
              🔍
              <input
                placeholder="Search chats..."
                className="ml-2 outline-none w-full"
              />
            </div>
          </div>

          <div className="flex border-b">
            <button className="flex-1 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
              Departments
            </button>
            <button className="flex-1 py-3 text-[#6B7280]">
              Direct
            </button>
          </div>

          <div className="flex-1 p-2 space-y-1">
            {[
              { name: "Marketing Team", color: "bg-blue-500", count: 3 },
              { name: "Accounting Team", color: "bg-green-500" },
              { name: "Construction Team", color: "bg-yellow-500", count: 1 },
              { name: "Plant Management", color: "bg-purple-500" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-white`}
                >
                  🏢
                </div>
                <span className="flex-1 font-medium text-[#111827]">
                  {item.name}
                </span>
                {item.count && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t text-sm text-[#6B7280] flex justify-between">
            <span>🟢 Online · 4 users online</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-gray-300 text-6xl mb-4">💬</div>
            <p className="text-lg font-medium text-[#111827]">
              Select a chat to start messaging
            </p>
            <p className="text-sm text-[#6B7280] mt-2">
              Choose from your departments, direct messages, or cross-department channels
            </p>
          </div>

          <div className="p-4 border-t flex items-center gap-3">
            <input
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-3 outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              ➤ Send
            </button>
          </div>

          <div className="text-center text-xs text-[#6B7280] py-2">
            Last sync: just now
          </div>
        </div>
      </div>
    </div>
  );
}
