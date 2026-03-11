// ─────────────────────────────────────────────
//  Rustique Dashboard — Main Layout
//  Entry point: import this as <Dashboard />
// ─────────────────────────────────────────────
import { useState }     from "react";
import Sidebar          from "./Sidebar";
import TopBar           from "./Topbar";       // ← was "../TopBar", fix to "./"
import OverviewPage     from "./OverviewPage";
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

export default function Dashboard() {
  const [activePage,  setActivePage]  = useState("overview");
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
        .page-content-area {
          animation: pageIn 0.45s cubic-bezier(.16,1,.3,1) both;
        }
      `}</style>

      <div style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F7F3EE",
      }}>
        {/* ── Sidebar ── */}
        <Sidebar
          active={activePage}
          setActive={setActivePage}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* ── Main area ── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: "margin-left 0.35s cubic-bezier(.16,1,.3,1)",
        }}>
          {/* Top bar */}
          <TopBar activePage={activePage} />

          {/* Page content */}
          <main style={{
            flex: 1,
            padding: "32px 36px 48px",
            overflowY: "auto",
          }}>
            <div key={activePage} className="page-content-area">
              <PageRenderer page={activePage} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
