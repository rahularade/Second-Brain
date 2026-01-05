import type { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode,
    title: string,
    description: string
}
const FeatureCard= ({icon, title, description}:FeatureCardProps) => {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">
                {description}
            </p>
        </div>
    );
};
export default FeatureCard;
