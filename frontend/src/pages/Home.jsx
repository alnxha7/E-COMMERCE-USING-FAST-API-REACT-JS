import { useState, useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,900;1,400;1,600&family=Montserrat:wght@200;300;400;500;600&display=swap');`;

// ── Real Unsplash clothing images ──
const HERO_IMG = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop";
const HERO_SIDE_1 = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80&fit=crop";
const HERO_SIDE_2 = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80&fit=crop";

const products = [
  { id:1, name:"The Drape Coat", price:"$389", originalPrice:"$520", tag:"New", colors:["#2C2C2C","#8B5E3C","#4A3728"], sizes:["XS","S","M","L"], accent:"#8B5E3C", desc:"Oversized structured wool blend",
    img:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&fit=crop&crop=top" },
  { id:2, name:"Linen Column Dress", price:"$218", tag:"Bestseller", colors:["#D4C5B0","#1a1a1a","#8B6347"], sizes:["XS","S","M","L","XL"], accent:"#C9783A", desc:"Floor-length woven linen",
    img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80&fit=crop&crop=top" },
  { id:3, name:"Tapered Cargo Trouser", price:"$165", tag:"Limited", colors:["#3D3D3D","#6B5B45","#8B8B6B"], sizes:["S","M","L","XL"], accent:"#6B5B45", desc:"Relaxed fit utility pants",
    img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80&fit=crop&crop=top" },
  { id:4, name:"Silk Bias Slip", price:"$295", tag:"Exclusive", colors:["#C4A882","#1C1C2E","#8B3A3A"], sizes:["XS","S","M","L"], accent:"#B87333", desc:"100% mulberry silk cut-on-bias",
    img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&fit=crop&crop=top" },
  { id:5, name:"Oversized Blazer", price:"$340", tag:"New", colors:["#2C2C2C","#D4C5B0","#5C4A32"], sizes:["S","M","L"], accent:"#5C4A32", desc:"Unstructured Italian wool",
    img:"https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&q=80&fit=crop&crop=top" },
  { id:6, name:"Knit Wrap Cardigan", price:"$198", tag:"Cozy Edit", colors:["#C9B8A0","#4A3728","#8B7355"], sizes:["XS","S","M","L","XL"], accent:"#9B7B5A", desc:"Chunky rib hand-finished knit",
    img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80&fit=crop&crop=top" },
];

const collections = [
  { name:"The Atelier Edit", sub:"Precision tailoring for the modern form", count:"24 Pieces", light:true,
    img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop" },
  { name:"Raw & Relaxed", sub:"Effortless silhouettes, lived-in luxury", count:"18 Pieces", light:false,
    img:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop" },
  { name:"Noir Season", sub:"After-dark dressing, redefined", count:"15 Pieces", light:true,
    img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop" },
];

const looks = [
  { title:"Look 01", sub:"The Power Silhouette", items:["Drape Coat","Column Dress","Leather Mule"],
    img:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80&fit=crop&crop=top" },
  { title:"Look 02", sub:"Weekend Softness", items:["Knit Cardigan","Cargo Trouser","Canvas Tote"],
    img:"https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80&fit=crop&crop=top" },
  { title:"Look 03", sub:"Evening Undress", items:["Silk Bias Slip","Blazer Overlay","Strappy Heel"],
    img:"https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&q=80&fit=crop&crop=top" },
];

const RustiqueLogo = ({ dark = false, size = 44}) => {
  const c = dark ? "#1a1a1a" : "#fff";
  const a = dark ? "#b87333" : "#d4a96a";
  return (
    <svg width={size * 3.8} height={size * 0.72} viewBox="0 0 200 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="200" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={dark ? "#8B5E3C" : "#f0c87a"} />
        </linearGradient>
      </defs>
      <line x1="2" y1="26" x2="22" y2="26" stroke="url(#lg1)" strokeWidth="0.8" />
      <circle cx="22" cy="26" r="3" fill="none" stroke="url(#lg1)" strokeWidth="0.8" />
      <circle cx="22" cy="26" r="1" fill="url(#lg1)" />
      <text x="32" y="36" fontFamily="'Bodoni Moda', serif" fontSize="26" fontWeight="900" letterSpacing="8" fill={c}>RUSTIQUE</text>
      <line x1="32" y1="42" x2="168" y2="42" stroke="url(#lg1)" strokeWidth="0.6" />
      <polygon points="100,46 103,49 100,52 97,49" fill="url(#lg1)" />
      <circle cx="178" cy="26" r="3" fill="none" stroke="url(#lg1)" strokeWidth="0.8" />
      <circle cx="178" cy="26" r="1" fill="url(#lg1)" />
      <line x1="178" y1="26" x2="198" y2="26" stroke="url(#lg1)" strokeWidth="0.8" />
    </svg>
  );
};

// ── Login Modal ──
function LoginModal({ onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields"
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address"
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {

        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been registered successfully.",
          confirmButtonColor: "#000"
        }).then(() => {
          setMode('login');
          setPassword("")
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.detail || "Something went wrong"
        });

      }

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to connect to server"
      });
    }
  };

  const handleLogin = async() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields"
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address"
      });
      return;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/dashboard')
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.detail || "Something went wrong"
        });
      }

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error
      });
    }
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={onClose}>
      {/* Backdrop */}
      <div style={{ position:"absolute", inset:0, background:"rgba(13,11,9,0.82)", backdropFilter:"blur(8px)" }} />
      {/* Modal */}
      <div style={{ position:"relative", width:"100%", maxWidth:460, margin:"0 20px",
        background:"#FAFAF8", borderRadius:4, overflow:"hidden",
        boxShadow:"0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,115,51,0.15)",
        animation:"modalIn 0.45s cubic-bezier(.16,1,.3,1) both" }}
        onClick={e => e.stopPropagation()}>
        {/* Top accent bar */}
        <div style={{ height:3, background:"linear-gradient(90deg,#b87333,#d4a96a,#8B5E3C)" }} />
        {/* Close */}
        <button onClick={onClose} style={{ position:"absolute", top:18, right:18, background:"none", border:"none",
          cursor:"pointer", fontSize:18, color:"#999", lineHeight:1, padding:4 }}>✕</button>

        <div style={{ padding:"44px 48px 48px" }}>
          {/* Logo */}
          <div style={{ marginBottom:32, display:"flex", justifyContent:"center" }}>
            <RustiqueLogo dark size={32} />
          </div>

          {/* Tab switcher */}
          <div style={{ display:"flex", borderBottom:"1px solid #E8E0D8", marginBottom:36 }}>
            {["login","signup"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{ flex:1, padding:"10px 0", background:"none", border:"none",
                  fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:3,
                  textTransform:"uppercase", cursor:"pointer", fontWeight: mode===m ? 600 : 400,
                  color: mode===m ? "#1a1a1a" : "#aaa",
                  borderBottom: mode===m ? "2px solid #b87333" : "2px solid transparent",
                  marginBottom:-1, transition:"all 0.25s" }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {mode === "signup" && (
              <div>
                <label style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:2,
                  textTransform:"uppercase", color:"#888", display:"block", marginBottom:6 }}>Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                  style={{ width:"100%", padding:"14px 16px", border:"1px solid #DDD8D0",
                    background:"#FDFCFA", fontFamily:"'Montserrat',sans-serif", fontSize:13,
                    color:"#1a1a1a", outline:"none", borderRadius:2, transition:"border 0.2s" }}
                  onFocus={e => e.target.style.borderColor="#b87333"}
                  onBlur={e => e.target.style.borderColor="#DDD8D0"} />
              </div>
            )}
            <div>
              <label style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:2,
                textTransform:"uppercase", color:"#888", display:"block", marginBottom:6 }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                style={{ width:"100%", padding:"14px 16px", border:"1px solid #DDD8D0",
                  background:"#FDFCFA", fontFamily:"'Montserrat',sans-serif", fontSize:13,
                  color:"#1a1a1a", outline:"none", borderRadius:2, transition:"border 0.2s" }}
                onFocus={e => e.target.style.borderColor="#b87333"}
                onBlur={e => e.target.style.borderColor="#DDD8D0"} />
            </div>
            <div>
              <label style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:2,
                textTransform:"uppercase", color:"#888", display:"block", marginBottom:6 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={{ width:"100%", padding:"14px 16px", border:"1px solid #DDD8D0",
                  background:"#FDFCFA", fontFamily:"'Montserrat',sans-serif", fontSize:13,
                  color:"#1a1a1a", outline:"none", borderRadius:2, transition:"border 0.2s" }}
                onFocus={e => e.target.style.borderColor="#b87333"}
                onBlur={e => e.target.style.borderColor="#DDD8D0"} />
            </div>
            {mode === "login" && (
              <div style={{ textAlign:"right", marginTop:-8 }}>
                <a href="#" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:"#b87333",
                  textDecoration:"none", letterSpacing:0.5 }}>Forgot password?</a>
              </div>
            )}
            <button style={{ marginTop:8, background:"linear-gradient(135deg,#b87333 0%,#d4a96a 50%,#8B5E3C 100%)",
              color:"white", border:"none", padding:"16px", fontFamily:"'Montserrat',sans-serif",
              fontSize:10, fontWeight:600, letterSpacing:3, textTransform:"uppercase",
              cursor:"pointer", borderRadius:2, transition:"all 0.3s",
              boxShadow:"0 4px 20px rgba(184,115,51,0.3)" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(184,115,51,0.45)"; }}
              onClick={mode === "login" ? handleLogin : handleSignup}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(184,115,51,0.3)"; }}>
              {mode === "login" ? "Sign In to Rustique" : "Create My Account"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:14, margin:"24px 0" }}>
            <div style={{ flex:1, height:1, background:"#EEE" }} />
            <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:"#bbb", letterSpacing:2 }}>OR</span>
            <div style={{ flex:1, height:1, background:"#EEE" }} />
          </div>

          {/* Social login */}
          <div style={{ display:"flex", gap:10 }}>
            {[["G","Continue with Google","#4285F4"],["f","Continue with Facebook","#1877F2"]].map(([icon,label,col])=>(
              <button key={icon} style={{ flex:1, padding:"12px", border:"1px solid #E0D8D0",
                background:"white", fontFamily:"'Montserrat',sans-serif", fontSize:10,
                letterSpacing:1, color:"#444", cursor:"pointer", borderRadius:2,
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#b87333"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#E0D8D0"}>
                <span style={{ fontWeight:700, color:col, fontSize:14 }}>{icon}</span>
                <span style={{ fontSize:9 }}>{label.split(" ").slice(-1)[0]}</span>
              </button>
            ))}
          </div>

          <p style={{ textAlign:"center", fontFamily:"'Montserrat',sans-serif", fontSize:10,
            color:"#bbb", marginTop:28, lineHeight:1.6, letterSpacing:0.3 }}>
            By continuing, you agree to Rustique's{" "}
            <a href="#" style={{ color:"#b87333", textDecoration:"none" }}>Terms</a> &{" "}
            <a href="#" style={{ color:"#b87333", textDecoration:"none" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RustiquePage() {
  const [scrollY, setScrollY] = useState(0);
  const [cart, setCart] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedId, setAddedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);

  const banners = ["FREE SHIPPING ON ORDERS OVER $150", "NEW ARRIVALS: THE ATELIER EDIT", "COMPLIMENTARY GIFT WRAPPING ON ALL ORDERS"];

  useEffect(() => {
    const s = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 3000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showLogin]);

  const addToCart = (p) => { setCart(c => [...c, p]); setAddedId(p.id); setTimeout(() => setAddedId(null), 1500); };
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const filters = ["All", "New", "Bestseller", "Limited", "Exclusive"];
  const filtered = activeFilter === "All" ? products : products.filter(p => p.tag === activeFilter);
  const navScrolled = scrollY > 80;

  return (
    <div style={{ fontFamily:"'Montserrat',sans-serif", background:"#FAFAF8", color:"#1a1a1a", overflowX:"hidden" }}>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#FAFAF8; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#b87333,#5C3D1E); border-radius:2px; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes scaleIn { from{transform:scale(0.92);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes modalIn { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        .fade-up-1 { animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.35s both; }
        .fade-up-4 { animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.5s both; }
        .fade-up-5 { animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.65s both; }

        .product-card { transition:transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.5s ease; }
        .product-card:hover { transform:translateY(-10px); box-shadow:0 28px 60px rgba(0,0,0,0.13) !important; }
        .product-img { transition: transform 0.7s ease; }
        .product-card:hover .product-img { transform: scale(1.06); }

        .size-btn { transition:all 0.2s ease; cursor:pointer; border:1px solid #D0C8BE; background:transparent; padding:5px 10px; font-family:'Montserrat',sans-serif; font-size:10px; letter-spacing:1px; color:#666; }
        .size-btn:hover, .size-btn.sz-active { background:#1a1a1a; color:#fff; border-color:#1a1a1a; }

        .color-dot { width:16px; height:16px; border-radius:50%; cursor:pointer; transition:transform 0.2s, box-shadow 0.2s; border:2px solid transparent; }
        .color-dot:hover { transform:scale(1.2); }
        .color-dot.col-active { border-color:#1a1a1a; transform:scale(1.15); box-shadow:0 0 0 2px white, 0 0 0 4px #1a1a1a; }

        .btn-dark { background:#1a1a1a; color:#fff; border:none; padding:14px 36px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; cursor:pointer; transition:all 0.3s ease; }
        .btn-dark:hover { background:#3D2B1F; transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.2); }

        .btn-ghost { background:transparent; color:#1a1a1a; border:1px solid #1a1a1a; padding:13px 34px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; letter-spacing:3px; text-transform:uppercase; cursor:pointer; transition:all 0.3s ease; }
        .btn-ghost:hover { background:#1a1a1a; color:#fff; }

        .btn-gold { background:linear-gradient(135deg,#b87333 0%,#d4a96a 50%,#8B5E3C 100%); background-size:200% auto; color:#fff; border:none; padding:14px 36px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; cursor:pointer; transition:all 0.4s ease; }
        .btn-gold:hover { background-position:right center; box-shadow:0 8px 28px rgba(184,115,51,0.4); transform:translateY(-2px); }

        .btn-login { background:#b87333; color:rgba(255,255,255,0.88); border:1px solid rgba(255,255,255,0.28); padding:8px 20px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; transition:all 0.3s ease; border-radius:2px; }
        .btn-login:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.5); }
        .btn-login-dark { background:transparent; color:#1a1a1a; border:1px solid rgba(0,0,0,0.25); padding:8px 20px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; transition:all 0.3s ease; border-radius:2px; }
        .btn-login-dark:hover { background:#1a1a1a; color:#fff; }

        .nav-link { font-size:11px; letter-spacing:2.5px; text-transform:uppercase; font-weight:400; text-decoration:none; cursor:pointer; transition:color 0.3s; background:none; border:none; }
        .filter-pill { font-family:'Montserrat',sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; padding:8px 20px; border:1px solid #D0C8BE; background:transparent; cursor:pointer; transition:all 0.25s ease; color:#666; }
        .filter-pill:hover, .filter-pill.fp-active { background:#1a1a1a; color:#fff; border-color:#1a1a1a; }

        .collection-card { transition:transform 0.5s ease, box-shadow 0.5s ease; cursor:pointer; overflow:hidden; }
        .collection-card:hover { transform:scale(1.02); box-shadow:0 30px 70px rgba(0,0,0,0.25) !important; }
        .collection-card:hover .coll-img { transform:scale(1.06); }
        .coll-img { transition: transform 0.7s ease; width:100%; height:100%; object-fit:cover; display:block; }

        .look-card { transition:all 0.4s ease; }
        .look-card:hover { transform:translateY(-8px); }
        .look-card:hover .look-img { transform:scale(1.06); }
        .look-img { transition: transform 0.7s ease; width:100%; height:100%; object-fit:cover; object-position:top; display:block; }

        .tag-chip { display:inline-block; font-family:'Montserrat',sans-serif; font-size:9px; font-weight:600; letter-spacing:2px; text-transform:uppercase; padding:3px 10px; }
        .wishlist-btn { background:none; border:none; cursor:pointer; font-size:19px; transition:transform 0.2s; }
        .wishlist-btn:hover { transform:scale(1.2); }
        .quick-add-overlay { transition:transform 0.4s ease; }
        .nav-icon-btn { background:none; border:none; cursor:pointer; font-size:17px; transition:transform 0.2s; }
        .nav-icon-btn:hover { transform:scale(1.15); }
        .hero-img-frame { border-radius:120px 120px 60px 60px; overflow:hidden; width:100%; height:100%; }
        .hero-img-frame img { width:100%; height:100%; object-fit:cover; object-position:top; }
      `}</style>

      {/* ── LOGIN MODAL ── */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div style={{ background:"#1a1a1a", padding:"10px 0", textAlign:"center", overflow:"hidden", position:"fixed", top:0, left:0, right:0, zIndex:200 }}>
        <div key={bannerIdx} style={{ animation:"slideDown 0.5s ease both", fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:4, color:"#d4a96a", textTransform:"uppercase" }}>
          {banners[bannerIdx]}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:38, left:0, right:0, zIndex:100,
        padding: navScrolled ? "14px 48px" : "22px 48px",
        background: navScrolled ? "rgba(250,250,248,0.97)" : "transparent",
        backdropFilter: navScrolled ? "blur(16px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
        transition:"all 0.45s ease",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        {/* Left nav */}
        <div style={{ display:"flex", gap:36, alignItems:"center" }}>
          {["New In","Collections","Sale"].map(l => (
            <button key={l} className="nav-link" style={{ color: navScrolled ? "#1a1a1a" : "rgba(255,255,255,0.88)" }}
              onMouseEnter={e => e.target.style.color="#b87333"}
              onMouseLeave={e => e.target.style.color = navScrolled ? "#1a1a1a" : "rgba(255,255,255,0.88)"}
            >{l}</button>
          ))}
        </div>

        {/* Logo center */}
        <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)" }}>
          <RustiqueLogo dark={navScrolled} size={40} />
        </div>

        {/* Right icons */}
        <div style={{ display:"flex", gap:18, alignItems:"center" }}>
          <button className="nav-icon-btn" style={{ color: navScrolled ? "#1a1a1a" : "rgba(255,255,255,0.88)" }}>🔍</button>
          <button className="nav-icon-btn" style={{ color: navScrolled ? "#1a1a1a" : "rgba(255,255,255,0.88)" }}>♡</button>
          <div style={{ position:"relative" }}>
            <button className="nav-icon-btn" style={{ color: navScrolled ? "#1a1a1a" : "rgba(255,255,255,0.88)" }}>🛍</button>
            {cart.length > 0 && (
              <div style={{ position:"absolute", top:-7, right:-7, width:17, height:17, background:"#b87333", borderRadius:"50%", color:"white", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Montserrat',sans-serif", animation:"scaleIn 0.3s ease" }}>
                {cart.length}
              </div>
            )}
          </div>
          {/* ── LOGIN BUTTON ── */}
          <button
            onClick={() => setShowLogin(true)}
            className={navScrolled ? "btn-login-dark" : "btn-login"}
            style={{ marginLeft:6 }}>
            {loggedIn ? "My Account" : "Sign In"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        height:"100vh", minHeight:680, marginTop:38,
        background:"linear-gradient(160deg,#0D0B09 0%,#1F140C 40%,#2C1810 70%,#0D0B09 100%)",
        position:"relative", display:"flex", alignItems:"center", overflow:"hidden",
      }}>
        {/* Grain */}
        <div style={{ position:"absolute", inset:0, opacity:0.03, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:0, left:"55%", width:1, height:"100%", background:"linear-gradient(transparent,rgba(184,115,51,0.25),transparent)" }} />
        <div style={{ position:"absolute", right:"5%", top:"10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(184,115,51,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* Right: Real clothing images */}
        <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:20, alignItems:"flex-end" }}>
          {/* Main hero image */}
          <div style={{ width:300, height:400, animation:"float 7s ease-in-out infinite",
            boxShadow:"0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,115,51,0.15)" }}>
            <div className="hero-img-frame">
              <img src={HERO_IMG} alt="Featured Look" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
            </div>
          </div>
          {/* Collection badge */}
          <div style={{ position:"absolute", bottom:80, left:-30, background:"rgba(13,11,9,0.75)", backdropFilter:"blur(14px)", border:"1px solid rgba(184,115,51,0.25)", padding:"12px 18px", borderRadius:2, zIndex:2 }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:3, color:"#d4a96a", textTransform:"uppercase" }}>Atelier Collection '25</div>
          </div>
          {/* Side mini images */}
          <div style={{ display:"flex", gap:12 }}>
            {[HERO_SIDE_1, HERO_SIDE_2].map((src, i) => (
              <div key={i} style={{ width:100, height:126, borderRadius:"40px 40px 20px 20px", overflow:"hidden",
                border:"1px solid rgba(184,115,51,0.18)",
                animation:`float ${6+i}s ease-in-out ${i*1.5}s infinite`,
                boxShadow:"0 16px 40px rgba(0,0,0,0.4)" }}>
                <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ position:"relative", zIndex:2, padding:"0 0 0 8%", maxWidth:580, transform:`translateY(${scrollY * -0.07}px)` }}>
          <div className="fade-up-1" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:6, color:"#b87333", textTransform:"uppercase", marginBottom:22, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ width:32, height:1, background:"#b87333", display:"inline-block" }} />
            New Season · Spring 2025
          </div>
          <h1 className="fade-up-2" style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(58px,7vw,100px)", fontWeight:900, lineHeight:0.92, color:"#FAFAF8", marginBottom:32, letterSpacing:-2 }}>
            Wear<br /><span style={{ fontStyle:"italic", color:"#d4a96a" }}>the</span><br />Story
          </h1>
          <p className="fade-up-3" style={{ fontFamily:"'Bodoni Moda',serif", fontStyle:"italic", fontSize:18, color:"rgba(250,250,248,0.5)", lineHeight:1.75, marginBottom:44, maxWidth:400 }}>
            Clothing that carries history in every thread — designed for those who live with intention and dress with meaning.
          </p>
          <div className="fade-up-4" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <button className="btn-gold">Shop New In</button>
            <button className="btn-ghost" style={{ color:"rgba(255,255,255,0.7)", borderColor:"rgba(255,255,255,0.22)" }}>View Lookbook</button>
          </div>
          <div className="fade-up-5" style={{ display:"flex", gap:40, marginTop:60, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            {[["12K+","Happy Customers"],["98%","5-Star Reviews"],["30","Countries Shipped"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:28, fontWeight:700, color:"#d4a96a" }}>{v}</div>
                <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:2, color:"rgba(250,250,248,0.3)", textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:4, color:"rgba(250,250,248,0.22)", textTransform:"uppercase" }}>Scroll</div>
          <div style={{ width:1, height:44, background:"linear-gradient(#b87333,transparent)" }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:"#1a1a1a", padding:"16px 0", overflow:"hidden", borderTop:"1px solid rgba(184,115,51,0.15)", borderBottom:"1px solid rgba(184,115,51,0.15)" }}>
        <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 22s linear infinite" }}>
          {[...Array(6)].map((_,i) => (
            <div key={i} style={{ display:"flex", gap:60, alignItems:"center", paddingRight:60 }}>
              {["The Atelier Edit","◆","Raw & Relaxed","◆","Noir Season","◆","Spring '25","◆","New Arrivals","◆"].map((t,j) => (
                <span key={j} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color: t==="◆" ? "#b87333" : "rgba(255,255,255,0.4)" }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section style={{ padding:"110px 5%", background:"#FAFAF8" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:5, color:"#b87333", textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
            <span style={{ width:40, height:1, background:"#b87333", display:"inline-block" }} />
            Shop by Collection
            <span style={{ width:40, height:1, background:"#b87333", display:"inline-block" }} />
          </div>
          <h2 style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(36px,4vw,58px)", fontWeight:900, color:"#1a1a1a", letterSpacing:-1 }}>
            Curated <span style={{ fontStyle:"italic", color:"#b87333" }}>Worlds</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:16, maxWidth:1200, margin:"0 auto" }}>
          {collections.map((col, i) => (
            <div key={col.name} className="collection-card"
              style={{ borderRadius:4, position:"relative", height: i===0 ? 540 : 260,
                overflow:"hidden", boxShadow:"0 8px 30px rgba(0,0,0,0.12)" }}>
              <img className="coll-img" src={col.img} alt={col.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background: i===0 ? "linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 60%)" : "linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.05) 70%)" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:28, zIndex:2 }}>
                <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:6 }}>{col.count}</div>
                <div style={{ fontFamily:"'Bodoni Moda',serif", fontWeight:700, fontSize: i===0?28:20, color:"#FAFAF8", marginBottom:4 }}>{col.name}</div>
                <div style={{ fontFamily:"'Bodoni Moda',serif", fontStyle:"italic", fontSize:13, color:"rgba(255,255,255,0.55)" }}>{col.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ padding:"80px 5% 110px", background:"#F4F0EB" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", maxWidth:1200, margin:"0 auto 50px", flexWrap:"wrap", gap:20 }}>
          <div>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:5, color:"#b87333", textTransform:"uppercase", marginBottom:12, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ width:32, height:1, background:"#b87333", display:"inline-block" }} />
              Our Pieces
            </div>
            <h2 style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(32px,3.5vw,52px)", fontWeight:900, letterSpacing:-1, color:"#1a1a1a" }}>
              The <span style={{ fontStyle:"italic", color:"#b87333" }}>Edit</span>
            </h2>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {filters.map(f => (
              <button key={f} className={`filter-pill ${activeFilter===f?"fp-active":""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24, maxWidth:1200, margin:"0 auto" }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="product-card"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ background:"#fff", borderRadius:4, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.07)", animation:`fadeUp 0.7s ease ${i*0.08}s both`, border:"1px solid rgba(0,0,0,0.05)" }}>

              {/* Product image */}
              <div style={{ height:320, position:"relative", overflow:"hidden", background:"#F5F0EB" }}>
                <img className="product-img" src={p.img} alt={p.name}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
                {/* Tag */}
                <div style={{ position:"absolute", top:14, left:14, zIndex:2 }}>
                  <span className="tag-chip" style={{ background:p.accent, color:"white" }}>{p.tag}</span>
                </div>
                {/* Wishlist */}
                <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}
                  style={{ position:"absolute", top:12, right:14, zIndex:2,
                    background:"rgba(255,255,255,0.85)", borderRadius:"50%", width:34, height:34,
                    display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)" }}>
                  {wishlist.includes(p.id) ? "❤️" : "🤍"}
                </button>
                {/* Quick add hover overlay */}
                <div className="quick-add-overlay" style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(26,26,26,0.88)", backdropFilter:"blur(4px)", padding:"14px 20px", transform: hoveredId===p.id ? "translateY(0)":"translateY(100%)" }}>
                  <button onClick={() => addToCart(p)}
                    style={{ background:"none", border:"1px solid rgba(212,169,106,0.6)", color:"#d4a96a", padding:"9px 28px", fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", cursor:"pointer", width:"100%", transition:"all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.background="#d4a96a"; e.currentTarget.style.color="#1a1a1a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="#d4a96a"; }}>
                    {addedId===p.id ? "✓ Added to Bag" : "Quick Add"}
                  </button>
                </div>
              </div>

              {/* Product info */}
              <div style={{ padding:"20px 22px 24px" }}>
                <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:2, color:"#9B8778", textTransform:"uppercase", marginBottom:5 }}>{p.desc}</div>
                <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:18, fontWeight:600, color:"#1a1a1a", marginBottom:14 }}>{p.name}</div>
                <div style={{ display:"flex", gap:8, marginBottom:12, alignItems:"center" }}>
                  {p.colors.map((c, ci) => (
                    <div key={ci} className={`color-dot ${selectedColors[p.id]===ci?"col-active":""}`}
                      style={{ background:c }}
                      onClick={() => setSelectedColors(s => ({...s, [p.id]:ci}))} />
                  ))}
                </div>
                <div style={{ display:"flex", gap:5, marginBottom:16, flexWrap:"wrap" }}>
                  {p.sizes.map(sz => (
                    <button key={sz} className={`size-btn ${selectedSizes[p.id]===sz?"sz-active":""}`}
                      onClick={() => setSelectedSizes(s => ({...s, [p.id]:sz}))}>{sz}</button>
                  ))}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", gap:10, alignItems:"baseline" }}>
                    <span style={{ fontFamily:"'Bodoni Moda',serif", fontSize:22, fontWeight:700, color:p.accent }}>{p.price}</span>
                    {p.originalPrice && <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, color:"#bbb", textDecoration:"line-through" }}>{p.originalPrice}</span>}
                  </div>
                  <button className="btn-dark" style={{ padding:"10px 22px", fontSize:9 }} onClick={() => addToCart(p)}>
                    {addedId===p.id ? "✓ Added" : "Add to Bag"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:60 }}>
          <button className="btn-ghost">View All Pieces</button>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section style={{ padding:"110px 5%", background:"linear-gradient(160deg,#12090A 0%,#1F140C 50%,#0D0B09 100%)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ textAlign:"center", marginBottom:70 }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:5, color:"#b87333", textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
              <span style={{ width:40, height:1, background:"#b87333", display:"inline-block" }} />
              Spring '25 Lookbook
              <span style={{ width:40, height:1, background:"#b87333", display:"inline-block" }} />
            </div>
            <h2 style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(32px,4vw,58px)", fontWeight:900, color:"#FAFAF8", letterSpacing:-1 }}>
              How to <span style={{ fontStyle:"italic", color:"#d4a96a" }}>Wear</span> Rustique
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20, maxWidth:1100, margin:"0 auto 60px" }}>
            {looks.map((look, i) => (
              <div key={look.title} className="look-card"
                style={{ border:"1px solid rgba(184,115,51,0.15)", borderRadius:4, overflow:"hidden", background:"rgba(0,0,0,0.2)", animation:`fadeUp 0.8s ease ${i*0.12}s both` }}>
                {/* Real photo */}
                <div style={{ height:340, overflow:"hidden", position:"relative" }}>
                  <img className="look-img" src={look.img} alt={look.sub} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)" }} />
                </div>
                <div style={{ padding:28 }}>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:3, color:"#b87333", textTransform:"uppercase", marginBottom:8 }}>{look.title}</div>
                  <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:20, fontWeight:700, color:"#FAFAF8", marginBottom:16 }}>{look.sub}</div>
                  {look.items.map(item => (
                    <div key={item} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, color:"rgba(255,255,255,0.38)", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", letterSpacing:1 }}>— {item}</div>
                  ))}
                  <button className="btn-ghost" style={{ marginTop:24, color:"#d4a96a", borderColor:"rgba(212,169,106,0.3)", padding:"10px 24px", fontSize:9, width:"100%" }}>Shop This Look</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <button className="btn-gold">View Full Lookbook</button>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section style={{ padding:"110px 5%", background:"#FAFAF8", display:"flex", gap:"10%", alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:280 }}>
          <div style={{ width:340, height:420, margin:"0 auto", position:"relative" }}>
            <div style={{ position:"absolute", inset:0, borderRadius:4, overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,0.15)", animation:"float 8s ease-in-out infinite" }}>
              <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80&fit=crop&crop=top" alt="Atelier" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ position:"absolute", bottom:-20, right:-20, width:120, height:120, background:"#1a1a1a", borderRadius:4, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 12px 30px rgba(0,0,0,0.2)", zIndex:2 }}>
              <div style={{ fontFamily:"'Bodoni Moda',serif", fontSize:28, fontWeight:900, color:"#d4a96a" }}>15</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, letterSpacing:2, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", textAlign:"center" }}>Years of Craft</div>
            </div>
          </div>
        </div>
        <div style={{ flex:1.4, minWidth:280 }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:5, color:"#b87333", textTransform:"uppercase", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ width:32, height:1, background:"#b87333", display:"inline-block" }} />
            Our Craft
          </div>
          <h2 style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(34px,3.5vw,52px)", fontWeight:900, letterSpacing:-1, color:"#1a1a1a", marginBottom:28, lineHeight:1.1 }}>
            Slow Fashion,<br /><span style={{ fontStyle:"italic", color:"#b87333" }}>Lasting Beauty</span>
          </h2>
          <p style={{ fontFamily:"'Bodoni Moda',serif", fontStyle:"italic", fontSize:17, color:"#666", lineHeight:1.85, marginBottom:20 }}>
            Every Rustique garment is born from a refusal to compromise. We work only with natural fibres — linen, silk, wool, cashmere — sourced from mills that have been weaving for generations.
          </p>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, color:"#888", lineHeight:1.8, marginBottom:40, fontWeight:300 }}>
            Our pieces are cut, sewn, and finished by hand in our partner ateliers. No fast fashion shortcuts. Just clothing made to outlast trends and age beautifully.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <button className="btn-dark">Our Story</button>
            <button className="btn-ghost">Sustainability Pledge</button>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:36, flexWrap:"wrap" }}>
            {["🌿 Natural Fibres","✋ Handfinished","🔄 Circular Care","📦 Zero-Waste Packaging"].map(t => (
              <span key={t} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:1.5, padding:"7px 14px", border:"1px solid rgba(184,115,51,0.2)", color:"#8B6347", background:"rgba(184,115,51,0.04)", borderRadius:2 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background:"#1a1a1a", padding:"90px 5%", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:5, color:"#b87333", textTransform:"uppercase", marginBottom:20 }}>✦ Inner Circle ✦</div>
          <h3 style={{ fontFamily:"'Bodoni Moda',serif", fontSize:"clamp(30px,3.5vw,48px)", fontWeight:900, color:"#FAFAF8", marginBottom:14, letterSpacing:-0.5 }}>
            First to Know,<br /><span style={{ fontStyle:"italic", color:"#d4a96a" }}>First to Wear</span>
          </h3>
          <p style={{ fontFamily:"'Bodoni Moda',serif", fontStyle:"italic", fontSize:16, color:"rgba(250,250,248,0.4)", lineHeight:1.7, marginBottom:44 }}>
            Early access to new collections, private sale invitations, and style notes from our creative director.
          </p>
          <div style={{ display:"flex", maxWidth:440, margin:"0 auto" }}>
            <input type="email" placeholder="Enter your email address"
              style={{ flex:1, padding:"16px 22px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRight:"none", color:"#FAFAF8", fontFamily:"'Montserrat',sans-serif", fontSize:12, outline:"none", letterSpacing:0.5 }} />
            <button className="btn-gold" style={{ padding:"16px 28px", whiteSpace:"nowrap" }}>Join</button>
          </div>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:16, letterSpacing:1 }}>No spam. Unsubscribe anytime.</div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0D0B09", padding:"70px 5% 36px", borderTop:"1px solid rgba(184,115,51,0.1)" }}>
        <div style={{ display:"flex", gap:60, flexWrap:"wrap", maxWidth:1200, margin:"0 auto 60px" }}>
          <div style={{ maxWidth:240 }}>
            <div style={{ marginBottom:18 }}><RustiqueLogo dark={false} size={30} /></div>
            <p style={{ fontFamily:"'Bodoni Moda',serif", fontStyle:"italic", fontSize:14, color:"rgba(250,250,248,0.3)", lineHeight:1.7 }}>
              Slow fashion for those who believe beautiful things should last a lifetime.
            </p>
            <div style={{ display:"flex", gap:16, marginTop:24 }}>
              {["Instagram","Pinterest","TikTok"].map(s => (
                <a key={s} href="#" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.25)", textDecoration:"none", textTransform:"uppercase", transition:"color 0.3s" }}
                  onMouseEnter={e => e.target.style.color="#b87333"}
                  onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.25)"}>{s}</a>
              ))}
            </div>
          </div>
          {[
            ["Shop",["New In","Collections","The Edit","Sale","Gift Cards"]],
            ["Explore",["Lookbook","Our Story","Artisans","Sustainability","Press"]],
            ["Help",["Sizing Guide","Shipping & Returns","Care Instructions","Contact","FAQ"]],
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:4, color:"#b87333", textTransform:"uppercase", marginBottom:20 }}>{title}</div>
              {links.map(l => (
                <a key={l} href="#" style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:12, color:"rgba(250,250,248,0.3)", textDecoration:"none", marginBottom:10, letterSpacing:0.5, transition:"color 0.3s", fontWeight:300 }}
                  onMouseEnter={e => e.target.style.color="#d4a96a"}
                  onMouseLeave={e => e.target.style.color="rgba(250,250,248,0.3)"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1200, margin:"0 auto", borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:28, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:"rgba(250,250,248,0.18)", fontWeight:300 }}>© 2025 Rustique. All rights reserved.</div>
          <div style={{ display:"flex", gap:24 }}>
            {["Privacy Policy","Terms","Cookies"].map(t => (
              <a key={t} href="#" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:"rgba(250,250,248,0.18)", textDecoration:"none", letterSpacing:1 }}>{t}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
