"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@chakra-ui/react";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  const handleClick = (event: React.MouseEvent) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      colorScheme="purple"
      isLoading={pending}
      loadingText="Loading"
      onClick={handleClick}
      type="submit"
    >
      {label}
    </Button>
  );
}
