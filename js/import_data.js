import { showServerErrorMessage } from "./status_massage.js";

const url = "https://29.javascript.htmlacademy.pro/kekstagram/data";

let data;

export const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка запроса");
    data = await response.json();
  } catch {
    showServerErrorMessage();
    setInterval(() => {
      window.location.reload();
    }, 5000);
  }
};

await fetchData();
export { data };
