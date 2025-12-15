export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string | null;
    photo: string | ArrayBuffer | null;
    productCode: string;
    note: string;
}

// examle

// const product1: Product =
// {
//     id: 1,
//     name: "Product 1",
//     price: 100,
//     photo: null,
//     productCode: "P001",
//     note: "Note"
// };

// const product1: Product =
// {
//     id: 1,

//     name: "Product 1",
//     price: 100,
//     photo: null,
//     productCode: "P001",
//     note: "Note"
// };