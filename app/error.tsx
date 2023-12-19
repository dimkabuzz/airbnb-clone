"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

type ErrorStateProps = {
  error: Error;
};

function ErrorState({ error }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}
export default ErrorState;
