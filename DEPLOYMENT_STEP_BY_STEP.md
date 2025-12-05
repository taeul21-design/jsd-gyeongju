# 🚀 웹사이트 배포 실전 가이드

## 📖 현재 상황

현재 여러분은 개발 환경에서 웹사이트를 만들고 있습니다.
이 웹사이트를 **인터넷에 올려서** 누구나 접속할 수 있게 하려면 **배포(Deployment)**가 필요합니다.

---

## 🎯 가장 쉬운 배포 방법: Netlify Drop

**소요 시간: 3분**
**난이도: ⭐ (매우 쉬움)**

---

## 📦 1단계: 프로젝트 파일 다운로드

먼저 현재 프로젝트의 모든 파일을 다운로드해야 합니다.

### 다운로드할 파일 목록

```
필수 파일:
✅ index.html
✅ manifest.json
✅ service-worker.js
✅ css/ 폴더 (전체)
✅ js/ 폴더 (전체)
✅ images/ 폴더 (전체)

선택사항 (문서 파일):
- README.md
- *.md 파일들
```

### 파일 다운로드 방법

#### 방법 1: 파일 탐색기에서 복사

1. 현재 프로젝트 폴더 열기
2. 다음 파일/폴더 선택:
   ```
   index.html
   manifest.json
   service-worker.js
   css/ (폴더 전체)
   js/ (폴더 전체)
   images/ (폴더 전체)
   ```
3. 바탕화면에 새 폴더 생성: `jsd-noseo-deploy`
4. 선택한 파일/폴더를 새 폴더에 복사

#### 방법 2: ZIP 파일로 압축

1. 위 파일들 선택
2. 마우스 우클릭
3. "보내기" → "압축(ZIP) 폴더"
4. 파일명: `jsd-noseo.zip`

---

## 🌐 2단계: Netlify Drop으로 배포

### Netlify Drop이란?

**계정 없이** 드래그 앤 드롭만으로 즉시 배포할 수 있는 서비스입니다!

### 배포 방법

#### 1. Netlify Drop 접속

브라우저에서 다음 주소 접속:
```
https://app.netlify.com/drop
```

또는 Google에서 검색:
```
netlify drop
```

#### 2. 파일 드래그 앤 드롭

화면에 큰 드롭 영역이 나타납니다:

```
┌─────────────────────────────────────┐
│                                     │
│   Drag and drop your site           │
│   output folder here                │
│                                     │
│   또는 폴더를 여기로 드래그하세요    │
│                                     │
└─────────────────────────────────────┘
```

**두 가지 방법:**

**방법 A: 폴더 드래그**
1. `jsd-noseo-deploy` 폴더를 드래그
2. Netlify Drop 화면에 드롭

**방법 B: ZIP 파일 드래그**
1. `jsd-noseo.zip` 파일을 드래그
2. Netlify Drop 화면에 드롭

#### 3. 배포 진행

업로드가 시작되면:

```
⬆️ Uploading...
📦 Building...
✅ Deploy successful!
```

약 **1-2분** 소요됩니다.

#### 4. 배포 URL 확인

배포가 완료되면 다음과 같은 화면이 나타납니다:

```
┌─────────────────────────────────────┐
│  ✅ Your site is live!              │
│                                     │
│  https://random-name-123456         │
│         .netlify.app                │
│                                     │
│  [Copy URL]  [Visit Site]           │
└─────────────────────────────────────┘
```

**이 URL이 배포 URL입니다!** 📋

예시:
```
https://wonderful-darwin-abc123.netlify.app
https://elegant-curie-123456.netlify.app
https://romantic-tesla-789012.netlify.app
```

#### 5. URL 복사 및 저장

1. **"Copy URL"** 버튼 클릭
2. 메모장에 붙여넣기
3. 저장!

---

## ✅ 3단계: 배포 확인

### 웹사이트 접속 테스트

1. 새 브라우저 탭 열기
2. 복사한 URL 붙여넣기
3. Enter 키

**웹사이트가 보이면 성공!** 🎉

### 확인 사항

