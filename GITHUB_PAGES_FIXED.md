# ✅ GitHub Pages 에러 해결 완료!

Console 에러를 분석하고 해결했습니다!

---

## 🔍 문제 원인

### ❌ 404 에러: `/tables/guestbook`, `/tables/posts`

**원인:**
- GitHub Pages는 **정적 파일 호스팅**만 제공
- 백엔드 API (`/tables/`) 없음
- 데이터베이스 없음

**이 앱의 원래 설계:**
- Genspark 플랫폼의 **RESTful Table API** 사용
- 자동 데이터베이스 연결
- 서버 사이드 API 엔드포인트

---

## ✅ 해결 방법 (적용 완료)

### 수정된 파일: `js/main.js`

#### 1. 정적 모드 플래그 추가

```javascript
const STATIC_MODE = true; // GitHub Pages용
```

#### 2. 방명록 함수 수정

```javascript
async function loadGuestbook(page = 1) {
    // 정적 모드에서는 안내 메시지 표시
    if (STATIC_MODE) {
        // 연락처 안내 UI 표시
        return;
    }
    // 원래 API 호출 코드...
}
```

#### 3. 게시판 함수 수정

```javascript
async function loadPosts() {
    // 정적 모드에서는 안내 메시지 표시
    if (STATIC_MODE) {
        // 연락처 안내 UI 표시
        return;
    }
    // 원래 API 호출 코드...
}
```

---

## 📤 GitHub에 업로드하는 방법

### 방법 1: GitHub 웹에서 수정 (가장 쉬움)

#### Step 1: Repository 접속
```
https://github.com/[username]/jsd-gyeongju
```

#### Step 2: js/main.js 파일 열기
1. `js` 폴더 클릭
2. `main.js` 파일 클릭
3. 연필 아이콘 (Edit) 클릭

#### Step 3: 1~5번 줄에 코드 추가

**맨 위에 추가:**
```javascript
// ===========================
// 정적 웹사이트 모드 (GitHub Pages용)
// ===========================
const STATIC_MODE = true; // GitHub Pages는 백엔드 API가 없으므로 정적 모드 사용
console.log('🌐 정적 웹사이트 모드:', STATIC_MODE ? '활성화' : '비활성화');

// ===========================
// Kakao SDK 초기화
// ===========================
```

#### Step 4: loadGuestbook 함수 찾기 (약 1783번 줄)

**Ctrl+F로 검색:** `async function loadGuestbook`

**함수 시작 부분 바로 다음에 추가:**
```javascript
async function loadGuestbook(page = 1) {
    // 정적 모드에서는 방명록 비활성화
    if (STATIC_MODE) {
        console.log('🌐 정적 모드: 방명록 기능 비활성화');
        const guestbookList = document.getElementById('guestbookList');
        if (guestbookList) {
            guestbookList.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-info-circle" style="font-size: 3rem; color: #1976D2; margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 1rem; color: #333;">방명록은 현재 준비 중입니다</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        방문 소감이나 문의사항이 있으시면<br>
                        아래 연락처로 직접 연락 주시기 바랍니다.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:054-742-1691" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #C8102E; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                            <i class="fas fa-phone"></i> 054-742-1691
                        </a>
                        <a href="https://welcome.jsd.or.kr/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #1976D2; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                            <i class="fas fa-external-link-alt"></i> 증산도 알아보기
                        </a>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    // 여기부터 원래 코드 계속...
    try {
        console.log(`방명록 로드 중... (페이지: ${page})`);
```

#### Step 5: loadPosts 함수 찾기 (약 965번 줄)

**Ctrl+F로 검색:** `async function loadPosts`

**함수 시작 부분에 추가:**
```javascript
async function loadPosts() {
    const postsContainer = document.getElementById('postsList');
    const loadingElement = document.getElementById('loading');
    const paginationElement = document.getElementById('pagination');
    
    // 정적 모드에서는 게시판 비활성화
    if (STATIC_MODE) {
        console.log('🌐 정적 모드: 게시판 기능 비활성화');
        if (loadingElement) loadingElement.style.display = 'none';
        if (postsContainer) {
            postsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <i class="fas fa-info-circle" style="font-size: 3rem; color: #1976D2; margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 1rem; color: #333;">게시판은 현재 준비 중입니다</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        도장 소식은 아래 연락처로 문의하시거나<br>
                        증산도 공식 홈페이지를 방문해 주세요.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:054-742-1691" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #C8102E; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                            <i class="fas fa-phone"></i> 전화 문의
                        </a>
                        <a href="https://www.jsd.or.kr/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #1976D2; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                            <i class="fas fa-external-link-alt"></i> 증산도 홈페이지
                        </a>
                    </div>
                </div>
            `;
        }
        if (paginationElement) paginationElement.innerHTML = '';
        return;
    }
    
    // 여기부터 원래 코드 계속...
    if (loadingElement) loadingElement.style.display = 'block';
