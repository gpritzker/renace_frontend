export const serializeNumber = (value: number | string) => {
  // Transforma numero con formato precio ARS 115.000,99
  const num = Number(value)

  if (isNaN(num)) return value.toString() // Manejo de valores inválidos

  const hasDecimals = num % 1 !== 0 // Verifica si tiene decimales

  return new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0
  }).format(num)
}
