export const Badge = ({ count }: { count: number }) => (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
    {count}
  </span>
);
