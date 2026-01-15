import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderForm } from "@/components/CRM/PurchaseOrderForm";
import { useState } from "react";
import { DateOnly, UserDtoForInsertion } from "@/api/apiDtos";
import { UserForm } from "@/components/CRM/UserForm";


type Props = {
    onClose?: () => void;
    onSuccess?: () => void | Promise<unknown>;
};

export const AddUserPage = ({ onClose, onSuccess }: Props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<UserDtoForInsertion>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isActive: true,
        address: "",
        phoneNumber: "",
        phoneNumber2: "",
        departmentID: null,
        file: "",
        userName:"",
        tckno:"",
        field: "",
        title: "",
        birthday: "",
        startDate: "",
        departureDate: "",
        gender: "",
    });
    console.log(
        "[Users]",
        "OPEN MODE:",
        onClose ? "MODAL" : "PAGE"
    );
    const handleCreate = async (currentForm: UserDtoForInsertion) => {
        setLoading(true);
        try {
            const payload: UserDtoForInsertion = {
                ...currentForm,
            };

            console.log("GİDEN PAYLOAD:", payload);

            await apiRequest("POST", URL + "/User/Create", payload);
            alert("Kullanıcı başarıyla eklendi!");
            if (onSuccess) await onSuccess();
            navigate("/kullanicilar");
        } catch (err) {
            console.error(err);
            alert("Kullanıcı eklenirken hata oluştu!");
        } finally {
            setLoading(false);
        }
    };



    return (
        <UserForm
            mode="create"
            form={form}
            setForm={setForm}
            onSubmit={handleCreate}
            loading={loading}
        />
    );
};
