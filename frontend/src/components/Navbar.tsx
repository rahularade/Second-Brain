import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";


const Navbar = () => {
  return <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
    <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Second Brain</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"ghost"}>
            <Link to={"/signin"}>Sign In</Link>
          </Button>
          <Button>
            <Link to={"/dashboard"}>Get Started</Link>
          </Button>
        </div>
    </div>
  </header>;
};

export default Navbar;