 function yaziyla(sayi: number): string {
    const rakam = sayi.toFixed(2).split(".");
    const tamsayi = rakam[0];
    const ondalik = rakam[1] || "";

    const birler = ["", "BİR", "İKİ", "ÜÇ", "DÖRT", "BEŞ", "ALTI", "YEDİ", "SEKİZ", "DOKUZ"];
    const onlar = ["", "ON", "YİRMİ", "OTUZ", "KIRK", "ELLİ", "ALTMIŞ", "YETMİŞ", "SEKSEN", "DOKSAN"];
    const binler = ["", "BİN", "MİLYON", "MİLYAR", "TRİLYON", "KATRİLYON", "KENTİLYON"];

    const sonuc: string[] = [];
    const gruplar = tamsayi.replace(/\B(?=(\d{3})+(?!\d))/g, ".").split(".").reverse();

    gruplar.forEach((grup, index) => {
        let c = "";
        const uzunluk = grup.length;

        if (uzunluk === 3) {
            if (grup[0] !== "0") {
                c += grup[0] === "1" ? "YÜZ " : birler[parseInt(grup[0])] + " YÜZ ";
            }
            if (grup[1] !== "0") {
                c += onlar[parseInt(grup[1])] + " ";
            }
            if (grup[2] !== "0") {
                c += birler[parseInt(grup[2])] + " ";
            }
        } else if (uzunluk === 2) {
            if (grup[0] !== "0") {
                c += onlar[parseInt(grup[0])] + " ";
            }
            if (grup[1] !== "0") {
                c += birler[parseInt(grup[1])] + " ";
            }
        } else if (uzunluk === 1) {
            if (grup[0] !== "0") {
                c += birler[parseInt(grup[0])] + " ";
            }
        }

        if (c.trim() !== "") {
            c += binler[index] + " ";
        }
        sonuc.push(c.trim());
    });

    let yazi = sonuc.reverse().join(" ").trim();

    if (tamsayi === "1" && gruplar.length === 1) {
        yazi = yazi.replace("BİN", "");
    }

    yazi += " TL";

    if (ondalik !== "00") {
        const ondalikYazi =
            (ondalik[0] !== "0" ? onlar[parseInt(ondalik[0])] + " " : "") +
            (ondalik[1] !== "0" ? birler[parseInt(ondalik[1])] + " " : "") +
            "KR";
        yazi += " " + ondalikYazi.trim();
    }

    return yazi.replace(/\s+/g, " ").trim();
}
export default yaziyla;
