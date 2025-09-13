"use client";

import React, { useId } from "react";
import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { twMerge } from "tailwind-merge";

interface InputPhoneProps {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  value?: string;
  onChange: (value: Value | undefined) => void;
  placeholder?: string;
  highlightWhenFocused?: boolean;
}

const InputPhone: React.FC<InputPhoneProps> = ({
  label,
  icon,
  error,
  value,
  onChange,
  placeholder = "Ex: (11) 99999-9999",
  highlightWhenFocused = false,
}) => {
  const randomId = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={randomId}
          className={twMerge(
            "font-bold text-xs text-black dark:text-white",
            error ? "text-red-500" : "",
          )}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          "flex items-center text-xs relative w-full border border-[#FFFFFF0D] rounded-[20px] bg-[#0000000D] dark:bg-transparent p-[16px] h-[48px] placeholder:text-[#FFFFFF40]",
          error ? "border-red-500" : "",
          highlightWhenFocused ? "focus-within:border-[#2056F2]" : "",
          "phone-input-container",
        )}
      >
        {icon && (
          <div className="dark:text-[#FFFFFF40] text-[#00000080] absolute left-[16px] z-10">
            {icon}
          </div>
        )}

        <PhoneInput
          id={randomId}
          international
          countryCallingCodeEditable={false}
          defaultCountry="BR"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={twMerge("phone-input", icon && "pl-[32px]")}
          numberInputProps={{
            className: "phone-number-input",
          }}
        />
      </div>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}

      <style jsx global>{`
        .phone-input-container .PhoneInput {
          width: 100%;
          display: flex;
          align-items: center;
        }

        .phone-input-container .PhoneInputInput {
          background: transparent;
          border: none;
          outline: none;
          color: inherit;
          font-size: 12px;
          height: 100%;
          width: 100%;
          padding: 0;
          margin-left: 8px;
        }

        .phone-input-container .PhoneInputInput::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        [data-theme="light"]
          .phone-input-container
          .PhoneInputInput::placeholder {
          color: rgba(0, 0, 0, 0.5);
        }

        .phone-input-container .PhoneInputCountry {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }

        .phone-input-container .PhoneInputCountryIcon {
          width: 16px;
          height: 12px;
          margin-right: 4px;
        }

        .phone-input-container .PhoneInputCountrySelect {
          background: transparent;
          border: none;
          outline: none;
          color: inherit;
          font-size: 12px;
          cursor: pointer;
        }

        .phone-input-container .PhoneInputCountrySelectArrow {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InputPhone;
