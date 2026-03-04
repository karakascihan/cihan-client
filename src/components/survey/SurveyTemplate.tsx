import React from "react";
export type Question = {
    text: string;
    score: string | number;
};

export type QuestionGroup = {
    title: string;
    questions: Question[];
    groupTotal: string | number;
};

export type SurveyTemplateProps = {
    logoUrl?: string;
    formTitle: string;
    formNo?: string;
    revisionNo?: string;

    adSoyad: string;
    tarih: string;
    adres: string;
    telefon: string;
    ePosta: string;
    webSitesi: string;

    groups: QuestionGroup[];

    genelToplam: string | number;

    puanAciklamalari: {
        puan: number;
        aciklama: string;
    }[];

    dolduranAdSoyad: string;
    onaylayanAdSoyad: string;
};
const SurveyTemplate: React.FC<SurveyTemplateProps> = ({
    logoUrl,
    formTitle,
    formNo,
    revisionNo,
    adSoyad,
    tarih,
    adres,
    telefon,
    ePosta,
    webSitesi,
    groups,
    genelToplam,
    puanAciklamalari,
    dolduranAdSoyad,
    onaylayanAdSoyad,
}) => {
    return (
        <div
            style={{
                width: "210mm",
                minHeight: "297mm",
                margin: "auto",
                padding: "20mm",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
                fontSize: "13px",
                color: "#333",
                background: "#fff",
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "2px solid #2c3e50",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                }}
            >
                <div>
                    {logoUrl && (
                        <img src={logoUrl} style={{ height: "60px" }} alt="logo" />
                    )}
                </div>

                <div style={{ textAlign: "right" }}>
                    <h1 style={{ margin: 0, fontSize: "20px" }}>{formTitle}</h1>
                    <div style={{ fontSize: "12px", color: "#777" }}>
                        Form No: {formNo} | Rev: {revisionNo}
                    </div>
                </div>
            </div>

            {/* KİŞİSEL BİLGİLER */}
            <div style={{ marginBottom: "20px" }}>
                <div
                    style={{
                        background: "#2c3e50",
                        color: "#fff",
                        padding: "6px",
                        fontWeight: "bold",
                    }}
                >
                    Genel Bilgiler
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr>
                            <td style={tdStyle}>Firma: {adSoyad}</td>
                            <td style={tdStyle}>Tarih: {tarih}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Adres: {adres}</td>
                            <td style={tdStyle}>Telefon: {telefon}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>E-Posta: {ePosta}</td>
                            <td style={tdStyle}>Web Sitesi: {webSitesi}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* GRUPLAR */}
            {groups.map((group, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                    <div
                        style={{
                            background: "#ecf0f1",
                            padding: "6px",
                            fontWeight: "bold",
                            border: "1px solid #ccc",
                        }}
                    >
                        {group.title}
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Sorular</th>
                                <th style={{ ...thStyle, width: "70px", textAlign: "center" }}>
                                    Puan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.questions.map((q, i) => (
                                <tr key={i}>
                                    <td style={tdStyle}>{q.text}</td>
                                    <td style={{ ...tdStyle, textAlign: "center" }}>
                                        {q.score}
                                    </td>
                                </tr>
                            ))}

                            <tr style={{ fontWeight: "bold", background: "#fafafa" }}>
                                <td style={tdStyle}>Grup Toplam</td>
                                <td style={{ ...tdStyle, textAlign: "center" }}>
                                    {group.groupTotal}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}

            {/* GENEL TOPLAM */}
            <div style={{ marginBottom: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "10px",
                                    fontWeight: "bold",
                                    width: "80%",
                                }}
                            >
                                GENEL TOPLAM PUAN
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "10px",
                                    fontWeight: "bold",
                                    width: "20%",
                                    textAlign: "center",
                                }}
                            >
                                {genelToplam}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* PUAN AÇIKLAMALARI */}
            <div style={{ marginBottom: "20px" }}>
                <div
                    style={{
                        background: "#2c3e50",
                        color: "#fff",
                        padding: "6px",
                        fontWeight: "bold",
                    }}
                >
                    Puan Açıklamaları
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Puan</th>
                            <th style={thStyle}>Açıklama</th>
                        </tr>
                    </thead>
                    <tbody>
                        {puanAciklamalari.map((item, i) => (
                            <tr key={i}>
                                <td style={tdStyle}>{item.puan}</td>
                                <td style={tdStyle}>{item.aciklama}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* İMZA */}
            <div
                style={{
                    marginTop: "60px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ width: "45%", textAlign: "center" }}>
                    <div
                        style={{
                            borderTop: "1px solid #000",
                            marginTop: "60px",
                            paddingTop: "5px",
                        }}
                    >
                        Dolduran
                        <br />
                        {dolduranAdSoyad}
                    </div>
                </div>

                <div style={{ width: "45%", textAlign: "center" }}>
                    <div
                        style={{
                            borderTop: "1px solid #000",
                            marginTop: "60px",
                            paddingTop: "5px",
                        }}
                    >
                        Onaylayan
                        <br />
                        {onaylayanAdSoyad}
                    </div>
                </div>
            </div>
        </div>
    );
};

const tdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "6px",
};

const thStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#f4f6f8",
    textAlign: "left",
};

export default SurveyTemplate;