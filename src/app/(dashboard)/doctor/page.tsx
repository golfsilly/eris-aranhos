import ComingSoonPage from "@/components/coming-soon";

export default function Page() {
  const isComingSoon = true;

  if (isComingSoon) {
    return <ComingSoonPage />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold"></h1>
    </div>
  );
}