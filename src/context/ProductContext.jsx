import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ProductContext = createContext(null);

const initialProducts = [
    {
        id: 1,
        name: "Classic Everyday Jacket",
        category: "Men",
        price: 2499,
        oldPrice: 3299,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85",
        badge: "BESTSELLER",
        description: "A versatile jacket designed for effortless everyday style.",
        stock: 20,
    },
    {
        id: 2,
        name: "Elegant Women's Handbag",
        category: "Accessories",
        price: 1899,
        oldPrice: 2499,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
        badge: "POPULAR",
        description: "A timeless accessory for everyday essentials.",
        stock: 20,
    },
    {
        id: 3,
        name: "Minimal Classic Sneakers",
        category: "Shoes",
        price: 2199,
        oldPrice: 2799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
        badge: "NEW ARRIVAL",
        description: "Comfortable sneakers with a clean, modern look.",
        stock: 20,
    },
    {
        id: 4,
        name: "Timeless Women's Outfit",
        category: "Women",
        price: 2799,
        oldPrice: 3499,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85",
        badge: "TRENDING",
        description: "An elegant outfit for everyday and special occasions.",
        stock: 20,
    },
    {
        id: 5,
        name: "Modern Casual Shirt",
        category: "Men",
        price: 1299,
        oldPrice: 1699,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "A versatile shirt that pairs easily with everyday outfits.",
        stock: 20,
    },
    {
        id: 6,
        name: "Women's Classic Dress",
        category: "Women",
        price: 2399,
        oldPrice: 2999,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",
        badge: "POPULAR",
        description: "A classic silhouette with a sophisticated finish.",
        stock: 20,
    },
    {
        id: 7,
        name: "Everyday Wristwatch",
        category: "Accessories",
        price: 1599,
        oldPrice: 2199,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "A minimal watch to complement your everyday look.",
        stock: 20,
    },
    {
        id: 8,
        name: "Premium Casual Shoes",
        category: "Shoes",
        price: 1999,
        oldPrice: 2599,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",
        badge: "SALE",
        description: "Everyday footwear designed with comfort in mind.",
        stock: 20,
    },
    {
        id: 9,
        name: "Essential Men's T-Shirt",
        category: "Men",
        price: 799,
        oldPrice: 999,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "A wardrobe essential with a clean, relaxed fit.",
        stock: 20,
    },
    {
        id: 10,
        name: "Women's Shoulder Bag",
        category: "Accessories",
        price: 1699,
        oldPrice: 2199,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
        badge: "NEW ARRIVAL",
        description: "A practical shoulder bag with an elegant design.",
        stock: 20,
    },
    {
        id: 11,
        name: "Elegant Women's Heels",
        category: "Shoes",
        price: 2299,
        oldPrice: 2899,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "Elegant footwear for a polished look.",
        stock: 20,
    },
    {
        id: 12,
        name: "Women's Casual Top",
        category: "Women",
        price: 1199,
        oldPrice: 1499,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85",
        badge: "",
        description: "An easy-to-style top for your everyday wardrobe.",
        stock: 20,
    },
];

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem("luxecartProducts");

            if (saved !== null) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (error) {
            console.error("Unable to load LuxeCart products:", error);
        }

        return initialProducts;
    });

    useEffect(() => {
        localStorage.setItem(
            "luxecartProducts",
            JSON.stringify(products)
        );
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
        };

        setProducts((previous) => [...previous, newProduct]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts((previous) =>
            previous.map((product) =>
                String(product.id) === String(updatedProduct.id)
                    ? { ...product, ...updatedProduct }
                    : product
            )
        );
    };

    const deleteProduct = (productId) => {
        setProducts((previous) =>
            previous.filter(
                (product) => String(product.id) !== String(productId)
            )
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error(
            "useProducts must be used inside ProductProvider"
        );
    }

    return context;
}
