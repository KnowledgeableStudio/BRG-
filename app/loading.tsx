export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-brg-blue/30 border-t-brg-blue" />
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
          Loading
        </p>
      </div>
    </div>
  );
}
