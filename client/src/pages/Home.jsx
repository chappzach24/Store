// src/pages/Home.jsx
import Products from '../components/Products';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Our Products</h1>
      <Products />
    </div>
  );
};

export default Home;