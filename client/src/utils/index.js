const formatNumber = number => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
    .format(number)
    .split('.')[0]
    .replaceAll(',', '.')
}

export {formatNumber}