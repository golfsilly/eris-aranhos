import ComingSoonPage from "@/components/coming-soon";

export default function AdminPage() {
  const isComingSoon = true;

  if (isComingSoon) {
    return <ComingSoonPage />;
  }

  return <div></div>;
}
