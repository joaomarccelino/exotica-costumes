export function formatPrice(price: number) {
  const formatedPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',');
  return formatedPrice;
}