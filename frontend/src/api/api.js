// src/services/eventService.js

const BASE_URL = "https://localhost:7282"; // veya backend'inizin URL'si

export const sendEventData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Veri gönderilirken hata oluştu.");
    }
  } catch (error) {
    console.error("İstek sırasında bir hata oluştu:", error);
    throw error;
  }
};