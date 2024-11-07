import { Suspense } from "react";
import ItemsList from "@/components/ItemsList";

export default function Home() {
  return (
    <Suspense>
      <ItemsList />
    </Suspense>
  );
}
