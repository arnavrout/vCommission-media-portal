import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const productsPerPage = 15;

  // ✅ Fetch products dynamically on page change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const res = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  const convertToINR = (usdPrice: number) => {
    return Math.round(usdPrice * 83);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Browse our collection of products</p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
        <div className="relative w-full sm:w-1/2 md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-sm"
            />
          </div>
        </motion.div>

        {/* Product Listing */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Search className="h-10 w-10 text-primary" />
            </motion.div>
            <p className="mt-3 text-lg font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">No products found.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => {
                const discountedPriceINR = convertToINR(calculateDiscountedPrice(product.price, product.discountPercentage));
                const originalPriceINR = convertToINR(product.price);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="aspect-video overflow-hidden bg-muted">
                        {/* ✅ Show only one image (thumbnail) */}
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-lg mb-3 line-clamp-2">{product.title}</h3>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-2xl font-bold text-primary">
                              ₹{discountedPriceINR.toLocaleString('en-IN')}
                            </p>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                              {Math.round(product.discountPercentage)}% off
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-through">
                            ₹{originalPriceINR.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <Button
                          className="w-full mt-auto"
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.title,
                            price: discountedPriceINR,
                            image: product.thumbnail
                          })}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => ( // dummyjson has 100 products
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className={currentPage >= 10 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Products;
