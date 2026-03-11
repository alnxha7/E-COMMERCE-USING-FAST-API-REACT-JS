// ─────────────────────────────────────────────
//  Rustique Dashboard — Page Components
//  Orders | Wishlist | Profile | Addresses | Notifications
// ─────────────────────────────────────────────
import { useState } from "react";
import { recentOrders, wishlistItems, currentUser, savedAddresses, notifications } from "../../data/mockData";

const STATUS_COLORS = { Delivered: "#4CAF50", "In Transit": "#b87333", Processing: "#d4a96a" };
const STATUS_BG     = { Delivered: "rgba(76,175,80,0.08)", "In Transit": "rgba(184,115,51,0.1)", Processing: "rgba(212,169,106,0.1)" };

const SHARED_CSS = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  .page-widget {
    background: white;
    border: 1px solid rgba(184,115,51,0.1);
    border-radius: 4px;
    padding: 28px;
    animation: fadeUp 0.5s ease both;
  }
  .page-widget-title {
    font-family: 'Bodoni Moda',serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.3px;
    margin-bottom: 4px;
  }
  .page-widget-sub {
    font-family: 'Montserrat',sans-serif;
    font-size: 9px;
    color: #aaa;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .divider { height:1px; background: linear-gradient(90deg,rgba(184,115,51,0.15),transparent); margin: 20px 0; }
  .input-field {
    width: 100%;
    padding: 13px 16px;
    border: 1px solid #E8E0D8;
    border-radius: 3px;
    font-family: 'Montserrat',sans-serif;
    font-size: 12px;
    color: #1a1a1a;
    outline: none;
    transition: border 0.2s;
    background: #FDFCFA;
  }
  .input-field:focus { border-color: #b87333; }
  .input-label {
    font-family: 'Montserrat',sans-serif;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #888;
    display: block;
    margin-bottom: 6px;
  }
  .btn-gold-sm {
    background: linear-gradient(135deg,#b87333,#d4a96a);
    color: white;
    border: none;
    padding: 11px 28px;
    border-radius: 2px;
    font-family: 'Montserrat',sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn-gold-sm:hover { box-shadow: 0 6px 20px rgba(184,115,51,0.35); transform: translateY(-1px); }
  .btn-outline-sm {
    background: transparent;
    color: #1a1a1a;
    border: 1px solid rgba(0,0,0,0.18);
    padding: 10px 24px;
    border-radius: 2px;
    font-family: 'Montserrat',sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
  }
  .btn-outline-sm:hover { background: #1a1a1a; color: white; }
`;

// ── ORDERS PAGE ──────────────────────────────
export function OrdersPage() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Delivered", "In Transit", "Processing"];

  const filtered = filter === "All" ? recentOrders : recentOrders.filter(o => o.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <style>{SHARED_CSS}</style>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding: "8px 20px",
              border: filter === s ? "none" : "1px solid rgba(184,115,51,0.2)",
              background: filter === s ? "linear-gradient(135deg,#b87333,#d4a96a)" : "white",
              color: filter === s ? "white" : "#666",
              borderRadius: 2,
              fontFamily: "'Montserrat',sans-serif", fontSize: 10,
              letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s",
            }}>{s}</button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.map((order, i) => (
        <div key={order.id} className="page-widget" style={{ animationDelay: `${i * 0.07}s`, padding: "20px 24px" }}>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            {/* Image */}
            <div style={{ width: 70, height: 85, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
              <img src={order.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <span style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{order.id}</span>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#aaa", marginLeft: 10 }}>{order.date}</span>
                </div>
                <span style={{
                  padding: "4px 14px", borderRadius: 2,
                  background: STATUS_BG[order.status], color: STATUS_COLORS[order.status],
                  fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase",
                }}>{order.status}</span>
              </div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#555", marginBottom: 14 }}>
                {order.items.join(" · ")}
              </div>
              {/* Progress bar for in-transit */}
              {order.status === "In Transit" && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    {["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"].map((step, si) => (
                      <span key={step} style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 0.5,
                        color: si <= 2 ? "#b87333" : "#ccc", textTransform: "uppercase",
                      }}>{step}</span>
                    ))}
                  </div>
                  <div style={{ height: 3, background: "#f0ebe4", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg,#b87333,#d4a96a)", borderRadius: 2 }} />
                  </div>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 18, fontWeight: 700, color: "#b87333" }}>{order.total}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-outline-sm" style={{ fontSize: 9, padding: "7px 16px" }}>View Details</button>
                  {order.status === "Delivered" && (
                    <button className="btn-gold-sm" style={{ fontSize: 9, padding: "7px 16px" }}>Buy Again</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── WISHLIST PAGE ────────────────────────────
export function WishlistPage() {
  const [wishlist, setWishlist] = useState(wishlistItems);

  const remove = (id) => setWishlist(w => w.filter(x => x.id !== id));

  return (
    <div>
      <style>{SHARED_CSS}</style>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
        {wishlist.map((item, i) => (
          <div key={item.id} className="page-widget" style={{ padding: 0, overflow: "hidden", animationDelay: `${i * 0.08}s` }}>
            <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.5s ease" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              {/* Tag */}
              <div style={{
                position: "absolute", top: 12, left: 12,
                background: "#b87333", color: "white",
                fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700,
                letterSpacing: 2, textTransform: "uppercase", padding: "3px 10px", borderRadius: 1,
              }}>{item.tag}</div>
              {/* Remove */}
              <button onClick={() => remove(item.id)} style={{
                position: "absolute", top: 10, right: 10,
                background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%",
                width: 30, height: 30, cursor: "pointer", fontSize: 13,
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(4px)", transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#ff6b6b"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.85)"}
              >✕</button>
              {/* Out of stock overlay */}
              {!item.inStock && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 3, color: "white", textTransform: "uppercase" }}>Out of Stock</span>
                </div>
              )}
            </div>
            <div style={{ padding: "18px 18px 20px" }}>
              <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 10 }}>{item.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 18, fontWeight: 700, color: "#b87333" }}>{item.price}</span>
                <button className="btn-gold-sm" style={{ fontSize: 9, padding: "7px 14px" }} disabled={!item.inStock}>
                  {item.inStock ? "Add to Bag" : "Notify Me"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {wishlist.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
          <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 22, color: "#bbb" }}>Your wishlist is empty</div>
        </div>
      )}
    </div>
  );
}

// ── PROFILE PAGE ─────────────────────────────
export function ProfilePage() {
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "+33 6 12 34 56 78",
    dob: "1991-04-15",
    gender: "Female",
    newsletter: true,
    smsAlerts: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <style>{SHARED_CSS}</style>

      {/* Avatar section */}
      <div className="page-widget" style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(184,115,51,0.3)" }}>
            <img src={currentUser.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <button style={{
            position: "absolute", bottom: 0, right: 0,
            width: 28, height: 28, borderRadius: "50%",
            background: "#b87333", border: "2px solid white",
            cursor: "pointer", fontSize: 12, color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✎</button>
        </div>
        <div>
          <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{currentUser.name}</div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#888", marginBottom: 10 }}>{currentUser.email}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 2, padding: "3px 10px", background: "linear-gradient(135deg,#b87333,#d4a96a)", color: "white", borderRadius: 2 }}>⭐ GOLD MEMBER</span>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 1.5, padding: "3px 10px", background: "rgba(184,115,51,0.08)", color: "#b87333", border: "1px solid rgba(184,115,51,0.2)", borderRadius: 2 }}>Since {currentUser.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="page-widget">
        <div className="page-widget-title">Personal Information</div>
        <div className="page-widget-sub">Update your personal details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { key: "name",   label: "Full Name",     type: "text"  },
            { key: "email",  label: "Email Address", type: "email" },
            { key: "phone",  label: "Phone Number",  type: "tel"   },
            { key: "dob",    label: "Date of Birth", type: "date"  },
          ].map(field => (
            <div key={field.key}>
              <label className="input-label">{field.label}</label>
              <input
                className="input-field"
                type={field.type}
                value={form[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
              />
            </div>
          ))}
          <div>
            <label className="input-label">Gender</label>
            <select className="input-field" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
              {["Female", "Male", "Non-binary", "Prefer not to say"].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div className="divider" />
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-gold-sm" onClick={handleSave}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
          <button className="btn-outline-sm">Cancel</button>
        </div>
      </div>

      {/* Preferences */}
      <div className="page-widget">
        <div className="page-widget-title">Communication Preferences</div>
        <div className="page-widget-sub">Manage how we contact you</div>
        {[
          { key: "newsletter", label: "Email Newsletter", desc: "New collections, lookbooks & style notes" },
          { key: "smsAlerts",  label: "SMS Order Alerts",  desc: "Shipping updates and delivery notifications" },
        ].map(pref => (
          <div key={pref.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f5f0ea" }}>
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>{pref.label}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#aaa" }}>{pref.desc}</div>
            </div>
            <div
              onClick={() => setForm(f => ({ ...f, [pref.key]: !f[pref.key] }))}
              style={{
                width: 44, height: 24, borderRadius: 12, cursor: "pointer",
                background: form[pref.key] ? "linear-gradient(135deg,#b87333,#d4a96a)" : "#E0D8D0",
                position: "relative", transition: "background 0.3s",
                flexShrink: 0,
              }}>
              <div style={{
                position: "absolute", top: 3,
                left: form[pref.key] ? 22 : 3,
                width: 18, height: 18,
                background: "white", borderRadius: "50%",
                transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="page-widget">
        <div className="page-widget-title">Security</div>
        <div className="page-widget-sub">Manage your password and access</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {["Current Password", "New Password", "Confirm New Password"].map(label => (
            <div key={label} style={{ gridColumn: label === "Confirm New Password" ? "1/-1" : undefined }}>
              <label className="input-label">{label}</label>
              <input className="input-field" type="password" placeholder="••••••••" />
            </div>
          ))}
        </div>
        <button className="btn-gold-sm">Update Password</button>
      </div>
    </div>
  );
}

// ── ADDRESSES PAGE ───────────────────────────
export function AddressesPage() {
  const [addresses, setAddresses] = useState(savedAddresses);
  const [adding, setAdding] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <style>{SHARED_CSS}</style>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-gold-sm" onClick={() => setAdding(a => !a)}>
          {adding ? "✕ Cancel" : "+ Add New Address"}
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="page-widget" style={{ border: "1px solid rgba(184,115,51,0.3)" }}>
          <div className="page-widget-title">New Address</div>
          <div className="page-widget-sub">Add a delivery location</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {["Label (e.g. Home)", "Full Name", "Street Address", "City", "Postcode", "Country"].map(f => (
              <div key={f} style={{ gridColumn: f === "Street Address" ? "1/-1" : undefined }}>
                <label className="input-label">{f}</label>
                <input className="input-field" placeholder={`Enter ${f.toLowerCase()}`} />
              </div>
            ))}
          </div>
          <div className="divider" />
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-gold-sm" onClick={() => setAdding(false)}>Save Address</button>
            <button className="btn-outline-sm" onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Existing addresses */}
      {addresses.map((addr, i) => (
        <div key={addr.id} className="page-widget" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", animationDelay: `${i * 0.08}s` }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 3,
              background: addr.default ? "linear-gradient(135deg,#b87333,#d4a96a)" : "rgba(184,115,51,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>📍</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{addr.label}</span>
                {addr.default && (
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 2, padding: "2px 8px", background: "rgba(184,115,51,0.1)", color: "#b87333", borderRadius: 2 }}>DEFAULT</span>
                )}
              </div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "#555", marginBottom: 2 }}>{addr.line1}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#aaa" }}>{addr.line2}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!addr.default && (
              <button className="btn-outline-sm" style={{ fontSize: 9, padding: "6px 14px" }}
                onClick={() => setAddresses(a => a.map(x => ({ ...x, default: x.id === addr.id })))}>
                Set Default
              </button>
            )}
            <button className="btn-outline-sm" style={{ fontSize: 9, padding: "6px 14px" }}>Edit</button>
            <button style={{
              background: "none", border: "1px solid rgba(244,67,54,0.2)",
              padding: "6px 14px", borderRadius: 2,
              fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 1.5,
              color: "#f44336", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f44336"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#f44336"; }}
              onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── NOTIFICATIONS PAGE ───────────────────────
export function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);

  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  const iconMap = { order: "📦", promo: "✨", wishlist: "♡" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{SHARED_CSS}</style>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-outline-sm" onClick={markAllRead}>Mark All as Read</button>
      </div>

      {notifs.map((n, i) => (
        <div key={n.id} className="page-widget"
          style={{
            animationDelay: `${i * 0.07}s`,
            background: n.read ? "white" : "rgba(184,115,51,0.03)",
            border: n.read ? "1px solid rgba(184,115,51,0.08)" : "1px solid rgba(184,115,51,0.2)",
            display: "flex", gap: 18, alignItems: "flex-start", padding: "20px 24px",
          }}>
          {/* Icon bubble */}
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: n.read ? "rgba(184,115,51,0.06)" : "linear-gradient(135deg,rgba(184,115,51,0.15),rgba(139,94,60,0.08))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
            border: n.read ? "1px solid rgba(184,115,51,0.1)" : "1px solid rgba(184,115,51,0.25)",
          }}>{iconMap[n.type]}</div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: n.read ? "#555" : "#1a1a1a", lineHeight: 1.6, marginBottom: 6 }}>
              {n.message}
            </p>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#bbb", letterSpacing: 0.5 }}>{n.time}</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            {!n.read && (
              <>
                <span style={{ width: 8, height: 8, background: "#b87333", borderRadius: "50%" }} />
                <button onClick={() => markRead(n.id)} style={{
                  background: "none", border: "none",
                  fontFamily: "'Montserrat',sans-serif", fontSize: 9,
                  color: "#b87333", cursor: "pointer", letterSpacing: 1,
                  textDecoration: "underline",
                }}>Mark read</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
