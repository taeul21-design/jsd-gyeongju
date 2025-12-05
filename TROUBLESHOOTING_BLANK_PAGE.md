# 🔧 빈 페이지 문제 해결 가이드

웹페이지가 로딩되지만 콘텐츠가 비어있는 문제를 해결합니다.

---

## 🔍 Step 1: 에러 메시지 확인

### 브라우저 개발자 도구 열기

**방법:**
```
Windows: F12 또는 Ctrl + Shift + I
Mac: Cmd + Option + I
```

---

### Console 탭 확인

**Console 탭 클릭:**

```javascript
// 일반적인 에러 예시:

❌ Uncaught TypeError: Cannot read property '...' of undefined
❌ Failed to fetch
❌ 404 Not Found: /tables/posts
❌ CORS policy error
❌ Service Worker registration failed
```

**스크린샷 찍어주세요!**
- Console 탭의 모든 에러 메시지

---

### Network 탭 확인

**Network 탭 클릭:**

1. 페이지 새로고침 (F5)
2. 빨간색 항목 확인
3. 실패한 요청 클릭하여 상세 확인

**확인할 항목:**
```
✅ index.html - 200 OK
✅ style.css - 200 OK
✅ main.js - 200 OK
❌ /tables/posts - 404 Not Found ← 문제!
❌ /tables/guestbook - 404 Not Found
```

---

## 🚨 주요 원인 및 해결

### 원인 1: RESTful Table API 미설정 (가장 가능성 높음)

**증상:**
```javascript
// Console 에러:
GET https://jsd-gyeongju.com/tables/posts 404 (Not Found)
GET https://jsd-gyeongju.com/tables/users 404 (Not Found)
```

**원인:**
- 이 프로젝트는 **백엔드 API**가 필요함
- GitHub Pages는 **정적 파일만 호스팅** (API 없음)
- `/tables/` 엔드포인트가 작동하지 않음

---

### ✅ 해결 방법: Genspark 플랫폼 사용 (권장)

이 앱은 **Genspark AI** 플랫폼에서 제공하는 **RESTful Table API**를 사용하도록 설계되었습니다.

#### Option A: Genspark에서 배포 (완전 무료, 추천)

**1. Genspark 계정 생성**
- https://www.genspark.ai 접속
- 무료 회원가입

**2. 프로젝트 업로드**
- 프로젝트 파일 업로드
- 자동으로 RESTful API 활성화

**3. 도메인 연결**
- 커스텀 도메인 연결 가능
- `jsd-gyeongju.com` 연결

**장점:**
- ✅ RESTful Table API 자동 제공
- ✅ 데이터베이스 자동 생성
- ✅ 무료
- ✅ 설정 간단

---

#### Option B: 백엔드 API 직접 구축 (복잡, 비추천)

**필요한 것:**
- Node.js 서버 (Express)
- 데이터베이스 (MongoDB/PostgreSQL)
- 호스팅 (Heroku/Railway/Render)
- API 엔드포인트 개발

**시간:** 최소 4~8시간
**난이도:** 고급
**비용:** 월 $5~$10

❌ **정적 웹사이트로는 불가능합니다!**

---

#### Option C: 백엔드 없이 정적 버전으로 변경 (임시 방법)

**장단점:**
- ✅ GitHub Pages에서 작동
- ❌ 게시판 기능 제거
- ❌ 로그인 기능 제거
- ❌ 방명록 기능 제거
- ❌ 음악 업로드 기능 제거

**변경 범위:**
- 읽기 전용 정보 페이지만 유지
- 모든 데이터베이스 기능 제거

---

### 원인 2: Service Worker 캐시 문제

**증상:**
```javascript
// Console 에러:
Service Worker registration failed
```

**해결 방법:**

**1. Service Worker 캐시 삭제**

```
F12 → Application 탭
→ Service Workers
→ "Unregister" 클릭
→ "Clear storage" 클릭
→ 페이지 새로고침
```

**2. 시크릿 모드에서 테스트**

```
Windows: Ctrl + Shift + N
Mac: Cmd + Shift + N
```

시크릿 모드에서 정상 작동하면 캐시 문제입니다.

---

### 원인 3: JavaScript 파일 경로 문제

**증상:**
```javascript
// Console 에러:
GET https://jsd-gyeongju.com/js/main.js 404 (Not Found)
```

**해결 방법:**

**1. GitHub Repository에서 파일 확인**

```
✅ js/main.js 존재하는지 확인
✅ js/music-player.js 존재하는지 확인
```

**2. index.html에서 경로 확인**

```html
<!-- 올바른 경로 (상대 경로) -->
<script src="./js/main.js"></script>
<script src="./js/music-player.js"></script>

<!-- 잘못된 경로 -->
<script src="/js/main.js"></script>
```

---

### 원인 4: CORS 정책 오류

