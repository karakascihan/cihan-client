import React from "react";
import { UserDtoForInsertion, UserDtoForUpdate } from "@/api/apiDtos";
import { GenericForm, FieldDefinition } from "../GenericForm";

type Mode = "create" | "update";

type Props<T extends UserDtoForInsertion | UserDtoForUpdate> = {
    mode: Mode;
    form: T;
    setForm: React.Dispatch<React.SetStateAction<T>>;
    loading: boolean;
    onSubmit: (payload: T) => void;
};

const toDateInputValue = (v: any) => {
    if (!v) return "";
    if (typeof v === "string") return v.slice(0, 10);
    if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10);
    return "";
};

export const UserForm = <T extends UserDtoForInsertion | UserDtoForUpdate>({
    mode,
    form,
    setForm,
    onSubmit,
    loading,
}: Props<T>) => {
    const fields = React.useMemo<FieldDefinition[]>(() => {
        const isCreate = mode === "create";

        return [
            // --- Genel ---
            { name: "firstName", label: "Ad", type: "text", required: true, colspan: 6, group: "Genel", defaultValue: (form as any).firstName ?? "" },
            { name: "lastName", label: "Soyad", type: "text", required: true, colspan: 6, group: "Genel", defaultValue: (form as any).lastName ?? "" },


            { name: "tckno", label: "TCKNO", type: "text", colspan: 4, group: "Genel", defaultValue: (form as any).tckno ?? "" },
            { name: "birthday", label: "Doğum Tarihi", type: "date", colspan: 4, group: "Genel", defaultValue: toDateInputValue((form as any).birthday) },

            {
                name: "gender", label: "Cinsiyet", type: "select", colspan: 4, group: "Genel", defaultValue: (form as any).gender ?? "", options: [
                    { label: "Seçiniz", value: "" },
                    { label: "Kadın", value: "kadin" },
                    { label: "Erkek", value: "erkek" },
                    { label: "Diğer", value: "diger" },
                ]
            },
            { name: "userName", label: "Kullanıcı Adı", type: "text", required: true, colspan: 6, group: "Genel", defaultValue: (form as any).userName ?? "" },
            { name: "password", label: "Şifre", type: "password", required: isCreate, hidden: !isCreate, colspan: 6, group: "Genel", defaultValue: "" },

            // --- İletişim ---
            { name: "phoneNumber", label: "Telefon 1", type: "text", colspan: 4, group: "İletişim", defaultValue: (form as any).phoneNumber ?? "" },
            { name: "phoneNumber2", label: "Telefon 2", type: "text", colspan: 4, group: "İletişim", defaultValue: (form as any).phoneNumber2 ?? "" },
            { name: "email", label: "Email", type: "text", required: true, colspan: 4, group: "İletişim", defaultValue: (form as any).email ?? "" },
            { name: "address", label: "Adres", type: "textarea", colspan: 12, group: "İletişim", defaultValue: (form as any).address ?? "" },

            // --- İş Bilgileri ---
            { name: "title", label: "Ünvan", type: "text", colspan: 6, group: "İş Bilgileri", defaultValue: (form as any).title ?? "" },
            { name: "field", label: "Departman", type: "text", colspan: 6, group: "İş Bilgileri", defaultValue: (form as any).field ?? "" },
            { name: "startDate", label: "Başlangıç Tarihi", type: "date", colspan: 6, group: "İş Bilgileri", defaultValue: toDateInputValue((form as any).startDate) },
            { name: "departureDate", label: "Ayrılış Tarihi", type: "date", colspan: 6, group: "İş Bilgileri", defaultValue: toDateInputValue((form as any).departureDate) },

        ];
    }, [mode, form]);

    return (
        <GenericForm
            fields={fields}
            onSubmit={(data: any) => {
                const payload = {
                    ...(form as any),

                    firstName: data.firstName ?? "",
                    lastName: data.lastName ?? "",
                    userName: data.userName ?? "",
                    email: data.email ?? "",

                    tckno: data.tckno ?? "",
                    phoneNumber: data.phoneNumber ?? "",
                    phoneNumber2: data.phoneNumber2 ?? "",
                    address: data.address ?? "",

                    departmentID: data.departmentID === "" ? null : Number(data.departmentID),
                    title: data.title ?? "",

                    birthday: data.birthday ? data.birthday : null,
                    startDate: data.startDate ? data.startDate : null,
                    departureDate: data.departureDate ? data.departureDate : null,

                    gender: data.gender ?? "",
                    isActive: true,

                    ...(mode === "create" ? { password: data.password ?? "" } : {}),
                } as T;

                setForm(payload);
                onSubmit(payload);
            }}
            buttonNode={
                <button
                    type="submit"
                    disabled={loading}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                </button>
            }
        />
    );
};