- [ ] 홈 페이지 로딩
- [ ] 모든 섹션 표시
- [ ] 이미지 정상 표시
- [ ] 네비게이션 작동
- [ ] 게시판 표시

### PWA 파일 확인

브라우저에서 다음 URL 직접 입력:

```
https://your-site.netlify.app/manifest.json
→ JSON 파일이 보이면 ✅

https://your-site.netlify.app/service-worker.js
→ JavaScript 코드가 보이면 ✅

https://your-site.netlify.app/images/icon-512x512.png
→ 아이콘 이미지가 보이면 ✅
```

모두 확인되면 **APK 생성 준비 완료!**

---

## 🔧 4단계: URL 이름 변경 (선택사항)

자동 생성된 URL이 너무 복잡하다면 변경할 수 있습니다.

### 계정 생성 (무료)

1. Netlify Drop 화면에서 **"Claim site"** 또는 **"Sign up"** 클릭
2. 이메일 또는 GitHub로 가입
3. 무료 계정 생성

### URL 변경

1. 로그인 후 **"Site settings"** 클릭
2. **"Change site name"** 클릭
3. 새 이름 입력:
   ```
   jsd-noseo
   jeungsando-noseo
   jsd-gyeongju-noseo
   ```
4. **"Save"** 클릭

**변경 결과:**
```
이전: https://wonderful-darwin-123456.netlify.app
이후: https://jsd-noseo.netlify.app
```

---

## 🎯 다른 배포 방법

Netlify Drop이 안 되는 경우 다른 방법을 사용할 수 있습니다.

### 방법 2: Netlify 계정으로 배포

#### 1. Netlify 가입

1. https://www.netlify.com/ 접속
2. **"Sign up"** 클릭
3. 이메일 또는 GitHub로 가입

#### 2. 새 사이트 생성

1. 로그인 후 **"Add new site"** 클릭
2. **"Deploy manually"** 선택

#### 3. 파일 업로드

1. `jsd-noseo-deploy` 폴더를 드래그
2. 업로드 영역에 드롭

#### 4. 배포 완료

자동으로 배포되고 URL 생성됩니다!

---

### 방법 3: Vercel로 배포

#### 1. Vercel 가입

1. https://vercel.com/ 접속
2. **"Sign Up"** 클릭
3. GitHub, GitLab, 또는 이메일로 가입

#### 2. 새 프로젝트

1. **"Add New"** → **"Project"** 클릭
2. **"Continue with Other Sources"** 선택

#### 3. 파일 업로드

프로젝트 파일을 업로드하거나 드래그 앤 드롭

#### 4. 배포

**"Deploy"** 버튼 클릭하면 자동 배포!

**생성되는 URL:**
```
https://jsd-noseo.vercel.app
https://jsd-noseo-git-main-username.vercel.app
```

---

### 방법 4: GitHub Pages로 배포

#### 1. GitHub 계정 생성

1. https://github.com/ 접속
2. **"Sign up"** 클릭
3. 계정 생성

#### 2. 새 Repository 생성

1. **"New repository"** 클릭
2. Repository 이름: `jsd-noseo-dojang`
3. **Public** 선택
4. **"Create repository"** 클릭

#### 3. 파일 업로드

1. **"uploading an existing file"** 클릭
2. 프로젝트 파일 전체 드래그 앤 드롭
3. **"Commit changes"** 클릭

#### 4. GitHub Pages 활성화

1. **"Settings"** 탭 클릭
2. 좌측 메뉴에서 **"Pages"** 클릭
3. Source에서 **"main"** 브랜치 선택
4. **"Save"** 클릭

#### 5. URL 확인

5-10분 후 URL 생성:
```
https://[GitHub사용자명].github.io/jsd-noseo-dojang/
```

---

## 📱 배포 URL 사용하기

배포가 완료되고 URL을 얻었다면:

### 1. PWA Builder에 입력

```
1. https://www.pwabuilder.com/ 접속
2. 배포 URL 입력
3. Start 클릭
```

### 2. APK 생성

