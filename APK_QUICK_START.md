# 🚀 5분 만에 APK 만들기 - 빠른 시작 가이드

## 📱 지금 바로 Android 앱 만들기!

이 가이드를 따라하면 **5분 내에** 증산도 경주 노서도장 Android 앱(APK)을 만들 수 있습니다.

---

## ✅ 준비 사항

- 인터넷 연결
- 웹 브라우저 (Chrome, Edge, Safari 등)
- 배포된 웹사이트 URL (아직 없다면 먼저 배포 필요)

---

## 📋 단계별 가이드

### 🌐 1단계: 웹사이트 배포 (2분)

웹사이트가 아직 배포되지 않았다면:

1. **Publish 탭** 클릭
2. **Netlify** 또는 **Vercel** 선택 (추천: Netlify)
3. **Deploy** 버튼 클릭
4. 배포 완료 대기 (1-2분)
5. **배포 URL 확인 및 복사**

#### 배포 URL 예시:

```
✅ 배포 완료!

Netlify:
https://jsd-noseo.netlify.app
https://wonderful-darwin-abc123.netlify.app

Vercel:
https://jsd-noseo.vercel.app

GitHub Pages:
https://username.github.io/jsd-noseo/
```

⚠️ **중요**: URL에 `https://`가 포함되어 있어야 합니다!

💡 **배포 URL을 못 찾겠다면?** 
→ **DEPLOYMENT_URL_GUIDE.md** 파일을 참고하세요!

✅ **배포 완료!** URL을 메모장에 저장하세요.

---

### 🔧 2단계: PWA Builder 접속 (30초)

