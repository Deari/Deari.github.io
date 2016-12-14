import fetchUtil from "./fetchUtil";

export default async function logger(error, event = "page") {
  const logEvents = ["page", "api"];
  if (!logEvents.includes(event)) return;

  let resp = null;
  try {
    resp = await fetchUtil.postJSON("/newh5/api/qalarm/" + event, {
      "message": error
    });
    
  } catch(e) {
    console.log(e);
  }

  return resp;
}
