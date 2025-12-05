# 🔧 manifest.json 도메인 설정 가이드

도메인 등록 후 **manifest.json 파일을 업데이트**하여 PWA가 올바르게 작동하도록 설정하는 가이드입니다.

---

## 📋 목차

1. [manifest.json이란?](#1-manifestjson이란)
2. [도메인 변경 시 수정사항](#2-도메인-변경-시-수정사항)
3. [단계별 수정 방법](#3-단계별-수정-방법)
4. [확인 및 테스트](#4-확인-및-테스트)
5. [문제 해결](#5-문제-해결)

---

## 1. manifest.json이란?

### 💡 역할

**manifest.json**은 PWA(Progressive Web App)의 설정 파일입니다.

**주요 기능:**
- 📱 앱 이름 및 설명 정의
- 🎨 앱 아이콘 및 테마 색상 설정
- 🚀 앱 시작 URL 및 표시 모드 지정
- 📐 화면 방향 및 범위 설정

### 📄 현재 설정 (manifest.json)

```json
{
  "name": "증산도 경주 노서도장",
  "short_name": "경주노서도장",
  "description": "후천가을 문명시대를 준비하는 증산도 경주 노서도장 사이버도장",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#C8102E",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "images/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    ...
  ],
  "categories": ["education", "lifestyle", "news"],
  "scope": "/",
  "lang": "ko-KR",
  "dir": "ltr"
}
```

---

## 2. 도메인 변경 시 수정사항

### ⚠️ 일반적으로 수정 불필요

대부분의 경우 `manifest.json`은 **상대 경로**를 사용하므로 도메인 변경 시 수정이 필요 없습니다.

현재 설정:
```json
"start_url": "/"
"scope": "/"
"icons": [{ "src": "images/icon-72x72.png" }]
```

이는 어떤 도메인에서도 작동합니다:
- ✅ `https://jsdnoseo.tk/`
- ✅ `https://noseodojang.com/`
- ✅ `https://jsdnoseo.netlify.app/`

### 🔧 수정이 필요한 경우

다음과 같은 **특수한 경우**에만 수정이 필요합니다:

#### 1) 서브디렉토리에 배포하는 경우

❌ **문제:**
```
도메인: https://example.com/jsd/
현재 설정: "start_url": "/"
```

✅ **해결:**
```json
{
  "start_url": "/jsd/",
  "scope": "/jsd/"
}
```

#### 2) 절대 URL을 사용하는 경우 (비추천)

❌ **문제:**
```json
{
  "start_url": "https://old-domain.com/",
  "icons": [{ "src": "https://old-domain.com/images/icon.png" }]
}
```

✅ **해결:**
```json
{
  "start_url": "https://new-domain.tk/",
  "icons": [{ "src": "https://new-domain.tk/images/icon.png" }]
}
```

💡 **권장:** 상대 경로 사용 (`/`, `images/icon.png`)

#### 3) Open Graph 이미지 등의 절대 URL

`manifest.json`이 아닌 `index.html`의 `<head>` 섹션에 있는 절대 URL도 확인하세요:

```html
<meta property="og:image" content="https://old-domain.com/images/og-image.png">
<link rel="canonical" href="https://old-domain.com/">
```

---

## 3. 단계별 수정 방법

### 🔍 Step 1: 현재 manifest.json 확인

1. 프로젝트 폴더에서 `manifest.json` 파일 열기
2. 현재 설정 확인:
   ```json
   {
     "start_url": "/",
     "scope": "/",
     ...
   }
   ```

### ✏️ Step 2: 필요 시 수정

#### 경우 A: 루트 도메인 배포 (수정 불필요)

```
배포 URL: https://jsdnoseo.tk/
현재 설정: "start_url": "/"
```

✅ **수정 불필요 - 그대로 사용**

#### 경우 B: 서브디렉토리 배포

```
배포 URL: https://example.com/jsd-noseo/
```

**수정 필요:**

```json
{
  "name": "증산도 경주 노서도장",
  "short_name": "경주노서도장",
  "start_url": "/jsd-noseo/",
  "scope": "/jsd-noseo/",
  ...
}
```

#### 경우 C: 절대 URL 사용 중

**기존:**
```json
{
  "start_url": "https://old-domain.com/",
  "icons": [{
    "src": "https://old-domain.com/images/icon-192x192.png"
  }]
}
```

**수정 후:**
```json
{
  "start_url": "/",
  "icons": [{
    "src": "images/icon-192x192.png"
  }]
}
```

💡 **권장:** 상대 경로로 변경

### 📝 Step 3: index.html 확인

`index.html`의 `<head>` 섹션도 확인하세요:

**확인 항목:**

```html
<!-- Manifest 링크 (상대 경로 확인) -->
<link rel="manifest" href="/manifest.json">

<!-- Open Graph 메타 태그 (절대 URL 확인) -->
<meta property="og:url" content="https://jsdnoseo.tk/">
<meta property="og:image" content="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800">

<!-- Canonical URL (절대 URL 확인) -->
<link rel="canonical" href="https://jsdnoseo.tk/">

<!-- Apple Touch Icon (상대 경로 확인) -->
<link rel="apple-touch-icon" href="/images/icon-152x152.png">
```

**수정 예시 (새 도메인: jsdnoseo.tk):**

```html
<meta property="og:url" content="https://jsdnoseo.tk/">
<link rel="canonical" href="https://jsdnoseo.tk/">
```

### 💾 Step 4: 파일 저장 및 재배포

1. 수정한 파일 저장
2. 호스팅 서비스에 재배포:
   - **Netlify:** ZIP 파일 다시 업로드
   - **GitHub Pages:** Git push
   - **Vercel:** Git push
3. 배포 완료 대기 (1~2분)

---

## 4. 확인 및 테스트

### ✅ Step 1: 브라우저에서 확인

1. 새 도메인으로 접속:
   ```
   https://jsdnoseo.tk
   ```

2. F12 (개발자 도구) 열기
3. **Application** 탭 클릭
4. 좌측 **Manifest** 선택
5. 설정 확인:
   ```
   Name: 증산도 경주 노서도장
   Start URL: https://jsdnoseo.tk/
   Display: standalone
   Icons: 8개 표시
   ```

### ✅ Step 2: PWA 설치 가능 여부 확인

**Chrome (Android/PC):**
- 주소창 우측에 설치 아이콘 (➕) 표시 여부 확인

**Safari (iOS):**
- 공유 버튼(⬆️) → "홈 화면에 추가" 메뉴 표시 여부 확인

### ✅ Step 3: 실제 설치 테스트

1. 모바일에서 앱 설치
2. 홈 화면에 아이콘 확인
3. 앱 실행 시 다음 확인:
   - [ ] 앱 이름 표시: "증산도 경주 노서도장"
   - [ ] 브라우저 주소창 숨김
   - [ ] 전체 화면 모드
   - [ ] 상단 테마 색상 (#C8102E)

### ✅ Step 4: 온라인 검증 도구

**Manifest 검증:**
- https://manifest-validator.appspot.com
- manifest.json URL 입력 후 검증

**PWA 검증:**
- Chrome: Lighthouse 실행 (F12 → Lighthouse → Generate report)
- 점수 확인: Progressive Web App 80점 이상

---

## 5. 문제 해결

### Q1. "manifest.json을 가져올 수 없음" 오류

**원인:**
- 파일 경로 오류
- 잘못된 JSON 형식

**해결 방법:**

1. `index.html`의 manifest 링크 확인:
   ```html
   <link rel="manifest" href="/manifest.json">
   ```

2. manifest.json 파일이 루트 디렉토리에 있는지 확인

3. JSON 형식 검증:
   - https://jsonlint.com
   - manifest.json 내용 붙여넣기 후 검증

### Q2. 앱 아이콘이 표시되지 않음

**원인:**
- 아이콘 파일 경로 오류
- 아이콘 파일 누락

**해결 방법:**

1. `images/` 폴더에 모든 아이콘 파일 확인:
   ```
   icon-72x72.png
   icon-96x96.png
   icon-128x128.png
   icon-144x144.png
   icon-152x152.png
   icon-192x192.png
   icon-384x384.png
   icon-512x512.png
   ```

2. 브라우저에서 직접 접속 테스트:
   ```
   https://jsdnoseo.tk/images/icon-192x192.png
   ```

3. 아이콘이 PNG 형식이고 정확한 크기인지 확인

### Q3. "홈 화면에 추가" 메뉴가 안 보임

**원인:**
- HTTPS 미적용
- manifest.json 오류
- Service Worker 미등록

**해결 방법:**

1. HTTPS 확인:
   - 주소창에 자물쇠 아이콘 표시되는지 확인
   - `https://`로 시작하는지 확인

2. Service Worker 확인:
   - F12 → Application → Service Workers
   - 등록된 Worker 확인

3. PWA 기준 충족 확인:
   - Manifest 파일 존재
   - HTTPS 적용
   - Service Worker 등록
   - 아이콘 192x192 이상

### Q4. 앱 이름이 잘림

**원인:**
- `short_name`이 너무 긺

**해결 방법:**

`manifest.json`에서 `short_name` 수정:

```json
{
  "name": "증산도 경주 노서도장",
  "short_name": "노서도장",
  ...
}
```

권장 길이:
- `name`: 최대 45자
- `short_name`: 최대 12자 (홈 화면 표시용)

### Q5. 테마 색상이 적용되지 않음

**원인:**
- `theme_color` 설정 오류
- 브라우저가 테마 색상 미지원

**해결 방법:**

1. `manifest.json` 확인:
   ```json
   {
     "theme_color": "#C8102E"
   }
   ```

2. `index.html`에도 추가:
   ```html
   <meta name="theme-color" content="#C8102E">
   ```

3. 캐시 삭제 후 재시도

---

## 📝 권장 manifest.json 템플릿

### 루트 도메인 배포용 (추천)

```json
{
  "name": "증산도 경주 노서도장",
  "short_name": "노서도장",
  "description": "후천가을 문명시대를 준비하는 증산도 경주 노서도장 사이버도장",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#C8102E",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "images/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "lifestyle", "news"],
  "scope": "/",
  "lang": "ko-KR",
  "dir": "ltr"
}
```

### 서브디렉토리 배포용

```json
{
  "name": "증산도 경주 노서도장",
  "short_name": "노서도장",
  "start_url": "/jsd-noseo/",
  "scope": "/jsd-noseo/",
  ...
}
```

---

## 🔗 관련 가이드

- 📄 **DEPLOYMENT_COMPLETE_GUIDE.md** - 전체 배포 가이드
- 📄 **MOBILE_APP_INSTALL_GUIDE.md** - 모바일 앱 설치 가이드
- 📄 **HOSTING_CONNECTION_GUIDE.md** - 호스팅 연결 가이드

---

## 📞 도움말

**증산도 경주 노서도장**
- 📞 전화: 054-742-1691
- 📍 주소: 경북 경주시 금성로 271, 3층(노서동)

---

**© 2025 증산도 경주 노서도장**
