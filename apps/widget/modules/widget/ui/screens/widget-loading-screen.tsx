"use client";

import { useSetAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { contactSessionIdAtomFamily, errorMessageAtom, loadingMessageAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
    const [step, setStep] = useState<InitStep>("org");
    const [sessionValid, setSessionValid] = useState(false);
    const setOrganizationId = useSetAtom(organizationIdAtom);
    const loadingMessage = useAtomValue(loadingMessageAtom);
    const setLoadingMessage = useSetAtom(loadingMessageAtom);
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setScreen = useSetAtom(screenAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""));

    const validateOrganization = useAction(api.public.organizations.validate);

    useEffect(() => {
        if (step !== "org") {
            return;
        }

        setLoadingMessage("Đang tải tổ chức...")

        if (!organizationId) {
            setErrorMessage("ID tổ chức là bắt buộc")
            setScreen("error");
            return;
        }

        setLoadingMessage("Tìm ID tổ chức...");

        validateOrganization({ organizationId }).then((result) => {
            if (result.valid) {
                setOrganizationId(organizationId);
                setStep("session");
            } else {
                setErrorMessage(result.reason || "Cấu hình không hợp lệ");
                setScreen("error");
            }
        }).catch(() => {
            setErrorMessage("Không thể xác minh tổ chức");
            setScreen("error");
        })
    }, [step, organizationId, setErrorMessage, setScreen, setOrganizationId, setStep, validateOrganization, setLoadingMessage]);

    const validateContactSession = useMutation(api.public.contactSessions.validate);

    useEffect(() => {
        if (step !== "session") {
            return;
        }

        setLoadingMessage("Tìm ID phiên liên hệ...");

        if (!contactSessionId) {
            setSessionValid(false);
            setStep("done");
            return;
        }

        setLoadingMessage("Phiên xác thực ...")

        validateContactSession({ contactSessionId }).then((result) => {
            setSessionValid(result.valid);
            setStep("done");
        }).catch(() => {
            setSessionValid(false);
            setStep("done");
        })
    }, [step, contactSessionId, validateContactSession, setLoadingMessage]);

    useEffect(() => {
        if (step !== "done") {
            return;
        }

        const hasValidSession = contactSessionId && sessionValid;
        setScreen(hasValidSession ? "selection" : "auth");
    }, [step, contactSessionId, sessionValid, setScreen]);

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                    <p className="text-3xl">
                        Chào bạn! 👋
                    </p>
                    <p className="text-lg">
                        Mời bạn bắt đầu
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
                <LoaderIcon className="animate-spin" />
                <p className="text-sm">
                    {loadingMessage || "Đang tải..."}
                </p>
            </div>
        </>
    )
}