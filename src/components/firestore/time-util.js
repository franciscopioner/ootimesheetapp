function timeStrToMins(strTime) {
    console.log(strTime);
    if (!strTime) return 1;
    let [h, m] = strTime.split(":");
    return Number(h) * 60 + Number(m);
  }
  
  function minsToTimeStr(val) {
    let sign = val > 0 ? "" : "-";
    val = val > 0 ? val : -val;
    let m = val % 60;
    let h = (val - m) / 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${sign}${h}:${m}`;
  }

  const hour = (e) => {
    let val = e;
    let newVal = ""
    val = val.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    if (val) {
      if (val.length === 1) {
        if (Number(val) > 2) val = "0" + val;
      }
      if (val.length < 4) {
        newVal = val
      } else if (val.length === 4) {
        let h = Number(val.slice(0, 2));
        let m = Number(val.slice(2));
        h = Math.min(h, 23);
        m = Math.min(m, 59);

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;

        newVal = `${h}:${m}`
      }
    } else {
      newVal = ""
    }
    return newVal
  }

  const minsToStrTime = (val) => {
    let m = val % 60
    let h = (val - m) / 60;
    
    
    if(m < 0){
      m = String(m)
      m = m.slice(1)
    }
    if(h < 0){
      h = String(h)
      h = h.slice(1)
      h = `-0${h}`
    }

		h = h >= 0 && h < 10 ? "0" + h : h;
    m = m >= 0 && m < 10 ? "0" + m : m;
    
		return `${h}:${m}`;
	}
  
  export { timeStrToMins, minsToTimeStr, hour, minsToStrTime };
  