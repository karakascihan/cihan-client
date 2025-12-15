import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Logo from "../../images/logo/logo.svg";
// react-to-print paketini import ediyoruz
import { PriceOfferDto } from '@/api/apiDtos';

interface PriceOfferProps {
  data: PriceOfferDto;
  onPrint: () => void;
}

 export const PriceOfferComponent: React.FC<PriceOfferProps> = ({ data,onPrint }) => {
  const {
    teklifBelgeNo,
    teklifTarihi,
    teklifGecerlilikTarihi,
    teklifAciklama,
    durumu,
    priceOfferLine,
  } = data;

  // Yazdırılacak bileşenin içeriğine referans oluşturuyoruz
  const componentRef = useRef<HTMLDivElement>(null);

  const formatDate = (date?: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('tr-TR');
  };
  const calculateTotals = () => {
    const subtotal = priceOfferLine?.reduce((acc, item) => acc + (item.toplamFiyat ?? 0), 0) ?? 0;
    const tax = subtotal * 0.18;
    const grandTotal = subtotal + tax;
    return {
      subtotal,
      tax,
      grandTotal,
    };
  };
const [isPrinting, setIsPrinting] = useState(false);
  const totals = calculateTotals();
 
   onPrint = () => {
    // Yazdırma işlemi zaten devam ediyorsa yeni bir işlem başlatma
    if (isPrinting) {
      return;
    }

    // Yazdırma işlemini başlat
    setIsPrinting(true);
    
    // window.print() çağrısı senkron olmadığı için bir gecikme ekliyoruz
    // Bu, tarayıcının sayfayı tam olarak işlemesi için zaman tanır
    setTimeout(() => {
      window.print();
      setIsPrinting(false); // Yazdırma işlemi bittiğinde durumu sıfırla
    }, 500); // 500ms (yarım saniye) beklemek genellikle yeterlidir
  };
  return (
    <>
      {/* Yazdırılacak ana içeriği sarmalayan ve referansı atadığımız div */}
      <Container ref={componentRef}>
        <Header>
          <LogoPlaceholder><img src={ Logo} alt="Logo" /></LogoPlaceholder>
          <InfoSection>
            <OfferTitle>FİYAT TEKLİFİ</OfferTitle>
            <InfoDetail>
              <Label>Belge No:</Label> {teklifBelgeNo ?? 'N/A'}
            </InfoDetail>
            <InfoDetail>
              <Label>Tarih:</Label> {formatDate(teklifTarihi)}
            </InfoDetail>
            <InfoDetail>
              <Label>Geçerlilik Tarihi:</Label> {formatDate(teklifGecerlilikTarihi)}
            </InfoDetail>
          </InfoSection>
        </Header>

        <Section>
          <Subtitle>Müşteri & Teklif Bilgileri</Subtitle>
          <InfoGrid>
            <GridItem>
              <Label>Talep No:</Label> {data.talepNo ?? 'N/A'}
            </GridItem>
            <GridItem>
              <Label>Durum:</Label> {durumu ?? 'N/A'}
            </GridItem>
            <GridItem>
              <Label>Açıklama:</Label> {teklifAciklama ?? 'N/A'}
            </GridItem>
          </InfoGrid>
        </Section>

        <Section>
          <Subtitle>Kalemler</Subtitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Malzeme Adı</TableHeader>
                <TableHeader>Miktar</TableHeader>
                <TableHeader>Birimi</TableHeader>
                <TableHeader>Birim Fiyatı</TableHeader>
                <TableHeader>Para Birimi</TableHeader>
                <TableHeader>Toplam Fiyat</TableHeader>
              </tr>
            </thead>
            <tbody>
              {priceOfferLine?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.malzemeAdi ?? 'N/A'}</TableCell>
                  <TableCell>{item.miktar ?? 'N/A'}</TableCell>
                  <TableCell>{item.birimi ?? 'N/A'}</TableCell>
                  <TableCell>{item.birimFiyat?.toFixed(2) ?? '0.00'}</TableCell>
                  <TableCell>{item.paraBirimi ?? 'N/A'}</TableCell>
                  <TableCell>{item.toplamFiyat?.toFixed(2) ?? '0.00'}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Section>

        <TotalsSection>
          <TotalsContainer>
            <TotalRow>
              <TotalLabel>Ara Toplam</TotalLabel>
              <TotalAmount>{totals.subtotal.toFixed(2)} TL</TotalAmount>
            </TotalRow>
            <TotalRow>
              <TotalLabel>KDV</TotalLabel>
              <TotalAmount>{totals.tax.toFixed(2)} TL</TotalAmount>
            </TotalRow>
            <TotalRow grandTotal>
              <TotalLabel>Genel Toplam</TotalLabel>
              <TotalAmount>{totals.grandTotal.toFixed(2)} TL</TotalAmount>
            </TotalRow>
          </TotalsContainer>
        </TotalsSection>
      </Container>
    </>
  );
};

// --- STYLED COMPONENTS ---

// Bu konteyner artık @media print kuralına ihtiyaç duymaz,
// çünkü ReactToPrint sadece içerik kısmını yazdırır.
const ButtonsContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  @media print {
    display: none;  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  /* Yazdırma çıktısını daha temiz yapmak için */
  @media print {
    margin: 0;
    box-shadow: none;
    padding: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #007bff;
`;
// ... (Diğer tüm Styled Components kodları)
const LogoPlaceholder = styled.div`
  width: 150px;
  height: 50px;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6c757d;
  border-radius: 4px;
`;

const InfoSection = styled.div`
  text-align: right;
`;

const OfferTitle = styled.h1`
  font-size: 2.5rem;
  color: #007bff;
  margin: 0;
`;

const InfoDetail = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 8px;
  margin-bottom: 15px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
`;

const GridItem = styled.div`
  font-size: 0.95rem;
  color: #495057;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: #fff;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e9ecef;
`;

const TotalsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

const TotalsContainer = styled.div`
  width: 300px;
`;

const TotalRow = styled.div<{ grandTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: ${({ grandTotal }) => (grandTotal ? '2px solid #333' : '1px solid #e9ecef')};
  font-size: ${({ grandTotal }) => (grandTotal ? '1.2rem' : '1rem')};
  font-weight: ${({ grandTotal }) => (grandTotal ? 'bold' : 'normal')};
  color: ${({ grandTotal }) => (grandTotal ? '#333' : '#555')};
`;

const TotalLabel = styled.span``;

const TotalAmount = styled.span``;