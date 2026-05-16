
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import siteConfig from "./siteConfig";







import {
  FaMoon,
  FaSun,
  FaTrash,
  FaPlus,
  FaShoppingCart,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

Modal.setAppElement("#root");

export default function App() {
  document.documentElement.style.scrollBehavior =
  "smooth";
  const ADMIN_PASSWORD = "miled05";

  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });
  
const [showIntro, setShowIntro] = useState(true);

const [isMobile, setIsMobile] = useState(
  window.innerWidth < 768
);
const isMobile = true;
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener(
    "resize",
    handleResize
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}, []);



 

const [products, setProducts] = useState([



        {
          id: 1,
          name: "Espresso",
          price: 10,
          category: "Coffee",
          image:
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 2,
          name: "Latte Macchiato",
          price: 15,
          category: "Coffee",
          image:
            "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 3,
          name: "Cappuccino",
          price: 14,
          category: "Coffee",
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 4,
          name: "Blue Lagoon",
          price: 20,
          category: "Drink",
          image:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 5,
          name: "Ice Coffee",
          price: 16,
          category: "Drink",
          image:
           "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 6,
          name: "Chocolate Milkshake",
          price: 18,
          category: "Drink",
          image:
            "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 7,
          name: "Cheesecake",
          price: 17,
          category: "Dessert",
          image:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 8,
          name: "Brownie",
          price: 14,
          category: "Dessert",
          image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 9,
          name: "Croissant",
          price: 9,
          category: "Dessert",
          image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
        },

        {
          id: 10,
          name: "Classic Burger",
          price: 28,
          category: "Food",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
        },


]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);



