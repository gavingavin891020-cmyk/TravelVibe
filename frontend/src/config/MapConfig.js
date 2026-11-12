/* ===================================================
   MapConfig.js — 所有 Google Maps 相關的設定值

   這個檔案只放「資料」，不放任何邏輯或函式。
   任何元件或 composable 需要設定值時，都從這裡 import。
   =================================================== */

// Google Maps API Key：由環境變數提供（見 frontend/.env.example），不寫在程式碼裡
export const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

/* 地圖初始化選項，是傳給 new google.maps.Map() 的第二個參數 */
export const MAP_OPTIONS = {
  center: { lat: 22.6273, lng: 120.3014 },   // 預設在高雄  以下一堆預設值
  zoom: 13,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    /* POI 標籤保留顯示 */
    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] },
    /* 大眾運輸圖示 */
    { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },

  ]
}

/* Marker 上面數字標籤的樣式 */
export const MARKER_LABEL_STYLE = {
  color: '#fff',
  fontWeight: '700'
}

export const MARKER_ICON_URL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
export const MARKER_ICON_SIZE = { width: 32, height: 50 }
