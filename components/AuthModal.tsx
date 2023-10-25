"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";
import { on } from "events";


export const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open:boolean) => {
        if (!open) {
            onClose();
        }
    }

  return (
    <Modal
        title="Bine ai revenit!"
        description="Accesează contul tau."
        isOpen={isOpen}
        onChange={onChange}
    >
        <Auth
        theme="dark"
        magicLink
        providers={[]}
        supabaseClient={supabaseClient}
        appearance={{
            theme: ThemeSupa,
            variables: {
                default: {
                    colors: {
                        brand: '#404040',
                        brandAccent: '#65a30d',
                    }
                }
            }
        }}
        />
    </Modal>
  )
}

export default AuthModal;
