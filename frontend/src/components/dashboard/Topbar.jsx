// ─────────────────────────────────────────────
//  Rustique Dashboard — TopBar Component
// ─────────────────────────────────────────────
import { useState } from "react";
import { currentUser, notifications } from "../../data/mockData";

const pageTitles = {
  overview:      { title: "Overview",       sub: "Welcome back, here's your style summary" },
  orders:        { title: "My Orders",      sub: "Track and manage your purchases" },
  wishlist:      { title: "Wishlist",       sub: "Pieces you've saved for later" },
  profile:       { title: "Profile",        sub: "Manage your personal information" },
  addresses:     { title: "Addresses",      sub: "Your saved delivery locations" },
  notifications: { title: "Notifications",  sub: "Stay up to date with your account" },
};

export default function TopBar({ activePage }) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unread = notifications.filter(n => !n.read);
  const page = pageTitles[activePage] || pageTitles.overview;

  const notifIconMap = { order: "📦", promo: "✨", wishlist: "♡" };

  return (
    <>
      <style>{`
        .topbar-search-input {
          background: rgba(184,115,51,0.06);
          border: 1px solid rgba(184,115,51,0.15);
          border-radius: 3px;
          padding: 9px 16px 9px 36px;
          font-family: 'Montserrat',sans-serif;
          font-size: 11px;
          color: #1a1a1a;
          outline: none;
          width: 220px;
          transition: all 0.3s;
          letter-spacing: 0.5px;
        }
        .topbar-search-input::placeholder { color: #bbb; }
        .topbar-search-input:focus {
          border-color: #b87333;
          width: 260px;
          background: rgba(184,115,51,0.03);
        }
        .topbar-icon-btn {
          background: none;
          border: 1px solid rgba(184,115,51,0.15);
          border-radius: 3px;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.2s;
          color: #666;
          position: relative;
        }
        .topbar-icon-btn:hover {
          background: rgba(184,115,51,0.08);
          border-color: #b87333;
          color: #b87333;
        }
        .notif-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 320px;
          background: white;
          border: 1px solid rgba(184,115,51,0.15);
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          z-index: 200;
          animation: dropIn 0.25s cubic-bezier(.16,1,.3,1) both;
          overflow: hidden;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .notif-item {
          padding: 14px 18px;
          border-bottom: 1px solid #f0ebe4;
          transition: background 0.2s;
          cursor: pointer;
        }
        .notif-item:hover { background: rgba(184,115,51,0.04); }
        .notif-item:last-child { border-bottom: none; }
      `}</style>

      <header style={{
        height: 68,
        background: "rgba(250,250,248,0.97)",
        borderBottom: "1px solid rgba(184,115,51,0.1)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}>
        {/* Page title */}
        <div>
          <h1 style={{
            fontFamily: "'Bodoni Moda',serif",
            fontSize: 22, fontWeight: 900,
            color: "#1a1a1a", letterSpacing: -0.5,
            lineHeight: 1.1,
          }}>{page.title}</h1>
          <p style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: 10, color: "#9B8778",
            letterSpacing: 1, marginTop: 2,
          }}>{page.sub}</p>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
              fontSize: 13, color: "#bbb", pointerEvents: "none",
            }}>🔍</span>
            <input className="topbar-search-input" placeholder="Search orders, items…" />
          </div>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button
              className="topbar-icon-btn"
              onClick={() => setShowNotifDropdown(v => !v)}
            >
              🔔
              {unread.length > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -5,
                  width: 16, height: 16,
                  background: "#b87333", borderRadius: "50%",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: 8, fontWeight: 700, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{unread.length}</span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="notif-dropdown">
                <div style={{
                  padding: "14px 18px 10px",
                  borderBottom: "1px solid #f0ebe4",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>Notifications</span>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#b87333", cursor: "pointer", letterSpacing: 1 }}>Mark all read</span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className="notif-item" style={{ background: n.read ? "transparent" : "rgba(184,115,51,0.03)" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{notifIconMap[n.type]}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#333", lineHeight: 1.5, marginBottom: 3 }}>{n.message}</p>
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#aaa", letterSpacing: 0.5 }}>{n.time}</span>
                      </div>
                      {!n.read && (
                        <span style={{ width: 6, height: 6, background: "#b87333", borderRadius: "50%", flexShrink: 0, marginTop: 4 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Avatar + name */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "6px 12px 6px 6px",
            border: "1px solid rgba(184,115,51,0.15)",
            borderRadius: 3,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#b87333"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(184,115,51,0.15)"}
          >
            <div style={{ width: 30, height: 30, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1.5px solid rgba(184,115,51,0.3)" }}>
              <img src={currentUser.avatar} alt="user" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a", letterSpacing: 0.3 }}>{currentUser.name.split(" ")[0]}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "#b87333", letterSpacing: 1, textTransform: "uppercase" }}>{currentUser.tier}</div>
            </div>
            <span style={{ color: "#bbb", fontSize: 10 }}>▾</span>
          </div>
        </div>
      </header>
    </>
  );
}
