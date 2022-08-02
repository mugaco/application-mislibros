export default function formatDate(dateStr, format, locale) {
  const formats = {

    eleganteHra: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    },
    eleganteHraB: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    },
    fechaHora: {
      hour: '2-digit',
      minute: '2-digit'
    },
    elegante: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    eleganteC: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    barras: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    },
    guion: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    },
    barrasLargo: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    },
  }

  if (format == 'eleganteD' || format == 'eleganteHraB') {
    const f = new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const hoy = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (f == hoy) {
      let hra = new Date().toLocaleDateString("es-ES", {
        hour: 'numeric',
        minute: 'numeric'
      });
      const arD = hra.split(' ')
      if (arD[1]) {
        const arH = arD[1].split(":")
        return 'Hoy '+ arH[0] + ':' + arH[1]
      }
      // console.info('foo', new Date().toLocaleDateString("es-ES", {
      //   hour: 'numeric',
      //   minute: 'numeric'
      // }));
      // return 'Hoy';
    }
    if (format == 'eleganteD') {
      format = 'elegante'
    } else {
      format = 'eleganteHraB'

    }
  }
  if (format == 'guion') {
    // console.log(dateStr.substr(0, 10));
    return dateStr.substr(0, 10);
    // return dateStr.substr(0, 10)?dateStr.substr(0, 10):null;
    // return dateStr.substr(0, 10);
  }
  if (format == 'fechaHora') {
    const arD = dateStr.split(' ')
    if (arD[1]) {
      const arH = arD[1].split(":")
      return arH[0] + ':' + arH[1]
    }
    return '00:00'
  }
  //let f = formats.elegante
  if (typeof format === 'undefined') {
    format = 'elegante'
  }
  let f = formats[format]
  let l = "es-ES"
  if (typeof locale !== 'undefined') {
    l = locale
  }
  const d = parseInt(dateStr)
  if (d == 0) {
    return ''
  }

  const anoActual = new Date().toLocaleDateString(l, {
    year: 'numeric'
  })
  const anoDate = new Date(dateStr).toLocaleDateString(l, {
    year: 'numeric'
  })
  // console.info('anoActual',anoActual)
  // console.info('anoDate',anoDate)
  // console.info('format',format)

  if (anoActual == anoDate) {
    if (format == 'elegante') {
      return new Date(dateStr).toLocaleDateString(l, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })

    }
  }
  // console.log(dateStr);
  // console.log(new Date('2050-12-25T00:00:00+0000'));
  return new Date(dateStr).toLocaleDateString(l, f)
}
