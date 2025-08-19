import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";
import { Doc } from "@workspace/backend/_generated/dataModel"
import { Button } from "@workspace/ui/components/button";
import { Hint } from "@workspace/ui/components/hint"

export const ConversationStatusButton = ({ status, onClick, disabled }: {
    status: Doc<"conversations">["status"];
    onClick: () => void;
    disabled?: boolean;
}) => {
    if (status === "resolved") {
        return (
            <Hint
                text="Mark as unresolved"
            >
                <Button
                    disabled={disabled}
                    onClick={onClick}
                    size="sm"
                    variant="tertiary"
                >
                    <CheckIcon />
                    Đã giải quyết
                </Button>
            </Hint>
        )
    }

    if (status === "escalated") {
        return (
            <Hint
                text="Mark as resolved"
            >
                <Button
                    disabled={disabled}
                    onClick={onClick}
                    size="sm"
                    variant="warning"
                >
                    <ArrowUpIcon />
                    Leo thang
                </Button>
            </Hint>
        )
    }

    return (
        <Hint
            text="Mark as escalated"
        >
            <Button
                disabled={disabled}
                onClick={onClick}
                size="sm"
                variant="destructive"
            >
                <ArrowRightIcon />
                Chưa được giải quyết
            </Button>
        </Hint>
    )
}