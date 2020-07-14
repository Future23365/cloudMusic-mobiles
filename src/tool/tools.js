export let stringLocale =  function(value) {
  let str = String(value);
  if(str.length <= 4) {
    return value;
  }else if(str.length <= 13) {
    switch(str.length) {
      case 5:
        return `${str.slice(0, 1)}万`;
      case 6:
        return `${str.slice(0, 2)}万`;
      case 7:
        return `${str.slice(0, 3)}万`;
      case 8:
        return `${str.slice(0, 4)}万`;
      case 9:
        return `${str.slice(0, 1)}亿`;
      case 10:
        return `${str.slice(0, 2)}亿`;
      case 11:
        return `${str.slice(0, 3)}亿`;
      case 12:
        return `${str.slice(0, 4)}亿`;
      case 13:
        return `${str.slice(0, 5)}亿`;
    }
  }else {
    return str;
  }
}

export let tochance = time => {
  let minute;
  let second;
  if(time >= 60) {
    time = Math.ceil(time);
    minute = (time / 60).toString().split(".")[0];
    minute < 10 ? minute = "0" + minute : '';
    second= (time - minute * 60).toFixed(0); 
    second < 10 ? second = "0" + second : '';
  }else {
    minute = "00";
    second = time.toFixed(0);
    second < 10 ? second = "0" + second : '';
  }
  return minute + ":" + second;
}
