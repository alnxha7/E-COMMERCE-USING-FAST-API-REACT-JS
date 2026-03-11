// ─────────────────────────────────────────────
//  Rustique Dashboard — Overview Page
// ─────────────────────────────────────────────
import { useState, useEffect } from "react";
import { statsData, recentOrders, spendingChartData, categoryBreakdown, currentUser } from "../../data/mockData";

const STATUS_COLORS = { Delivered: "#4CAF50", "In Transit": "#b87333", Processing: "#d4a96a" };
const STATUS_BG     = { Delivered: "rgba(76,175,80,0.1)", "In Transit": "rgba(184,115,51,0.1)", Processing: "rgba(212,169,106,0.1)" };

// Mini sparkline bar chart
function SpendingChart({ data }) {
  const max = Math.max(...data.map(d => d.amount));
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: "100%", borderRadius: "3px 3px 0 0",
            background: d.amount === max
              ? "linear-gradient(180deg,#d4a96a,#b87333)"
              : "rgba(184,115,51,0.2)",
            height: animated ? `${(d.amount / max) * 90}px` : "4px",
            transition: `height 0.6s cubic-bezier(.16,1,.3,1) ${i * 0.07}s`,
            position: "relative",
          }}>
            {d.amount === max && (
              <div style={{
                position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700,
                color: "#b87333", whiteSpace: "nowrap",
              }}>${d.amount}</div>
            )}
          </div>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#aaa", letterSpacing: 0.5 }}>{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// Donut-like category breakdown
function CategoryBreakdown({ data }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((cat, i) => (
        <div key={cat.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#555", letterSpacing: 0.5 }}>{cat.label}</span>
            <span style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.pct}%</span>
          </div>
          <div style={{ height: 4, background: "#f0ebe4", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              background: `linear-gradient(90deg,${cat.color},${cat.color}aa)`,
              width: 0,
              animation: `barGrow 0.8s cubic-bezier(.16,1,.3,1) ${i * 0.1 + 0.3}s both`,
            }} />
          </div>
          <style>{`@keyframes barGrow { from{width:0} to{width:${cat.pct}%} }`}</style>
        </div>
      ))}
    </div>
  );
}

export default function OverviewPage() {
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimatedStats(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes countUp { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        .stat-card {
          background: white;
          border: 1px solid rgba(184,115,51,0.1);
          border-radius: 4px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .stat-card:hover {
          box-shadow: 0 12px 40px rgba(184,115,51,0.1);
          transform: translateY(-3px);
          border-color: rgba(184,115,51,0.25);
        }
        .order-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #f5f0ea;
          transition: background 0.2s;
          border-radius: 3px;
        }
        .order-row:hover { background: rgba(184,115,51,0.03); padding-left: 8px; padding-right: 8px; }
        .order-row:last-child { border-bottom: none; }
        .widget {
          background: white;
          border: 1px solid rgba(184,115,51,0.1);
          border-radius: 4px;
          padding: 24px;
        }
        .widget-title {
          fontFamily: 'Bodoni Moda',serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }
        .widget-sub {
          font-family: 'Montserrat',sans-serif;
          font-size: 9px;
          color: #aaa;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
      `}</style>

      {/* ── Welcome Banner ── */}
      <div style={{
        background: "linear-gradient(135deg,#1a1208 0%,#2C1810 60%,#1a1208 100%)",
        borderRadius: 4, padding: "28px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        border: "1px solid rgba(184,115,51,0.15)",
        animation: "fadeUp 0.6s ease both",
        overflow: "hidden", position: "relative",
      }}>
        {/* Subtle grain */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(184,115,51,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: 4, color: "#b87333", textTransform: "uppercase", marginBottom: 8 }}>
            ✦ {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <h2 style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 28, fontWeight: 900, color: "#FAFAF8", marginBottom: 6, letterSpacing: -0.5 }}>
            Good morning, <span style={{ fontStyle: "italic", color: "#d4a96a" }}>{currentUser.name.split(" ")[0]}.</span>
          </h2>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 0.5 }}>
            You have 1 order in transit · 2 new notifications · 240 new loyalty points this month
          </p>
        </div>
        <div style={{ textAlign: "right", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Your loyalty tier</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg,#b87333,#d4a96a)",
            padding: "10px 20px", borderRadius: 3,
          }}>
            <span style={{ fontSize: 16 }}>⭐</span>
            <div>
              <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 900, color: "white", letterSpacing: 1 }}>GOLD</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.7)", letterSpacing: 2 }}>2,840 PTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {statsData.map((stat, i) => (
          <div key={stat.id} className="stat-card" style={{ animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 3,
                background: `${stat.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>{stat.icon}</div>
              <div style={{
                display: "flex", alignItems: "center", gap: 3,
                fontFamily: "'Montserrat',sans-serif", fontSize: 9,
                fontWeight: 600, letterSpacing: 0.5,
                color: stat.up ? "#4CAF50" : "#f44336",
                background: stat.up ? "rgba(76,175,80,0.1)" : "rgba(244,67,54,0.1)",
                padding: "3px 7px", borderRadius: 2,
              }}>
                {stat.up ? "↑" : "↓"} {stat.change}
              </div>
            </div>
            <div style={{
              fontFamily: "'Bodoni Moda',serif", fontSize: 28, fontWeight: 900,
              color: "#1a1a1a", marginBottom: 4, letterSpacing: -0.5,
              animation: animatedStats ? "countUp 0.4s ease both" : "none",
            }}>{stat.value}</div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#9B8778", letterSpacing: 1.5, textTransform: "uppercase" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
        {/* Spending chart */}
        <div className="widget">
          <div className="widget-title" style={{ fontFamily: "'Bodoni Moda',serif" }}>Spending History</div>
          <div className="widget-sub">2025 monthly breakdown</div>
          <SpendingChart data={spendingChartData} />
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #f5f0ea", display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 20, fontWeight: 700, color: "#b87333" }}>$3,141</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#aaa", letterSpacing: 1 }}>Total 2025</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 20, fontWeight: 700, color: "#4CAF50" }}>+24%</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#aaa", letterSpacing: 1 }}>vs last year</div>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="widget">
          <div className="widget-title" style={{ fontFamily: "'Bodoni Moda',serif" }}>By Category</div>
          <div className="widget-sub">All-time purchase breakdown</div>
          <CategoryBreakdown data={categoryBreakdown} />
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="widget">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div className="widget-title" style={{ fontFamily: "'Bodoni Moda',serif" }}>Recent Orders</div>
            <div className="widget-sub">Your last 5 purchases</div>
          </div>
          <button style={{
            background: "none", border: "1px solid rgba(184,115,51,0.25)",
            padding: "7px 16px", borderRadius: 2,
            fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2,
            textTransform: "uppercase", color: "#b87333", cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#b87333"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#b87333"; }}
          >View All</button>
        </div>
        {recentOrders.map(order => (
          <div key={order.id} className="order-row">
            <div style={{ width: 46, height: 54, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
              <img src={order.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a", marginBottom: 3 }}>{order.id}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#888" }}>{order.items.join(", ")}</div>
            </div>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#aaa" }}>{order.date}</div>
            <div style={{
              padding: "4px 12px", borderRadius: 2,
              background: STATUS_BG[order.status],
              color: STATUS_COLORS[order.status],
              fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 1,
              textTransform: "uppercase",
            }}>{order.status}</div>
            <div style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 16, fontWeight: 700, color: "#1a1a1a", minWidth: 60, textAlign: "right" }}>{order.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
