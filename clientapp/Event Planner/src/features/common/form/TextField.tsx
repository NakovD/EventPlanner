interface ITextFieldProps {
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

export const TextField = ({ label, placeholder, disabled }: ITextFieldProps) => {
  return (
    <label className="flex flex-col">
      <span className="mb-2">{label}</span>
      <input
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
};
