export default function Loading() {
  return (
    <div className="[direction:rtl] px-2 grid place-items-center h-[100dvh] bg-bg-color text-white font-extrabold">
      <div className="flex items-center gap-2">
        <span className="block size-5 border-2 border-white border-b-transparent rounded-full animate-spin  "></span>
        <h1>جار التحميل...</h1>
      </div>
    </div>
  );
}
