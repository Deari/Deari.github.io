export const warn = (msg, data) => {
  (data && alert(`${msg}:`+JSON.stringify(data))) || alert(`${msg}`);
  console.warn(`${msg}:`, data)
}

export const info = (msg, data) => {
  console.info(msg, data);
}

export default {
  warn,
  info,
}