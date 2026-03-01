import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="
      min-h-screen 
      flex 
      flex-col 
      bg-background 
      text-text
      dark:bg-darkBackground 
      dark:text-darkText
      transition-colors duration-300
    ">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;