import dynamic from "next/dynamic";
const VerifyComponent = dynamic(() => import("./_components/verify"), { ssr: false });

export default function VerifyPage() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full p-6">
      <section className="bg-white/90 dark:bg-hero_bg rounded-lg shadow-md p-6">
        <VerifyComponent />
      </section>
    </main>
  );
}
