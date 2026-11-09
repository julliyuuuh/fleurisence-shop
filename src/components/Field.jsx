export default function Field({
  label,
  name,
  error,
  optional = false,
  as: Tag = "input",
  className = "",
  ...props
}) {
  const errorId = `${name}-error`;

  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}
        {optional && (
          <span className="font-normal text-forest-soft"> (optional)</span>
        )}
      </span>
      <Tag
        name={name}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-2xl border bg-paper px-4 py-3 outline-none transition focus-visible:ring-2 focus-visible:ring-forest ${
          error ? "border-rose" : "border-line"
        } ${className}`}
        {...props}
      />
      {error && (
        <span id={errorId} className="mt-1 block text-sm text-rose">
          {error}
        </span>
      )}
    </label>
  );
}
