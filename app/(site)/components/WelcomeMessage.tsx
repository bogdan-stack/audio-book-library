"use client";
import { useUser } from "@/hooks/useUserAuth";

const WelcomeMessage: React.FC = () => {
  const user = useUser();

  // Render the user details or return them to be used in another component
  return (
    <>
      <div className="mb-2">
        <h1 className="text-white text-3xl font-semibold">
        {user ? `Bine ai venit, ${user.userName.split(' ')[0]}!` : 'Bine ai venit!'}
        </h1>
      </div>
    </>
  );
};

export default WelcomeMessage;