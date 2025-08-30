type ReadOnlyInputProps = {
  label: string;
  value: string;
};

const ReadOnlyInput = ({ label, value }: ReadOnlyInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs">{label}</label>
      <span className="font-medium text-xs">{value}</span>
    </div>
  );
};

export default ReadOnlyInput;
