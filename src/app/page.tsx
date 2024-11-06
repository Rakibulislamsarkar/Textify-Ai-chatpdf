'use client';

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    if (user) {
      const result = await createUser({
        email: user.primaryEmailAddress?.emailAddress || '',
        imageUrl: user.imageUrl || '',
        userName: user.fullName || '',
      });
      console.log(result);
    }
  };

  return (
    <div>
      <Button>Click me</Button>
      <UserButton />
    </div>
  );
};

export default Home;
