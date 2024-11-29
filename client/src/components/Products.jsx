import { useQuery } from '@tanstack/react-query';

const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Products = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded-lg shadow">
          {/* Image container with fixed aspect ratio */}
          <div className="relative w-full h-48 mb-4">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-green-600 font-bold mt-2">${product.price}</p>
          <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
          <p className="text-sm text-gray-500 mt-1">
            Stock: {product.quantity} {product.inStock ? '(In Stock)' : '(Out of Stock)'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;