```
1. Android 선택
2. 정보 입력
3. Generate 클릭
4. APK 다운로드
```

---

## 🔄 배포 업데이트 방법

웹사이트를 수정한 후 다시 배포하려면:

### Netlify (계정 있는 경우)

1. Netlify 대시보드 접속
2. 사이트 선택
3. **"Deploys"** 탭
4. 드래그 앤 드롭 영역에 새 파일 업로드

### Netlify Drop (계정 없는 경우)

1. 처음과 동일하게 파일 드래그
2. 새로운 URL 생성됨
3. PWA Builder에서 새 URL로 APK 재생성

---

## 💡 추천 방법 비교

| 방법 | 난이도 | 계정 필요 | URL 변경 | 업데이트 |
|------|--------|-----------|----------|----------|
| **Netlify Drop** | ⭐ | ❌ | ❌ | 어려움 |
| **Netlify (계정)** | ⭐⭐ | ✅ | ✅ | 쉬움 |
| **Vercel** | ⭐⭐ | ✅ | ✅ | 쉬움 |
| **GitHub Pages** | ⭐⭐⭐ | ✅ | ❌ | 보통 |

### 추천 순위

1. **Netlify Drop** → 첫 테스트용 (계정 불필요)
2. **Netlify (계정)** → 실제 사용 (URL 변경 가능)
3. **Vercel** → 빠른 속도
4. **GitHub Pages** → 장기 프로젝트

---

## ❓ 자주 묻는 질문

### Q1: 배포에 돈이 드나요?

**A:** 아니요! 완전 무료입니다.
- Netlify: 무료
- Vercel: 무료
- GitHub Pages: 무료

### Q2: 배포 후 수정할 수 있나요?

**A:** 네! 언제든지 수정 가능합니다.
- 파일 수정
- 다시 업로드
- 자동으로 업데이트

### Q3: URL이 마음에 안 들어요

**A:** 계정을 만들면 URL을 변경할 수 있습니다.
```
random-name-123.netlify.app
→ jsd-noseo.netlify.app
```

### Q4: 얼마나 오래 유지되나요?

**A:** 영구적으로 유지됩니다!
- 무료 플랜도 영구 호스팅
- 삭제하지 않는 한 계속 유지

### Q5: 여러 버전을 배포할 수 있나요?

**A:** 네! 가능합니다.
```
메인: https://jsd-noseo.netlify.app
테스트: https://jsd-noseo-test.netlify.app
개발: https://jsd-noseo-dev.netlify.app
```

---

## 🎉 배포 완료 체크리스트

배포가 성공했는지 확인하세요:

- [ ] 배포 URL 복사 완료
- [ ] 브라우저에서 웹사이트 접속 확인
- [ ] 모든 페이지 정상 작동
- [ ] 이미지 로딩 확인
- [ ] manifest.json 접근 가능
- [ ] service-worker.js 접근 가능
- [ ] 아이콘 파일 접근 가능

**모두 체크되면 APK 생성 준비 완료!** ✅

---

## 📞 도움이 필요하신가요?

### 배포 관련 지원

- 📧 Netlify: https://www.netlify.com/support/
- 📧 Vercel: https://vercel.com/support
- 💬 Discord: 온라인 커뮤니티

### 도장 문의

- 📱 전화: 054-742-1691
- 🏠 방문: 경북 경주시 금성로 271, 3층

---

## 🚀 다음 단계

배포가 완료되었다면:

1. ✅ **배포 URL 확인 완료**
2. ➡️ **APK_QUICK_START.md** 파일 열기
3. ➡️ **PWA Builder로 APK 생성**

---

## 🎯 빠른 요약

### 3단계 배포

```
1️⃣ 파일 준비
   프로젝트 파일 → 새 폴더에 복사
   ↓
2️⃣ Netlify Drop
   https://app.netlify.com/drop
   폴더 드래그 앤 드롭
   ↓
3️⃣ URL 복사
   생성된 URL 복사 및 저장
```

**총 소요 시간: 3분** ⏱️

배포가 완료되면 **APK를 만들 준비가 끝납니다!** 🎊
