export const extractPropertyData = (text) => {
  return {
    title: text.match(/Luxury|Villa|Apartment/i)?.[0] || "Property",
    price: text.match(/[\d\.]+\s?(Cr|Lakh)/i)?.[0],
    location: text.match(/Hyderabad|Bangalore|Mumbai/i)?.[0],
    area: text.match(/\d+\s?sqft/i)?.[0],
    bedrooms: parseInt(text.match(/\d+\s?BHK/i)?.[0]) || 0,
    bathrooms: 2,
    description: text.slice(0, 200),
  };
};