# 🖼️ 이미지 표시 문제 해결 가이드

GitHub Pages에 배포 후 이미지가 안 보이는 문제를 해결합니다.

---

## 🔍 현재 상황 분석

### 확인된 내용
1. ✅ CSS는 정상 로딩 (스타일 적용됨)
2. ✅ Font Awesome 아이콘 사용 (서버 이미지 불필요)
3. ⚠️ 앱 아이콘 파일 (`images/` 폴더) 확인 필요

---

## ❌ 문제 원인

### 가능성 1: images 폴더가 업로드되지 않음 (가장 가능성 높음)

**증상:**
- 헤더의 로고 아이콘은 보임 (Font Awesome)
- 파비콘이 안 보임
- PWA 앱 아이콘이 안 보임

**원인:**
- GitHub에 파일 업로드 시 `images/` 폴더를 누락
- 또는 폴더는 있지만 내부 파일이 없음

---

### 가능성 2: 파일 경로 문제

**현재 코드에서 사용 중인 경로:**
```html
<link rel="apple-touch-icon" href="./images/icon-152x152.png">
```

**GitHub Pages 배포 시:**
- ✅ 상대 경로 (`./images/`) - 정상 작동해야 함
- ✅ Repository 루트에 배포됨

---

## ✅ 해결 방법

### Step 1: GitHub Repository에서 확인

1. **https://github.com/[username]/jsd-gyeongju 접속**

2. **파일 목록 확인:**
   ```
   ✅ index.html
   ✅ manifest.json
   ✅ service-worker.js
   ✅ css/
   ✅ js/
   ❓ images/  ← 이 폴더가 있는지 확인!
   ```

3. **images 폴더 클릭하여 내부 확인:**
   ```
   필요한 파일:
   ├── icon-72x72.png
   ├── icon-96x96.png
   ├── icon-128x128.png
   ├── icon-144x144.png
   ├── icon-152x152.png
   ├── icon-192x192.png
   ├── icon-384x384.png
   ├── icon-512x512.png
   └── screenshot1.png (선택사항)
   ```

---

### Step 2-A: images 폴더가 없는 경우 (업로드)

#### 방법 1: GitHub 웹에서 직접 업로드

1. **Repository 메인 페이지**

2. **"Add file" → "Upload files" 클릭**

3. **로컬에서 images 폴더 전체 드래그앤드롭**
   ```
   드래그할 폴더:
   📁 images/
   ```

4. **Commit 메시지 입력:**
   ```
   Add images folder
   ```

5. **"Commit changes" 클릭**

6. **2~3분 대기 후 사이트 확인**

---

#### 방법 2: Git 명령어로 업로드

```bash
# 프로젝트 폴더로 이동
cd /path/to/jsd-gyeongju

# images 폴더가 있는지 확인
ls -la images/

# Git에 추가
git add images/
git commit -m "Add images folder"
git push origin main

# 배포 대기 (2~3분)
```

---

### Step 2-B: images 폴더는 있지만 파일이 없는 경우

#### 아이콘 파일 생성하기

**필요한 아이콘 크기:**
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

**옵션 1: 온라인 도구로 생성 (추천)**

1. **https://www.favicon-generator.org/ 접속**

2. **증산도 로고 이미지 업로드**
   - 또는 임시로 단색 이미지 사용

3. **"Create Favicon" 클릭**

4. **생성된 아이콘 다운로드**

5. **파일 이름 변경:**
   ```
   favicon-16x16.png → icon-72x72.png (작은 크기는 72x72로 사용)
   android-icon-192x192.png → icon-192x192.png
   ...
   ```

6. **GitHub에 업로드**

---

**옵션 2: 임시 아이콘 사용 (빠른 테스트)**

1. **무료 아이콘 다운로드:**
   - https://www.flaticon.com/free-icon/yin-yang_2913133
   - PNG 형식으로 다운로드

2. **이미지 리사이즈:**
   - https://www.iloveimg.com/resize-image
   - 각 크기별로 생성 (72, 96, 128, 144, 152, 192, 384, 512)

3. **파일 이름 변경 후 업로드**

---

**옵션 3: 기존 아이콘이 있다면**

1. **로컬 프로젝트의 images 폴더 확인**

2. **모든 파일이 있는지 체크**

3. **없는 크기는 가장 큰 크기로 복사하여 이름 변경:**
   ```bash
   # 예: 512x512 파일로 모든 크기 생성
   cp icon-512x512.png icon-72x72.png
   cp icon-512x512.png icon-96x96.png
   # ... (나머지 크기도 동일)
   ```

4. **GitHub에 재업로드**

---

### Step 3: 배포 확인

1. **Actions 탭에서 배포 상태 확인**
   ```
   pages build and deployment
   ✅ Success (2 minutes ago)
   ```

2. **사이트 접속:**
   ```
   https://jsd-gyeongju.com
   ```