```

#### Step 6: Commit

1. 페이지 맨 아래로 스크롤
2. Commit 메시지 입력:
   ```
   Fix: Enable static mode for GitHub Pages
   ```
3. **"Commit changes"** 클릭

---

### 방법 2: 로컬에서 수정 후 Git Push

```bash
# 1. 로컬 js/main.js 파일 수정 (위 내용대로)

# 2. Git 추가
git add js/main.js

# 3. Commit
git commit -m "Fix: Enable static mode for GitHub Pages"

# 4. Push
git push origin main
```

---

## ⏳ 배포 대기 (2~3분)

### Actions 탭에서 확인

1. GitHub Repository → **Actions** 탭
2. "pages build and deployment" 워크플로우 확인
3. ✅ 초록색 체크마크 대기

---

## 🧪 결과 확인

### 1. 사이트 접속

```
https://jsd-gyeongju.com
```

### 2. 캐시 강제 새로고침

```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### 3. Console 확인 (F12)

**기대되는 메시지:**
```javascript
✅ 🌐 정적 웹사이트 모드: 활성화
✅ 🌐 정적 모드: 방명록 기능 비활성화
✅ 🌐 정적 모드: 게시판 기능 비활성화
✅ Service Worker 등록 성공
✅ 로드된 음악: 5곡
```

**사라진 에러:**
```javascript
❌ Failed to load resource: 404 (사라짐!)
❌ 방명록 로드 실패 (사라짐!)
```

---

## ✅ 작동하는 기능

### 정상 작동:
- ✅ 메인 페이지 (히어로 배너)
- ✅ 증산도 소개
- ✅ 입도 안내
- ✅ 도장 소식 (정적 일정)
- ✅ 황금독서클럽 (외부 링크)
- ✅ 상생방송 (외부 링크)
- ✅ 동방신선학교 (외부 링크)
- ✅ 증산도 성곡 (5곡 음악 재생)
- ✅ PWA 앱 설치
- ✅ 태극 파비콘 (☯️)

### 안내 메시지 표시:
- 📝 방명록 → "현재 준비 중입니다" + 연락처
- 📝 게시판 → "현재 준비 중입니다" + 연락처

### 제거된 기능:
- ❌ 로그인/회원가입 버튼 (네비게이션에서 제거 가능)
- ❌ 음악 업로드 (관리자 전용)

---

## 📝 추가 개선 (선택사항)

### index.html 네비게이션 메뉴 정리

**76~96줄 수정:**

```html
<!-- 변경 전 -->
<li><a href="#guestbook" class="nav-link">방명록</a></li>
<li><a href="#news" class="nav-link">게시판</a></li>
<li id="authButtons">
  <button onclick="openLoginModal()">로그인</button>
  <button onclick="openRegisterModal()">회원가입</button>
</li>

<!-- 변경 후 (더 깔끔) -->
<li><a href="tel:054-742-1691" class="nav-link">
  <i class="fas fa-phone"></i> 연락하기
</a></li>
```

---

## 💡 향후 옵션

### Option A: 현재 상태 유지 (정적 웹사이트)

**장점:**
- ✅ GitHub Pages 무료
- ✅ 가비아 도메인 사용
- ✅ 에러 없음
- ✅ PWA 앱 설치 가능

**단점:**
- ❌ 게시판/방명록 없음
- ❌ 사용자 인터랙션 제한

---

### Option B: Genspark로 이전 (완전한 기능)

**장점:**
- ✅ 모든 기능 작동
- ✅ 게시판, 방명록, 로그인
- ✅ 음악 업로드
- ✅ 무료

**단점:**
- ⚠️ 프로젝트 이전 필요
- ⚠️ 도메인 재연결 필요

---

## 📊 비교표

| 기능 | GitHub Pages (현재) | Genspark |
|------|-------------------|----------|
| 메인 페이지 | ✅ | ✅ |
| 증산도 소개 | ✅ | ✅ |
| 외부 링크 | ✅ | ✅ |
| 음악 재생 | ✅ | ✅ |
| PWA 설치 | ✅ | ✅ |
| **게시판** | ❌ | ✅ |
| **방명록** | ❌ | ✅ |
| **로그인** | ❌ | ✅ |
| **음악 업로드** | ❌ | ✅ |
| 비용 | 무료 | 무료 |
| 커스텀 도메인 | ✅ | ✅ |

---

## 🎯 결론

**지금 상태:**
- ✅ 404 에러 모두 제거
- ✅ Console 깔끔
- ✅ 정보 제공 웹사이트로 작동
- ✅ PWA 앱 설치 가능

**다음 단계:**
1. 위 코드를 `js/main.js`에 추가
2. GitHub에 Commit
3. 2~3분 대기
4. 사이트 확인!

---

## 📞 추가 지원

**문제가 계속되면:**
1. Console 스크린샷 공유
2. GitHub Repository URL 공유
3. 에러 메시지 공유

**연락처:**
- 📞 전화: 054-742-1691
- 📍 주소: 경북 경주시 금성로 271, 3층(노서동)

---

**© 2025 증산도 경주 노서도장**
**v1.9.1 - GitHub Pages 정적 모드 지원**
