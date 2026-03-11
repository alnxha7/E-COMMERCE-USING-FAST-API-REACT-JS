// ─────────────────────────────────────────────
//  Rustique Dashboard — Mock Data
// ─────────────────────────────────────────────

export const currentUser = {
  id: "usr_001",
  name: "Amara Sinclair",
  email: "amara@rustique.com",
  avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&fit=crop",
  role: "Premium Member",
  memberSince: "March 2022",
  loyaltyPoints: 2840,
  tier: "Gold",
};

export const statsData = [
  { id: 1, label: "Total Orders",    value: "48",     change: "+12%", up: true,  icon: "📦", color: "#b87333" },
  { id: 2, label: "Total Spent",     value: "$6,420",  change: "+8%",  up: true,  icon: "💳", color: "#8B5E3C" },
  { id: 3, label: "Wishlist Items",  value: "17",     change: "+3",   up: true,  icon: "♡",  color: "#C9783A" },
  { id: 4, label: "Loyalty Points",  value: "2,840",  change: "+240", up: true,  icon: "⭐", color: "#d4a96a" },
];

export const recentOrders = [
  {
    id: "ORD-8821",
    date: "Jun 10, 2025",
    items: ["The Drape Coat", "Linen Column Dress"],
    total: "$607",
    status: "Delivered",
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=80&q=80&fit=crop",
  },
  {
    id: "ORD-8756",
    date: "May 28, 2025",
    items: ["Silk Bias Slip"],
    total: "$295",
    status: "In Transit",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=80&q=80&fit=crop",
  },
  {
    id: "ORD-8690",
    date: "May 14, 2025",
    items: ["Oversized Blazer", "Knit Wrap Cardigan"],
    total: "$538",
    status: "Delivered",
    img: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=80&q=80&fit=crop",
  },
  {
    id: "ORD-8601",
    date: "Apr 30, 2025",
    items: ["Tapered Cargo Trouser"],
    total: "$165",
    status: "Delivered",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&q=80&fit=crop",
  },
  {
    id: "ORD-8544",
    date: "Apr 12, 2025",
    items: ["Linen Column Dress", "Silk Bias Slip", "Knit Wrap Cardigan"],
    total: "$711",
    status: "Delivered",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=80&q=80&fit=crop",
  },
];

export const wishlistItems = [
  { id: 1, name: "The Drape Coat",       price: "$389", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&q=80&fit=crop&crop=top", tag: "New",       inStock: true  },
  { id: 2, name: "Silk Bias Slip",       price: "$295", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80&fit=crop&crop=top", tag: "Exclusive", inStock: true  },
  { id: 3, name: "Tapered Cargo Trouser",price: "$165", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=80&fit=crop&crop=top", tag: "Limited",   inStock: false },
  { id: 4, name: "Oversized Blazer",     price: "$340", img: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=300&q=80&fit=crop&crop=top", tag: "New",       inStock: true  },
];

export const spendingChartData = [
  { month: "Jan", amount: 218  },
  { month: "Feb", amount: 0    },
  { month: "Mar", amount: 607  },
  { month: "Apr", amount: 876  },
  { month: "May", amount: 833  },
  { month: "Jun", amount: 607  },
];

export const categoryBreakdown = [
  { label: "Outerwear",  pct: 38, color: "#b87333" },
  { label: "Dresses",    pct: 27, color: "#d4a96a" },
  { label: "Knitwear",   pct: 18, color: "#8B5E3C" },
  { label: "Trousers",   pct: 17, color: "#C9783A" },
];

export const savedAddresses = [
  { id: 1, label: "Home",   line1: "14 Rue du Faubourg",   line2: "Paris, 75008, France",      default: true  },
  { id: 2, label: "Office", line1: "22 Carnaby Street",    line2: "London, W1F 7DB, UK",        default: false },
];

export const notifications = [
  { id: 1, type: "order",    message: "Your order ORD-8756 is out for delivery.",       time: "2h ago",   read: false },
  { id: 2, type: "promo",    message: "Exclusive early access: Noir Season drops Fri.", time: "1d ago",   read: false },
  { id: 3, type: "wishlist", message: "Tapered Cargo Trouser is back in stock!",        time: "3d ago",   read: true  },
  { id: 4, type: "order",    message: "ORD-8821 has been delivered. Enjoy!",            time: "5d ago",   read: true  },
];

export const navItems = [
  { id: "overview",       label: "Overview",        icon: "▦"  },
  { id: "orders",         label: "My Orders",       icon: "📦" },
  { id: "wishlist",       label: "Wishlist",        icon: "♡"  },
  { id: "profile",        label: "Profile",         icon: "◎"  },
  { id: "addresses",      label: "Addresses",       icon: "⌖"  },
  { id: "notifications",  label: "Notifications",   icon: "🔔" },
];
