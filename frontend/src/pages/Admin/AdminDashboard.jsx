import { useEffect, useState } from "react";
import api from "../../service/api";

const AdminDashboard = () => {
  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalProducts: 0,
    totalBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
  });

  const [statusData, setStatusData] = useState([]);

  const [ownerData, setOwnerData] = useState([]);

  const [productData, setProductData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // GET ALL ADMIN ANALYTICS
  // ==========================================

  const getDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [overviewRes, statusRes, ownerRes, productRes] = await Promise.all([
        api.get("/getadminoverview",{withCredentials:true}),
        api.get("/getbookingbystatus",{withCredentials:true}),
        api.get("/getowneranalytics",{withCredentials:true}),
        api.get("/topproducts",{withCredentials:true}),
      ]);

      // ==========================================
      // OVERVIEW
      // ==========================================

      if (overviewRes.data.success) {
        setOverview(overviewRes.data.data);
      }

      // ==========================================
      // BOOKING STATUS
      // ==========================================

      if (statusRes.data.success) {
        setStatusData(statusRes.data.data);
      }

      // ==========================================
      // OWNER DATA
      // ==========================================

      if (ownerRes.data.success) {
        setOwnerData(ownerRes.data.owner);
      }

      // ==========================================
      // PRODUCT DATA
      // ==========================================

      if (productRes.data.success) {
        setProductData(productRes.data.data);
      }
    } catch (err) {
      console.error("Admin Dashboard Error:", err);

      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    completed: "#2156a0",
    approved: "#348c42",
    ongoing: "#f4b63d",
    pending: "#966bd8",
    cancelled: "#e95a57",
  };

  function buildDonutGradient(statusData, total) {
    let angle = 0;
    const stops = statusData.map((item) => {
      const start = angle;
      const slice = (item.count / (total || 1)) * 360;
      angle += slice;
      const color = statusColors[item._id] || "#ccc";
      return `${color} ${start}deg ${angle}deg`;
    });
    return `conic-gradient(${stops.join(", ")})`;
  }

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    getDashboardData();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="admin-error-page">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button onClick={getDashboardData}>Try Again</button>
      </div>
    );
  }
  return (
    <>
      {/* ==========================================
                  HEADER
              ========================================== */}

      <header className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin 👋</p>
        </div>

        {/* <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <span>Admin</span>
          <span>▾</span>
        </div> */}
      </header>

      {/* ==========================================
                  OVERVIEW CARDS
              ========================================== */}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">👥</div>
          <div>
            <p>Total Users</p>
            <h2>{overview.totalUsers}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon owners">👤</div>
          <div>
            <p>Total Owners</p>
            <h2>{overview.totalOwners}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">📦</div>
          <div>
            <p>Total Products</p>
            <h2>{overview.totalProducts}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bookings">📅</div>
          <div>
            <p>Total Bookings</p>
            <h2>{overview.totalBookings}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">❤️</div>
          <div>
            <p>Active Bookings</p>
            <h2>{overview.activeBookings}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">₹</div>
          <div>
            <p>Total Revenue</p>
            <h2>
              ₹{Number(overview.totalRevenue || 0).toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </section>

      {/* ==========================================
                  STATUS + OWNER
              ========================================== */}

      <section className="dashboard-two-column">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Bookings by Status</h2>
          </div>

          <div className="status-content">
            <div className="status-chart">
              <div
                className="status-donut"
                style={{
                  background: buildDonutGradient(
                    statusData,
                    overview.totalBookings,
                  ),
                }}
              >
                <div className="donut-center">
                  <strong>{overview.totalBookings}</strong>
                  <span>Bookings</span>
                </div>
              </div>
            </div>

            <div className="status-list">
              {statusData.map((item) => {
                const total = overview.totalBookings || 1;
                const percentage = (item.count / total) * 100;

                return (
                  <div className="status-row" key={item._id}>
                    <div className="status-name">
                      <span className={`status-dot ${item._id}`}></span>
                      <span>{item._id}</span>
                    </div>
                    <strong>{item.count}</strong>
                    <small>{percentage.toFixed(0)}%</small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Top Owners by Earnings</h2>
          </div>

          <div className="owner-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>Products</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                
                {ownerData.slice(0, 5).map((owner) => (
                  <tr key={owner.ownerId}>
                    <td>
                      <div className="owner-info">
                        <div className="owner-avatar">
                          {owner.ownerName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <strong>{owner.ownerName}</strong>
                          <small>{owner.ownerEmail}</small>
                        </div>
                      </div>
                    </td>
                    <td>{owner.totalProducts}</td>
                    <td className="earning">
                      ₹
                      {Number(owner.totalEarning || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
                  TOP PRODUCTS
              ========================================== */}

      <section className="dashboard-card products-card">
        <div className="card-header">
          <h2>Top Products by Bookings</h2>
        </div>

        <div className="product-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Total Bookings</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {productData.slice(0, 5).map((product) => {
                const maxBookings =
                  productData.length > 0
                    ? Math.max(...productData.map((p) => p.totalBookings || 0))
                    : 1;
                const percentage =
                  ((product.totalBookings || 0) / maxBookings) * 100;

                return (
                  
                  <tr key={product.productId || product._id}>
                    <td>
                      
                      <div className="product-name">
                        
                        {product.images?.length>0 ? (
                          
                          <img src={`http://localhost:5200${product.images[0]}`} 
                          alt={product.title} />
                          
                        ) : (
                          <div className="product-placeholder">📦</div>
                        )}
                        <strong>{product.title}</strong>
                      </div>
                    </td>
                    <td>{product.category || "-"}</td>
                    <td>{product.totalBookings || 0}</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
