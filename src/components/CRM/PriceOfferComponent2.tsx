import React from "react";

interface OfferItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface OfferProps {
  logoUrl?: string;
  offerTitle?: string;
  companyName?: string;
  customerName?: string;
  customerAddress?: string;
  offerItems: OfferItem[];
  currency?: string;
}

const ProfessionalOffer: React.FC<OfferProps> = ({
  logoUrl,
  offerTitle = "Fiyat Teklifi",
  companyName = "Şirket Adı",
  customerName,
  customerAddress,
  offerItems,
  currency = "₺",
}) => {
  const totalAmount = offerItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      backgroundColor: "#fff",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap" as "wrap",
      marginBottom: "30px",
    },
    logo: {
      maxHeight: "80px",
      marginTop: "10px",
    },
    offerTitle: {
      fontSize: "28px",
      color: "#1f2937",
      margin: 0,
      fontWeight: 700,
    },
    companyInfo: {
      marginTop: "5px",
      fontSize: "14px",
      color: "#555",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as "collapse",
      marginTop: "20px",
      marginBottom: "20px",
    },
    th: {
      border: "1px solid #ddd",
      padding: "12px",
      backgroundColor: "#f3f4f6",
      fontWeight: 600,
      textAlign: "left" as "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "left" as "left",
    },
    tdRight: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "right" as "right",
    },
    totalRow: {
      fontWeight: 700,
      backgroundColor: "#f9fafb",
    },
    signatureSection: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap" as "wrap",
      marginTop: "40px",
    },
    signatureBox: {
      width: "48%",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "6px",
      backgroundColor: "#f9f9f9",
      marginBottom: "20px",
    },
    signatureTitle: {
      textAlign: "center" as "center",
      fontWeight: 600,
      marginBottom: "15px",
      fontSize: "16px",
    },
    signatureRow: {
      marginBottom: "12px",
    },
    signatureLabel: {
      display: "block",
      fontWeight: 600,
      marginBottom: "4px",
      fontSize: "14px",
    },
    line: {
      borderBottom: "1px solid #000",
      height: "20px",
    },
    // Responsive
    responsive: `
      @media (max-width: 768px) {
        .signature-section .signature-box {
          width: 100% !important;
        }
        table th, table td {
          font-size: 13px;
        }
      }
    `,
  };

  const SignatureColumn: React.FC<{ title: string }> = ({ title }) => (
    <div className="signature-box" style={styles.signatureBox}>
      <h3 style={styles.signatureTitle}>{title}</h3>
      {["İmza", "İsim", "Görev", "Tarih"].map((label) => (
        <div key={label} style={styles.signatureRow}>
          <label style={styles.signatureLabel}>{label}:</label>
          <div style={styles.line}></div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.offerTitle}>{offerTitle}</h1>
          <p style={styles.companyInfo}>{companyName}</p>
          {customerName && <p style={styles.companyInfo}>Müşteri: {customerName}</p>}
          {customerAddress && <p style={styles.companyInfo}>Adres: {customerAddress}</p>}
        </div>
        {logoUrl && <img src={logoUrl} alt="Logo" style={styles.logo} />}
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Açıklama</th>
            <th style={styles.th}>Adet</th>
            <th style={styles.th}>Birim Fiyat</th>
            <th style={styles.th}>Tutar</th>
          </tr>
        </thead>
        <tbody>
          {offerItems.map((item, idx) => (
            <tr key={idx}>
              <td style={styles.td}>{item.description}</td>
              <td style={styles.tdRight}>{item.quantity}</td>
              <td style={styles.tdRight}>
                {item.unitPrice.toFixed(2)} {currency}
              </td>
              <td style={styles.tdRight}>
                {(item.quantity * item.unitPrice).toFixed(2)} {currency}
              </td>
            </tr>
          ))}
          <tr style={styles.totalRow}>
            <td colSpan={3} style={{ ...styles.tdRight, fontWeight: 700 }}>
              Toplam
            </td>
            <td style={{ ...styles.tdRight, fontWeight: 700 }}>
              {totalAmount.toFixed(2)} {currency}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Signature */}
      <div className="signature-section" style={styles.signatureSection}>
        <SignatureColumn title="Teklif Sunan" />
        <SignatureColumn title="Teklif Alan" />
      </div>

      {/* Responsive styles */}
      <style>{styles.responsive}</style>
    </div>
  );
};

export default ProfessionalOffer;
