import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-[#E5ECFF]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header  onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main className="lg:px-8 px-3 py-6 h-[calc(100vh-81px)] overflow-auto scroll-hide">{children}</main>
      </div>
    </div>
  );
}
