import React, { JSX, useEffect, useRef, useState } from "react";
import {
  useForm,
  useWatch,
  SubmitHandler,
  UseFormSetValue,
  useFieldArray,
  set,
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
  // Validation
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
};

export const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  onSubmit,
}) => {
  const [fields_, setFields_] = useState<FieldDefinition[]>(fields);
  const defaultValues = fields_.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    }
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
        const value = allValues[field.name];
        const updatedFields = field.onChangeEffect(
          value,
          allValues,
          setFields_,
          setValue
        );
        Object.entries(updatedFields || {}).forEach(
          ([targetName, newValue]) => {
            setValue(targetName, newValue);
          }
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

    // if (hidden) return;

    const error = (errors as any)[name]?.message;

    const validationRules: any = {
      required: required ? `${label} zorunludur.` : false,
      minLength:
        minLength !== undefined
          ? {
              value: minLength,
              message: `${label} en az ${minLength} karakter olmalıdır.`,
            }
          : undefined,
      maxLength:
        maxLength !== undefined
          ? {
              value: maxLength,
              message: `${label} en fazla ${maxLength} karakter olmalıdır.`,
            }
          : undefined,
      min:
        min !== undefined
          ? { value: min, message: `${label} minimum değer ${min} olmalıdır.` }
          : undefined,
      max:
        max !== undefined
          ? { value: max, message: `${label} maksimum değer ${max} olmalıdır.` }
          : undefined,
      pattern:
        pattern !== undefined
          ? { value: pattern, message: `${label} geçersiz format.` }
          : undefined,
      validate,
    };

    let inputElement: JSX.Element;

    const sharedProps = {
      ...register(name, validationRules),
      className: "w-full border rounded-md p-2",
      readOnly,
      disabled,
    };

    if (type === "select") {
      inputElement = (
        <select {...sharedProps}>
          <option value="">Seçiniz</option>
          {(options && options.length>0)&& options.map((opt, index) => (
            <option
              key={name + "-" + opt.value + "-" + index}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>
      );
    } 
    else if (type === "date") {
      inputElement = <input type="date" {...sharedProps} />;
    }
     else if (type === "datetime-local") {
      inputElement = <input type="datetime-local" {...sharedProps} />;
    } 
    else if (type === "file") {
      inputElement = (
        <input
          type="file"
          {...register(name, validationRules)}
          multiple={multiple}
          disabled={disabled}
        />
      );
    } 
    else if (type === "checkbox") {
      inputElement = (
        <input
          type="checkbox"
          {...sharedProps}
          className="w-5 h-5 text-blue-600"
        />
      );
    } 
    else if (type === "textarea") {
      inputElement = <textarea {...sharedProps} />;
    } 
    else if (type === "button") {
      inputElement = (
        <button
          onClick={() => field.onClick(setFields_, setValue, allValues)}
          type="button"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {label}
        </button>
      );
    } 
    else if (type === "probability") {
      inputElement = (
        <ProbabilityInput
          name={name}
          control={control}
          label={label}
          min={min as number}
          max={max as number}
        />
      );
    } 
    else if (type === "editor") {
      inputElement = (
        <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
         onInit={(_evt:any, editor:any) => (editorRef.current = editor)}
         initialValue={defaultValues[name] || ""}
         licenseKey="gpl"
        init={{
       
          language: "tr",
           menubar: "file edit view insert format tools table help",
    plugins: [
      "advlist", "anchor", "autolink", "autosave", "code", "codesample",
      "directionality", "emoticons", "fullscreen", "help", "image",
      "importcss", "insertdatetime", "link", "lists", "media", "nonbreaking",
      "pagebreak", "preview", "quickbars", "save", "searchreplace",
      "table", "template", "visualblocks", "visualchars", "wordcount",
    ],
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline | forecolor backcolor | " +
      "link image media | alignleft aligncenter alignright fullscreen| bullist numlist | table |  preview code",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      );
    } 
    else if (type === "line") {
  inputElement = (<hr className="border-t-2 border-gray-300 my-4" />);
    }
    else {
      inputElement = <input step={"0.01"} type={type} {...sharedProps} />;
    }

    const element = (
      <div
        key={name}
       className={`${type !== "button" ? (colSpanMap[field.colspan ?? 6] ?? "col-span-6") : ""} mb-2`}
        style={{ display: hidden ? "none" : "block" }}
      >
         <div className="flex items-center"> 
        <div className="flex-1">
          {type === "button" ? null : (
            <label className="block font-medium mb-1 capitalize">{label}</label>
          )}
          {inputElement}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        {field.onThreeDotsClick &&
          field.onThreeDotsClick.length > 0 &&
          field.onThreeDotsClick.map((fn, idx) => {
            return (
              <button
                type="button"
                className="ml-2 mt-6 p-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  field.onThreeDotsClick[idx](setValue, allValues, setFields_);
                }}
              >
                {field.clickIcon ? field.clickIcon[idx] : "..."}
              </button>
            );
          })}
          </div>
      </div>
    );

    if (!groupedFields[group]) groupedFields[group] = [];
    groupedFields[group].push(element);
    groupsSet.add(group);
  });

  const groups = Array.from(groupsSet);
  const [activeTab, setActiveTab] = useState(groups[0]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
      className=" mx-auto p-6 border rounded-lg shadow-sm bg-white"
      // className="max-w-4xl mx-auto p-6 border rounded-lg shadow-sm bg-white"
    >
      {/* Tabs */}
      <div className="flex border-b mb-6">
        {groups.map((group) => (
          <button
            type="button"
            key={group}
            onClick={() => setActiveTab(group)}
            className={`px-4 py-2 -mb-[1px] border-b-2 font-medium transition ${
              activeTab === group && group
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Active Group Fields */}
      <div className="grid grid-cols-12 gap-2">
        {groupedFields[activeTab]?.filter((f) => f.key !== "btn")}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="submit"
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Kaydet
        </button>
        {groupedFields[activeTab] &&
          groupedFields[activeTab].length > 0 &&
          groupedFields[activeTab]
            ?.filter((c) => c.key === "btn")
            .map((f) => f)}
      </div>
    </form>
  );
};
