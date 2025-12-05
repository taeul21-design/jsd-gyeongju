# 🚀 증산도 노서도장 앱 배포 완벽 가이드

도메인 등록부터 모바일 앱 배포까지 **전체 과정을 한눈에** 정리한 완벽 가이드입니다.

---

## 📋 목차

1. [배포 프로세스 개요](#1-배포-프로세스-개요)
2. [사전 준비사항](#2-사전-준비사항)
3. [단계별 배포 절차](#3-단계별-배포-절차)
4. [배포 확인 체크리스트](#4-배포-확인-체크리스트)
5. [추가 설정 (선택)](#5-추가-설정-선택)
6. [유지보수 가이드](#6-유지보수-가이드)

---

## 1. 배포 프로세스 개요

### 🎯 전체 흐름

```
1단계: 도메인 등록
   ↓
2단계: 호스팅 서비스 선택
   ↓
3단계: 파일 업로드
   ↓
4단계: DNS 설정
   ↓
5단계: HTTPS 활성화
   ↓
6단계: 모바일 앱 설치 테스트
   ↓
7단계: 배포 완료 및 공유
```

### ⏱️ 소요 시간

| 단계 | 소요 시간 | 대기 시간 |
|------|----------|----------|
| 1. 도메인 등록 | 10분 | 즉시~10분 |
| 2. 호스팅 설정 | 15분 | 즉시 |
| 3. 파일 업로드 | 10분 | 1~2분 |
| 4. DNS 설정 | 5분 | 10분~24시간 |
| 5. HTTPS 활성화 | 자동 | 10분~1시간 |
| 6. 앱 설치 테스트 | 5분 | 즉시 |
| **총 소요 시간** | **약 45분** | **최대 24시간** |

💡 **실제로는 1~2시간이면 모든 과정 완료!**

### 💰 비용 예상

#### 옵션 1: 완전 무료 (추천)
```
도메인: Freenom (.tk) - 0원/년
호스팅: Netlify/GitHub Pages - 0원
SSL 인증서: Let's Encrypt - 0원

총 비용: 0원/월
```

#### 옵션 2: 전문 도메인
```
도메인: Gabia (.com) - 15,400원/년 (약 1,283원/월)
호스팅: Netlify - 0원
SSL 인증서: Let's Encrypt - 0원

총 비용: 약 1,283원/월
```

---

## 2. 사전 준비사항

### 📝 필요한 것들

#### ✅ 필수 항목
- [ ] 이메일 주소 (Gmail 추천)
- [ ] 휴대폰 (앱 테스트용)
- [ ] 컴퓨터 (파일 업로드용)
- [ ] 인터넷 연결

#### ✅ 계정 (무료 가입)
- [ ] Freenom 계정 (도메인 등록)
  - https://www.freenom.com
- [ ] GitHub 계정 또는 Netlify 계정 (호스팅)
  - GitHub: https://github.com
  - Netlify: https://www.netlify.com

#### ✅ 파일 준비
- [ ] 프로젝트 파일 전체 (ZIP 압축 권장)
  ```
  jsdnoseo-app/
  ├── index.html
  ├── manifest.json
  ├── service-worker.js
  ├── debug-users.html
  ├── css/ (폴더)
  ├── js/ (폴더)
  ├── images/ (폴더)
  └── (기타 파일들)
  ```

---

## 3. 단계별 배포 절차

### 🔹 Step 1: 도메인 등록 (10분)

**무료 도메인 등록 (Freenom)**

1. https://www.freenom.com 접속
2. 원하는 도메인 검색
   ```
   예: jsdnoseo (확장자 제외)
   ```
3. `.tk` 또는 `.ml` 도메인 선택
4. "Get it now!" → "Checkout" 클릭
5. 등록 기간: 12 Months @ FREE 선택
6. 이메일 인증 후 회원가입
7. "Complete Order" 클릭
8. ✅ 도메인 등록 완료!

**📄 자세한 가이드:** `DOMAIN_REGISTRATION_GUIDE.md`

---

### 🔹 Step 2: 호스팅 서비스 선택 (5분)

**추천: Netlify (가장 간편)**

#### 2-1. Netlify 회원가입

1. https://www.netlify.com 접속
2. "Sign up" 클릭
3. GitHub 계정으로 로그인 (추천)
   - 또는 이메일로 가입

#### 2-2. 새 사이트 생성

1. "Add new site" 클릭
2. "Deploy manually" 선택

**📄 자세한 가이드:** `HOSTING_CONNECTION_GUIDE.md`

---

### 🔹 Step 3: 파일 업로드 (10분)

#### 3-1. 파일 준비

1. 프로젝트 폴더를 ZIP으로 압축
   ```
   Windows: 폴더 우클릭 → "압축(Zip)" 선택
   Mac: 폴더 우클릭 → "압축"
   ```

2. 압축 파일 이름 확인
   ```
   jsdnoseo-app.zip
   ```

#### 3-2. Netlify에 업로드

1. Netlify 배포 페이지에서 드래그앤드롭 영역 확인
2. `jsdnoseo-app.zip` 파일을 드래그하여 업로드
3. 자동 배포 시작 (1~2분)
4. 배포 완료 후 임시 URL 생성:
   ```
   https://random-name-123456.netlify.app
   ```

#### 3-3. 사이트 이름 변경

1. "Site settings" 클릭
2. "Change site name" 클릭
3. 원하는 이름 입력:
   ```
   jsdnoseo
   ```
4. 새 URL 확인:
   ```
   https://jsdnoseo.netlify.app
   ```

---

### 🔹 Step 4: 커스텀 도메인 연결 (15분)

#### 4-1. Netlify에 도메인 추가

1. "Domain settings" 클릭
2. "Add custom domain" 클릭
3. 도메인 입력:
   ```
   jsdnoseo.tk
   ```
4. "Verify" 클릭
5. DNS 설정 안내 확인

#### 4-2. Freenom DNS 설정

1. Freenom 로그인 → "Services" → "My Domains"
2. 해당 도메인 선택 → "Manage Domain"
3. "Management Tools" → "DNS Management" 클릭
4. 다음 레코드 추가:

**A 레코드:**
```
Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 75.2.60.5
```

**CNAME 레코드:**
```
Type: CNAME
Name: www
TTL: 14400
Target: jsdnoseo.netlify.app
```

5. "Save Changes" 클릭
6. ⏳ DNS 반영 대기 (10분~24시간, 보통 1~2시간)

---

### 🔹 Step 5: HTTPS 활성화 (자동)

#### 5-1. SSL 인증서 자동 발급

DNS 설정이 반영되면 Netlify가 자동으로 HTTPS를 활성화합니다.

1. Netlify "Domain settings" 확인
2. "HTTPS" 섹션에서 상태 확인:
   ```
   ✅ Certificate active
   ```
3. "Force HTTPS" 활성화
4. 이제 `https://jsdnoseo.tk`로 접속 가능!

⏳ **대기 시간:** 10분 ~ 1시간

---

### 🔹 Step 6: 모바일 앱 설치 테스트 (10분)

#### 6-1. iPhone 테스트

1. Safari 앱 실행
2. `https://jsdnoseo.tk` 접속
3. 공유 버튼(⬆️) → "홈 화면에 추가"
4. "추가" 탭
5. ✅ 홈 화면에 앱 아이콘 확인

#### 6-2. Android 테스트

1. Chrome 앱 실행
2. `https://jsdnoseo.tk` 접속
3. 하단 팝업에서 "설치" 탭
   - 또는 메뉴(⋮) → "홈 화면에 추가"
4. ✅ 홈 화면에 앱 아이콘 확인

**📄 자세한 가이드:** `MOBILE_APP_INSTALL_GUIDE.md`

---

### 🔹 Step 7: 배포 완료 및 공유 (5분)

#### 7-1. 배포 확인

다음 사항들을 확인하세요:

- [ ] `https://도메인주소`로 사이트 접속 가능
- [ ] HTTPS (자물쇠 아이콘) 표시
- [ ] 모든 페이지 정상 작동
- [ ] 로그인/회원가입 기능 작동
- [ ] 게시판 작성/조회 가능
- [ ] 방명록 작성 가능
- [ ] 음악 재생 가능

#### 7-2. 회원들에게 공유

**카카오톡 공유 메시지:**

```
🙏 증산도 경주 노서도장 앱이 출시되었습니다!

📱 휴대폰에 앱으로 설치하세요:
🔗 https://jsdnoseo.tk

✨ 설치 방법:
• iPhone: Safari → 공유(⬆️) → "홈 화면에 추가"
• Android: Chrome → 메뉴(⋮) → "앱 설치"

후천가을 문명시대를 함께 준비합시다!
📞 문의: 054-742-1691
```

---

## 4. 배포 확인 체크리스트

### ✅ 기본 기능

- [ ] **사이트 접속**
  - [ ] `https://도메인주소`로 접속 가능
  - [ ] HTTPS 활성화 (자물쇠 아이콘)
  - [ ] 페이지 로딩 속도 정상

- [ ] **모바일 반응형**
  - [ ] 모바일에서 레이아웃 정상
  - [ ] 터치 동작 정상
  - [ ] 스크롤 부드러움

- [ ] **PWA 기능**
  - [ ] 홈 화면 추가 가능
  - [ ] 앱 아이콘 정상 표시
  - [ ] 전체 화면 모드
  - [ ] 오프라인 기본 화면 표시

### ✅ 주요 기능

- [ ] **사용자 인증**
  - [ ] 회원가입 가능
  - [ ] 로그인 가능
  - [ ] 로그아웃 가능
  - [ ] 로그인 상태 유지

- [ ] **게시판**
  - [ ] 게시글 목록 조회
  - [ ] 게시글 작성 (로그인 사용자)
  - [ ] 게시글 수정/삭제 (작성자/관리자)
  - [ ] 카테고리 필터링
  - [ ] 동영상 첨부 기능

- [ ] **방명록**
  - [ ] 방명록 목록 조회
  - [ ] 방명록 작성 (비로그인 가능)
  - [ ] 좋아요 기능
  - [ ] 정렬 기능 (최신순/인기순)

- [ ] **증산도 성곡**
  - [ ] 음악 목록 조회
  - [ ] 음악 재생
  - [ ] 음악 업로드 (관리자 전용)
  - [ ] 음악 수정/삭제 (관리자 전용)

- [ ] **외부 링크**
  - [ ] 증산도는 처음이지 (새 창)
  - [ ] 황금독서클럽 (새 창)
  - [ ] 상생방송 (새 창)
  - [ ] 동방신선학교 (새 창)

- [ ] **공유 기능**
  - [ ] 카카오톡 공유 버튼
  - [ ] Web Share API 대체
  - [ ] URL 복사 대체

### ✅ 관리자 기능

- [ ] **관리자 로그인**
  - [ ] admin 계정 로그인 (password: password)
  - [ ] taeul21 계정 로그인
  - [ ] 관리자 배지 표시

- [ ] **관리자 권한**
  - [ ] 모든 게시글 수정/삭제
  - [ ] 공지사항 작성
  - [ ] 음악 업로드/수정/삭제

---

## 5. 추가 설정 (선택)

### 📊 Google Analytics 연결

웹사이트 방문자 통계를 확인하려면:

1. https://analytics.google.com 접속
2. 계정 생성 및 추적 ID 발급
3. `index.html`의 `<head>` 섹션에 추가:
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

### 🔔 푸시 알림 설정

모바일 푸시 알림을 보내려면 추후 구현이 필요합니다.
- Firebase Cloud Messaging (FCM) 연동
- 알림 권한 요청 UI 추가
- Service Worker에 알림 처리 로직 추가

### 🔍 SEO 최적화

검색 엔진 노출을 위해:

1. **sitemap.xml 생성**
2. **robots.txt 생성**
3. **Google Search Console 등록**
   - https://search.google.com/search-console
4. **Naver 웹마스터도구 등록**
   - https://searchadvisor.naver.com

---

## 6. 유지보수 가이드

### 🔄 앱 업데이트 방법

#### Netlify 사용 시

1. 수정된 파일을 ZIP으로 압축
2. Netlify 사이트 페이지에서 "Deploys" 탭 클릭
3. 새 ZIP 파일 드래그앤드롭
4. 자동 배포 (1~2분)
5. ✅ 사용자는 앱 재시작 시 자동 업데이트

#### GitHub Pages 사용 시

1. Git으로 수정된 파일 커밋:
   ```bash
   git add .
   git commit -m "업데이트 내용"
   git push
   ```
2. GitHub Actions 자동 배포 (2~5분)
3. ✅ 사용자는 앱 재시작 시 자동 업데이트

### 🐛 버그 발생 시 대응

1. **브라우저 콘솔 확인**
   - F12 → Console 탭
   - 에러 메시지 확인

2. **Service Worker 캐시 삭제**
   - F12 → Application → Service Workers
   - "Unregister" 클릭

3. **긴급 롤백**
   - Netlify: "Deploys" → 이전 버전 선택 → "Publish deploy"
   - GitHub Pages: Git revert 후 push

### 📅 정기 유지보수

#### 매월
- [ ] 도메인 만료일 확인 (Freenom은 1년마다 갱신)
- [ ] 사이트 속도 테스트
- [ ] 링크 정상 작동 확인

#### 분기별
- [ ] 보안 업데이트 확인
- [ ] 사용자 피드백 반영
- [ ] 새 기능 추가 검토

#### 연 1회
- [ ] 도메인 갱신 (Freenom 무료 갱신)
- [ ] 백업 파일 점검
- [ ] 호스팅 용량 확인

---

## 💡 추천 도메인 및 호스팅 조합

### 🥇 가장 추천하는 조합 (완전 무료)

```
도메인: Freenom (.tk, .ml)
  ↓
호스팅: Netlify
  ↓
SSL: Let's Encrypt (자동)
  ↓
총 비용: 0원/월
설정 시간: 1~2시간
난이도: ⭐⭐ (중급)
```

**장점:**
- ✅ 완전 무료
- ✅ 드래그앤드롭으로 간편 배포
- ✅ 자동 HTTPS
- ✅ 빠른 CDN

**단점:**
- ⚠️ 무료 도메인 (.tk) 신뢰도 낮음
- ⚠️ 매년 도메인 갱신 필요

---

### 🥈 전문적인 조합 (유료, 추천)

```
도메인: Gabia (.com, .kr)
  ↓
호스팅: Netlify
  ↓
SSL: Let's Encrypt (자동)
  ↓
총 비용: 약 1,283원/월 (도메인만 유료)
설정 시간: 1~2시간
난이도: ⭐⭐ (중급)
```

**장점:**
- ✅ 전문적인 도메인 (.com, .kr)
- ✅ 높은 신뢰도
- ✅ Netlify 무료 호스팅
- ✅ 한국어 고객 지원 (Gabia)

**단점:**
- ⚠️ 도메인 비용 발생 (연 15,400원)

---

### 🥉 Git 경험자용 (무료)

```
도메인: Freenom (.tk, .ml)
  ↓
호스팅: GitHub Pages
  ↓
SSL: Let's Encrypt (자동)
  ↓
총 비용: 0원/월
설정 시간: 1~2시간
난이도: ⭐⭐⭐ (고급)
```

**장점:**
- ✅ 완전 무료
- ✅ Git 버전 관리
- ✅ 무제한 트래픽
- ✅ 안정적인 서비스

**단점:**
- ⚠️ Git 기본 지식 필요
- ⚠️ 설정이 약간 복잡

---

## 📞 도움이 필요하신가요?

### 관련 가이드 문서

- 📄 **DOMAIN_REGISTRATION_GUIDE.md** - 도메인 등록 상세 가이드
- 📄 **HOSTING_CONNECTION_GUIDE.md** - 호스팅 연결 상세 가이드
- 📄 **MOBILE_APP_INSTALL_GUIDE.md** - 모바일 앱 설치 가이드
- 📄 **ADMIN_GUIDE.md** - 관리자 기능 가이드
- 📄 **MUSIC_HOSTING_GUIDE.md** - 음악 파일 호스팅 가이드

### 문의

**증산도 경주 노서도장**
- 📞 전화: 054-742-1691
- 📍 주소: 경북 경주시 금성로 271, 3층(노서동)
- 🌐 웹사이트: https://jsdnoseo.tk (배포 후)

---

## 🎉 배포 완료!

모든 단계를 완료하셨다면, 축하합니다! 🎊

이제 증산도 경주 노서도장 앱이 전 세계 어디서나 접속 가능합니다.

**앱 주소:** `https://당신의도메인.tk`

후천가을 문명시대를 함께 준비합시다! 🙏

---

**© 2025 증산도 경주 노서도장**
**All Rights Reserved**
