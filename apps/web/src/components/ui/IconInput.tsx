import { LucideIcon } from "lucide-react";

type IconInputProps = {
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function IconInput({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: IconInputProps) {
  return (
    <div className="relative">
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80"
        size={18}
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          h-12
          rounded-xl
          bg-white/20
          backdrop-blur
          pl-11
          pr-4
          text-white
          placeholder-white/70
          border
          border-white/30
          outline-none
          transition
          focus:border-white
          focus:ring-2
          focus:ring-white/40
        "
      />
    </div>
  );
}
