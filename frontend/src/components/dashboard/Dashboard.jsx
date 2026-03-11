// ─────────────────────────────────────────────
//  Rustique Dashboard — Main Layout
// ─────────────────────────────────────────────
import { useState } from "react";
import Sidebar      from "./Sidebar";
import TopBar       from "./Topbar";
import OverviewPage from "./OverviewPage";
import { OrdersPage, WishlistPage, ProfilePage, AddressesPage, NotificationsPage } from "./Pages";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,900;1,400;1,600&family=Montserrat:wght@200;300;400;500;600&display=swap');`;

function PageRenderer({ page }) {
  switch (page) {
    case "overview":      return <OverviewPage />;
    case "orders":        return <OrdersPage />;
    case "wishlist":      return <WishlistPage />;
    case "profile":       return <ProfilePage />;
    case "addresses":     return <AddressesPage />;
    case "notifications": return <NotificationsPage />;
    default:              return <OverviewPage />;
  }
}

export default function Dashboard({ onLogout }) {
  const [activePage,       setActivePage]       = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Montserrat', sans-serif; background: #F7F3EE; }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: #F7F3EE; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#b87333, #5C3D1E); border-radius: 2px; }
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-content-area { animation: pageIn 0.45s cubic-bezier(.16,1,.3,1) both; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F7F3EE" }}>

        {/* ── Sidebar — independent scroll ── */}
        <div style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", flexShrink: 0 }}>
          <Sidebar
            active={activePage}
            setActive={setActivePage}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            onLogout={onLogout}   
          />
        </div>

        {/* ── Main area — independent scroll ── */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          minWidth: 0, height: "100vh", overflow: "hidden",
          transition: "margin-left 0.35s cubic-bezier(.16,1,.3,1)",
        }}>
          {/* TopBar — pinned, never scrolls */}
          <TopBar activePage={activePage} />

          {/* Page content — only this scrolls */}
          <main style={{ flex: 1, padding: "32px 36px 48px", overflowY: "auto", overflowX: "hidden" }}>
            <div key={activePage} className="page-content-area">
              <PageRenderer page={activePage} />
            </div>
          </main>
        </div>

      </div>
    </>
  );
}