export const makeTime = function (utime = '1-1-1 1:1:1') {
	// problem in UTC date function
  const tTime = new Date(utime).getTime()
  if (tTime) {
  	return tTime
  }

  // because of backend api failed to save right date and time
  // this will be work around for failed time composition
  const [date, time] = utime.split(' ')
  const [Y, M, D] = date.split('-')
  const [h, m, s] = time.split(':')

  const nTime = new Date();
  nTime.setFullYear(Y)
  nTime.setMonth(M - 1)
  nTime.setDate(D)
  nTime.setHours(h)
  nTime.setMinutes(m)
  nTime.setMilliseconds(s)
  return nTime.getTime()
}