3. **브라우저 캐시 강제 새로고침:**
   ```
   Windows: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

4. **파비콘 확인:**
   - 브라우저 탭에 작은 아이콘 표시되는지 확인

---

## 🔧 대체 해결 방법: 외부 아이콘 사용

### 아이콘 파일이 없다면 임시로 외부 URL 사용

#### index.html 수정:

```html
<!-- 기존 (로컬 파일) -->
<link rel="apple-touch-icon" href="./images/icon-152x152.png">

<!-- 변경 후 (외부 URL) -->
<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
```

**☯️ 태극 이모지 아이콘 (CDN):**
```html
<head>
    <!-- iOS PWA 지원 - 외부 CDN 사용 -->
    <meta name="apple-mobile-web-app-title" content="경주노서도장">
    <link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="72x72" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="96x96" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="128x128" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="144x144" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="152x152" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="192x192" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="384x384" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="apple-touch-icon" sizes="512x512" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    
    <!-- 파비콘 -->
    <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png">
</head>
```

**장점:**
- ✅ images 폴더 불필요
- ✅ 즉시 작동
- ✅ 빠른 로딩 (CDN)

**단점:**
- ⚠️ 커스텀 로고 사용 불가
- ⚠️ 외부 서비스 의존

---

### manifest.json도 수정:

```json
{
  "name": "증산도 경주 노서도장",
  "short_name": "경주노서도장",
  "icons": [
    {
      "src": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#C8102E"
}
```

---

## 🧪 테스트 방법

### 1. 파비콘 확인

**브라우저 탭:**
```
┌──────────────────────────┐
│ ☯️ 증산도 경주 노서도장  │ ← 아이콘 보이는지 확인
└──────────────────────────┘
```

---

### 2. 아이콘 파일 직접 접속

**브라우저에서 접속:**
```
https://jsd-gyeongju.com/images/icon-192x192.png
```

**결과:**
- ✅ 아이콘 이미지 표시 → 정상
- ❌ 404 에러 → 파일 없음 (업로드 필요)

---

### 3. 개발자 도구 확인

**F12 → Console 탭:**
```javascript
// 에러 메시지 확인
GET https://jsd-gyeongju.com/images/icon-192x192.png 404 (Not Found)
↑
이런 에러가 있으면 파일이 없는 것!
```

**F12 → Network 탭:**
1. F12 열기
2. Network 탭 클릭
3. 페이지 새로고침 (F5)
4. "icon" 검색
5. 빨간색 항목 확인 (404 에러)

---

### 4. PWA 매니페스트 확인

**F12 → Application 탭:**
1. Application 탭 클릭
2. 좌측 "Manifest" 선택
3. 아이콘 섹션 확인:
   ```
   Icons:
   ✅ 72x72 - 이미지 표시됨
   ✅ 192x192 - 이미지 표시됨
   ✅ 512x512 - 이미지 표시됨
   
   또는
   
   ❌ 72x72 - 빨간색 X 표시
   ❌ 192x192 - 빨간색 X 표시
   ```

---

## 📝 체크리스트

배포 후 이미지 문제 해결:

- [ ] GitHub Repository에 `images/` 폴더 존재 확인
- [ ] `images/` 폴더 안에 아이콘 파일들 존재 확인
- [ ] 파일 이름 확인 (대소문자 구분)
  - [ ] icon-72x72.png
  - [ ] icon-192x192.png
  - [ ] icon-512x512.png
- [ ] Actions 탭에서 배포 성공 확인 (✅)
- [ ] 브라우저에서 아이콘 파일 직접 접속 테스트
- [ ] 브라우저 캐시 강제 새로고침 (Ctrl+Shift+R)
- [ ] 파비콘 표시 확인
- [ ] PWA 매니페스트 아이콘 확인 (F12 → Application)

---

## 🚨 긴급 해결 방법

### 지금 당장 해결하려면:

#### Option A: 외부 CDN 사용 (1분)

1. `index.html` 열기
2. 모든 `./images/icon-` 경로를 다음으로 변경:
   ```
   https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/262f.png
   ```
3. Git push
4. 완료!

---

#### Option B: 아이콘 파일 업로드 (5분)

1. 로컬 `images/` 폴더 확인
2. GitHub → "Add file" → "Upload files"
3. `images/` 폴더 드래그앤드롭
4. Commit
5. 2~3분 대기
6. 완료!

---

## 💡 예방책

### 앞으로 이런 문제를 방지하려면:

1. **배포 전 체크리스트 작성**
   - 모든 폴더/파일 목록 확인

2. **Git에 모든 파일 추가 확인**
   ```bash
   git status
   git add .
   git status  # 다시 확인
   ```

3. **배포 후 즉시 테스트**
   - 파비콘 확인
   - 이미지 직접 접속
   - PWA 매니페스트 확인

---

## 📞 추가 도움

**문제가 계속되면:**

1. GitHub Repository URL 공유
2. 스크린샷 제공:
   - Repository 파일 목록
   - 브라우저 개발자 도구 (F12 → Console)
   - 브라우저 개발자 도구 (F12 → Network)

---

**© 2025 증산도 경주 노서도장**
