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
import { URL } from "@/api";

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
    setFields?: React.Dispatch<React.SetStateAction<FieldDefinition[]>>,
  ) => any)[];

  onClick?: (
    setFields: React.Dispatch<React.SetStateAction<FieldDefinition[]>>,
    setValue: UseFormSetValue<Record<string, any>>,
    allValues: any,
  ) => void;

  clickIcon?: JSX.Element[];
  colspan?: number;
}

type GenericFormProps = {
  fields: FieldDefinition[];
  onSubmit: (data: any) => void;
  buttonNode?: JSX.Element;
};

const inputBase =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white " +
  "transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 " +
  "read-only:bg-gray-50 read-only:text-gray-600 " +
  "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 " +
  "dark:focus:ring-blue-400 dark:disabled:bg-gray-700 dark:placeholder-gray-500";

export const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  onSubmit,
  buttonNode,
}) => {
  const [fields_, setFields_] = useState<FieldDefinition[]>(fields);
  const defaultValues = fields_.reduce(
    (acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.name] = field.defaultValue;
      }
      return acc;
    },
    {} as Record<string, any>,
  );
  const editorRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({ defaultValues, shouldUnregister: false });
  const allValues = watch();

  useEffect(() => {
    fields.forEach((field) => {
      if (field.onChangeEffect) {
        const value = allValues[field.name];
        const updatedFields = field.onChangeEffect(
          value,
          allValues,
          setFields_,
          setValue,
        );
        Object.entries(updatedFields || {}).forEach(
          ([targetName, newValue]) => {
            setValue(targetName, newValue);
          },
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
              message: `${label} en fazda ${maxLength} karakter olmalıdır.`,
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
      className: inputBase,
      readOnly,
      disabled,
    };

    if (type === "select") {
      inputElement = (
        <select {...sharedProps} className={inputBase + " cursor-pointer"}>
          <option value="">Seçiniz</option>
          {options &&
            options.length > 0 &&
            options.map((opt, index) => (
              <option
                key={name + "-" + opt.value + "-" + index}
                value={String(opt.value)}
              >
                {opt.label}
              </option>
            ))}
        </select>
      );
    } else if (type === "date") {
      inputElement = <input type="date" {...sharedProps} />;
    } else if (type === "datetime-local") {
      inputElement = <input type="datetime-local" {...sharedProps} />;
    } else if (type === "file") {
      inputElement = (
        <input
          type="file"
          {...register(name, validationRules)}
          multiple={multiple}
          disabled={disabled}
          className={
            "w-full text-sm text-gray-600 dark:text-gray-400 " +
            "file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 " +
            "file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 " +
            "hover:file:bg-blue-100 cursor-pointer disabled:cursor-not-allowed " +
            "dark:file:bg-blue-900/30 dark:file:text-blue-400"
          }
        />
      );
    } else if (type === "checkbox") {
      inputElement = (
        <input
          type="checkbox"
          {...sharedProps}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer accent-blue-600"
        />
      );
    } else if (type === "textarea") {
      inputElement = (
        <textarea {...sharedProps} className={inputBase + " min-h-[80px] resize-y"} />
      );
    } else if (type === "button") {
      inputElement = (
        <button
          onClick={() => field.onClick(setFields_, setValue, allValues)}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
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
        <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <Editor
            tinymceScriptSrc={URL.replace("/api", "") + "/tinymce/tinymce.min.js"}
            licenseKey="gpl"
            initialValue={defaultValues[name] || ""}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            onEditorChange={(content) => {
              setValue(name, content, { shouldValidate: true });
            }}
            init={{
              language: "tr",
              menubar: "file edit view insert format tools table help",
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "autosave",
                "code",
                "codesample",
                "directionality",
                "emoticons",
                "fullscreen",
                "help",
                "image",
                "importcss",
                "insertdatetime",
                "link",
                "lists",
                "media",
                "preview",
                "quickbars",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              valid_elements: "*[*]",
              toolbar:
                "undo redo | blocks | bold italic underline | forecolor backcolor | " +
                "link image media | alignleft aligncenter alignright | bullist numlist | table | preview code | fullscreen",
              automatic_uploads: false,
              images_reuse_filename: true,
              paste_data_images: true,
              images_dataimg_filter: (img) => true,
              images_upload_handler: (blobInfo, success, failure) => {
                try {
                  const reader = new FileReader();
                  reader.readAsDataURL(blobInfo.blob());
                  reader.onload = () => {};
                  reader.onerror = (err) => {};
                } catch (error) {
                  console.log(error);
                }
              },
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      );
    } else if (type === "line") {
      inputElement = (
        <hr className="border-t border-gray-200 dark:border-gray-700 my-1" />
      );
    } else {
      inputElement = <input step={"0.01"} type={type} {...sharedProps} />;
    }

    const element =
      type === "checkbox" ? (
        <div
          key={name}
          className={`${colSpanMap[field.colspan ?? 6] ?? "col-span-6"} mb-1`}
          style={{ display: hidden ? "none" : "block" }}
        >
          <label className="flex items-center gap-2 cursor-pointer group select-none">
            {inputElement}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
              {required && (
                <span className="text-red-500 ml-0.5" title="Bu alan zorunludur">
                  *
                </span>
              )}
            </span>
          </label>
          {error && (
            <p className="flex items-center gap-1 text-red-500 text-xs mt-1 pl-6">
              {error}
            </p>
          )}
        </div>
      ) : (
        <div
          key={name}
          className={`${type !== "button" ? (colSpanMap[field.colspan ?? 6] ?? "col-span-6") : ""} mb-1`}
          style={{ display: hidden ? "none" : "block" }}
        >
          <div className="flex items-end gap-1.5">
            <div className="flex-1 min-w-0">
              {type !== "button" && type !== "line" && (
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {label}
                  {required && (
                    <span
                      className="text-red-500 text-xs leading-none"
                      title="Bu alan zorunludur"
                    >
                      *
                    </span>
                  )}
                </label>
              )}
              {inputElement}
              {error && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>
            {field.onThreeDotsClick &&
              field.onThreeDotsClick.length > 0 &&
              field.onThreeDotsClick.map((fn, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="mb-0.5 p-1.5 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 flex-shrink-0 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  onClick={() => {
                    field.onThreeDotsClick[idx](setValue, allValues, setFields_);
                  }}
                >
                  {field.clickIcon ? (
                    field.clickIcon[idx]
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  )}
                </button>
              ))}
          </div>
        </div>
      );

    if (!groupedFields[group]) groupedFields[group] = [];
    groupedFields[group].push(element);
    groupsSet.add(group);
  });

  const groups = Array.from(groupsSet);
  const [activeTab, setActiveTab] = useState(groups[0]);
  const fieldGroupMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    fields_.forEach((f) => {
      if (f.name && f.group) {
        map[f.name] = f.group;
      }
    });
    return map;
  }, [fields_]);

  const hasErrorInGroup = (group: string) =>
    Object.keys(errors).some((fieldName) => fieldGroupMap[fieldName] === group);

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<any>, (formErrors) => {
        const firstErrorField = Object.keys(formErrors)[0];
        if (!firstErrorField) return;
        const targetGroup = fieldGroupMap[firstErrorField];
        if (targetGroup) {
          setActiveTab(targetGroup);
        }
      })}
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-5 gap-0.5">
        {groups.map((group) => (
          <button
            type="button"
            key={group}
            onClick={() => setActiveTab(group)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-all rounded-t-md -mb-px border-b-2 ${
              activeTab === group && group
                ? "border-blue-600 text-blue-600 bg-blue-50/60 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50"
            }`}
          >
            {group}
            {hasErrorInGroup(group) && (
              <span className="ml-1.5 inline-flex w-1.5 h-1.5 bg-red-500 rounded-full align-middle" />
            )}
          </button>
        ))}
      </div>

      {/* Active Group Fields */}
      <div className="grid grid-cols-12 gap-x-4 gap-y-0.5">
        {groups.map((group) => (
          <div
            key={group}
            className={`col-span-12 ${activeTab === group ? "block" : "hidden"}`}
          >
            <div className="grid grid-cols-12 gap-x-4 gap-y-0.5">
              {groupedFields[group]?.filter((f) => f.key !== "btn")}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center sticky bottom-0 bg-white dark:bg-gray-900 py-3 border-t border-gray-200 dark:border-gray-700 z-10">
        {buttonNode ?? (
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Kaydet
          </button>
        )}
        {groupedFields[activeTab] &&
          groupedFields[activeTab].length > 0 &&
          groupedFields[activeTab]
            ?.filter((c) => c.key === "btn")
            .map((f) => f)}
      </div>
    </form>
  );
};
