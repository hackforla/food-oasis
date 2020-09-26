const isMobile = new RegExp("Mobi", "i").test(navigator.userAgent)
  ? true
  : false;

export default isMobile;
