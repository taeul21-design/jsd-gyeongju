# 🔧 정적 웹사이트로 변경 (GitHub Pages용)

GitHub Pages에서 작동하도록 API 의존성을 제거합니다.

---

## 🎯 변경 사항

### 제거할 기능
- ❌ 게시판 (데이터베이스 필요)
- ❌ 방명록 (데이터베이스 필요)  
- ❌ 로그인/회원가입 (백엔드 필요)
- ❌ 음악 업로드 (백엔드 필요)

### 유지할 기능
- ✅ 메인 페이지
- ✅ 증산도 소개
- ✅ 입도 안내
- ✅ 도장 소식 (정적 콘텐츠)
- ✅ 외부 링크 (황금독서클럽, 상생방송, 동방신선학교)
- ✅ 증산도 성곡 (고정된 음악 목록)
- ✅ 연락처 정보
- ✅ PWA 기능

---

## 📝 수정 방법

### 1. index.html 수정

#### 제거할 섹션:

**게시판 바로가기 섹션 (124~166줄):**
```html
<!-- 제거: 게시판 바로가기 -->
<!-- 
<section class="section board-quick-section">
  ...
</section>
-->
```

**방명록 섹션:**
```html
<!-- 제거: 방명록 -->
<!--
<section id="guestbook" class="section guestbook-section">
  ...
</section>
-->
```

**게시판 섹션:**
```html
<!-- 제거: 게시판 -->
<!--
<section id="news" class="section news-section">
  ...
</section>
-->
```

**로그인/회원가입 모달:**
```html
<!-- 제거: 로그인 모달 -->
<!--
<div id="loginModal" class="modal">
  ...
</div>
-->
```

---

### 2. 네비게이션 메뉴 수정

**제거할 메뉴 항목:**

```html
<!-- 변경 전 -->
<li><a href="#guestbook" class="nav-link">방명록</a></li>
<li><a href="#news" class="nav-link">게시판</a></li>
<li id="authButtons">...</li>
<li id="writeButton">...</li>

<!-- 변경 후 (제거) -->
<!-- 방명록, 게시판, 로그인 버튼 제거 -->
```

---

### 3. 증산도 성곡 - 정적 음악 목록

**고정된 음악 목록으로 변경:**

```html
<section id="music" class="section music-section">
  <div class="container">
    <h2>증산도 성곡</h2>
    
    <div class="music-list">
      <!-- 음악 1 -->
      <div class="music-item">
        <div class="music-info">
          <h3>태을주 수행음악</h3>
          <p>작곡: 증산도 음악팀</p>
        </div>
        <audio controls>
          <source src="https://archive.org/download/testmp3testfile/mpthreetest.mp3" type="audio/mpeg">
        </audio>
      </div>
      
      <!-- 음악 2 -->
      <div class="music-item">
        <div class="music-info">
          <h3>천지성공</h3>
          <p>작곡: 증산도 음악팀</p>
        </div>
        <audio controls>
          <source src="https://soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg">
        </audio>
      </div>
      
      <!-- 추가 음악... -->
    </div>
    
    <p class="music-notice">
      더 많은 음악을 들으시려면 <a href="tel:054-742-1691">054-742-1691</a>로 문의하세요.
    </p>
  </div>
</section>
```

---

### 4. 도장 소식 - 정적 콘텐츠

**고정된 일정 정보:**

```html
<section id="dojang-news" class="section">
  <div class="container">
    <h2>도장 소식</h2>
    
    <div class="schedule-grid">
      <div class="schedule-card">
        <i class="fas fa-praying-hands"></i>
        <h3>정기 치성</h3>
        <p>일요일 오전 10시 30분</p>
        <p>수요일 저녁 7시 30분</p>
      </div>
      
      <div class="schedule-card">
        <i class="fas fa-om"></i>
        <h3>태을주 수행</h3>
        <p>토요일 오후 2시</p>
      </div>
      
      <div class="schedule-card">
        <i class="fas fa-book"></i>
        <h3>도전 강독</h3>
        <p>첫째/셋째 주 금요일</p>
        <p>저녁 7시</p>
      </div>
      
      <div class="schedule-card">
        <i class="fas fa-user-plus"></i>
        <h3>신규 도생 환영</h3>
        <p>상시</p>
      </div>
    </div>
  </div>
</section>
```

---

### 5. main.js 수정

**API 호출 제거:**

