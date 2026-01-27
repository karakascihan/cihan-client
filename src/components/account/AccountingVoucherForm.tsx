import { FieldDefinition, GenericForm } from "../GenericForm";
import {
  BankAccount,
  BankDto,
  CashAccountDto,
  CollectionDto,
  CustomerDto,
  EntityType,
  TransactionType,
} from "@/api/apiDtos";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import { GlobalLoader } from "@/context/LoadingContext";
import { useDispatch } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";

export const AccountingVoucherForm = ({
  transactionType,
  onClose,
}: {
  transactionType: TransactionType;
  onClose(data: any);
}) => {
  const dispatch=useDispatch();
  const {
    data: banks,
    loading: loadingBanks,
  } = useApiRequest<BankAccount>(URL + "/bank-account/getall", {
    method: "GET",
  });
  const {
    data: cashAccounts,
    loading: cashAccountsLoading,
  } = useApiRequest<CashAccountDto>(URL + "/cash-account/getall", {
    method: "GET",
  });
  const {
    data: accounts,
    refetch: refetchAccount,
    loading: accountLoading,
  } = useApiRequest<CustomerDto>(URL + "/customer/getall", { method: "GET" });

  const getFields = () => {
    let fields: FieldDefinition[] = [];
    if (cashAccountsLoading || loadingBanks || accountLoading) return [];
    switch (transactionType) {
      case TransactionType.Collection:
        fields.push({
          name: "accountId",
          label: "Cari Seçiniz",
          type: "select",
          options: accounts?.map((c) => ({ value: c.id, label: c.firma })),
          required: true,
          colspan: 12,
        });
        fields.push({
          name: "targetType",
          label: "Hesap Tipi Seçiniz",
          type: "select",
          options: [
            {
              value: EntityType.Bank,
              label: "Banka",
            },
            {
              value: EntityType.Cash,
              label: "Kasa",
            },
          ],
          required: true,
          colspan: 4,
          onChangeEffect: (value: any, allValues: any, setFields_: any) => {
            return setFields_((prev) => {
              const updated = prev.map((f) =>
                f.name === "targetId"
                  ? {
                      ...f,
                      options:
                        value == EntityType.Bank
                          ? banks?.map((c) => ({
                              value: c.id,
                              label: c.accountName,
                            }))
                          : value == EntityType.Cash
                            ? cashAccounts?.map((c) => ({
                                value: c.id,
                                label: c.cashName,
                              }))
                            : [],
                    }
                  : f,
              );

              // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
              if (JSON.stringify(prev) === JSON.stringify(updated)) return prev;
              return updated;
            });
          },
        });
        fields.push({
          name: "targetId",
          label: "Banka/Kasa Seçiniz",
          type: "select",
          options: banks?.map((c) => ({ value: c.id, label: c.accountName })),
          required: true,
          colspan: 8,
        });
        break;
      case TransactionType.Payment:
        fields.push({
          name: "sourceType",
          label: "Hesap Tipi Seçiniz",
          type: "select",
          options: [
            {
              value: EntityType.Bank,
              label: "Banka",
            },
            {
              value: EntityType.Cash,
              label: "Kasa",
            },
          ],
          required: true,
          colspan: 4,
          onChangeEffect: (value: any, allValues: any, setFields_: any) => {
            return setFields_((prev) => {
              const updated = prev.map((f) =>
                f.name === "sourceId"
                  ? {
                      ...f,
                      options:
                        value == EntityType.Bank
                          ? banks?.map((c) => ({
                              value: c.id,
                              label: c.accountName,
                            }))
                          : value == EntityType.Cash
                            ? cashAccounts?.map((c) => ({
                                value: c.id,
                                label: c.cashName,
                              }))
                            : [],
                    }
                  : f,
              );

              // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
              if (JSON.stringify(prev) === JSON.stringify(updated)) return prev;
              return updated;
            });
          },
        });
        fields.push({
          name: "sourceId",
          label: "Banka/Kasa Seçiniz",
          type: "select",
          required: true,
          colspan: 8,
        });
        fields.push({
          name: "accountId",
          label: "Cari Seçiniz",
          type: "select",
          options: accounts?.map((c) => ({ value: c.id, label: c.firma })),
          required: true,
          colspan: 12,
        });
        break;
      case TransactionType.Virman:
        fields.push({
          name: "sourceType",
          label: "Hesap Tipi Seçiniz",
          type: "select",
          options: [
            {
              value: EntityType.Bank,
              label: "Banka",
            },
            {
              value: EntityType.Cash,
              label: "Kasa",
            },
          ],
          required: true,
          colspan: 4,
          onChangeEffect: (value: any, allValues: any, setFields_: any) => {
            return setFields_((prev) => {
              const updated = prev.map((f) =>
                f.name === "sourceId"
                  ? {
                      ...f,
                      options:
                        value == EntityType.Bank
                          ? banks?.map((c) => ({
                              value: c.id,
                              label: c.accountName,
                            }))
                          : value == EntityType.Cash
                            ? cashAccounts?.map((c) => ({
                                value: c.id,
                                label: c.cashName,
                              }))
                            : [],
                    }
                  : f,
              );

              // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
              if (JSON.stringify(prev) === JSON.stringify(updated)) return prev;
              return updated;
            });
          },
        });

        fields.push({
          name: "sourceId",
          label: "Banka/Kasa Seçiniz",
          type: "select",
          required: true,
          colspan: 8,
        });
        fields.push({
          name: "targetType",
          label: "Hesap Tipi Seçiniz",
          type: "select",
          options: [
            {
              value: EntityType.Bank,
              label: "Banka",
            },
            {
              value: EntityType.Cash,
              label: "Kasa",
            },
          ],
          required: true,
          colspan: 4,
          onChangeEffect: (value: any, allValues: any, setFields_: any) => {
            return setFields_((prev) => {
              const updated = prev.map((f) =>
                f.name === "targetId"
                  ? {
                      ...f,
                      options:
                        value == EntityType.Bank
                          ? banks?.map((c) => ({
                              value: c.id,
                              label: c.accountName,
                            }))
                          : value == EntityType.Cash
                            ? cashAccounts?.map((c) => ({
                                value: c.id,
                                label: c.cashName,
                              }))
                            : [],
                    }
                  : f,
              );

              // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
              if (JSON.stringify(prev) === JSON.stringify(updated)) return prev;
              return updated;
            });
          },
        });
        fields.push({
          name: "targetId",
          label: "Banka/Kasa Seçiniz",
          type: "select",
          options: banks?.map((c) => ({ value: c.id, label: c.accountName })),
          required: true,
          colspan: 8,
        });
        break;
      default:
        break;
    }
    fields.push({
      name: "amount",
      label: "Tutar",
      type: "number",
      required: true,
      colspan: 6,
    });
    fields.push({
      name: "transactionDate",
      label: "İşlem Tarihi",
      type: "date",
      required: true,
      colspan: 6,
    });
    fields.push({
      name: "description",
      label: "Açıklama",
      type: "textarea",
      colspan: 12,
    });

    return fields;
  };

  if (cashAccountsLoading || loadingBanks || accountLoading)
    return <GlobalLoader />;
  return (
    <GenericForm
      fields={getFields()}
      onSubmit={function (data: any): void {
         if (data.sourceId && data.targetId && data.sourceId === data.targetId) {
        dispatch(setNotification({
          title: "UYARI",
          message: "Kaynak ve karşı hesap aynı olamaz! Lütfen farklı hesap seçiniz.",
          type:"warning",
           duration:10000
        }));
      return; // Form gönderimini durdur
    }
        refetchAccount(URL + "/financal-transaction/" + TransactionType[transactionType], {
          method: "POST",
          body: data,
        }).then((c) => onClose(null));
      }}
    />
  );
};
