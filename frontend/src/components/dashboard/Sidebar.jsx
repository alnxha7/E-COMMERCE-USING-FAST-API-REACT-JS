// ─────────────────────────────────────────────
//  Rustique Dashboard — Sidebar Component
// ─────────────────────────────────────────────
import { useState } from "react";
import { currentUser, navItems, notifications } from "../../data/mockData";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');`;

const RustiqueMark = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="smg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#d4a96a" />
        <stop offset="100%" stopColor="#8B5E3C" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" stroke="url(#smg)" strokeWidth="1" fill="none" strokeDasharray="3 2" />
    <circle cx="16" cy="16" r="10" stroke="url(#smg)" strokeWidth="0.5" fill="none" />
    <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle"
      fontFamily="'Bodoni Moda',serif" fontSize="14" fontWeight="900" fill="url(#smg)">R</text>
  </svg>
);


export default function Sidebar({ active, setActive, collapsed, setCollapsed, onLogout }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <style>{`
        ${FONTS}
        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.25s ease;
          position: relative;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .sidebar-nav-item:hover {
          background: rgba(184,115,51,0.08);
        }
        .sidebar-nav-item.active {
          background: linear-gradient(135deg, rgba(184,115,51,0.15), rgba(139,94,60,0.08));
          border-left: 2px solid #b87333;
        }
        .sidebar-nav-item .nav-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .sidebar-nav-item:hover .nav-icon {
          transform: scale(1.15);
        }
        .sidebar-nav-item .nav-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s;
        }
        .sidebar-collapse-btn {
          background: none;
          border: 1px solid rgba(184,115,51,0.2);
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b87333;
          font-size: 12px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .sidebar-collapse-btn:hover {
          background: rgba(184,115,51,0.1);
        }
        .tier-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          background: linear-gradient(135deg,#b87333,#d4a96a);
          border-radius: 2px;
          font-family: 'Montserrat',sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: white;
        }
        .sidebar-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,115,51,0.2), transparent);
          margin: 16px 20px;
        }
        .badge-dot {
          position: absolute;
          top: 8px;
          right: collapsed ? 8px : 14px;
          width: 16px;
          height: 16px;
          background: #b87333;
          border-radius: 50%;
          font-family: 'Montserrat',sans-serif;
          font-size: 8px;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes sidebarFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sidebar-content { animation: sidebarFadeIn 0.4s ease both; }
      `}</style>

      <aside style={{
        width: collapsed ? 68 : 260,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0D0B09 0%, #1A1108 50%, #0D0B09 100%)",
        borderRight: "1px solid rgba(184,115,51,0.12)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.35s cubic-bezier(.16,1,.3,1)",
        position: "relative",
        flexShrink: 0,
        zIndex: 50,
      }}>

        {/* Top — Logo + Collapse */}
        <div style={{
          padding: "24px 20px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          borderBottom: "1px solid rgba(184,115,51,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <RustiqueMark />
            {!collapsed && (
              <div style={{ animation: "sidebarFadeIn 0.3s ease both" }}>
                <div style={{
                  fontFamily: "'Bodoni Moda',serif", fontSize: 15, fontWeight: 900,
                  letterSpacing: 3, color: "#FAFAF8",
                }}>RUSTIQUE</div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: 8,
                  letterSpacing: 3, color: "#b87333", textTransform: "uppercase",
                }}>Member Portal</div>
              </div>
            )}
          </div>
          <button
            className="sidebar-collapse-btn"
            onClick={() => setCollapsed(c => !c)}
            style={{ marginLeft: collapsed ? 0 : 0, display: collapsed ? "none" : "flex" }}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* User Profile Card */}
        {!collapsed && (
          <div className="sidebar-content" style={{
            margin: "20px 16px 8px",
            padding: "16px",
            background: "rgba(184,115,51,0.06)",
            border: "1px solid rgba(184,115,51,0.12)",
            borderRadius: 4,
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "2px solid rgba(184,115,51,0.4)",
                overflow: "hidden", flexShrink: 0,
              }}>
                <img src={currentUser.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Bodoni Moda',serif", fontSize: 14, fontWeight: 700,
                  color: "#FAFAF8", marginBottom: 3,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{currentUser.name}</div>
                <div className="tier-badge">⭐ {currentUser.tier} Member</div>
              </div>
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12,
              borderTop: "1px solid rgba(184,115,51,0.1)",
              display: "flex", justifyContent: "space-between",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 700, color: "#d4a96a" }}>
                  {currentUser.loyaltyPoints.toLocaleString()}
                </div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 1.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Points</div>
              </div>
              <div style={{ width: 1, background: "rgba(184,115,51,0.15)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 700, color: "#d4a96a" }}>48</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 1.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Orders</div>
              </div>
              <div style={{ width: 1, background: "rgba(184,115,51,0.15)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 700, color: "#d4a96a" }}>17</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 1.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Saved</div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed avatar */}
        {collapsed && (
          <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 8px" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid rgba(184,115,51,0.4)", overflow: "hidden" }}>
              <img src={currentUser.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
          <div className="sidebar-divider" />
          {navItems.map((item) => {
            const isActive = active === item.id;
            const isNotif = item.id === "notifications";
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  color: isActive ? "#d4a96a" : hoveredItem === item.id ? "#FAFAF8" : "rgba(255,255,255,0.5)",
                  justifyContent: collapsed ? "center" : "flex-start",
                  paddingLeft: collapsed ? 0 : 20,
                  paddingRight: collapsed ? 0 : 20,
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
                {/* Notification badge */}
                {isNotif && unreadCount > 0 && !collapsed && (
                  <span style={{
                    marginLeft: "auto",
                    background: "#b87333",
                    color: "white",
                    borderRadius: "10px",
                    padding: "1px 7px",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                  }}>{unreadCount}</span>
                )}
                {isNotif && unreadCount > 0 && collapsed && (
                  <span style={{
                    position: "absolute", top: 6, right: 6,
                    width: 8, height: 8,
                    background: "#b87333", borderRadius: "50%",
                  }} />
                )}
                {/* Active indicator */}
                {isActive && !collapsed && (
                  <span style={{
                    marginLeft: "auto",
                    width: 4, height: 4,
                    background: "#b87333",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom — collapse toggle + logout */}
        <div style={{
          borderTop: "1px solid rgba(184,115,51,0.1)",
          padding: "16px 8px",
        }}>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 20px", width: "100%",
                background: "none", border: "none",
                cursor: "pointer", borderRadius: 3,
                fontFamily: "'Montserrat',sans-serif", fontSize: 11,
                letterSpacing: 1.5, textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#d4a96a"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >
              <span style={{ fontSize: 14 }}>◀◀</span>
              <span>Collapse</span>
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "10px 0", width: "100%",
                background: "none", border: "none",
                cursor: "pointer", color: "rgba(255,255,255,0.3)",
                fontSize: 14, transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#d4a96a"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >▶▶</button>
          )}
          <button style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 10, padding: "10px 20px", width: "100%",
            background: "none", border: "none",
            cursor: "pointer", borderRadius: 3,
            fontFamily: "'Montserrat',sans-serif", fontSize: 11,
            letterSpacing: 1.5, textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#ff6b6b"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
            onClick={onLogout}
          >
            <span style={{ fontSize: 14 }}>⏻</span>
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
