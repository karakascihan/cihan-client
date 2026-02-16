import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderForm } from "@/components/crm/PurchaseOrderForm";
import { useState } from "react";
import { DateOnly, UserDtoForInsertion } from "@/api/apiDtos";
import { UserForm } from "@/components/crm/UserForm";


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
        department: "",
        title: "",
        birthday: "",
        startDate: "",
        departureDate: "",
        gender: "",
        rolId: null,
        rolName: "",
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
