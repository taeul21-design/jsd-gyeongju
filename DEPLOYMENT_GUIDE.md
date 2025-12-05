# 🚀 배포 가이드

증산도 경주 노서도장 웹사이트를 배포하는 방법을 안내합니다.

---

## 📋 목차

1. [배포 전 체크리스트](#배포-전-체크리스트)
2. [Publish 탭을 통한 배포 (추천)](#publish-탭을-통한-배포-추천)
3. [외부 호스팅 서비스 배포](#외부-호스팅-서비스-배포)
4. [웹하드/클라우드 스토리지 배포](#웹하드클라우드-스토리지-배포)
5. [도메인 연결](#도메인-연결)
6. [배포 후 확인사항](#배포-후-확인사항)

---

## ✅ 배포 전 체크리스트

### 1. 필수 파일 확인

```
✅ index.html
✅ manifest.json
✅ service-worker.js
✅ css/style.css
✅ js/main.js
✅ images/icon-*.png (8개 아이콘)
✅ README.md
```

### 2. 앱 아이콘 생성

아직 아이콘을 생성하지 않았다면:

1. 브라우저에서 `images/generate-icons.html` 열기
2. "모든 아이콘 생성 및 다운로드" 버튼 클릭
3. 다운로드된 파일들을 `images/` 폴더에 저장

### 3. 설정 확인

- `manifest.json`에서 앱 이름, 설명 확인
- `service-worker.js`의 캐시 버전 확인
- 관리자 계정 비밀번호 변경 (보안)

---

## 🎯 Publish 탭을 통한 배포 (추천)

### 장점
- ✅ 가장 쉬운 방법
- ✅ 클릭 한 번으로 배포
- ✅ 자동 HTTPS 적용
- ✅ 글로벌 CDN 제공
- ✅ 무료 도메인 제공

### 배포 방법

1. **좌측 메뉴에서 "Publish" 탭 클릭**

2. **"Publish" 버튼 클릭**
   - 모든 파일이 자동으로 업로드됨
   - 수 초 ~ 수 분 소요

3. **배포 완료 URL 확인**
   ```
   예: https://your-project-name.web.app
   ```

4. **URL 테스트**
   - 브라우저에서 접속하여 정상 동작 확인
   - 모바일에서도 테스트

5. **사용자에게 URL 공유**
   - 카카오톡, 문자, 이메일로 공유
   - QR 코드 생성하여 포스터에 게시

### 업데이트 방법

1. 파일 수정 후 저장
2. "Publish" 탭 → "Publish" 버튼 다시 클릭
3. 몇 분 내 자동 반영

---

## 🌐 외부 호스팅 서비스 배포

### 추천 호스팅 서비스

#### 1. **Netlify** (무료)

**특징:**
- ✅ 무료 플랜 제공
- ✅ 자동 HTTPS
- ✅ 글로벌 CDN
- ✅ 자동 배포

**배포 방법:**

1. https://www.netlify.com 접속 및 회원가입

2. **드래그 앤 드롭 배포**
   - "Sites" 메뉴 클릭
   - 프로젝트 폴더를 드래그하여 업로드
   - 자동 배포 완료

3. **GitHub 연동 배포** (권장)
   - GitHub에 프로젝트 업로드
   - Netlify에서 "New site from Git" 선택
   - GitHub 레포지토리 연결
   - 자동 배포 설정

**URL 예시:** `https://your-site-name.netlify.app`

---

#### 2. **Vercel** (무료)

**특징:**
- ✅ 무료 플랜 제공
- ✅ 빠른 배포 속도
- ✅ 자동 HTTPS

**배포 방법:**

1. https://vercel.com 접속 및 회원가입

2. **Vercel CLI 설치** (선택사항)
   ```bash
   npm install -g vercel
   ```

3. **CLI로 배포**
   ```bash
   cd your-project-folder
   vercel
   ```

4. **또는 웹사이트에서 드래그 앤 드롭**

**URL 예시:** `https://your-project.vercel.app`

---

#### 3. **GitHub Pages** (무료)

**특징:**
- ✅ 완전 무료
- ✅ GitHub 계정만 있으면 OK
- ✅ 간단한 설정

**배포 방법:**

1. GitHub에 레포지토리 생성

2. 프로젝트 파일 업로드
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repository.git
   git push -u origin main
   ```

3. **Settings → Pages**
   - Source: "Deploy from a branch"
   - Branch: "main" 선택
   - Folder: "/ (root)" 선택
   - Save

4. 배포 완료 (수 분 소요)

**URL 예시:** `https://username.github.io/repository`

---

## 💾 웹하드/클라우드 스토리지 배포

### 방법 1: 일반 웹호스팅

**추천 서비스:**
- 카페24 (https://www.cafe24.com)
- 가비아 (https://www.gabia.com)
- 닷홈 (https://www.dothome.co.kr)

**배포 방법:**

1. **웹호스팅 서비스 가입**
   - 월 1,000원 ~ 5,000원 정도
   - 도메인 포함 상품 선택 가능

2. **FTP로 파일 업로드**
   - FileZilla 등 FTP 클라이언트 설치
   - FTP 접속 정보 입력 (호스팅 업체 제공)
   - 모든 파일 업로드

3. **접속 테스트**
   - 제공된 도메인으로 접속
   - PWA 기능 정상 동작 확인

**비용:** 월 1,000원 ~ 10,000원

---

### 방법 2: 클라우드 스토리지 (정적 웹사이트 호스팅)

#### AWS S3 정적 웹사이트 호스팅

**특징:**
- ✅ 안정적
- ✅ 트래픽 과금제
- ✅ CloudFront CDN 연동 가능

**배포 방법:**

1. AWS 계정 생성
2. S3 버킷 생성
3. 정적 웹사이트 호스팅 활성화
4. 파일 업로드
5. 퍼블릭 액세스 설정
6. 버킷 정책 설정

**비용:** 트래픽 기반 (소규모: 월 몇 백원)

---

#### Google Cloud Storage

**배포 방법:**

1. Google Cloud Platform 계정 생성
2. Cloud Storage 버킷 생성
3. 웹사이트 구성 설정
4. 파일 업로드
5. 공개 액세스 설정

**비용:** 트래픽 기반

---

## 🌍 도메인 연결

### 1. 도메인 구매

**추천 도메인 등록업체:**
- 가비아 (https://www.gabia.com)
- 후이즈 (https://www.whois.co.kr)
- Namecheap (https://www.namecheap.com)

**도메인 예시:**
- `gyeongjunoseo.com`
- `jsd-gyeongju.com`
- `경주노서도장.kr`

**비용:** 연 10,000원 ~ 30,000원

---

### 2. 도메인 연결 방법

#### Netlify 도메인 연결

1. Netlify 대시보드 → "Domain settings"
2. "Add custom domain" 클릭
3. 구매한 도메인 입력
4. DNS 설정 안내에 따라 네임서버 변경
5. 자동 HTTPS 적용

#### Vercel 도메인 연결

1. Vercel 대시보드 → "Domains"
2. 도메인 입력
3. DNS 설정 (A 레코드 또는 CNAME)
4. 자동 SSL 인증서 발급

---

## ✅ 배포 후 확인사항

### 1. 기능 테스트

```
✅ 모든 페이지 정상 로드
✅ 네비게이션 동작
✅ 게시판 글쓰기 (로그인 회원)
✅ 자유게시판 글쓰기 (비회원)
✅ 게시글 읽기
✅ 외부 링크 (증산도 홈페이지, 황금독서클럽 등)
✅ 반응형 디자인 (모바일, 태블릿)
```

### 2. PWA 기능 테스트

```
✅ 앱 설치 프롬프트 표시
✅ 홈 화면에 추가 가능
✅ 아이콘 정상 표시
✅ 오프라인 동작 (캐시)
✅ Service Worker 등록
```

### 3. 성능 테스트

- **PageSpeed Insights** 테스트
  - https://pagespeed.web.dev/
  - URL 입력 후 분석
  - 점수 80점 이상 권장

- **Lighthouse** 테스트
  - Chrome DevTools (F12)
  - "Lighthouse" 탭
  - 모든 항목 체크 후 "Analyze page load"

---

## 📊 모니터링 및 유지보수

### 1. Google Analytics 추가 (선택사항)

방문자 통계를 보려면:

1. Google Analytics 계정 생성
2. 추적 코드 발급
3. `index.html`의 `<head>`에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. 정기 업데이트

- 월 1회 게시판 관리
- 분기별 콘텐츠 업데이트
- 연 1회 보안 점검

---

## 💰 비용 비교

| 방법 | 초기 비용 | 월 비용 | 특징 |
|------|----------|---------|------|
| **Publish 탭** | 무료 | 무료 | 가장 쉬움, 추천 ⭐ |
| **Netlify/Vercel** | 무료 | 무료 | 무료, 자동 배포 |
| **GitHub Pages** | 무료 | 무료 | 완전 무료 |
| **일반 웹호스팅** | 0~10,000원 | 1,000~5,000원 | 도메인 포함 가능 |
| **AWS S3** | 무료 | 500~2,000원 | 트래픽 기반 |
| **도메인** | 10,000~30,000원/년 | - | 선택사항 |

---

## ❓ 자주 묻는 질문

### Q1. 가장 쉬운 배포 방법은?
A. **Publish 탭 사용**이 가장 쉽습니다. 클릭 한 번으로 배포 완료!

### Q2. 비용을 지불해야 하나요?
A. 아니요. Publish 탭, Netlify, Vercel, GitHub Pages 모두 **완전 무료**입니다.

### Q3. 도메인은 필수인가요?
A. 아니요. 무료 배포 시 제공되는 도메인으로도 충분합니다.  
예: `https://your-project.netlify.app`

### Q4. 웹하드를 꼭 사용해야 하나요?
A. 아니요. 무료 호스팅 서비스가 더 좋습니다. 웹하드는 정적 웹사이트 호스팅에 적합하지 않습니다.

### Q5. 업데이트는 어떻게 하나요?
A. 파일 수정 후 다시 배포하면 자동으로 반영됩니다.

### Q6. HTTPS는 자동으로 적용되나요?
A. 네, Publish 탭, Netlify, Vercel 모두 자동으로 HTTPS를 적용합니다.

### Q7. 데이터베이스는 어디에 저장되나요?
A. RESTful Table API를 통해 클라우드에 자동 저장됩니다.

---

## 📞 배포 지원

배포 중 문제가 발생하면:

1. **오류 메시지 확인**: 콘솔 로그 확인 (F12)
2. **파일 구조 확인**: 모든 파일이 올바른 위치에 있는지
3. **브라우저 캐시 삭제**: Ctrl + Shift + Delete

---

## 🎉 배포 완료 후

### 1. 사용자에게 공지

**카카오톡 공지 예시:**
```
📱 증산도 경주 노서도장 앱이 오픈했습니다!

🔗 https://your-domain.com

✨ 주요 기능:
- 도장 소식 확인
- 행사 사진 감상
- 게시판 글쓰기
- 앱으로 설치 가능

지금 바로 접속하여 홈 화면에 추가하세요!
```

### 2. QR 코드 생성

- https://www.qr-code-generator.com/
- URL 입력 후 QR 코드 다운로드
- 포스터, 전단지에 인쇄

### 3. 홍보 자료 제작

- 도장 게시판에 안내문 게시
- 단체 카카오톡방에 공유
- 이메일 뉴스레터 발송

---

**제작일**: 2025-01-08  
**버전**: v1.5.1  
**문의**: 증산도 경주 노서도장 (054-742-1691)
