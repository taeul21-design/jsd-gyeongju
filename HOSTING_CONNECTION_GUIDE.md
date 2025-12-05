# 🚀 호스팅 연결 가이드 (증산도 노서도장 앱)

도메인 등록 후, 앱 파일을 업로드하고 인터넷에 공개하기 위한 **호스팅 연결 완벽 가이드**입니다.

---

## 📋 목차

1. [호스팅이란?](#1-호스팅이란)
2. [호스팅 서비스 비교](#2-호스팅-서비스-비교)
3. [GitHub Pages 연결 (무료, 추천)](#3-github-pages-연결-무료-추천)
4. [Netlify 연결 (무료, 가장 간편)](#4-netlify-연결-무료-가장-간편)
5. [Vercel 연결 (무료)](#5-vercel-연결-무료)
6. [도메인 DNS 설정](#6-도메인-dns-설정)

---

## 1. 호스팅이란?

**호스팅(Hosting)**은 웹사이트 파일을 저장하고 인터넷에 공개하는 서비스입니다.

### 필요한 이유
- 앱 파일(HTML, CSS, JS)을 인터넷 서버에 업로드
- 사용자가 도메인 주소로 접속 가능
- 24시간 안정적인 접속 보장

### 우리 앱에 필요한 것
- ✅ **정적 파일 호스팅** (HTML, CSS, JavaScript)
- ✅ **HTTPS 지원** (보안 인증서, PWA 필수)
- ✅ **무료 또는 저렴한 비용**

---

## 2. 호스팅 서비스 비교

| 서비스 | 가격 | 난이도 | 속도 | 추천도 | 특징 |
|--------|------|--------|------|--------|------|
| **GitHub Pages** | 무료 | 중급 | ⭐⭐⭐ | ⭐⭐⭐⭐ | Git 기반, 안정적 |
| **Netlify** | 무료 | 초급 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 드래그앤드롭, 가장 간편 |
| **Vercel** | 무료 | 중급 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Next.js 최적화 |
| **Cloudflare Pages** | 무료 | 중급 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | CDN 통합 |
| **Cafe24** | 5,000원/월 | 초급 | ⭐⭐⭐ | ⭐⭐ | 국내 서비스, 유료 |

### 🎯 추천 순위

1. **Netlify** ⭐⭐⭐⭐⭐ - 가장 간편, 드래그앤드롭
2. **GitHub Pages** ⭐⭐⭐⭐ - 무료, 안정적, Git 경험 필요
3. **Vercel** ⭐⭐⭐⭐ - 빠른 속도, 개발자 친화적

---

## 3. GitHub Pages 연결 (무료, 추천)

### ✨ 장점
- ✅ 완전 무료
- ✅ 무제한 트래픽
- ✅ 자동 HTTPS 지원
- ✅ Git 버전 관리
- ✅ 안정적인 서비스

### 📌 필요한 것
- GitHub 계정 (무료)
- Git 기본 지식 (간단)

---

### 📝 GitHub Pages 설정 절차

#### **Step 1: GitHub 회원가입**

1. https://github.com 접속
2. 우측 상단 **"Sign up"** 클릭
3. 이메일, 비밀번호 입력
4. 사용자 이름 설정 (예: `jsdnoseo`)
5. 이메일 인증 완료

#### **Step 2: 새 Repository 생성**

1. GitHub 로그인 후 우측 상단 **"+"** 버튼 클릭
2. **"New repository"** 선택
3. Repository 정보 입력:
   ```
   Repository name: jsdnoseo-app
   Description: 증산도 경주 노서도장 공식 앱
   Public 선택 (무료 호스팅은 Public만 가능)
   ```
4. **"Create repository"** 클릭

#### **Step 3: 파일 업로드**

**방법 1: 웹에서 직접 업로드 (추천)**

1. Repository 메인 페이지에서 **"uploading an existing file"** 클릭
2. 다음 파일들을 드래그앤드롭:
   ```
   index.html
   manifest.json
   service-worker.js
   debug-users.html
   css/ (폴더 전체)
   js/ (폴더 전체)
   images/ (폴더 전체)
   ```
3. 하단 Commit 메시지 입력:
   ```
   Initial commit - 증산도 노서도장 앱
   ```
4. **"Commit changes"** 클릭

**방법 2: Git 명령어 사용 (고급)**

```bash
# 로컬에 프로젝트 폴더로 이동
cd /path/to/jsdnoseo-app

# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub에 업로드
git remote add origin https://github.com/사용자명/jsdnoseo-app.git
git branch -M main
git push -u origin main
```

#### **Step 4: GitHub Pages 활성화**

1. Repository 페이지 상단 **"Settings"** 탭 클릭
2. 좌측 메뉴에서 **"Pages"** 클릭
3. **"Source"** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
4. **"Save"** 버튼 클릭
5. 상단에 배포 URL 표시:
   ```
   ✅ Your site is published at https://사용자명.github.io/jsdnoseo-app/
   ```

#### **Step 5: 커스텀 도메인 연결**

1. **"Custom domain"** 입력창에 도메인 입력:
   ```
   예: jsdnoseo.tk
   ```
2. **"Save"** 버튼 클릭
3. **"Enforce HTTPS"** 체크박스 선택 (필수!)

#### **Step 6: DNS 설정 (Freenom 기준)**

1. Freenom 로그인 → **"Services" → "My Domains"**
2. 해당 도메인 선택 → **"Manage Domain"**
3. **"Management Tools" → "Nameservers"** 클릭
4. **"Use custom nameservers"** 선택
5. 다음 GitHub Pages IP 주소 입력:

**A 레코드 설정:**
```
Type: A
Name: @ (또는 빈칸)
Value: 185.199.108.153

Type: A
Name: @ (또는 빈칸)
Value: 185.199.109.153

Type: A
Name: @ (또는 빈칸)
Value: 185.199.110.153

Type: A
Name: @ (또는 빈칸)
Value: 185.199.111.153
```

**CNAME 레코드 설정:**
```
Type: CNAME
Name: www
Value: 사용자명.github.io
```

6. **"Save Changes"** 클릭
7. DNS 반영 대기 (10분 ~ 24시간)

---

## 4. Netlify 연결 (무료, 가장 간편)

### ✨ 장점
- ✅ **가장 간편한 배포** (드래그앤드롭)
- ✅ 완전 무료
- ✅ 자동 HTTPS
- ✅ 자동 배포
- ✅ 빠른 CDN

### 📝 Netlify 설정 절차

#### **Step 1: Netlify 회원가입**

1. https://www.netlify.com 접속
2. 우측 상단 **"Sign up"** 클릭
3. GitHub 계정으로 로그인 (추천)
   - 또는 이메일로 가입

#### **Step 2: 새 사이트 생성**

1. 로그인 후 **"Add new site"** 클릭
2. **"Deploy manually"** 선택

#### **Step 3: 파일 업로드**

1. 프로젝트 폴더 전체를 ZIP 파일로 압축
   ```
   파일 구조:
   jsdnoseo-app.zip
   ├── index.html
   ├── manifest.json
   ├── service-worker.js
   ├── debug-users.html
   ├── css/
   ├── js/
   ├── images/
   └── (기타 파일들)
   ```

2. ZIP 파일을 드래그앤드롭 영역에 업로드
3. 자동 배포 시작 (1~2분 소요)
4. 배포 완료 후 URL 생성:
   ```
   https://random-name-123456.netlify.app
   ```

#### **Step 4: 사이트 이름 변경**

1. **"Site settings"** 클릭
2. **"Change site name"** 클릭
3. 원하는 이름 입력:
   ```
   예: jsdnoseo
   → https://jsdnoseo.netlify.app
   ```

#### **Step 5: 커스텀 도메인 연결**

1. **"Domain settings"** 클릭
2. **"Add custom domain"** 클릭
3. 도메인 입력:
   ```
   예: jsdnoseo.tk
   ```
4. **"Verify"** 클릭
5. DNS 설정 안내 확인

#### **Step 6: DNS 설정 (Freenom 기준)**

**CNAME 레코드 설정:**
```
Type: CNAME
Name: www
Value: jsdnoseo.netlify.app
```

**A 레코드 설정:**
```
Type: A
Name: @
Value: 75.2.60.5
```

6. Netlify로 돌아가 **"Verify DNS configuration"** 클릭
7. HTTPS 자동 활성화 (10분 ~ 1시간)

---

## 5. Vercel 연결 (무료)

### ✨ 장점
- ✅ 빠른 배포 속도
- ✅ GitHub 통합
- ✅ 자동 HTTPS
- ✅ 무료

### 📝 Vercel 설정 절차

#### **Step 1: Vercel 회원가입**

1. https://vercel.com 접속
2. **"Sign Up"** 클릭
3. GitHub 계정으로 로그인

#### **Step 2: 새 프로젝트 생성**

1. **"Add New" → "Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub에서 Repository 선택 (`jsdnoseo-app`)

#### **Step 3: 프로젝트 설정**

1. Project 이름 입력:
   ```
   jsdnoseo-app
   ```
2. Framework Preset: **"Other"** 선택
3. Root Directory: `.` (기본값)
4. **"Deploy"** 클릭

#### **Step 4: 배포 완료**

1. 배포 진행 (1~2분)
2. 배포 완료 후 URL 생성:
   ```
   https://jsdnoseo-app.vercel.app
   ```

#### **Step 5: 커스텀 도메인 연결**

1. Project 페이지 → **"Settings" → "Domains"**
2. 도메인 입력:
   ```
   예: jsdnoseo.tk
   ```
3. DNS 설정 안내 확인

#### **Step 6: DNS 설정 (Freenom 기준)**

**CNAME 레코드 설정:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**A 레코드 설정:**
```
Type: A
Name: @
Value: 76.76.21.21
```

---

## 6. 도메인 DNS 설정

### DNS란?

**DNS(Domain Name System)**는 도메인을 서버 IP 주소로 연결하는 시스템입니다.

### DNS 레코드 종류

| 레코드 타입 | 설명 | 예시 |
|-------------|------|------|
| **A** | 도메인을 IPv4 주소로 연결 | `@ → 185.199.108.153` |
| **CNAME** | 도메인을 다른 도메인으로 연결 | `www → 사용자명.github.io` |
| **TXT** | 도메인 소유권 인증 | `@ → verification-code` |

### Freenom DNS 설정

#### **Step 1: Freenom 관리 페이지 접속**

1. https://www.freenom.com 로그인
2. **"Services" → "My Domains"** 클릭
3. 해당 도메인 선택 → **"Manage Domain"**

#### **Step 2: DNS 설정 메뉴**

1. **"Management Tools" → "Nameservers"** 클릭
2. **"Use default nameservers"** 선택 유지
3. **"Management Tools" → "DNS Management"** 클릭

#### **Step 3: 레코드 추가**

**GitHub Pages 연결:**
```
Type: A
Name: (빈칸 또는 @)
TTL: 14400
Target: 185.199.108.153

Type: A
Name: (빈칸 또는 @)
TTL: 14400
Target: 185.199.109.153

Type: CNAME
Name: www
TTL: 14400
Target: 사용자명.github.io
```

**Netlify 연결:**
```
Type: CNAME
Name: www
TTL: 14400
Target: jsdnoseo.netlify.app

Type: A
Name: (빈칸 또는 @)
TTL: 14400
Target: 75.2.60.5
```

**Vercel 연결:**
```
Type: CNAME
Name: www
TTL: 14400
Target: cname.vercel-dns.com

Type: A
Name: (빈칸 또는 @)
TTL: 14400
Target: 76.76.21.21
```

#### **Step 4: 저장 및 대기**

1. **"Save Changes"** 클릭
2. DNS 반영 대기 (10분 ~ 24시간)

---

## 🔍 DNS 설정 확인

### 온라인 도구로 확인

**1. DNS Checker**
- https://dnschecker.org
- 도메인 입력 후 전 세계 DNS 반영 상태 확인

**2. What's My DNS**
- https://www.whatsmydns.net
- 실시간 DNS 전파 상태 확인

### 명령어로 확인 (Windows)

```cmd
nslookup jsdnoseo.tk
```

정상적으로 설정되면:
```
Name:    jsdnoseo.tk
Address: 185.199.108.153
```

---

## 🆘 문제 해결

### Q1. DNS 설정 후 사이트가 안 열립니다.

**해결 방법:**
- DNS 반영 시간 대기 (최대 24시간)
- 브라우저 캐시 삭제 (Ctrl + Shift + Delete)
- 시크릿 모드에서 접속 시도
- 다른 기기/네트워크에서 확인

### Q2. "Your connection is not private" 오류가 뜹니다.

**해결 방법:**
- HTTPS 인증서 발급 대기 (10분 ~ 1시간)
- 호스팅 서비스에서 "Enforce HTTPS" 활성화 확인

### Q3. 파일이 업데이트되지 않습니다.

**해결 방법:**
- 브라우저 캐시 강제 새로고침 (Ctrl + F5)
- Service Worker 캐시 삭제:
  ```
  F12 → Application → Service Workers → Unregister
  ```
- 호스팅 서비스에서 재배포

### Q4. GitHub Pages에서 404 오류가 납니다.

**해결 방법:**
- Repository가 Public인지 확인
- `index.html` 파일이 루트 디렉토리에 있는지 확인
- GitHub Pages 설정에서 Branch와 Folder 확인

---

## ✅ 다음 단계

호스팅 연결이 완료되었다면, 다음 가이드로 진행하세요:

➡️ **`MOBILE_APP_INSTALL_GUIDE.md`** - 모바일 앱으로 설치하기
➡️ **`DEPLOYMENT_COMPLETE_GUIDE.md`** - 배포 최종 점검

---

**© 2025 증산도 경주 노서도장**
**후천가을 문명시대를 함께 준비합니다**
