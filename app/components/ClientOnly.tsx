"use client";

import { useState, useEffect } from "react";

type ClientOnlyProps = {
  children: React.ReactNode;
};

function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
export default ClientOnly;