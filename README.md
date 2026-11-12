# TravelVibe 旅遊行程平台

資展國際 Java 全端班（2025/11–2026/4）結訓**團隊專題**。
前後端分離的旅遊行程平台，包含行程規劃、購物車與點數儲值、社群互動（好友、即時聊天、留言板）與後台管理。

> 這是團隊共同開發的專案。我負責的部分列在下方「我負責的模組」，其餘功能由其他組員完成。

## 技術

| 層 | 使用技術 |
|---|---|
| 後端 | Java 17、Spring Boot、Spring Security、Spring Data JPA（Hibernate）、WebSocket（STOMP）、JWT |
| 前端 | Vue 3、Vite、Pinia、Axios |
| 資料庫 | Microsoft SQL Server |
| 第三方服務 | Google OAuth2 登入、Gmail SMTP（驗證信）、Cloudinary（圖片）、Google Maps、LINE Pay（測試環境） |

## 我負責的模組

### 1. 會員註冊與登入
- 密碼以 BCrypt 雜湊後儲存。
- 登入後簽發 JWT，放在 HttpOnly＋SameSite 的 Cookie，前端 JavaScript 讀不到權杖。
- 支援 Google OAuth2 第三方登入、Email 驗證碼開通帳號。

檔案：
[`AuthController`](backend/src/main/java/com/example/demo/controller/AuthController.java)、
[`AuthService`](backend/src/main/java/com/example/demo/service/AuthService.java)、
[`EmailService`](backend/src/main/java/com/example/demo/service/EmailService.java)、
[`OAuth2UserService`](backend/src/main/java/com/example/demo/service/OAuth2UserService.java)、
[`UserController`](backend/src/main/java/com/example/demo/controller/UserController.java)、
[`loginView.vue`](frontend/src/views/loginView.vue)、
[`VerifyCode.vue`](frontend/src/components/VerifyCode.vue)、
[`authStore.js`](frontend/src/stores/authStore.js)

### 2. 權限控管與管理員功能
- Spring Security 依角色限制 API 存取，每個請求由 Filter 驗證 JWT。
- 管理員可在後台管理會員。
- 前端以路由守衛依登入狀態與角色擋頁面。

檔案：
[`SpringSecurityConfig`](backend/src/main/java/com/example/demo/config/SpringSecurityConfig.java)、
[`JwtAuthenticationFilter`](backend/src/main/java/com/example/demo/config/JwtAuthenticationFilter.java)、
[`JwtUtil`](backend/src/main/java/com/example/demo/utils/JwtUtil.java)、
[`PasswordConfig`](backend/src/main/java/com/example/demo/config/PasswordConfig.java)、
[`AdminController`](backend/src/main/java/com/example/demo/controller/AdminController.java)、
[`AdminUserList.vue`](frontend/src/views/AdminUserList.vue)、
[`router/permission.js`](frontend/src/router/permission.js)、
[`utils/jwt.js`](frontend/src/utils/jwt.js)、
[`utils/request.js`](frontend/src/utils/request.js)

### 3. 好友與追蹤
- 好友邀請、接受、封鎖的狀態管理，以及追蹤功能。

檔案：
[`FriendshipsController`](backend/src/main/java/com/example/demo/controller/FriendshipsController.java)、
[`FriendshipsService`](backend/src/main/java/com/example/demo/service/FriendshipsService.java)、
[`FollowController`](backend/src/main/java/com/example/demo/controller/FollowController.java)、
[`FollowService`](backend/src/main/java/com/example/demo/service/FollowService.java)、
[`friendView.vue`](frontend/src/views/friendView.vue)、
[`FriendList.vue`](frontend/src/components/FriendList.vue)

### 4. 即時聊天與通知
- WebSocket＋STOMP 即時聊天，連線時驗證 JWT 身分。
- 以 ConcurrentHashMap 在記憶體記錄上線狀態，並廣播「輸入中」提示。
- 聊天訊息寫入資料庫，可查詢歷史紀錄。

檔案：
[`WebSocketConfig`](backend/src/main/java/com/example/demo/config/WebSocketConfig.java)、
[`WebSocketEventListener`](backend/src/main/java/com/example/demo/config/WebSocketEventListener.java)、
[`ChatController`](backend/src/main/java/com/example/demo/controller/ChatController.java)、
[`ChatHistoryController`](backend/src/main/java/com/example/demo/controller/ChatHistoryController.java)、
[`MessageService`](backend/src/main/java/com/example/demo/service/MessageService.java)、
[`UserStatusService`](backend/src/main/java/com/example/demo/service/UserStatusService.java)、
[`NotificationController`](backend/src/main/java/com/example/demo/controller/NotificationController.java)、
[`NotificationService`](backend/src/main/java/com/example/demo/service/NotificationService.java)、
[`NotificationList.vue`](frontend/src/components/NotificationList.vue)、
[`notificationStore.js`](frontend/src/stores/notificationStore.js)

## 其他組員負責的功能
行程規劃與地圖、行程商品與購物車、點數儲值與 LINE Pay、留言板與貼文等。

## 金鑰與設定
公開版本已移除所有金鑰，改由環境變數讀取，程式碼與設定檔中不含任何真實的值。

後端需要的環境變數：

| 變數 | 用途 |
|---|---|
| `DB_USERNAME`、`DB_PASSWORD` | SQL Server 帳號密碼 |
| `JWT_SECRET` | JWT 簽章密鑰（至少 32 個字元） |
| `GOOGLE_CLIENT_ID`、`GOOGLE_CLIENT_SECRET` | Google 登入 |
| `MAIL_USERNAME`、`MAIL_PASSWORD` | 寄送驗證信的信箱 |
| `CLOUDINARY_CLOUD_NAME`、`CLOUDINARY_API_KEY`、`CLOUDINARY_API_SECRET` | 圖片上傳 |
| `LINEPAY_CHANNEL_ID`、`LINEPAY_CHANNEL_SECRET` | LINE Pay 測試環境 |

前端：把 `frontend/.env.example` 複製成 `frontend/.env.local`，填入 Google Maps 金鑰。

## 執行方式
```bash
# 後端（需先設定上方環境變數，並建立名為 Project 的 SQL Server 資料庫）
cd backend
./mvnw spring-boot:run

# 前端
cd frontend
npm install
npm run dev
```
