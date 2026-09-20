import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Reserve a Table | CashlessDine",
  description:
    "Book your table at CashlessDine. Choose your date, time, and party size for an unforgettable dining experience.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      {/* Hero banner */}
      <section className="pt-28 pb-6 max-md:pt-20 max-md:pb-4 px-6 max-md:px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-white/10 px-4 py-1.5 rounded-full text-[0.65rem] max-md:text-[0.55rem] text-accent font-semibold tracking-widest uppercase w-fit mx-auto mb-5 max-md:mb-3">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot"></span>
            Table Reservation
          </div>
          <h1 className="font-heading text-4xl max-md:text-2xl font-extrabold text-white mb-3 max-md:mb-2 leading-tight">
            Reserve Your <span className="text-accent">Table</span>
          </h1>
          <p className="text-white/40 text-sm max-md:text-xs leading-relaxed max-w-md mx-auto">
            Secure your spot for an exquisite dining experience. Select your
            preferred date, time, and party size below.
          </p>
        </div>
      </section>

      {/* Booking form */}
      <section className="px-6 max-md:px-4 pb-24 max-md:pb-32 pt-4">
        <BookingForm />
      </section>
    </main>
  );
}
