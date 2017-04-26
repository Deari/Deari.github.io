export function  scrollToTop() {
  // document.body.scrollTop = 0;
  let timer = setInterval( () => {
    var toTop = document.body.scrollTop || document.documentElement.scrollTop
    var speed = Math.ceil(toTop / 5)
    document.documentElement.scrollTop = document.body.scrollTop = toTop - speed
    if (toTop == 0) clearInterval(timer)
  }, 10);
}