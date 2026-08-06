"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LayoutNotes({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.refresh();
  }, [pathname, router]);

  return <section>{children}</section>;
}