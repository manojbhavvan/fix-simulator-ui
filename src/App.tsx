import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="pt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
