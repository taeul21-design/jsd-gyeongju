# 🚀 빠른 참조 가이드 (증산도 노서도장 앱)

배포 과정에서 자주 필요한 정보를 빠르게 찾을 수 있는 참조 가이드입니다.

---

## 📋 목차

1. [도메인 및 호스팅 정보](#도메인-및-호스팅-정보)
2. [DNS 설정 값](#dns-설정-값)
3. [관리자 계정](#관리자-계정)
4. [자주 사용하는 URL](#자주-사용하는-url)
5. [문제 해결 빠른 참조](#문제-해결-빠른-참조)

---

## 도메인 및 호스팅 정보

### 무료 옵션 (추천)

| 항목 | 서비스 | URL | 비용 |
|------|--------|-----|------|
| **도메인** | Freenom | https://www.freenom.com | 무료 |
| **호스팅** | Netlify | https://www.netlify.com | 무료 |
| **SSL 인증서** | Let's Encrypt | 자동 발급 | 무료 |
| **총 비용** | - | - | **0원/월** |

### 유료 옵션

| 항목 | 서비스 | URL | 비용 |
|------|--------|-----|------|
| **도메인** | Gabia | https://domain.gabia.com | 15,400원/년 |
| **호스팅** | Netlify | https://www.netlify.com | 무료 |
| **SSL 인증서** | Let's Encrypt | 자동 발급 | 무료 |
| **총 비용** | - | - | **약 1,283원/월** |

---

## DNS 설정 값

### Netlify 연결

#### A 레코드
```
Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 75.2.60.5
```

#### CNAME 레코드
```
Type: CNAME
Name: www
TTL: 14400
Target: [사이트명].netlify.app
예: jsdnoseo.netlify.app
```

---

### GitHub Pages 연결

#### A 레코드 (4개 모두 추가)
```
Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 185.199.108.153

Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 185.199.109.153

Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 185.199.110.153

Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 185.199.111.153
```

#### CNAME 레코드
```
Type: CNAME
Name: www
TTL: 14400
Target: [사용자명].github.io
예: jsdnoseo.github.io
```

---

### Vercel 연결

#### A 레코드
```
Type: A
Name: @ (또는 빈칸)
TTL: 14400
Target: 76.76.21.21
```

#### CNAME 레코드
```
Type: CNAME
Name: www
TTL: 14400
Target: cname.vercel-dns.com
```

---

## 관리자 계정

### admin 계정 (최고 관리자)

```
아이디: admin
비밀번호: password
이름: 김정연
권한: 전체 관리자
배지: 금색 "관리자" 배지
```

**기능:**
- ✅ 모든 게시글 수정/삭제
- ✅ 공지사항 작성
- ✅ 증산도 성곡 음악 업로드/수정/삭제
- ✅ 모든 카테고리 글쓰기

### taeul21 계정 (공지사항 작성자)

```
아이디: taeul21
비밀번호: password
이름: 김정연
권한: 공지사항 작성 가능
배지: 일반 회원 (배지 없음)
```

**기능:**
- ✅ 모든 게시글 수정/삭제
- ✅ 공지사항 작성
- ✅ 증산도 성곡 음악 업로드/수정/삭제
- ✅ 모든 카테고리 글쓰기

⚠️ **중요:** 배포 후 반드시 비밀번호를 변경하세요!

---

## 자주 사용하는 URL

### 도메인 관리

| 서비스 | URL | 용도 |
|--------|-----|------|
| Freenom | https://www.freenom.com | 무료 도메인 등록/관리 |
| Gabia | https://domain.gabia.com | 유료 도메인 등록/관리 |
| HostingKR | https://www.hosting.kr | 유료 도메인 등록 |

### 호스팅 서비스

| 서비스 | URL | 용도 |
|--------|-----|------|
| Netlify | https://www.netlify.com | 호스팅 (가장 추천) |
| GitHub Pages | https://pages.github.com | 호스팅 (Git 기반) |
| Vercel | https://vercel.com | 호스팅 (빠른 속도) |

### 음악 호스팅

| 서비스 | URL | 용도 |
|--------|-----|------|
| Archive.org | https://archive.org | 음악 파일 호스팅 (⭐⭐⭐) |
| Dropbox | https://www.dropbox.com | 음악 파일 호스팅 (⭐⭐) |
| SoundCloud | https://soundcloud.com | 음악 파일 호스팅 (⭐⭐) |

### 외부 연동 사이트

| 사이트 | URL | 용도 |
|--------|-----|------|
| 증산도는 처음이지 | https://welcome.jsd.or.kr/ | 입문자 안내 |
| 황금독서클럽 | https://www.goldenbookclub.net/ | 진리서 학습 |
| 상생방송 | https://www.stb.co.kr/ | 방송 시청 |
| 동방신선학교 | https://healing.stb.co.kr/ | 태을주 수행 |
| 증산도 공식 | https://www.jsd.or.kr/ | 증산도 홈페이지 |

### 유용한 도구

| 도구 | URL | 용도 |
|------|-----|------|
| DNS Checker | https://dnschecker.org | DNS 설정 확인 |
| What's My DNS | https://www.whatsmydns.net | DNS 전파 확인 |
| QR 코드 생성 | https://www.qr-code-generator.com | QR 코드 만들기 |
| JSON 검증 | https://jsonlint.com | manifest.json 검증 |
| Manifest 검증 | https://manifest-validator.appspot.com | PWA manifest 검증 |

---

## 문제 해결 빠른 참조

### DNS 문제

**증상:** 도메인 접속 시 "사이트를 찾을 수 없음" 오류

**해결 방법:**
1. DNS 설정 확인 (A 레코드, CNAME 레코드)
2. DNS 반영 대기 (최대 24시간)
3. 브라우저 캐시 삭제 (Ctrl + Shift + Delete)
4. DNS Checker로 전파 상태 확인

**명령어 (Windows):**
```cmd
nslookup 도메인주소.tk
```

---

### HTTPS 문제

**증상:** "연결이 비공개로 설정되어 있지 않습니다" 오류

**해결 방법:**
1. HTTPS 인증서 발급 대기 (10분~1시간)
2. 호스팅 서비스에서 "Force HTTPS" 활성화
3. 브라우저 캐시 삭제
4. 시크릿 모드에서 접속 시도

---

### PWA 설치 문제

**증상:** "홈 화면에 추가" 메뉴가 안 보임

**해결 방법:**

**iOS:**
- Safari 브라우저 사용 (Chrome/Firefox 불가)
- HTTPS 적용 확인
- 이미 설치되었는지 홈 화면 확인

**Android:**
- Chrome 브라우저 사용
- HTTPS 적용 확인
- 수동 설치: 메뉴(⋮) → "홈 화면에 추가"

**체크사항:**
- [ ] HTTPS 적용됨 (https://로 시작)
- [ ] manifest.json 파일 존재
- [ ] Service Worker 등록됨
- [ ] 아이콘 192x192 이상 존재

---

### 파일 업데이트 문제

**증상:** 파일을 수정했는데 변경사항이 안 보임

**해결 방법:**
1. 브라우저 강제 새로고침 (Ctrl + F5)
2. Service Worker 캐시 삭제:
   - F12 → Application → Service Workers → Unregister
3. 호스팅 서비스에서 재배포
4. 시크릿 모드에서 확인

---

### 음악 재생 문제

**증상:** 음악이 재생되지 않음

**해결 방법:**
1. 음악 URL이 직접 링크인지 확인
   - ✅ 좋은 예: `https://archive.org/download/id/file.mp3`
   - ❌ 나쁜 예: `https://archive.org/details/id`
2. Google Drive / Naver MYBOX 사용 중단
3. Archive.org 또는 Dropbox 사용
4. 브라우저 콘솔(F12) 에러 확인

**Archive.org 직접 링크 형식:**
```
https://archive.org/download/[identifier]/[filename].mp3
예: https://archive.org/download/beyond_the_light_202511/dodukga.mp3
```

**Dropbox 직접 링크 형식:**
```
https://www.dropbox.com/s/[file-id]/[filename].mp3?dl=1
⚠️ 끝에 ?dl=1 필수!
```

---

### 로그인 문제

**증상:** 관리자 로그인이 안 됨

**해결 방법:**
1. `debug-users.html` 페이지 접속
2. "계정 확인" 버튼 클릭
3. admin 계정 존재 확인
4. 없으면 "기본 계정 생성" 버튼 클릭
5. 다시 로그인 시도

**기본 계정:**
- 아이디: `admin`
- 비밀번호: `password`

---

## 📞 연락처

### 증산도 경주 노서도장

```
📞 전화: 054-742-1691
📍 주소: 경북 경주시 금성로 271, 3층(노서동)
🌐 웹사이트: https://당신의도메인.tk (배포 후)
```

---

## 📄 관련 가이드 문서

| 문서 | 설명 |
|------|------|
| **DEPLOYMENT_COMPLETE_GUIDE.md** | 🔥 전체 배포 프로세스 (시작하기) |
| **DEPLOYMENT_CHECKLIST.md** | ✅ 단계별 체크리스트 |
| **DOMAIN_REGISTRATION_GUIDE.md** | 도메인 등록 상세 가이드 |
| **HOSTING_CONNECTION_GUIDE.md** | 호스팅 연결 가이드 |
| **MOBILE_APP_INSTALL_GUIDE.md** | 모바일 앱 설치 가이드 |
| **MANIFEST_UPDATE_GUIDE.md** | manifest.json 설정 가이드 |
| **MUSIC_HOSTING_GUIDE.md** | 음악 파일 호스팅 가이드 |
| **ADMIN_GUIDE.md** | 관리자 기능 가이드 |
| **README.md** | 프로젝트 전체 문서 |

---

## 🎯 빠른 시작 (5단계)

```
1️⃣ Freenom에서 무료 도메인 등록 (.tk)
   ↓
2️⃣ Netlify 회원가입
   ↓
3️⃣ ZIP 파일 드래그앤드롭 업로드
   ↓
4️⃣ DNS 설정 (A 레코드 + CNAME 레코드)
   ↓
5️⃣ 휴대폰에서 앱 설치 테스트
   ↓
✅ 완료! (총 1~2시간)
```

---

**© 2025 증산도 경주 노서도장**
**후천가을 문명시대를 함께 준비합니다**
