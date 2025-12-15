import React, { JSX, useEffect, useState } from "react";
import {
  useForm,
  useWatch,
  SubmitHandler,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
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
  validate?: (value: any) =&gt; boolean | string;

  onChangeEffect?: (
    value: any,
    formValues: any
  ) =&gt; Partial&lt;Record&lt;string, any&gt;&gt;;

onThreeDotsClick?: ((
  setValue: UseFormSetValue&lt;Record&lt;string, any&gt;&gt;,
  allValues: any,
  setFields?: React.Dispatch&lt;React.SetStateAction&lt;FieldDefinition[]&gt;&gt;,
) =&gt; any)[];

onClick?: (
    setFields: React.Dispatch&lt;React.SetStateAction&lt;FieldDefinition[]&gt;&gt;,
    setValue: UseFormSetValue&lt;Record&lt;string, any&gt;&gt;,
    allValues: any
  ) =&gt; void;

  clickIcon?: JSX.Element [];
  colspan?: number;
}

type GenericFormProps = {
  fields: FieldDefinition[];
  onSubmit: (data: any) =&gt; void;
};

export const GenericForm: React.FC&lt;GenericFormProps&gt; = ({
  fields,
  onSubmit,
}) =&gt; {
   const [fields_, setFields_] = useState&lt;FieldDefinition[]&gt;(fields);
  const defaultValues = fields_.reduce((acc, field) =&gt; {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    }
    return acc;
  }, {} as Record&lt;string, any&gt;);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({ defaultValues });
  const allValues = watch();
  useEffect(() =&gt; {
    fields.forEach((field) =&gt; {
      if (field.onChangeEffect) {
        const value = allValues[field.name];
        const updatedFields = field.onChangeEffect(value, allValues);
        Object.entries(updatedFields || {}).forEach(
          ([targetName, newValue]) =&gt; {
            setValue(targetName, newValue);
          }
        );
      }
    });
  }, [allValues]);

  const groupedFields: Record&lt;string, JSX.Element[]&gt; = {};
  const groupsSet = new Set&lt;string&gt;();

  fields_.forEach((field) =&gt; {
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
      required: required ? <code>${label} zorunludur.</code> : false,
      minLength:
        minLength !== undefined
          ? {
              value: minLength,
              message: <code>${label} en az ${minLength} karakter olmalıdır.</code>,
            }
          : undefined,
      maxLength:
        maxLength !== undefined
          ? {
              value: maxLength,
              message: <code>${label} en fazla ${maxLength} karakter olmalıdır.</code>,
            }
          : undefined,
      min:
        min !== undefined
          ? { value: min, message: <code>${label} minimum değer ${min} olmalıdır.</code> }
          : undefined,
      max:
        max !== undefined
          ? { value: max, message: <code>${label} maksimum değer ${max} olmalıdır.</code> }
          : undefined,
      pattern:
        pattern !== undefined
          ? { value: pattern, message: <code>${label} geçersiz format.</code> }
          : undefined,
      validate
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
        &lt;select {...sharedProps}&gt;
          &lt;option value=""&gt;Seçiniz&lt;/option&gt;
          {options.map((opt, index) =&gt; (
            &lt;option
              key={name + "-" + opt.value + "-" + index}
              value={opt.value}
            &gt;
              {opt.label}
            &lt;/option&gt;
          ))}
        &lt;/select&gt;
      );
    }
    else if (type === "date") {
      inputElement = &lt;input type="date" {...sharedProps} /&gt;;
    } else if (type === "datetime-local") {
      inputElement = &lt;input type="datetime-local" {...sharedProps} /&gt;;
    } else if (type === "file") {
      inputElement = (
        &lt;input
          type="file"
          {...register(name, validationRules)}
          multiple={multiple}
          disabled={disabled}
        /&gt;
      );
    } else if (type === "checkbox") {
      inputElement = (
        &lt;input
          type="checkbox"
          {...sharedProps}
          className="w-5 h-5 text-blue-600"
        /&gt;
      );
    } else if (type === "textarea") {
      inputElement = &lt;textarea {...sharedProps} /&gt;;
    } else if (type === "button") {
      inputElement = (
        &lt;button
          onClick={() =&gt; field.onClick(setFields_, setValue,allValues )}
          type="button"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        &gt;
          {label}
        &lt;/button&gt;
      );
    } else {
      inputElement = &lt;input type={type} {...sharedProps} /&gt;;
    }

    const element = (
      
      &lt;div
        key={name}
        className={type!==<code>button</code>&amp;&amp;<code> ${ field.colspan? "col-span-1 md:col-span-2" : "grid-cols-1 md:grid-cols-2"} mb-2 flex  items-center</code>}
        style={{ display: hidden ? "none" : "flex" }}
      &gt;
        &lt;div className="flex-1"&gt;
          {
            type ==="button" ? null : 
          &lt;label className="block font-medium mb-1 capitalize"&gt;{label}&lt;/label&gt;
          }
          {inputElement}
          {error &amp;&amp; &lt;p className="text-red-500 text-sm mt-1"&gt;{error}&lt;/p&gt;}
        &lt;/div&gt;
        {field.onThreeDotsClick &amp;&amp; field.onThreeDotsClick.length&gt;0 &amp;&amp; (
          field.onThreeDotsClick.map((fn, idx) =&gt; {
            return (
              &lt;button
            type="button"
            className="ml-2 mt-6 p-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() =&gt; {
              field.onThreeDotsClick[idx](setValue, allValues,setFields_);
            }}
          &gt;
            {field.clickIcon?field.clickIcon[idx]: "..."}
          &lt;/button&gt;
            )
          })
          
        )}
      &lt;/div&gt;
    );

    if (!groupedFields[group]) groupedFields[group] = [];
    groupedFields[group].push(element);
    groupsSet.add(group);
  });

  const groups = Array.from(groupsSet);
  const [activeTab, setActiveTab] = useState(groups[0]);

  return (
    &lt;form
      onSubmit={handleSubmit(onSubmit as SubmitHandler&lt;any&gt;)}
      className="max-w-4xl mx-auto p-6 border rounded-lg shadow-sm bg-white"
    &gt;
      {/* Tabs */}
      &lt;div className="flex border-b mb-6"&gt;
        {groups.map((group) =&gt; (
          &lt;button
            type="button"
            key={group}
            onClick={() =&gt; setActiveTab(group)}
            className={<code>px-4 py-2 -mb-[1px] border-b-2 font-medium transition ${
</code>              activeTab === group
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }<code>}
</code>          &gt;
            {group}
          &lt;/button&gt;
        ))}
      &lt;/div&gt;

      {/* Active Group Fields */}
      &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
        {groupedFields[activeTab]?.filter(f =&gt; f.key !== "btn")}
      &lt;/div&gt;

      &lt;div className="mt-6 flex justify-between"&gt;
        &lt;button
          type="submit"
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        &gt;
          Kaydet
        &lt;/button&gt;
        {
          groupedFields[activeTab] &amp;&amp; groupedFields[activeTab].length &gt; 0 &amp;&amp; 
            
              groupedFields[activeTab]?.filter(c=&gt;c.key==="btn").map((f) =&gt; (
f                )
              ) 
        }
      &lt;/div&gt;
    &lt;/form&gt;
  );
};
