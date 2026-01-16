import { Copy, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useMutation } from "@tanstack/react-query";
import { createShareLink, deleteShareLink } from "../api/shareLink";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SharePopoverProps {
    open: boolean;
    onClose: () => void;
}

const SharePopover = ({ open, onClose }: SharePopoverProps) => {
    const [shareLink, setShareLink] = useState("");
    const createMutation = useMutation({
        mutationFn: createShareLink,
        onSuccess: (data) => {
            const fullLink = `${window.location.origin}/brain/${data.hash}`
            setShareLink(fullLink)
        },
        onError: (error) => {
            toast.error(`${error.message}.`)
            onClose()
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteShareLink,
        onSuccess: () => {
            toast.success("Sharelink deleted successfully")
            onClose()
        },
        onError: (error) => {
            toast.error(`${error.message}.`)
        }
    })

    useEffect(() => {
      if(open){
        createMutation.mutate()
      }
    }, [open]);
    
    function fallbackCopyText(text: string) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(shareLink);
            } else {
                fallbackCopyText(shareLink);
            }
            onClose();
        } catch {
            fallbackCopyText(shareLink);
        } finally {
            toast.success("Sharelink copied to clipboard");
        }
    };
    return (
        <div
            className={cn(
                "absolute right-13 sm:right-36 top-13 rounded-md border w-72 bg-background p-3 shadow-md flex flex-col gap-2",
                "origin-top-right transition-all duration-200 ease-out",
                open
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 -z-10 -translate-y-2 pointer-events-none"
            )}
        >
            <div>
                <h4 className="font-medium text-sm text-center">
                    Share Your Brain
                </h4>
                <p className="text-xs text-muted-foreground text-center">
                    Let others explore what you’ve saved.
                </p>
            </div>
            <Input readOnly className="h-8" value={shareLink} />
            <div className="grid grid-cols-2 gap-2">
                <Button variant={"destructive"} size={"sm"} onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
                <Button
                    variant={"primary"}
                    size={"sm"}
                    onClick={handleCopyLink}
                >
                    <Copy className="h-4 w-4" />
                    Copy
                </Button>
            </div>
            <Button variant={"outline"} size={"sm"} onClick={onClose}>
                Cancel
            </Button>
        </div>
    );
};

export default SharePopover;
