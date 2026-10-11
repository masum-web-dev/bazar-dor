import AllProductsContent from "./components/AllProducts";
import Hero from "./components/Hero";
import PriceDecreased from "./components/PriceDecreased";
import PriceInCreased from "./components/PriceInCreased";
export default function Home() {
  return (
    <div>
   <Hero></Hero>
   <PriceInCreased></PriceInCreased>
   <PriceDecreased></PriceDecreased>
   <AllProductsContent></AllProductsContent>
   </div>
  );
}