useEffect(() => {
  const interval = setInterval(() => {
    const now = Date.now();

    const filteredOrders = orders.filter(
      (order) => now - order.createdAt < 24 * 60 * 60 * 1000
    );

    setOrders(filteredOrders);
  }, 60000);

  return () => clearInterval(interval);
}, [orders]);



  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      toast.success("Admin Connected 🔥");
    } else {
      toast.error("Wrong Password");
    }
  };

  const addToCart = (product) => {
    if (isAdmin) {
      toast.error("Admin cannot order");
      return;
    }

    setCart([...cart, product]);
    toast.success(`${product.name} added`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const addProduct = () => { if ( !newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image ) { toast.error("Complete all fields"); return; } const product = { id: Date.now(), name: newProduct.name, price: Number(newProduct.price), category: newProduct.category, image: newProduct.image, }; setProducts([...products, product]); setNewProduct({ name: "", price: "", category: "", image: "", }); setShowProductModal(false); toast.success("Product Added 🔥"); };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowProductModal(true);
  };

 const saveEdit = () => { const updatedProducts = products.map((p) => p.id === editingProduct.id ? { ...p, ...newProduct, price: Number(newProduct.price), } : p ); setProducts(updatedProducts); setEditingProduct(null); setShowProductModal(false); toast.success("Product Updated 🔥"); };

  
const placeOrder = () => {

if (
  !customerName ||
  !customerPhone ||
  !customerAddress
) {
  toast.error("Complete your information");
  return;
}

if (!/^[0-9]{8}$/.test(customerPhone)) {
  toast.error("Phone must contain 8 numbers");
  return;
}



  const today = new Date().toDateString();

  let lastDay = localStorage.getItem("orderDay");
  let orderNumber = Number(localStorage.getItem("orderNumber")) || 1;

  const now = new Date();
  const hour = now.getHours();

  // reset every day after 8am
  if (lastDay !== today && hour >= 8) {
    orderNumber = 1;
    localStorage.setItem("orderDay", today);
  }

  const order = {
    id: Date.now(),
    number: orderNumber,
    name: customerName,
    phone: customerPhone,
    address: customerAddress,
    products: cart,
    total,
    createdAt: Date.now(),
  };

  localStorage.setItem("orderNumber", orderNumber + 1);

  setOrders([...orders, order]);

  setCart([]);

  setCustomerName("");
  setCustomerPhone("");
  setCustomerAddress("");

  toast.success(`Commande #${order.number} envoyée 🔥`);
};



  const filteredProducts =
  filter === "All"
    ? products
    : products.filter(
        (p) =>
          p.category === filter &&
          p.name
            .toLowerCase()
            .includes(search.toLowerCase())
      );

  const card = dark
    ? "rgba(15,23,42,0.72)"
    : "rgba(255,255,255,0.9)";

  const text = dark ? "white" : "#0f172a";
  
const deleteOrder = (id) => {
  setOrders(orders.filter((o) => o.id !== id));
};



  

if (showIntro) {
  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
overflow: "hidden",
        
        position: "relative",

        backgroundImage:
`url('${siteConfig.introBackground}')`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "zoom 18s ease-in-out infinite",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: window.innerWidth < 768 ? "20px" : "80px",
        padding: window.innerWidth < 768 ? "20px" : "40px 70px",
flexDirection:
  window.innerWidth < 768 ? "column" : "row",
textAlign:
  window.innerWidth < 768 ? "center" : "left",
      }}
    >

      {/* DARK OVERLAY */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
"linear-gradient(to right, rgba(2,6,23,0.97), rgba(2,6,23,0.80), rgba(2,6,23,0.55))",
        }}
      />

      {/* LEFT SIDE */}

      <div
        style={{
  position: "relative",
  zIndex: 2,
  maxWidth: "700px",
  justifyContent: "center",
  width: "100%",
}}
      >

        {/* TOP BADGE */}

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",

            border:
              "1px solid rgba(59,130,246,0.6)",

            padding: "14px 28px",

            borderRadius: "999px",

            color: "#dbeafe",

            background:
              "rgba(30,41,59,0.35)",

            backdropFilter: "blur(10px)",

            boxShadow:
              "0 0 25px rgba(59,130,246,0.25)",

            letterSpacing: "3px",

            fontSize: "18px",
          }}
        >
          ✦ {siteConfig.tagline}
        </div>

        {/* TITLE */}

        <motion.h1
        initial={{ opacity: 0, y: 80 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1.4 }}
          style={{
            fontSize: window.innerWidth < 768 ? "48px" : "90px",
            lineHeight: "0.9",
            marginTop: "35px",
            color: "white",
            fontWeight: "700",

            textShadow:
              "0 0 45px rgba(59,130,246,0.35)",
          }}
        >
        {siteConfig.siteName.split(" ").map((word, index) => (
  <span key={index}>
    {word}
    <br />
  </span>
))}
        </motion.h1>

        {/* LINE */}

        <div
          style={{
            width: isMobile ? "100%" : "420px",
maxWidth: "100%" ,
            height: "1px",
            background:
              "rgba(96,165,250,0.3)",

            marginTop: "20px",
            marginBottom: "35px",
          }}
        />

        {/* TEXT */}

        <motion.p
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.6, delay: 0.3 }}
 style={{
  fontSize: siteConfig.introTextSize,
  lineHeight: siteConfig.introLineHeight,
  color: siteConfig.introTextColor,
  maxWidth: siteConfig.introMaxWidth,
  fontWeight: siteConfig.introFontWeight,

  marginTop: siteConfig.introMarginTop,
  marginLeft: siteConfig.introMarginLeft,

  letterSpacing: siteConfig.introLetterSpacing,

  textShadow:
    "0 0 35px rgba(96,165,250,0.35)",
}}
>
  {siteConfig.introText
    .split(" ")
    .map((word, index) => (
      <span
        key={index}
        style={{
          color:
            siteConfig.introHighlightWords.includes(
              word.replace(",", "").replace(".", "")
            )
              ? siteConfig.introHighlightColor
              : siteConfig.introTextColor,
        }}
      >
        {word}{" "}
      </span>
    ))}
</motion.p>
        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
flexDirection: isMobile ? "column" : "row",
gap: "20px",
marginTop: "35px",
          }}
        >

          
<motion.button
whileHover={{
  scale: 1.07,
  boxShadow: "0 0 45px rgba(59,130,246,0.9)",
}}
whileTap={{ scale: 0.95 }}

onClick={() => setShowIntro(false)}
  style={{
    padding: "20px 42px",
    borderRadius: "18px",
    border: "none",
    background: siteConfig.buttons.mainButtonColor,
    color: "white",
    fontSize: "20px",
    fontWeight: "700",
    boxShadow:
      "0 0 35px rgba(59,130,246,0.45)",
    cursor: "pointer",
  }}
>
 {siteConfig.buttons.mainButtonText}
