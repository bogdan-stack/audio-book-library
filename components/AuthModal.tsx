"use client";

import { useState, useEffect } from "react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import Input from "./Input";
import Button from "./Button";



export const AuthModal = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isUserExists, setIsUserExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@(navy|mapn|forter|roaf|gmail)\.(com|ro)$/;
      setIsEmailValid(emailRegex.test(loginEmail));
  }, [loginEmail]);


    const Login = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: loginEmail })
        });

        if (response.ok) {
          setIsEmailSent(true);
        } else {
          // Handle error
          console.error('Failed to send magic link');
        }
      } catch (error) {
        // Handle error
        console.error('Failed to send magic link', error);
      } finally {
        setIsLoading(false);
      }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        Login();
      };

    const onChange = (open:boolean) => {
        if (!open) {
            onClose();
        }
    //setIsEmailSent(true);
    }

    return (
        <>
        {console.log(loginEmail)}
        <Modal
            title="Bine ai venit!"
            description="Accesează contul tau."
            isOpen={isOpen}
            onChange={onChange}
        >
          {isEmailSent ? (
            <div>

              <div className="py-4 text-center">
              <p className="text-center">
              Verificați-vă email-ul pentru a vă autentifica!
              </p>
              </div>

              <Button className="pt-4" onClick={onClose}>Închide</Button>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>
            <div className="pb-1 text-center">
                Introduceţi datele de autentificare
            </div>

            <div className="pb-3">
                <Input type="email" name="email" placeholder="Adresă e-mail" onChange={e => setLoginEmail(e.target.value)}/>
                {!isEmailValid && <div className=" text-red-300 text-sm pt-1">Folosiţi adresa dvs. oficială de email!</div>}
            </div>

            <p className="pb-3 text-sm text-neutral-500 text-center">
              Un link de autentificare va fi trimis pe adresa de email introdusă.
            </p>

            <Button  type="submit" disabled={!isEmailValid || isLoading}>
            {isLoading ? 'Se încarcă...' : 'Trimite email'}
            </Button>
            </form>
            )}
        </Modal>
        </>
    )
}

export default AuthModal;