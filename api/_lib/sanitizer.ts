const entityMap: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "0x60",
};

export function sanitizeHtml(html: string) {
  return String(html).replace(/[&<>`\/]/g, (key) => entityMap[key]);
}
