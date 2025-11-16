import { MANUFACTURERS } from "./manufacturers";

export function generateProductData() {
  const productName = `Product ${Math.floor(Math.random() * 1000000)}`;
  
  return {
    name: productName.slice(0, 40), 
    price: Math.floor(Math.random() * 900 + 100),
    amount: Math.floor(Math.random() * 50 + 1),
    manufacturer: MANUFACTURERS.APPLE,
  };
};