**증상:**
```javascript
// Console 에러:
Access to fetch at '...' has been blocked by CORS policy
```

**원인:**
- 외부 API 호출 시 CORS 미설정

**해결 방법:**
- 백엔드 API에 CORS 헤더 추가
- 또는 Genspark 플랫폼 사용 (자동 CORS 처리)

---

## 🎯 권장 해결 방법

### 🥇 가장 좋은 방법: Genspark 플랫폼으로 이전

**이유:**
1. ✅ RESTful Table API 자동 제공
2. ✅ 데이터베이스 자동 생성
3. ✅ 모든 기능 작동 보장
4. ✅ 무료
5. ✅ 커스텀 도메인 지원

**단계:**
1. Genspark 계정 생성
2. 프로젝트 업로드
3. 자동 배포
4. 도메인 연결

---

### 🥈 임시 방법: 정적 버전으로 변경

**읽기 전용 웹사이트:**
- 증산도 소개
- 입도 안내
- 도장 소식 (고정 콘텐츠)
- 연락처 정보

**제거할 기능:**
- 게시판 (데이터베이스 필요)
- 로그인 (백엔드 필요)
- 방명록 (데이터베이스 필요)
- 음악 업로드 (백엔드 필요)

---

## 🔧 임시 해결: 에러 숨기기

### main.js 수정 (임시 방법)

```javascript
// 모든 API 호출을 try-catch로 감싸기

async function loadPosts() {
  try {
    const response = await fetch('tables/posts');
    if (!response.ok) throw new Error('API not available');
    const data = await response.json();
    // ... 데이터 처리
  } catch (error) {
    console.log('API not available - using static mode');
    // 에러 메시지 숨기기
    // 정적 콘텐츠만 표시
  }
}
```

**효과:**
- ❌ 빨간색 에러 박스 사라짐
- ❌ 게시판/방명록 등은 여전히 작동 안 함
- ✅ 정적 페이지는 정상 표시

---

## 📝 단계별 해결 절차

### Step 1: 에러 확인

- [ ] F12 → Console 탭 열기
- [ ] 에러 메시지 스크린샷
- [ ] Network 탭에서 실패한 요청 확인

### Step 2: 원인 파악

**API 404 에러가 있다면:**
- → Genspark 플랫폼 사용 고려
- → 또는 정적 버전으로 변경

**Service Worker 에러가 있다면:**
- → 캐시 삭제
- → 시크릿 모드 테스트

**파일 404 에러가 있다면:**
- → GitHub에 파일 업로드 확인
- → 경로 수정

### Step 3: 해결 방법 선택

**Option A: Genspark 플랫폼 (추천)**
- 모든 기능 작동
- 무료
- 간단

**Option B: 정적 버전**
- 읽기 전용
- GitHub Pages 사용 가능
- 제한된 기능

**Option C: 백엔드 구축**
- 복잡
- 시간 소요
- 비용 발생

---

## 🧪 테스트 방법

### 1. 시크릿 모드 테스트

```
Ctrl + Shift + N (Windows)
Cmd + Shift + N (Mac)
```

**시크릿 모드에서 작동하면:**
- 캐시 문제 → 캐시 삭제

**시크릿 모드에서도 안 되면:**
- API 문제 → Genspark 사용

---

### 2. 다른 브라우저 테스트

**Chrome에서 안 되면:**
- Firefox 시도
- Safari 시도 (Mac)

**모든 브라우저에서 안 되면:**
- API 문제 확실

---

### 3. 개발자 도구 에러 확인

**Console에 에러가 없으면:**
- CSS/디자인 문제
- 콘텐츠가 흰색으로 표시될 수 있음

**Console에 에러가 있으면:**
- JavaScript 문제
- API 문제

---

## 📞 추가 도움

**다음 정보를 제공해 주세요:**

1. **브라우저 Console 스크린샷** (F12)
2. **Network 탭 스크린샷**
3. **어떤 에러 메시지가 표시되는지**
4. **GitHub Repository URL**

**예시:**
```
Console 에러:
GET https://jsd-gyeongju.com/tables/posts 404 (Not Found)

Network 탭:
tables/posts - 404 Not Found
tables/users - 404 Not Found
```

---

## ✅ 요약

**문제:** 웹페이지는 로딩되지만 콘텐츠가 비어있고 빨간색 에러 표시

**주요 원인:** RESTful Table API가 작동하지 않음 (GitHub Pages는 정적 파일만 호스팅)

**해결 방법:**
1. **Genspark 플랫폼 사용** (추천) - 모든 기능 작동
2. **정적 버전으로 변경** - 읽기 전용 웹사이트
3. **백엔드 직접 구축** - 복잡하고 비용 발생

**다음 단계:**
1. F12 → Console 탭 열기
2. 에러 메시지 확인
3. 스크린샷 공유
4. 해결 방법 선택

---

**© 2025 증산도 경주 노서도장**
