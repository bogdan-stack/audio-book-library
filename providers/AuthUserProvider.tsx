"use client";

import { AuthUserContextProvider } from "@/hooks/useUserAuth";

interface UserProviderProps {
    children: React.ReactNode;
};

const AuthUserProvider: React.FC<UserProviderProps> = ({
    children }) => {
        return (
            <AuthUserContextProvider>
                {children}
            </AuthUserContextProvider>
        )
    };

    export default AuthUserProvider;