</motion.button>



         
<button
  onClick={() =>
    window.open(
      "https://wa.me/21656601764?text=Hello%20CASA%20CAFÉ,%20I%20would%20like%20to%20book%20a%20table.",
      "_blank"
    )
  }
  style={{
    boxShadow:
"0 0 35px rgba(255,255,255,0.08)",

letterSpacing: "1px",
    padding: "20px 42px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.15)",
    cursor: "pointer",
    background: siteConfig.buttons.secondButtonColor,
    backdropFilter: "blur(12px)",
    color: "white",
    fontSize: "20px",
    fontWeight: "700",
    transition: "0.4s",
  }}
>
  {siteConfig.buttons.secondButtonText}
</button>


        </div>

        {/* STATS */}

        <div
  style={{
    display: "flex",
    gap: siteConfig.statsGap,
    marginTop: "50px",
    marginLeft: "-25px",
  }}
>
  {siteConfig.stats.map((item, index) => (
    <div
  key={index}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth:
  window.innerWidth < 768
    ? "100px"
    : "180px",
  }}
>
      <h1
        style={{
          color: item.color,
          fontSize: item.numberSize,
          margin: 0,
          marginBottom: "8px",
        }}
      >
        {item.number}
      </h1>

      <p
  style={{
    color: item.textColor,
    fontSize: item.textSize,
    marginTop: "5px",
  }}
>
        {item.text}
      </p>
    </div>
  ))}
