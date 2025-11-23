import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, HeartOff, Tag, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoriteContext";
import { useEffect, useState } from "react";
import { Moon, Sun } from 'lucide-react';             


const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const { theme, toggleTheme } = useTheme(); 

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setMainImage(data.thumbnail); 
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center mt-10 text-lg font-semibold animate-pulse">
        Loading product details...
      </p>
    );
  }

  const fav = isFavorite(product.id);

  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center mt-6 mb-10"
    >
       {/* ⭐ THEME TOGGLE BUTTON IN TOP RIGHT */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 rounded-lg"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
      
      <Card className="w-full max-w-[70%] shadow-xl rounded-2xl border-border border">
        <CardContent className="p-8">

          {/* Back Button */}
          <motion.button
            {...fadeIn}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </motion.button>

          {/* Main Image */}
        <motion.div {...fadeIn} className="mt-5">
  <h2 className="text-xl font-semibold mb-2">Product Image</h2>

  {/* Main Image with scroll */}
  <div className="w-full h-72 bg-muted rounded-lg overflow-hidden shadow-inner border border-border relative">
    <div className="w-full h-full overflow-y-auto">
      <img
        src={mainImage || product.thumbnail}
        alt={product.title}
        className="w-full object-contain"
      />
    </div>
  </div>

  <p className="text-xs text-center text-muted-foreground mt-1">
    Scroll inside the image to view full picture
  </p>

  {/* Thumbnails */}
  {product.images?.length > 1 && (
    <div className="flex gap-3 mt-4 overflow-x-auto">
      {product.images.map((img: string, i: number) => (
        <motion.img
          key={i}
          src={img}
          alt={`image-${i}`}
          className={`w-24 h-24 rounded-lg border border-border object-cover cursor-pointer hover:scale-105 transition
            ${mainImage === img ? "ring-2 ring-primary" : ""}`}
          whileHover={{ scale: 1.05 }}
          onClick={() => setMainImage(img)} // update main image on click
        />
      ))}
    </div>
  )}
</motion.div>

          {/* Title */}
          <motion.h1 {...fadeIn} className="text-3xl font-bold mt-6">
            {product.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeIn}
            className="text-muted-foreground mt-2 text-sm leading-relaxed"
          >
            {product.description}
          </motion.p>

          {/* Basic Info */}
          <motion.div
            {...fadeIn}
            className="mt-5 grid grid-cols-2 gap-4 text-sm"
          >
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
            <p><strong>Weight:</strong> {product.weight} g</p>
          </motion.div>

          {/* Tags */}
          <motion.div {...fadeIn} className="mt-6">
            <strong className="flex items-center gap-1">
              <Tag size={16} /> Tags:
            </strong>
            <div className="flex gap-2 mt-2 flex-wrap">
              {product.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Dimensions / Warranty / Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm">

            {/* LEFT */}
            <motion.div {...fadeIn} className="p-4">
              <strong className="flex items-center gap-1 mb-2">
                <Ruler size={16} /> Dimensions
              </strong>
              <p>Width: {product.dimensions.width} cm</p>
              <p>Height: {product.dimensions.height} cm</p>
              <p>Depth: {product.dimensions.depth} cm</p>
            </motion.div>

            {/* MIDDLE (with left/right border) */}
            <motion.div
              {...fadeIn}
              className="p-4 md:border-l md:border-r border-border"
            >
              <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
              <p><strong>Shipping:</strong> {product.shippingInformation}</p>
              <p><strong>Status:</strong> {product.availabilityStatus}</p>
              <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>
              <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
            </motion.div>

            {/* RIGHT */}
            <motion.div {...fadeIn} className="p-4">
              <strong className="block mb-2">Product Metadata</strong>
              <p>Created: {new Date(product.meta.createdAt).toDateString()}</p>
              <p>Updated: {new Date(product.meta.updatedAt).toDateString()}</p>
            </motion.div>
          </div>

          {/* Price */}
          <motion.div {...fadeIn} className="mt-6">
            <p className="text-4xl font-bold text-primary">
              ₹{Math.round(product.price * 83).toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.discountPercentage}% discount available
            </p>
          </motion.div>

          {/* Favorites */}
          <motion.div {...fadeIn}>
            <Button
              onClick={() =>
                fav
                  ? removeFavorite(product.id)
                  : addFavorite({
                      id: product.id,
                      name: product.title,
                      image: product.thumbnail,
                    })
              }
              variant="outline"
              className="w-full mt-5 flex items-center gap-2"
            >
              {fav ? (
                <>
                  <HeartOff size={18} /> Remove from Favorites
                </>
              ) : (
                <>
                  <Heart size={18} /> Add to Favorites
                </>
              )}
            </Button>
          </motion.div>

          {/* Reviews */}
          <motion.div {...fadeIn} className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

            <div className="space-y-4">
              {product.reviews.map((review: any, i: number) => (
                <motion.div
                  key={i}
                  className="p-4 border border-border rounded-lg shadow-sm bg-muted"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-sm font-medium">
                    {review.reviewerName} — {review.rating}⭐
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductDetails;
