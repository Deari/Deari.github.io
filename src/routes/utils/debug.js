export const warn = (msg, data) => {
  alert(`${msg}:`+JSON.stringify(data));
  console.warn(`${msg}:`+JSON.stringify(data))
}

export const info = (msg, data) => {
  console.info(msg, data);
}

export default {
  warn,
  info,
}