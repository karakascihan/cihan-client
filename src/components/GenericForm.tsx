import React, { JSX, useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormSetValue,
} from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { ProbabilityInput } from "./ProbabilityInput";
import { colSpanMap } from "@/helper/tailwindHelper";

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "date"
  | "checkbox"
  | "file"
  | "textarea"
  | "datetime-local"
  | "async-select"
  | "button"
  | "time"
  | "probability"
  | "editor"
  | "line"
  | "password";

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  group?: string;
  required?: boolean;
  multiple?: boolean;
  options?: FieldOption[];
  hidden?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: any;

  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;

  onChangeEffect?: (
    value: any,
    formValues: any,
    setFields: React.Dispatch<React.SetStateAction<FieldDefinition[]>>,
    setValue?: UseFormSetValue<Record<string, any>>,
  ) => Partial<Record<string, any>>;

  onThreeDotsClick?: ((
    setValue: UseFormSetValue<Record<string, any>>,
    allValues: any,
    setFields?: React.Dispatch<React.SetStateAction<FieldDefinition[]>>
  ) => any)[];

  onClick?: (
    setFields: React.Dispatch<React.SetStateAction<FieldDefinition[]>>,
    setValue: UseFormSetValue<Record<string, any>>,
    allValues: any
  ) => void;

  clickIcon?: JSX.Element[];
  colspan?: number;
}

type GenericFormProps = {
  fields: FieldDefinition[];
  onSubmit: (data: any) => void;
  buttonNode?: JSX.Element;
};

export const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  onSubmit,
  buttonNode,
}) => {
  const [fields_, setFields_] = useState<FieldDefinition[]>(fields);

  const defaultValues = fields_.reduce((acc, field) => {
    if (field.defaultValue !== undefined) acc[field.name] = field.defaultValue;
    return acc;
  }, {} as Record<string, any>);

  const editorRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({ defaultValues });

  const allValues = watch();

  useEffect(() => {
    fields.forEach((field) => {
      if (field.onChangeEffect) {
        const updated = field.onChangeEffect(
          allValues[field.name],
          allValues,
          setFields_,
          setValue
        );
        Object.entries(updated || {}).forEach(([k, v]) =>
          setValue(k, v)
        );
      }
    });
  }, [allValues]);

  const groupedFields: Record<string, JSX.Element[]> = {};
  const groupsSet = new Set<string>();

  fields_.forEach((field) => {
    const {
      name,
      label,
      type,
      group,
      required,
      multiple,
      options = [],
      min,
      max,
      minLength,
      maxLength,
      pattern,
      validate,
      hidden,
      readOnly,
      disabled,
    } = field;

    const error = (errors as any)[name]?.message;

    const validationRules: any = {
      required: required ? `${label} zorunludur.` : false,
      minLength: minLength && {
        value: minLength,
        message: `${label} en az ${minLength} karakter olmalıdır.`,
      },
      maxLength: maxLength && {
        value: maxLength,
        message: `${label} en fazla ${maxLength} karakter olmalıdır.`,
      },
      min: min && { value: min, message: `${label} min ${min}` },
      max: max && { value: max, message: `${label} max ${max}` },
      pattern: pattern && { value: pattern, message: "Geçersiz format" },
      validate,
    };

    const sharedProps = {
      ...register(name, validationRules),
      readOnly,
      disabled,
      className: `
        w-full rounded-md
        border border-gray-300
        bg-white px-3 py-2 text-sm
        text-gray-800
        focus:border-blue-500
        focus:ring-2 focus:ring-blue-100
        disabled:bg-gray-100 disabled:text-gray-400
      `,
    };

    let inputElement: JSX.Element;

    if (type === "select") {
      inputElement = (
        <select {...sharedProps}>
          <option value="">Seçiniz</option>
          {options.map((opt, i) => (
            <option key={i} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    } else if (type === "textarea") {
      inputElement = <textarea {...sharedProps} />;
    } else if (type === "checkbox") {
      inputElement = (
        <input type="checkbox" {...sharedProps} className="h-5 w-5" />
      );
    } else if (type === "file") {
      inputElement = (
        <input type="file" {...register(name)} multiple={multiple} />
      );
    } else if (type === "button") {
      inputElement = (
        <button
          type="button"
          onClick={() => field.onClick(setFields_, setValue, allValues)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {label}
        </button>
      );
    } else if (type === "probability") {
      inputElement = (
        <ProbabilityInput
          name={name}
          control={control}
          label={label}
          min={min as number}
          max={max as number}
        />
      );
    } else if (type === "editor") {
      inputElement = (
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          initialValue={defaultValues[name] || ""}
          onInit={(_, ed) => (editorRef.current = ed)}
          onEditorChange={(c) => setValue(name, c)}
          init={{
            language: "tr",
            menubar: false,
            height: 300,
          }}
        />
      );
    } else if (type === "line") {
      inputElement = <hr className="col-span-12 my-4" />;
    } else {
      inputElement = <input type={type} {...sharedProps} />;
    }

    const element = (
      <div
        key={name}
        style={{ display: hidden ? "none" : "block" }}
        className={`${colSpanMap[field.colspan ?? 6]} mb-3`}
      >
        {type !== "button" && (
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {inputElement}
        {error && (
          <p className="mt-1 text-xs text-red-600">⚠ {error}</p>
        )}
      </div>
    );
const groupKey = group ?? "__default";

if (!groupedFields[groupKey]) groupedFields[groupKey] = [];
groupedFields[groupKey].push(element);
groupsSet.add(groupKey);
} );

const groups = Array.from(groupsSet).filter(Boolean);
const hasTabs = groups.length > 1;

const [activeTab, setActiveTab] = useState<string | undefined>(
  hasTabs ? groups[0] : undefined
);


  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
      className="bg-white border border-gray-200 rounded-xl shadow-sm"
    >
      <div className="p-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
         {hasTabs && (
  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
    {groups.map((group) => (
      <button
        type="button"
        key={group}
        onClick={() => setActiveTab(group)}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
          activeTab === group
            ? "bg-white text-blue-700 shadow"
            : "text-gray-500 hover:bg-white/60"
        }`}
      >
        {group}
      </button>
    ))}
  </div>
)}

        </div>

        <div className="grid grid-cols-12 gap-3">
          {hasTabs
  ? groupedFields[activeTab!]
  : Object.values(groupedFields).flat()}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-3 flex justify-between">
        {buttonNode ?? (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold"
          >
            Kaydet
          </button>
        )}
      </div>
    </form>
  );
};
