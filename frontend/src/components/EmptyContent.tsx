import { FolderOpen, Plus } from "lucide-react";
import Button from "./ui/Button";

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyContent = ({onAddClick}:EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4"/>
            <h3 className="text-lg font-medium mb-2">No contents yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
                Start building your second brain by adding your first content.
            </p>
            <Button className="flex-1 sm:flex-none" onClick={onAddClick}>
                <Plus className="size-5" />
                <p className="hidden sm:block">Add Your Content</p>
            </Button>
        </div>
    );
};

export default EmptyContent;
