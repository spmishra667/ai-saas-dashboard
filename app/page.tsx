import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold">
            Dashboard Content
          </h1>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Card title="Total Users" value="1,200" />
            <Card title="API Requests" value="8,450" />
            <Card title="Revenue" value="$2,300" />
            <Card title="Active Users" value="320" />

          </div>

        </div>
      </div>

    </div>
  );
}