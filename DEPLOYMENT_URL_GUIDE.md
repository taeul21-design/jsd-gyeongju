# 🌐 배포 URL 확인 가이드

## 📖 배포 URL이란?

**배포 URL**은 여러분의 웹사이트가 인터넷에 올라간 후 접속할 수 있는 주소입니다.

예시:
- `https://jsd-noseo.netlify.app`
- `https://jsd-noseo.vercel.app`
- `https://your-custom-domain.com`

---

## 🚀 배포 방법 및 URL 확인

### 방법 1: Publish 탭 사용 (가장 쉬움) ⭐

현재 개발 환경에는 **Publish 탭**이 있습니다.

#### 1단계: Publish 탭 클릭

화면 상단의 **"Publish"** 탭을 클릭하세요.

#### 2단계: 배포 서비스 선택

세 가지 옵션이 나타납니다:

| 서비스 | URL 형식 | 특징 |
|--------|----------|------|
| **Netlify** | `https://프로젝트명.netlify.app` | 가장 쉬움, 자동 HTTPS |
| **Vercel** | `https://프로젝트명.vercel.app` | 빠른 속도 |
| **GitHub Pages** | `https://사용자명.github.io/프로젝트` | 무료 호스팅 |

**추천: Netlify** (초보자에게 가장 쉬움)

#### 3단계: Deploy 버튼 클릭

1. **Netlify** 선택
2. **"Deploy to Netlify"** 버튼 클릭
3. 배포 진행 (1-2분 대기)

#### 4단계: 배포 URL 확인

배포가 완료되면 다음과 같은 URL이 생성됩니다:

```
✅ 배포 완료!

배포 URL: https://증산도-경주-노서도장.netlify.app
```

또는 자동 생성된 이름:

```
https://wonderful-darwin-abc123.netlify.app
```

이 URL을 **복사**하세요! 📋

---

### 방법 2: Netlify 직접 사용

Publish 탭이 없는 경우 Netlify를 직접 사용할 수 있습니다.

#### 1단계: Netlify 계정 생성

