export default function formatSecondsToMmSs(seconds,e=false) {
  if (seconds == 0) {
    return '00:00'
  }
  let msec = seconds * 1000
  // let hh = Math.floor(msec / 1000 / 60 / 60);
  // msec -= hh * 1000 * 60 * 60;
  let mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  let ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  if (ss < 10) ss = `0${ss}`
  if (mm < 10) mm = `0${mm}`
  // if (hh < 10) hh = `0${hh}`
  // if(e){
  //   return `${hh}h ${mm}m`
  // }
  return `${mm}:${ss}`
}
