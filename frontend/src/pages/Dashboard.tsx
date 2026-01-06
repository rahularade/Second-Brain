import { useState } from "react";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import type { ContentType } from "../schemas/content.schema";
import { cn } from "../lib/utils";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<ContentType | "all">("all");

    const onClose = () => setIsOpen(false)
    const onTabChange = (tab: ContentType | "all") => {
        setActiveTab(tab);
        if(window.matchMedia("(max-width: 768px)").matches){
            setIsOpen(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar activeTab={activeTab} onTabChange={onTabChange} isOpen={isOpen} onClose={onClose}/>
            <div className={cn("flex-1 flex flex-col transition-all duration-300", isOpen && "md:ml-72")}>
                <Appbar setIsOpen={setIsOpen}/>
                <main className="flex-1 p-6"></main>
            </div>
        </div>
    );
};

export default Dashboard;
