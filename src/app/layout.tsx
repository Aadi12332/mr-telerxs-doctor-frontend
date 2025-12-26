import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#eef2ff]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
