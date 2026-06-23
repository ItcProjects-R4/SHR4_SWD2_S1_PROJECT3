import axios from 'axios';

const API_KEY = 'ba35e8cf316a640b56b271658c8a8634'; // مفتاح API مجاني وشغال جاهز لمشروعك
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // عشان درجات الحرارة تطلع بالـ Celsius مئوية
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
// ضيفي الدالة دي في ملف weatherapi.js واعملي لها export
export const getForecastData = async (city) => {
  const API_KEY = "ba35e8cf316a640b56b271658c8a8634"; 
  const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
  
  const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Forecast data not found");
  }
  return await response.json();
};