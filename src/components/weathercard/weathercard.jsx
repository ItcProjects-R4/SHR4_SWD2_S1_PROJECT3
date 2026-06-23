/* src/styles/weather.css */

.weather-dashboard-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f0f4f8 0%, #e2e8f0 100%);
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #1e293b;
  direction: ltr;
}

/* لوحة الـ Dashboard الزجاجية الكبيرة */
.dashboard-main-panel {
  display: flex;
  width: 92%;
  max-width: 1200px;
  height: 85vh;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 35px;
  box-shadow: 0 40px 100px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  z-index: 10;
}

/* ─── ستايل الـ Sidebar (الشمال) ─── */
.dashboard-sidebar {
  width: 30%;
  background: rgba(255, 255, 255, 0.75);
  padding: 35px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.back-arrow-minimal {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  width: fit-content;
  transition: color 0.3s;
  margin-bottom: 20px;
}
.back-arrow-minimal:hover { color: #1e293b; }

.sidebar-search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  margin-bottom: 40px;
}
.search-box-icon { font-size: 1.2rem; color: #94a3b8; }
.sidebar-search-box input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.05rem;
  width: 100%;
  color: #1e293b;
  font-weight: 500;
}

.big-weather-art {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto 30px auto;
}
.sun-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #fef08a 0%, #facc15 100%);
  border-radius: 50%;
  box-shadow: 0 15px 40px rgba(234, 179, 8, 0.4);
}

.sidebar-temp-block {
  margin-bottom: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.sidebar-temp-num { font-size: 5.5rem; font-weight: 700; line-height: 1; letter-spacing: -2px; }
.sidebar-temp-unit { font-size: 2rem; font-weight: 500; margin-top: 8px; }

.sidebar-date-time h3 { font-size: 1.8rem; font-weight: 700; margin-bottom: 6px; }
.sidebar-date-time p { font-size: 1rem; color: #64748b; font-weight: 500; }

.sidebar-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 30px 0;
}
.sidebar-status-list { display: flex; flex-direction: column; gap: 15px; }
.status-desc-text { font-size: 1.05rem; font-weight: 500; color: #475569; text-transform: capitalize; }

/* ─── ستايل الـ Content (اليمين) ─── */
.dashboard-content.highlights-only-layout {
  width: 70%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* توسيط المحتوى رأسياً ليعطي مظهر الـ Premium */
}

.section-subtitle { 
  font-size: 1.6rem; 
  font-weight: 800; 
  margin-bottom: 25px; 
  letter-spacing: -0.5px;
}

/* توزيع الكروت 2 في كل صف عشان تاخد مساحتها بالملي وتطلع فخمة */
.highlights-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.highlight-big-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease;
}
.highlight-big-card:hover {
  transform: translateY(-4px);
}

.highlight-card-label { font-size: 1rem; color: #94a3b8; font-weight: 600; }
.highlight-card-value { margin: 15px 0; }
.value-num { font-size: 3.2rem; font-weight: 700; letter-spacing: -1px; line-height: 1; }
.value-unit { font-size: 1.3rem; font-weight: 600; color: #1e293b; }

.highlight-card-footer { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; color: #475569; font-weight: 500; }

/* شريط الـ Slider المخصص لكارت الرطوبة */
.highlight-humidity-bar-wrapper { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
.bar-label-text { font-size: 0.9rem; color: #64748b; font-weight: 500; }
.humidity-slider-track {
  position: relative;
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 10px;
}
.humidity-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
}

/* شاشات التحميل */
.weather-loading-screen { width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #f0f4f8; }
.premium-loader-spinner { width: 45px; height: 45px; border: 3px solid #cbd5e1; border-radius: 50%; border-top-color: #3b82f6; animation: spin 1s infinite linear; margin-bottom: 15px; }
@keyframes spin { to { transform: rotate(360deg); } }