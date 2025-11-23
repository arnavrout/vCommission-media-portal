import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Brand {
  id: number;
  name: string;
  logo: string;
  sell: number;
  activeCustomers: number;
  lastMonthSell: number;
  category: string;
}

const dummyBrands: Brand[] = [
  { id: 1, name: "Nike", category: "Sports", logo: "https://logo.clearbit.com/nike.com", sell: 4120, activeCustomers: 2850, lastMonthSell: 3980 },
  { id: 2, name: "Adidas", category: "Sports", logo: "https://logo.clearbit.com/adidas.com", sell: 3210, activeCustomers: 2210, lastMonthSell: 3010 },
  { id: 3, name: "Puma", category: "Sports", logo: "https://logo.clearbit.com/puma.com", sell: 2180, activeCustomers: 1700, lastMonthSell: 2050 },
  { id: 4, name: "Reebok", category: "Sports", logo: "https://logo.clearbit.com/reebok.com", sell: 1550, activeCustomers: 1120, lastMonthSell: 1400 },
  { id: 5, name: "Under Armour", category: "Sports", logo: "https://logo.clearbit.com/underarmour.com", sell: 2800, activeCustomers: 2100, lastMonthSell: 2600 },

  { id: 6, name: "Zara", category: "Fashion", logo: "https://logo.clearbit.com/zara.com", sell: 5100, activeCustomers: 3500, lastMonthSell: 4900 },
  { id: 7, name: "H&M", category: "Fashion", logo: "https://logo.clearbit.com/hm.com", sell: 4750, activeCustomers: 3300, lastMonthSell: 4500 },
  { id: 8, name: "Uniqlo", category: "Fashion", logo: "https://logo.clearbit.com/uniqlo.com", sell: 3800, activeCustomers: 2600, lastMonthSell: 3600 },
  { id: 9, name: "Levis", category: "Fashion", logo: "https://logo.clearbit.com/levis.com", sell: 2900, activeCustomers: 2000, lastMonthSell: 2750 },
  { id: 10, name: "Gucci", category: "Fashion", logo: "https://logo.clearbit.com/gucci.com", sell: 6500, activeCustomers: 4800, lastMonthSell: 6200 },

  { id: 11, name: "McDonald's", category: "Food", logo: "https://logo.clearbit.com/mcdonalds.com", sell: 8200, activeCustomers: 6000, lastMonthSell: 7900 },
  { id: 12, name: "KFC", category: "Food", logo: "https://logo.clearbit.com/kfc.com", sell: 7200, activeCustomers: 5200, lastMonthSell: 6900 },
  { id: 13, name: "Domino's", category: "Food", logo: "https://logo.clearbit.com/dominos.com", sell: 6500, activeCustomers: 4600, lastMonthSell: 6200 },
  { id: 14, name: "Starbucks", category: "Food", logo: "https://logo.clearbit.com/starbucks.com", sell: 7900, activeCustomers: 5750, lastMonthSell: 7600 },
  { id: 15, name: "Burger King", category: "Food", logo: "https://logo.clearbit.com/bk.com", sell: 6100, activeCustomers: 4300, lastMonthSell: 5900 },

  { id: 16, name: "Sephora", category: "Beauty", logo: "https://logo.clearbit.com/sephora.com", sell: 5400, activeCustomers: 4200, lastMonthSell: 5200 },
  { id: 17, name: "Nykaa", category: "Beauty", logo: "https://logo.clearbit.com/nykaa.com", sell: 5000, activeCustomers: 3500, lastMonthSell: 4700 },
  { id: 18, name: "Loreal", category: "Beauty", logo: "https://logo.clearbit.com/loreal.com", sell: 6200, activeCustomers: 4700, lastMonthSell: 5800 },
  { id: 19, name: "Maybelline", category: "Beauty", logo: "https://logo.clearbit.com/maybelline.com", sell: 4300, activeCustomers: 3000, lastMonthSell: 4000 },
  { id: 20, name: "MAC Cosmetics", category: "Beauty", logo: "https://logo.clearbit.com/maccosmetics.com", sell: 5600, activeCustomers: 3900, lastMonthSell: 5400 },

  { id: 21, name: "Airbnb", category: "Travel", logo: "https://logo.clearbit.com/airbnb.com", sell: 7200, activeCustomers: 5900, lastMonthSell: 7000 },
  { id: 22, name: "Booking.com", category: "Travel", logo: "https://logo.clearbit.com/booking.com", sell: 6800, activeCustomers: 5400, lastMonthSell: 6500 },
  { id: 23, name: "Expedia", category: "Travel", logo: "https://logo.clearbit.com/expedia.com", sell: 6100, activeCustomers: 5000, lastMonthSell: 5800 },
  { id: 24, name: "MakeMyTrip", category: "Travel", logo: "https://logo.clearbit.com/makemytrip.com", sell: 6500, activeCustomers: 4800, lastMonthSell: 6200 },
  { id: 25, name: "Goibibo", category: "Travel", logo: "https://logo.clearbit.com/goibibo.com", sell: 5800, activeCustomers: 4300, lastMonthSell: 5600 },
];

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicBrands, setDynamicBrands] = useState(dummyBrands);
  const brandsPerPage = 10;

  // 🔄 Update Active Customers every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicBrands((prev) =>
        prev.map((b) => ({
          ...b,
          activeCustomers:
            b.activeCustomers + Math.floor(Math.random() * 40 - 20),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredBrands = dynamicBrands.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage);

  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * brandsPerPage,
    currentPage * brandsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Our Brands</h1>
          <p className="text-muted-foreground">
            Explore top brands and performance numbers
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative w-full sm:w-1/2 md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-10 text-sm"
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3">Brand</th>
                    <th className="p-3 text-center">Category</th>
                    <th className="p-3 text-center">Sell</th>
                    <th className="p-3 text-center">Active Customers</th>
                    <th className="p-3 text-center">Last Month Sell</th>
                  </tr>
                </thead>

                <motion.tbody>
                  {paginatedBrands.map((brand, index) => {
                    const growth = brand.sell - brand.lastMonthSell;
                    const isUp = growth >= 0;

                    return (
                      <motion.tr
                        key={brand.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-muted/40 cursor-pointer text-center"
                      >
                        {/* Brand Name + Logo */}
                        <td className="p-3 flex items-center gap-3">
                          <motion.img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-10 w-10 object-contain rounded-md bg-white p-1"
                            animate={{ rotateY: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              ease: "linear",
                            }}
                          />
                          <span className="font-medium">{brand.name}</span>
                        </td>

                        <td className="p-3">{brand.category}</td>

                        {/* SELL COLUMN */}
                        <td className="p-3 font-semibold">
                          {brand.sell.toLocaleString()}
                          <span
                            className={`ml-2 ${
                              isUp ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isUp ? "↑" : "↓"}
                          </span>
                        </td>

                        {/* ACTIVE CUSTOMERS WITH BG COLOR */}
                        <td className="p-3">
                          <span className="px-3 py-1 rounded text-white font-semibold bg-primary">
                            {brand.activeCustomers.toLocaleString()}
                          </span>
                        </td>

                        {/* LAST MONTH SELL */}
                        <td className="p-3">{brand.lastMonthSell.toLocaleString()}</td>
                      </motion.tr>
                    );
                  })}
                </motion.tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={currentPage === 1 ? "opacity-40 pointer-events-none" : ""}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className={
                    currentPage === totalPages
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Brands;
