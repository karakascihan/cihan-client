interface AvatarProps {
  name?: string;
  imageUrl?: string;
  onClick?: () => void;

  className?: string;        // wrapper
  avatarClassName?: string;  // yuvarlak avatar
  nameClassName?: string;    // isim text
}


export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUrl,
  onClick,
  className,
  avatarClassName,
  nameClassName,
}) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 select-none
        ${onClick ? "cursor-pointer" : "cursor-default"}
        ${className ?? ""}
      `}
    >
      {/* AVATAR */}
      <div
        className={`
          w-9 h-9 rounded-full overflow-hidden
          border border-gray-200
          bg-gray-100
          transition
          flex items-center justify-center
          hover:ring-2 hover:ring-sky-500/20
          ${avatarClassName ?? ""}
        `}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name ?? "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-gray-600">
            {initials}
          </span>
        )}
      </div>

      {/* İSİM */}
      {name && (
        <span
          className={`
            hidden md:inline text-sm font-medium text-gray-700
            ${nameClassName ?? ""}
          `}
        >
          {name}
        </span>
      )}
    </div>
  );
};
