"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";


export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AuthLoading>
                <AuthLayout>
                    <p>Đang tải...</p>
                </AuthLayout>
            </AuthLoading>

            <Authenticated>
                {children}
            </Authenticated>

            <Unauthenticated>
                <AuthLayout>
                    <SignInView />
                </AuthLayout>
            </Unauthenticated>
        </>
    )
}