</div>
      </div>
      
    </div>
  );
}




  return (
    <div
      style={{
        minHeight: "100dvh",
overflowX: "hidden",


       

backgroundImage: `
linear-gradient(
to right,
rgba(1,4,20,0.25),
rgba(5,15,40,0.35)
),

url("${siteConfig.homeBackground}")
`,

backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
backgroundAttachment: "fixed",
animation: "zoom 18s ease-in-out infinite",







        color: text,
        overflowX: "hidden",
      }}
    >
      <Toaster />

      {/* NAVBAR */}

      <nav
        style={{
          padding: "20px 6%",
         display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexDirection: isMobile ? "column" : "row",
gap: isMobile ? "15px" : "10px",
flexWrap: "wrap",
width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: "blur(12px)",
          background: "rgba(2,6,23,0.45)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          
          padding:
  window.innerWidth < 768
    ? "15px 4%"
    : "20px 6%",
          
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "28px" : "45px",
            color: "white",
            letterSpacing: "2px",
          }}
        >
          {siteConfig.siteName}
        </h1>

       
<div
  style={{
    display: "flex",
    gap: isMobile ? "8px" : "15px",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  }}
>

  <a href="#home" style={navLink}>Home</a>
  <a href="#menu" style={navLink}>Menu</a>
  <a href="#contact" style={navLink}>Contact</a>

  <div
    style={{
      background: "linear-gradient(135deg,#2563eb,#3b82f6)",
      padding: "12px 18px",
      borderRadius: "15px",
      color: "white",
    display: "flex",
              alignItems: "center",
              gap: "10px",
    }}
  >

              
            
          
            <FaShoppingCart />
            {cart.length}
          </div>

          <button onClick={() => setDark(!dark)} style={btn}>
            {dark ? <FaSun /> : <FaMoon />}
          </button>

          {!isAdmin ? (
            <button onClick={() => setShowLogin(true)} style={btn}>
              ADMIN
            </button>
          ) : (
            <button
              onClick={() => setIsAdmin(false)}
              style={{
                ...btn,
                background: "linear-gradient(135deg,#dc2626,#ef4444)",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* LOGIN */}

      <Modal
        isOpen={showLogin}
        onRequestClose={() => setShowLogin(false)}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "400px",
            inset: "unset",
            borderRadius: "25px",
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "30px",
          },
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, background: dark ? "rgba(15,23,42,0.8)" : "white", color: dark ? "white" : "#0f172a", }}
        />

        <button
          onClick={login}
          style={{ ...btn, width: "100%", marginTop: "20px" }}
        >
          LOGIN
        </button>
      </Modal>

      {/* HERO */}

      
<motion.section id="home"
initial={{ opacity: 0, y: 120, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1, }} transition={{ duration: 1.2, ease: "easeOut", }} viewport={{ once: false, amount: 0.2 }}

        style={{
          padding: "120px 6% 0px",
          minHeight: "100dvh",
          display: "flex",
alignItems: "center",
justifyContent: "center",
textAlign: isMobile ? "center" : "left",
padding: isMobile
  ? "140px 5% 40px"
  : "120px 6% 0px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: "700px" }}
        >
        
<div
  style={{
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.15)",
    border: "1px solid rgba(96,165,250,0.35)",
    color: "#bfdbfe",
    marginBottom: "30px",
    backdropFilter: "blur(12px)",
    letterSpacing: "3px",
    fontSize: "14px",
    textTransform: "uppercase",
    boxShadow: "0 0 25px rgba(59,130,246,0.25)",
  }}
>
  {siteConfig.tagline}
</div>


         
<h1
  style={{
    fontSize: isMobile ? "42px" : "100px",
textAlign: isMobile ? "center" : "left",
    lineHeight: 1,
    fontWeight: "900",
    textShadow: "0 0 30px rgba(59,130,246,0.4)",

    background:
      "linear-gradient(to right,#ffffff,#bfdbfe,#60a5fa)",

    WebkitBackgroundClip: "text",

    WebkitTextFillColor: "transparent",
  }}
>
 {siteConfig.siteName.split(" ").map((word, index) => (
  <span key={index}>
    {word}
    <br />
  </span>
))}
</h1>



          <p
            style={{
              marginTop: "25px",
              fontSize: "24px",
              color: "#dbeafe",
              maxWidth: "600px",
            }}
          >
            Luxury coffee, desserts and unforgettable vibes.
          </p>
        </motion.div>
      
</motion.section>


      {/* SEARCH */}

      <div style={{ padding: "0 6%" }}>
        <input
          placeholder="Search..."
          value={search}
          
          onChange={(e) => setSearch(e.target.value)}
         style={{ ...inputStyle, background: siteConfig.searchBarColor,color: siteConfig.searchTextColor, }}
         
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          {[
  "Coffee",
  "Drink",
  "Dessert",
  "Food",
].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                ...btn,
               background:
  filter === cat
    ? siteConfig.categoryActiveColor
    : siteConfig.categoryColor,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ADMIN */}

      {isAdmin && (
        <div style={{ padding: "0 6%", marginBottom: "50px" }}>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            style={btn}
          >
            <FaPlus /> Add Product
          </button>

          <h2 style={{ marginTop: "40px", color: "white" }}>
            Orders
          </h2>

          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: card,
                marginTop: "20px",
                padding: "25px",
                borderRadius: "25px",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              
<h3>
  Commande #{order.number} - {order.name}
</h3>


              <p>{order.phone}</p>
              <p>{order.address}</p>
              <p>{order.total} DT</p>
             
<button
  onClick={() => deleteOrder(order.id)}
  style={{
    ...btn,
    marginTop: "15px",
    background:
      "linear-gradient(135deg,#dc2626,#ef4444)",
  }}
>
  Delete Order
</button>


            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS */}

      
<motion.section id="menu"
initial={{ opacity: 0, y: 120, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1, }} transition={{ duration: 1.2, ease: "easeOut", }} viewport={{ once: false, amount: 0.2 }}


        style={{
  padding: isMobile
    ? "40px 5% 80px"
    : "0 6% 80px",

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "20px",

  width: "100%",
}}
      >
        {filteredProducts.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -10 }}
            style={{
              background: card,
              backdropFilter: "blur(12px)",
              borderRadius: "30px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
            }}
          >
            <img
              src={item.image}
              style={{
                width: "100%",
   height: isMobile ? "180px" : "300px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "25px" }}>
              <p style={{ color: "#60a5fa" }}>
                {item.category}
              </p>

              <h1>{item.name}</h1>

              <h2>{item.price} DT</h2>

              {!isAdmin && (
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    ...btn,
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  Add To Cart
                </button>
              )}

              {isAdmin && (
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    style={btn}
                    onClick={() => editProduct(item)}
                  >
                    EDIT
                  </button>

                  <button
                    onClick={() => deleteProduct(item.id)}
                    style={{
                      ...btn,
                      background:
                        "linear-gradient(135deg,#dc2626,#ef4444)",
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        ))}
        

        
{/* PRODUCT MODAL */}

<Modal
  isOpen={showProductModal}
  onRequestClose={() => setShowProductModal(false)}
  style={{
    overlay: {
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    },

    content: {
      width: "450px",
      inset: "unset",
      borderRadius: "25px",
      background: "#0f172a",
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "30px",
    },
  }}
>
  <h1
    style={{
      color: "white",
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    {editingProduct ? "Edit Product" : "Add Product"}
  </h1>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <input
      placeholder="Name"
      value={newProduct.name}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          name: e.target.value,
        })
      }
      style={inputStyle}
    />

    <input
      placeholder="Price"
      value={newProduct.price}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          price: e.target.value,
        })
      }
      style={inputStyle}
    />

    <input
      placeholder="Category"
      value={newProduct.category}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          category: e.target.value,
        })
      }
      style={inputStyle}
    />

    <input
      placeholder="Image URL"
      value={newProduct.image}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          image: e.target.value,
        })
      }
      style={inputStyle}
    />

    <button
      type="button"
      style={{
        ...btn,
        width: "100%",
        marginTop: "10px",
      }}
      onClick={() => {
        if (editingProduct) {
          saveEdit();
        } else {
          addProduct();
        }
      }}
    >
      {editingProduct ? "SAVE EDIT" : "ADD PRODUCT"}
    </button>
  </div>