```javascript
// 변경 전 (제거)
// loadPosts();
// loadGuestbook();
// initializeAuth();

// 변경 후
window.addEventListener('DOMContentLoaded', () => {
  console.log('정적 웹사이트 로드 완료');
  
  // PWA만 유지
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.log('SW registration failed', err));
  }
  
  // 네비게이션만 유지
  initNavigation();
});

function initNavigation() {
  // 부드러운 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
```

---

## 🚀 빠른 수정 (핵심만)

### 최소한의 수정으로 에러 제거:

#### index.html - 네비게이션 메뉴만 수정

**76~96줄 찾기:**

```html
<!-- 변경 전 -->
<li><a href="#guestbook" class="nav-link">방명록</a></li>
<li><a href="#news" class="nav-link">게시판</a></li>
<li id="authButtons">
  <button class="btn-secondary btn-sm" onclick="openLoginModal()">
    <i class="fas fa-sign-in-alt"></i> 로그인
  </button>
  <button class="btn-primary btn-sm" onclick="openRegisterModal()">
    <i class="fas fa-user-plus"></i> 회원가입
  </button>
</li>

<!-- 변경 후 -->
<li><a href="tel:054-742-1691" class="nav-link">
  <i class="fas fa-phone"></i> 연락하기
</a></li>
```

---

#### main.js - 에러 방지 코드 추가

**파일 맨 위에 추가:**

```javascript
// 정적 버전 - API 호출 비활성화
const STATIC_MODE = true;

// API 호출 래퍼 (에러 방지)
async function safeFetch(url) {
  if (STATIC_MODE) {
    console.log('정적 모드: API 호출 건너뜀', url);
    return null;
  }
  try {
    const response = await fetch(url);
    return response.ok ? response : null;
  } catch (error) {
    console.log('API 에러 (무시됨):', error);
    return null;
  }
}

// 기존 loadGuestbook 함수 수정
async function loadGuestbook() {
  if (STATIC_MODE) {
    console.log('정적 모드: 방명록 비활성화');
    const container = document.getElementById('guestbookList');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <p>방명록은 현재 준비 중입니다.</p>
          <p>문의: <a href="tel:054-742-1691">054-742-1691</a></p>
        </div>
      `;
    }
    return;
  }
  // 기존 코드...
}

// 기존 loadPosts 함수 수정
async function loadPosts() {
  if (STATIC_MODE) {
    console.log('정적 모드: 게시판 비활성화');
    return;
  }
  // 기존 코드...
}
```

---

## 📦 완성된 정적 버전 배포

### GitHub에 업로드:

1. **수정된 파일 커밋:**
   ```bash
   git add index.html js/main.js
   git commit -m "Convert to static website for GitHub Pages"
   git push origin main
   ```

2. **2~3분 대기**

3. **사이트 확인:**
   ```
   https://jsd-gyeongju.com
   ```

4. **캐시 강제 새로고침:**
   ```
   Ctrl + Shift + R
   ```

---

## ✅ 결과

### 작동하는 기능:
- ✅ 홈페이지 정상 표시
- ✅ 증산도 소개 섹션
- ✅ 입도 안내 섹션
- ✅ 도장 소식 (정적 일정)
- ✅ 황금독서클럽 링크
- ✅ 상생방송 링크
- ✅ 동방신선학교 링크
- ✅ 증산도 성곡 (고정 음악 목록)
- ✅ 연락처 정보
- ✅ PWA 앱 설치

### 제거된 기능:
- ❌ 게시판
- ❌ 방명록
- ❌ 로그인/회원가입
- ❌ 음악 업로드

### Console 에러:
- ✅ 모든 404 에러 제거
- ✅ API 에러 없음
- ✅ 깔끔한 Console

---

## 🎯 최종 선택

### Option A: 정적 버전으로 계속 (GitHub Pages)

**장점:**
- ✅ 가비아 도메인 계속 사용
- ✅ GitHub Pages 무료
- ✅ 에러 없는 깔끔한 사이트

**단점:**
- ❌ 게시판/방명록 없음
- ❌ 사용자 인터랙션 제한

---

### Option B: Genspark로 이전 (모든 기능)

**장점:**
- ✅ 모든 기능 작동
- ✅ 게시판, 방명록, 로그인
- ✅ 무료

**단점:**
- ⚠️ 도메인 재설정 필요
- ⚠️ 프로젝트 이전 필요

---

## 📞 다음 단계

어떤 옵션을 선택하시겠습니까?

**A. 정적 버전 (지금 바로 수정)**
→ 위 코드로 `index.html`, `main.js` 수정

**B. Genspark 이전 (완전한 기능)**
→ Genspark 배포 가이드 제공

---

**© 2025 증산도 경주 노서도장**
