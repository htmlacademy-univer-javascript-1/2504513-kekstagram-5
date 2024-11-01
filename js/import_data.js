import { showServerErrorMessage } from "./status_massage.js";

const url = "https://29.javascript.htmlacademy.pro/kekstagram/data";

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка запроса");
    const data = await response.json();
    return data;
  } catch {
    showServerErrorMessage();
    setInterval(() => {
      window.location.reload();
    }, 5000);
  }
};

export { fetchData };
