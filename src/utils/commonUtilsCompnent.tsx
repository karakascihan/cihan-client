

export const getEnumOptions = <
  T extends number | string
>(
  descriptions: Record<T, string>
): any => {
  return (Object.keys(descriptions) as unknown as T[]).map((key) => ({
    value: Number(key) as T, // 🔥 numeric enum fix
    label: descriptions[key as T],
  }));
};
type EnumDescriptionProps<T extends string | number> = {
  value?: T | null;
  descriptions: Record<T, string>;
  fallback?: string;
};

export function enumToLabel<T extends string | number>(
  value: T | null | undefined,
  descriptions: Record<T, string>,
  fallback = "-"
): string {
  if (value === null || value === undefined) return fallback;

  return descriptions[value] ?? fallback;
}