</Modal>


      </motion.section>


      {/* CART */}

      {!isAdmin && (
        <motion.section 
        initial={{ opacity: 0, y: 120, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1, }} transition={{ duration: 1.2, ease: "easeOut", }} viewport={{ once: false, amount: 0.2 }}
         style={{ padding: "0 6% 100px" }}>
          <div
            style={{
              background: card,
              padding: "40px",
              borderRadius: "30px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h1>Shopping Cart</h1>

            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <p>
                  {item.name} - {item.price} DT
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    ...btn,
                    background:
                      "linear-gradient(135deg,#dc2626,#ef4444)",
                  }}
                >
                  ❌
                </button>
              </div>
            ))}

            <h2 style={{ marginTop: "25px" }}>
              Total : {total} DT
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "30px",
              }}
            >
              <input
                placeholder="Votre nom"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
               style={{ ...inputStyle, background: dark ? "rgba(15,23,42,0.8)" : "white", color: dark ? "white" : "#0f172a", }}
              />

              <input
                placeholder="Téléphone"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(e.target.value)
                }
                style={{ ...inputStyle, background: dark ? "rgba(15,23,42,0.8)" : "white", color: dark ? "white" : "#0f172a", }}
              />

              <input
                placeholder="Adresse"
                value={customerAddress}
                onChange={(e) =>
                  setCustomerAddress(e.target.value)
                }
                style={{ ...inputStyle, background: dark ? "rgba(15,23,42,0.8)" : "white", color: dark ? "white" : "#0f172a", }}
              />

              <button onClick={placeOrder} style={btn}>
                Commander
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* CONTACT */}

    <motion.section id="contact"
    initial={{ opacity: 1, y: 120, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1, }} transition={{ duration: 1.2, ease: "easeOut", }} viewport={{ once: false, amount: 0.2 }}
        style={{
          padding:
  isMobile
    ? "50px 4%"
    : "80px 6%",
          background: "rgba(2,6,23,0.55)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px",
            
fontSize: isMobile ? "34px" : "50px",
color: "white",
textShadow: "0 0 25px rgba(59,130,246,0.5)",


          }}
        >
          Contact Us
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          <div style={contactCard}>
            <FaInstagram size={35} />
            <h2>Instagram</h2>
           <p>{siteConfig.instagram}</p>
          </div>

          <div style={contactCard}>
            <FaWhatsapp size={35} />
            <h2>WhatsApp</h2>
            <p>{siteConfig.phone}</p>
          </div>

          <div style={contactCard}>
            <FaPhone size={35} />
            <h2>Phone</h2>
            <p>{siteConfig.phone}</p>
          </div>

          <div style={contactCard}>
            <FaMapMarkerAlt size={35} />
            <h2>Location</h2>
            <p>{siteConfig.location}</p>
          </div>

          <div style={contactCard}>
            <FaClock size={35} />
            <h2>Opening Hours</h2>
            <p>08:00 → 00:00</p>
          </div>
        </div>
      </motion.section>
      
    </div>
  );
}

const btn = {
  padding: window.innerWidth < 768
    ? "10px 14px"
    : "14px 25px",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: siteConfig.navButtonColor,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 25px rgba(59,130,246,0.35)",
};

const inputStyle = {
  width: "100%",
  height: "55px",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(15,23,42,0.8)",
  color: "white",
  padding: "0 20px",
  fontSize: "16px",
  outline: "none",
};


const contactCard = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "25px",
  padding: "35px",
  textAlign: "center",
  color: "white",

  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",

  backdropFilter: "blur(10px)",
};



const navLink = {
  color: siteConfig.navTextColor,
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "18px",


  
};

