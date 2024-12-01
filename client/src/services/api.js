export const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};