1. 새 탭에서 [PWA Builder](https://www.pwabuilder.com/) 접속
2. 메인 페이지의 입력창에 **배포 URL** 붙여넣기
3. **Start** 버튼 클릭

![PWA Builder 메인](https://www.pwabuilder.com/assets/new-home-hero.png)

---

### 📊 3단계: PWA 점수 확인 (1분)

PWA Builder가 자동으로 웹사이트를 분석합니다.

**확인 항목:**
- ✅ **Manifest**: 녹색 (통과)
- ✅ **Service Worker**: 녹색 (통과)
- ✅ **HTTPS**: 녹색 (통과)
- ✅ **Installable**: 녹색 (통과)

모두 녹색이어야 합니다! 현재 프로젝트는 이미 모든 조건을 만족합니다.

---

### 📦 4단계: Android 패키지 생성 (1분)

1. 페이지를 **아래로 스크롤**
2. **"Store Package"** 섹션 찾기
3. **Android** 카드 선택
4. **"Publish to Google Play"** 버튼 클릭

---

### ✏️ 5단계: 앱 정보 입력 (1분)

팝업 창에서 다음 정보 입력:

```
📱 Package ID
kr.or.jsd.gyeongju.noseo

📱 App Name
증산도 경주 노서도장

📱 App Version
1.0.0

📱 Version Code
1

🌐 Host
[배포된 URL] (예: jsd-noseo.netlify.app)

🎯 Start URL
/

🎨 Theme Color
#C8102E

🎨 Background Color
#FFFFFF

📱 Display Mode
standalone

🔄 Orientation
any
```

**입력 예시:**

| 필드 | 값 |
|------|-----|
| Package ID | `kr.or.jsd.gyeongju.noseo` |
| App Name | `증산도 경주 노서도장` |
| App Version | `1.0.0` |
| Version Code | `1` |
| Host | `jsd-noseo.netlify.app` |
| Start URL | `/` |
| Theme Color | `#C8102E` |
| Background Color | `#FFFFFF` |

---

### ⬇️ 6단계: APK 다운로드 (1분)

1. **"Generate"** 버튼 클릭
2. 잠시 대기 (1-2분)
3. **"Download"** 버튼 클릭
4. ZIP 파일 다운로드

✅ **다운로드 완료!**

---

### 📂 7단계: APK 파일 추출 (30초)

1. 다운로드한 **ZIP 파일** 찾기
2. ZIP 파일 **압축 해제**
3. 폴더 내에서 **`app-release.apk`** 파일 찾기

✅ **APK 파일 준비 완료!**

---

## 📱 APK 설치 방법

### Android 휴대폰에 설치하기

#### 방법 1: USB 케이블 사용

1. **APK 파일**을 휴대폰으로 전송
2. 휴대폰에서 **파일 관리자** 앱 열기
3. **다운로드** 폴더에서 APK 파일 찾기
4. APK 파일 **터치**
5. **"설치"** 버튼 클릭

⚠️ **처음 설치 시**: "알 수 없는 소스" 허용 필요
- 설정 → 보안 → "알 수 없는 소스" 체크

#### 방법 2: 클라우드 사용

1. APK 파일을 **Google Drive** 또는 **Dropbox**에 업로드
2. 휴대폰에서 클라우드 앱 열기
3. APK 파일 다운로드
4. 다운로드 완료 후 **설치**

#### 방법 3: 이메일 사용

1. APK 파일을 **이메일 첨부**
2. 휴대폰에서 이메일 확인
3. 첨부 파일 다운로드
4. 설치

---

## 🎉 설치 완료!

앱 아이콘이 홈 화면에 나타납니다:

```
┌──────────────────┐
│                  │
│   ☯️ 증산도      │
│   경주 노서도장  │
│                  │
└──────────────────┘
```

앱을 터치하면 바로 실행됩니다! 🚀

---

## 📤 다른 사람과 공유하기

### 방법 1: 직접 전송

1. APK 파일을 **카카오톡**, **이메일**, **문자**로 전송
2. 받는 사람이 다운로드 및 설치

### 방법 2: 클라우드 링크 공유

1. APK를 **Google Drive**에 업로드
2. **공유 링크** 생성
3. 링크를 도장 회원들에게 전송

**공유 링크 예시:**
```
https://drive.google.com/file/d/xxxxx/view?usp=sharing
```

### 방법 3: 도장 웹사이트에 게시

1. APK 파일을 웹사이트에 업로드
2. 다운로드 페이지 생성
3. 공지사항으로 안내

---

## 🔄 앱 업데이트 방법

### 자동 업데이트 (PWA 방식)

✅ **좋은 소식!** PWA Builder로 만든 앱은 **자동 업데이트**됩니다.

- 웹사이트를 업데이트하면
- 앱도 자동으로 업데이트됨
- 새 APK 배포 불필요!

### 수동 업데이트 (필요 시)

버전 번호를 올려서 새 APK 생성:

1. PWA Builder에서 **Version Code** 증가
   - 예: `1` → `2`
2. 새 APK 생성 및 배포

---

## ❓ 자주 묻는 질문

### Q1: APK 크기는 얼마나 되나요?

**A:** 약 1-2MB입니다. 매우 가볍습니다!

### Q2: 인터넷 없이도 작동하나요?

**A:** 기본 기능은 오프라인에서도 작동합니다. (Service Worker 덕분)
단, 게시글 로드 등 서버 통신은 인터넷 필요합니다.

### Q3: Google Play 스토어에 등록할 수 있나요?

**A:** 네! 가능합니다.
1. Google Play Console 계정 생성 ($25)
2. APK 업로드
3. 스토어 정보 작성
4. 심사 제출 (2-3일)

### Q4: iOS(iPhone)용 앱도 만들 수 있나요?

**A:** PWA Builder는 iOS도 지원합니다!
하지만 Apple App Store 등록은 더 복잡합니다.
- Mac 컴퓨터 필요
- Xcode 필요
- 개발자 계정 ($99/년)

### Q5: 앱이 웹사이트보다 빠른가요?

**A:** 비슷하거나 조금 더 빠릅니다.
- 네이티브 앱처럼 실행
- 브라우저 UI 없음
- 빠른 시작 시간

### Q6: 업데이트는 어떻게 하나요?

**A:** 웹사이트만 업데이트하면 됩니다!
- APK 재배포 불필요
- 자동으로 최신 버전 반영

---

## 🎯 다음 단계

### 선택사항 1: 아이콘 커스터마이징

현재 아이콘을 더 멋지게 디자인:
1. `images/icon-512x512.png` 수정
2. 새 APK 생성

### 선택사항 2: Google Play 등록

공식 앱 스토어에 등록:
1. [Google Play Console](https://play.google.com/console) 접속
2. 개발자 계정 생성 ($25)
3. APK 업로드
4. 심사 제출

### 선택사항 3: 스플래시 화면 추가

앱 시작 시 표시되는 화면:
1. PWA Builder에서 "Splash Screen" 설정
2. 로고 이미지 업로드
3. 배경색 설정

---

## 📞 도움이 필요하신가요?

### 문제 발생 시

1. **APK_BUILD_GUIDE.md** 전체 문서 참고
2. 도장 관리자에게 문의:
   - 📱 전화: 054-742-1691
   - 🏠 방문: 경북 경주시 금성로 271, 3층

### 추가 자료

- [PWA Builder 공식 문서](https://docs.pwabuilder.com/)
- [Android 개발자 가이드](https://developer.android.com/)
- [Google Play Console 도움말](https://support.google.com/googleplay/android-developer/)

---

## 🎉 축하합니다!

**5분 만에 Android 앱을 만들었습니다!** 🎊

이제 도장 회원들과 앱을 공유하고,
더 많은 사람들이 증산도 경주 노서도장을 쉽게 접할 수 있게 되었습니다!

---

## 📝 체크리스트

완료한 항목에 체크하세요:

- [ ] 웹사이트 배포 완료
- [ ] PWA Builder에서 APK 생성
- [ ] APK 파일 다운로드
- [ ] Android 기기에 설치
- [ ] 앱 실행 테스트
- [ ] 모든 기능 작동 확인
- [ ] 도장 회원들과 공유

**모두 완료하셨나요?** 🎉

증산도 경주 노서도장 앱을 즐겨보세요! 📱✨
