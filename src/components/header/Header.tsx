export default function Header() {
  return (
    <header className="h-14 bg-white flex items-center justify-between px-6 shadow-sm">
      <h1 className="font-semibold">Dashboard Overview</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
        Export Report
      </button>
    </header>
  );
}