1. [Netlify 웹사이트](https://www.netlify.com/) 접속
2. **"Sign up"** 클릭
3. GitHub, GitLab 또는 이메일로 가입

#### 2단계: 새 사이트 배포

1. 로그인 후 **"Add new site"** 클릭
2. **"Deploy manually"** 선택

#### 3단계: 파일 업로드

1. 프로젝트 폴더의 **모든 파일** 선택:
   ```
   index.html
   manifest.json
   service-worker.js
   css/
   js/
   images/
   ```

2. Netlify 창으로 **드래그 앤 드롭**

#### 4단계: 배포 완료 및 URL 확인

배포가 완료되면 자동으로 URL이 생성됩니다:

```
https://random-name-123456.netlify.app
```

**이 URL을 복사하세요!**

#### 5단계: 사이트 이름 변경 (선택사항)

1. 사이트 설정으로 이동
2. **"Site settings"** 클릭
3. **"Change site name"** 클릭
4. 원하는 이름 입력:
   ```
   jsd-noseo
   ```
5. 저장하면 URL이 변경됩니다:
   ```
   https://jsd-noseo.netlify.app
   ```

---

### 방법 3: Vercel 사용

#### 1단계: Vercel 계정 생성

1. [Vercel 웹사이트](https://vercel.com/) 접속
2. **"Sign Up"** 클릭
3. GitHub 또는 이메일로 가입

#### 2단계: 새 프로젝트 생성

1. **"Add New Project"** 클릭
2. **"Deploy from Existing Project"** 선택

#### 3단계: 파일 업로드

1. 프로젝트 폴더 선택
2. 업로드 또는 GitHub 연결

#### 4단계: 배포 및 URL 확인

배포 완료 후 URL 생성:

```
https://jsd-noseo.vercel.app
```

---

### 방법 4: GitHub Pages 사용

#### 1단계: GitHub 계정 생성

1. [GitHub 웹사이트](https://github.com/) 접속
2. 계정 생성

#### 2단계: 새 Repository 생성

1. **"New repository"** 클릭
2. Repository 이름:
   ```
   jsd-noseo-dojang
   ```
3. **Public** 선택
4. **"Create repository"** 클릭

#### 3단계: 파일 업로드

1. **"uploading an existing file"** 클릭
2. 프로젝트 파일 전체 드래그 앤 드롭
3. **"Commit changes"** 클릭

#### 4단계: GitHub Pages 활성화

1. Repository **"Settings"** 클릭
2. 좌측 메뉴에서 **"Pages"** 클릭
3. Source에서 **"main"** 브랜치 선택
4. **"Save"** 클릭

#### 5단계: 배포 URL 확인

몇 분 후 URL이 생성됩니다:

```
https://[사용자명].github.io/jsd-noseo-dojang/
```

---

## 🔍 배포 URL 예시

### Netlify

```
기본 URL:
https://wonderful-darwin-abc123.netlify.app

커스텀 URL (이름 변경 후):
https://jsd-noseo.netlify.app
https://증산도-경주-노서도장.netlify.app
```

### Vercel

```
기본 URL:
https://jsd-noseo-git-main-username.vercel.app

커스텀 URL:
https://jsd-noseo.vercel.app
```

### GitHub Pages

```
기본 URL:
https://username.github.io/jsd-noseo-dojang/
```

---

## 📋 URL 확인 체크리스트

배포 완료 후 다음을 확인하세요:

### ✅ URL 형식 확인

- [ ] `https://`로 시작 (HTTP**S** 필수!)
- [ ] `.netlify.app` 또는 `.vercel.app` 또는 `.github.io` 포함
- [ ] 브라우저에서 접속 가능

### ✅ 웹사이트 작동 확인

- [ ] 홈 페이지 로딩
- [ ] 모든 섹션 표시
- [ ] 이미지 로딩
- [ ] 네비게이션 작동
- [ ] 로그인/회원가입 작동

### ✅ PWA 확인

- [ ] manifest.json 접근 가능
  ```
  https://your-site.netlify.app/manifest.json
  ```
- [ ] service-worker.js 접근 가능
  ```
  https://your-site.netlify.app/service-worker.js
  ```
- [ ] 아이콘 접근 가능
  ```
  https://your-site.netlify.app/images/icon-512x512.png
  ```

---

## 🎯 배포 URL 사용 예시

### 1. PWA Builder에서 사용

```
1. PWA Builder 접속
2. URL 입력창에 배포 URL 입력:
   https://jsd-noseo.netlify.app
3. Start 버튼 클릭
```

### 2. 카카오톡 공유 설정

`js/main.js` 파일에서:

```javascript
const currentUrl = window.location.href;
// 자동으로 현재 URL 사용 (배포 URL)
```

배포 후 자동으로 올바른 URL 사용됩니다!

### 3. 도메인 연결 (선택사항)

자체 도메인이 있다면:

```
기존: https://jsd-noseo.netlify.app
↓
커스텀: https://www.jsd-noseo.kr
```

**Netlify 설정:**
1. 도메인 구매 (가비아, 호스팅케이알 등)
2. Netlify에서 "Domain settings"
3. "Add custom domain"
4. DNS 설정

---

## 🌐 실제 배포 URL 예시

### 증산도 경주 노서도장 예상 URL

배포 후 다음과 같은 URL이 생성될 수 있습니다:

#### Netlify (추천)

```
https://jsd-gyeongju-noseo.netlify.app
https://jeungsando-noseo.netlify.app
https://증산도노서도장.netlify.app
```

#### Vercel

```
https://jsd-noseo.vercel.app
https://jeungsando-noseo.vercel.app
```

#### GitHub Pages

```
https://[GitHub사용자명].github.io/jsd-noseo-dojang/
```

---

## 🔧 URL 테스트 방법

배포 URL을 얻은 후:

### 1. 브라우저 테스트

```
1. Chrome 또는 Edge 열기
2. 배포 URL 입력
3. 웹사이트 로딩 확인
```

### 2. 모바일 테스트

```
1. 휴대폰 브라우저 열기
2. 배포 URL 입력
3. 모바일 화면 확인
```

### 3. PWA 테스트

```
1. Chrome 개발자 도구 열기 (F12)
2. Lighthouse 탭 선택
3. "Progressive Web App" 체크
4. "Generate report" 클릭
5. 점수 확인 (90점 이상 권장)
```

---

## 📱 APK 생성 시 사용

배포 URL을 확인했다면:

### PWA Builder 정보 입력

```
Host: jsd-noseo.netlify.app
(https:// 제외하고 입력)

Start URL: /

Full URL:
https://jsd-noseo.netlify.app/
```

---

## ❓ 자주 묻는 질문

### Q1: 배포 URL은 언제 생성되나요?

**A:** 배포가 완료된 직후 자동으로 생성됩니다.
- Netlify: 1-2분
- Vercel: 1분
- GitHub Pages: 5-10분

### Q2: URL을 바꿀 수 있나요?

**A:** 네! 가능합니다.

**Netlify:**
```
1. Site settings
2. Change site name
3. 새 이름 입력
```

**Vercel:**
```
1. Project settings
2. Domains
3. Add custom domain
```

### Q3: HTTP와 HTTPS의 차이는?

**A:** 
- **HTTP**: 보안 없음 (❌)
- **HTTPS**: 암호화된 보안 연결 (✅)

PWA는 **HTTPS 필수**입니다!
Netlify, Vercel은 자동으로 HTTPS 제공합니다.

### Q4: 여러 개의 배포 URL을 가질 수 있나요?

**A:** 네! 가능합니다.

```
메인 배포: https://jsd-noseo.netlify.app
테스트 배포: https://jsd-noseo-test.netlify.app
개발 배포: https://jsd-noseo-dev.netlify.app
```

### Q5: 배포 URL이 너무 길어요

**A:** 사이트 이름을 변경하세요:

```
변경 전:
https://wonderful-darwin-123456-abc.netlify.app

변경 후:
https://jsd-noseo.netlify.app
```

훨씬 짧고 기억하기 쉽습니다!

### Q6: 배포가 실패하면?

**A:** 다음을 확인하세요:

1. **파일 확인**
   - index.html이 루트에 있는가?
   - manifest.json이 있는가?
   - service-worker.js가 있는가?

2. **파일 경로 확인**
   - 상대 경로 사용 (`/css/style.css`)
   - 대소문자 정확히 일치

3. **다시 시도**
   - 파일 다시 업로드
   - 캐시 삭제 후 재배포

---

## 🎯 다음 단계

배포 URL을 확인했다면:

### 1️⃣ URL 저장

```
메모장에 저장:

배포 URL: https://jsd-noseo.netlify.app
배포 날짜: 2025-01-10
서비스: Netlify
```

### 2️⃣ PWA Builder로 APK 생성

```
1. https://www.pwabuilder.com/ 접속
2. 배포 URL 입력
3. APK 생성
```

### 3️⃣ 도장 회원들과 공유

```
1. 배포 URL 공유
2. 웹사이트 접속 안내
3. APK 다운로드 링크 공유
```

---

## 📞 도움이 필요하신가요?

### 배포 관련 문의

- 📧 **Netlify 지원**: https://www.netlify.com/support/
- 📧 **Vercel 지원**: https://vercel.com/support
- 📧 **GitHub 지원**: https://support.github.com/

### 도장 문의

- 📱 **전화**: 054-742-1691
- 🏠 **방문**: 경북 경주시 금성로 271, 3층

---

## 🎉 완료!

이제 배포 URL을 확인하는 방법을 알았습니다!

### 요약

1. ✅ **Publish 탭 사용** (가장 쉬움)
2. ✅ **Netlify/Vercel/GitHub Pages** 중 선택
3. ✅ **파일 업로드** 및 배포
4. ✅ **URL 확인** 및 저장
5. ✅ **PWA Builder에서 사용**

**다음 문서:** APK_QUICK_START.md로 이동하여 APK를 생성하세요! 🚀
