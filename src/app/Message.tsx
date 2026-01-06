import { useState } from "react";
import PatientProfileModal from "./PatientProfileModal";
import notificationicon from "../assets/messagenotiicon.svg";
import searchicon from "../assets/searchIcon.svg";
import lockimg from "../assets/lockimg.svg";
import sendicon from "../assets/sendicon.svg";
import deleteicon from "../assets/deleteicon.svg";
import linkicon from "../assets/linkattachicon.svg";
import AlertIcon from "../assets/AlertIcon";

type Message = {
  from: "patient" | "doctor";
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  role: string;
  lastSeen: string;
  image: string;
  unread?: number;
  messages: Message[];
};

const notifications = [
  {
    title: "New Telehealth Policy Update",
    description:
      "Updated guidelines for remote consultations effective Dec 15, 2025",
    date: "2025-12-08",
  },
  {
    title: "Payout Processed",
    description: "$2,450 has been transferred to your linked bank account",
    date: "2025-12-07",
  },
  {
    title: "License Verification Required",
    description: "Annual license verification due by Dec 31, 2025",
    date: "2025-12-07",
  },
];

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    lastSeen: "5 mins ago",
    unread: 2,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    messages: [
      {
        from: "patient",
        text: "Hi Doctor, I wanted to follow up on the medication you prescribed.",
        time: "10:30 AM",
      },
      {
        from: "doctor",
        text: "Hello Michael, how are you feeling? Have you started taking the Nitroglycerin?",
        time: "10:32 AM",
      },
      {
        from: "patient",
        text: "Hi Doctor, I wanted to follow up on the medication you prescribed.",
        time: "10:30 AM",
      },
      {
        from: "doctor",
        text: "Hello Michael, how are you feeling? Have you started taking the Nitroglycerin?",
        time: "10:32 AM",
      },
      {
        from: "patient",
        text: "Hi Doctor, I wanted to follow up on the medication you prescribed.",
        time: "10:30 AM",
      },
      {
        from: "doctor",
        text: "Hello Michael, how are you feeling? Have you started taking the Nitroglycerin?",
        time: "10:32 AM",
      },
      {
        from: "patient",
        text: "Hi Doctor, I wanted to follow up on the medication you prescribed.",
        time: "10:30 AM",
      },
      {
        from: "doctor",
        text: "Hello Michael, how are you feeling? Have you started taking the Nitroglycerin?",
        time: "10:32 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Patient",
    lastSeen: "10 mins ago",
    unread: 1,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      {
        from: "patient",
        text: "When should I schedule my next consultation?",
        time: "11:00 AM",
      },
    ],
  },
];

export default function MedicineOrder() {
  const [chatList, setChatList] = useState(conversations);
  console.log({ chatList });
  const [openProfile, setOpenProfile] = useState(false);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const handleDeleteChat = () => {
    if (!activeChat) return;

    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id ? { ...chat, messages: [] } : chat
      )
    );

    setActiveChat((prev) => (prev ? { ...prev, messages: [] } : prev));
  };

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="text-[28px] font-medium text-[#000]">
            Communication Center
          </h2>
          <p className="text-[20px] text-[#00000080]">
            Secure messaging with patients and platform notifications
          </p>
        </div>

        <div className="bg-[#BAD7FFCC] backdrop-blur-[38.4px] rounded-[20px] py-6 px-[30px] mb-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={notificationicon} className="w-6 h-6" />
            <h2 className="text-[22px] font-semibold">Notifications</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {notifications.map((item, i) => (
              <div key={i} className="bg-white rounded-[20px] p-6">
                <h3 className="text-[22px] mb-7">{item.title}</h3>
                <p className="text-[20px] text-[#00000080]">
                  {item.description}
                </p>
                <p className="text-right mt-2 text-[#00000080]">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden mb-8">
          <div className="flex items-center justify-between px-8 py-8 border-b">
            <h2 className="text-[28px] font-semibold text-[#0E82FD]">
              Patient Messages
            </h2>

            <div className="flex items-center gap-3 h-[48px] rounded-[20px] w-[360px] border px-4">
              <input
                placeholder="Search conversations..."
                className="flex-1 outline-none"
              />
              <img src={searchicon} />
            </div>
          </div>

          <div className="flex h-[700px]">
            <div className="w-[544px] border-r overflow-auto scroll-hide">
              {conversations.map((item) => {
                const last = item.messages[item.messages.length - 1];

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveChat(item)}
                    className={`flex items-center gap-4 px-5 py-4 border-b cursor-pointer ${
                      activeChat?.id === item.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img src={item.image} className="w-20 h-20 rounded-full" />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-[22px]">{item.name}</p>
                        <p className="text-sm text-[#00000080]">{last?.time}</p>
                      </div>

                      <div className="flex justify-between">
                        <p className="w-[250px] truncate text-[#00000080]">
                          {last?.text}
                        </p>

                        {item.unread && (
                          <span className="bg-[#0E82FD] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                            {item.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex-1 flex flex-col">
              {!activeChat ? (
                <div className="flex-1 flex items-center justify-center text-[#00000080] text-[26px]">
                  Select a conversation to start messaging
                </div>
              ) : (
                <>
                  <div className="px-6 py-2 border-b flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeChat.image}
                        alt=""
                        className="w-20 h-20 rounded-full"
                      />
                      <div className="">
                        <p className="font-medium text-[22px] mb-1">
                          {activeChat.name}
                        </p>
                        <p className="text-[20px] text-[#00000080]">
                          {activeChat.role} • {activeChat.lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div
                        onClick={() => setOpenProfile(true)}
                        className="border-[0.32px] border-[#00000066] text-[14px] font-medium px-4 py-2 rounded-lg cursor-pointer"
                      >
                        View Profile
                      </div>
                      <img
                        src={deleteicon}
                        alt=""
                        className="cursor-pointer"
                        onClick={handleDeleteChat}
                      />
                    </div>
                  </div>
                  <div className="bg-[#B3DEF5] text-[#0E5C86] text-[18px] text-center flex items-center gap-2 py-3 justify-center">
                    <img src={lockimg} alt="" />
                    This conversation is end-to-end encrypted and HIPAA
                    compliant
                  </div>

                  <div className="flex-1 p-6 space-y-4 overflow-auto scroll-hide">
                    {activeChat.messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`max-w-[70%] p-4 rounded-xl ${
                          msg.from === "doctor"
                            ? "ml-auto bg-[#2F6EA3] text-white"
                            : "border"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs text-right">{msg.time}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t px-6 py-4 flex gap-4">
                    <img src={linkicon} alt="" />
                    <input
                      placeholder="Type a HIPAA-compliant message..."
                      className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none"
                    />
                    <button className="bg-[#2F6EA3] text-white px-6 rounded-xl flex gap-2 items-center">
                      <img src={sendicon} alt="" />
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {openProfile && (
          <PatientProfileModal onClose={() => setOpenProfile(false)} />
        )}

        <div className="bg-[#F6D6D6] rounded-2xl px-6 py-5 flex justify-between mb-8">
          <div className="flex gap-4 items-center">
            <AlertIcon />
            <div>
              <h3 className="text-[22px] mb-2">Report Concerns</h3>
              <p className="text-[#00000099]">
                Report medical or ethical concerns directly
              </p>
            </div>
          </div>

          <button className="bg-[#C41313] text-white px-5 py-3 rounded-[15px]">
            Report to Compliance
          </button>
        </div>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[#b0b0b0]">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
