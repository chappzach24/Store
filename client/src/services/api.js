export const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getProtectedProducts = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await fetch('http://localhost:5000/api/products', {
    headers: {
      'Authorization': `Bearer ${user?.token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};