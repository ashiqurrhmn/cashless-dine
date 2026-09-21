import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center py-20">
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-accent mb-4 drop-shadow-[0_0_15px_rgba(232,75,43,0.3)]">404</h1>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          href="/"
          className="bg-accent text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
