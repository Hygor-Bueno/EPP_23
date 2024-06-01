export function formatToPtBr(valor) {
  var valorArredondado = Math.round(valor * 100) / 100;
  var valorFormatado = valorArredondado.toFixed(2).replace(/\./, ',');
  return "R$ " + valorFormatado;
}
