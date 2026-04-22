import { useEffect, useState } from "react";
import PatientProfileModal from "./PatientProfileModal";
import notificationicon from "../assets/messagenotiicon.svg";
import searchicon from "../assets/searchIcon.svg";
import lockimg from "../assets/lockimg.svg";
import sendicon from "../assets/sendicon.svg";
import deleteicon from "../assets/deleteicon.svg";
import linkicon from "../assets/linkattachicon.svg";
import AlertIcon from "../assets/AlertIcon";
import backarrowicon from "../assets/backlongarrowicon.svg";
import { getNotification, getPatientList } from "../api/auth.api";
import { sendMessage } from "../services/chat";
import { collection, onSnapshot, orderBy, query,  deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../routes/AuthContext";
import dayjs from "dayjs";





export default function MedicineOrder() {
  const { auth } = useAuth();
  const user = auth?.user;

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const currentUserId = user?._id;

  const [openProfile, setOpenProfile] = useState(false);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [notification,setNotification] = useState<any>([]);
  const handleDeleteChat = async () => {
    if (!activeChat) return;
    const chatId = [currentUserId, activeChat?.user?._id].sort().join("_");

    try {
      const messagesRef = collection(
        db,
        "tickets",
        chatId,
        "messages"
      );

      const snapshot = await getDocs(messagesRef);

      const deletePromises = snapshot.docs.map((docItem) =>
        deleteDoc(docItem.ref)
      );

      await Promise.all(deletePromises);

    } catch (err) {
      console.log(err);
    }
  };
  const handleNotification = async () => {
    try{
      const res = await getNotification();
      setNotification(res.data?.data);
    }catch(err){
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getPatientList();
      const data = res.data?.data.filter((i: any) => i.user)
      setUsers(data);
    };
    fetchUsers();
    handleNotification();
  }, []);
  useEffect(() => {
    if (!activeChat) return;

    const chatId = [currentUserId, activeChat?.user?._id].sort().join("_");

    // const q = query(
    //   collection(db, "messages"),
    //   where("chatId", "==", chatId),
    //   orderBy("createdAt", "asc")
    // );
    const q = query(
      collection(db, "tickets", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs as any);
    });
    return () => unsubscribe();
  }, [activeChat]);
  const handleSend = async () => {
    if (!input.trim() || !activeChat) return;

    const chatId = [currentUserId, activeChat?.user?._id].sort().join("_");

    await sendMessage(input, chatId, currentUserId);

    setInput("");
  };
  const getInitials = (name: string) => {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].charAt(0);
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    );
  };
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
            Communication Center
          </h2>
          <p className="text-base lg:text-[20px] text-[#00000080]">
            Secure messaging with patients and platform notifications
          </p>
        </div>

        <div className="bg-[#BAD7FFCC] backdrop-blur-[38.4px] lg:rounded-[20px] rounded-lg py-6 lg:px-[30px] px-3 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={notificationicon} className="w-6 h-6" />
            <h2 className="text-[22px] font-semibold">Notifications</h2>
          </div>

         { notification.length>0&&<div className="grid md:grid-cols-3 gap-6 max-h-[400px] overflow-y-auto min-h-[100px]">
            {notification.map((item:any, i:number) => (
              <div
                key={i}
                className="bg-white lg:rounded-[20px] rounded-lg md:p-6 p-3 flex flex-col justify-between"
              >
                <div>
                  <h3 className="lg:text-[22px] text-[18px] mb-7">
                    {item.title}
                  </h3>
                  <p className="lg:text-[20px] text-base text-[#00000080]">
                    {item.message}
                  </p>
                </div>
                <p className="text-right mt-2 text-sm lg:text-base text-[#00000080]">
                  {item.updatedAt?dayjs(item.updatedAt).format('MMM DD, YYYY'):item.createdAt?dayjs(item.createdAt).format('MMM DD, YYYY'):'--'}
                </p>
              </div>
            ))}
        
          </div>}
          <div>
            {notification.length ===0 && <p className="text-center text-[#00000080]">No Notification found</p>}
          </div>
        </div>

        <div className="bg-white lg:rounded-[20px] rounded-lg border overflow-hidden mb-8">
          <div className="flex sm:flex-row flex-col sm:items-center gap-3 justify-between lg:px-8 px-3 lg:py-8 py-4 border-b">
            <h2 className="lg:text-[28px] text-[22px] font-semibold text-[#0E82FD]">
              Patient Messages
            </h2>

            <div className="flex items-center sm:gap-3 gap-1 sm:h-[48px] h-[40px] lg:rounded-[20px] rounded-lg border lg:px-4 px-2 min-w-[175px]">
              <input
                placeholder="Search conversations..."
                className="flex-1 outline-none lg:w-[360px] sm:w-[150px] w-[120px]"
              />
              <img src={searchicon} />
            </div>
          </div>

          <div className="flex sm:h-[700px] h-[600px]">
            <div
              className={`xl:w-[544px] md:w-[350px] w-full border-r overflow-auto scroll-hide
    ${isMobileChatOpen ? "hidden md:block" : "block"}
  `}
            >
              {users.map((item: any) => {

                return (
                  <div
                    key={item?.user?._id}
                    onClick={() => {
                      setActiveChat(item);
                      setIsMobileChatOpen(true);
                    }}
                    className={`flex items-center xl:gap-4 gap-2 xl:px-5 px-2 lg:py-4 py-2 border-b cursor-pointer ${activeChat?.user?._id === item?.user?._id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    {/* <img
                      src={item.image}
                      className="xl:w-20 xl:h-20 w-16 h-16 rounded-full"
                    /> */}
  <div className="xl:w-16 xl:h-16 sm:w-12 w-8 sm:h-12 h-8">
                        
                        {item?.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-black font-semibold lg:text-xl text-sm uppercase">
                              {getInitials(`${item?.user?.firstName} ${item?.user?.lastName}`)}
                            </span>
                          </div>
                        )}
                      </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center gap-2">
                        <p className="lg:text-[22px] text-[18px]">
                          {item?.user?.firstName}  {item?.user?.lastName}
                        </p>
                        {/* <p className="text-sm text-[#00000080]">{item?.user?._id}</p> */}
                      </div>

                      <div className="flex justify-between">
                        <p className="xl:w-[250px] w-[150px] text-[14px] lg:text-base truncate text-[#00000080]">
                          {item?.user?.username}
                        </p>

                        {item?.unread && (
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

            <div
              className={`flex-1 flex flex-col
    ${!isMobileChatOpen ? "hidden md:flex" : "flex"}
  `}
            >
              {!activeChat ? (
                <div className="flex-1 flex items-center justify-center text-[#00000080] lg:text-[26px] text-[18px]">
                  Select a conversation to start messaging
                </div>
              ) : (
                <>
                  <div className="lg:px-6 px-2 py-2 border-b flex justify-between items-center">
                    <div className="flex items-center lg:gap-3 gap-1">
                      {isMobileChatOpen && (
                        <img
                          src={backarrowicon}
                          className="md:hidden w-6 cursor-pointer invert"
                          onClick={() => setIsMobileChatOpen(false)}
                        />
                      )}
                      <div className="xl:w-16 xl:h-16 sm:w-12 w-8 sm:h-12 h-8">
                        
                        {activeChat?.image ? (
                          <img
                            src={activeChat.image}
                            alt=""
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-black font-semibold lg:text-xl text-sm uppercase">
                              {getInitials(`${activeChat?.user?.firstName} ${activeChat?.user?.lastName}`)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <p className="font-medium lg:text-[22px] text-[16px] sm:mb-1">
                          {activeChat?.user?.firstName} {activeChat?.user?.lastName}
                        </p>
                        <p className="lg:text-[20px] text-[13px] text-[#00000080]">
                          {activeChat.role} • {activeChat.lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:gap-5 gap-2 items-center">
                      <div
                        onClick={() => setOpenProfile(true)}
                        className="border-[0.32px] border-[#00000066] sm:text-[14px] text-xs font-medium lg:px-4 px-2 lg:py-2 py-1.5 rounded-lg cursor-pointer"
                      >
                        View Profile
                      </div>
                      <img
                        src={deleteicon}
                        alt=""
                        className="cursor-pointer lg:w-10 w-6"
                        onClick={handleDeleteChat}
                      />
                    </div>
                  </div>
                  <div className="bg-[#B3DEF5] text-[#0E5C86] lg:text-[18px] text-sm text-center flex items-center gap-2 py-3 px-2 justify-center">
                    <img src={lockimg} alt="" />
                    This conversation is end-to-end encrypted and HIPAA
                    compliant
                  </div>

                  <div className="flex-1 lg:p-6 p-3 space-y-4 overflow-auto scroll-hide">
                    {(messages ?? []).map((msg: any, i) => (
                      <div
                        key={i}
                        className={`max-w-[70%] lg:p-4 p-2 rounded-lg lg:rounded-[10px] ${msg.senderId === currentUserId
                            ? "ml-auto bg-[#2F6EA3] text-white"
                            : "border"
                          }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs text-right mt-1">{msg.createdAt?.toDate().toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t lg:px-6 px-3 lg:py-4 py-2 flex lg:gap-4 gap-2">
                    <img src={linkicon} alt="" className="sm:w-[34px] w-6" />
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a HIPAA-compliant message..."
                      className="flex-1 bg-gray-100 rounded-lg lg:rounded-[10px] sm:px-4 px-2 sm:py-3 py-2 outline-none"
                    />
                    <button onClick={handleSend} className="bg-[#2F6EA3] text-white lg:px-6 px-2 rounded-lg lg:rounded-[10px] text-sm lg:text-base flex gap-2 items-center">
                      <img src={sendicon} alt="" className="lg:w-5 w-4" />
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {openProfile && (
          <PatientProfileModal onClose={() => setOpenProfile(false)} activeChat={activeChat}/>
        )}

        <div className="bg-[#F6D6D6] lg:rounded-[20px] rounded-lg lg:px-6 px-2 py-5 flex sm:flex-row flex-col gap-5 items-start sm:items-center justify-between mb-8">
          <div className="flex sm:gap-4 gap-2 items-center">
            <AlertIcon />
            <div>
              <h3 className="text-lg lg:text-[22px] sm:mb-2">Report Concerns</h3>
              <p className="text-[#00000099] text-sm lg:text-[16px]">
                Report medical or ethical concerns directly
              </p>
            </div>
          </div>

          <button className="bg-[#C41313] text-white px-5 py-3 lg:rounded-[15px] rounded-lg">
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
