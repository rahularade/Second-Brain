import { Brain } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t py-8">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 mx-auto">
                <div className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Second Brain</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Second Brain. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
