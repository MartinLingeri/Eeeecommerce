export function parseCurrency(value) {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
}
