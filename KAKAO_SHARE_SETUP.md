# 카카오톡 공유 기능 설정 가이드

## 📱 개요

증산도 경주 노서도장 웹사이트에 카카오톡 공유 기능이 추가되었습니다. 헤더 상단의 노란색 "공유" 버튼을 클릭하면 카카오톡으로 사이트 링크를 공유할 수 있습니다.

## 🔑 카카오 JavaScript 키 발급 방법

카카오톡 공유 기능을 정상적으로 사용하려면 **카카오 개발자 사이트**에서 JavaScript 키를 발급받아 설정해야 합니다.

### 1단계: 카카오 개발자 계정 생성 및 로그인

1. [카카오 개발자 사이트](https://developers.kakao.com) 접속
2. 카카오 계정으로 로그인 (없으면 회원가입)

### 2단계: 애플리케이션 생성

1. 우측 상단 **"내 애플리케이션"** 클릭
2. **"애플리케이션 추가하기"** 클릭
3. 애플리케이션 정보 입력:
   - **앱 이름**: `증산도 경주 노서도장` (원하는 이름)
   - **사업자명**: `증산도 경주 노서도장` (선택사항)
   - **카테고리**: `종교` 선택
4. **"저장"** 클릭

### 3단계: JavaScript 키 확인

1. 생성된 애플리케이션 클릭
2. 좌측 메뉴에서 **"앱 설정" > "요약 정보"** 클릭
3. **"JavaScript 키"** 확인 및 복사
   - 형식: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (32자리)

### 4단계: 플랫폼 등록

1. 좌측 메뉴에서 **"앱 설정" > "플랫폼"** 클릭
2. **"Web 플랫폼 등록"** 클릭
3. **사이트 도메인** 입력:
   - 배포된 웹사이트 주소 입력 (예: `https://your-domain.com`)
   - 개발 환경: `http://localhost:포트번호` 또는 `http://127.0.0.1:포트번호`
4. **"저장"** 클릭

⚠️ **중요**: 여러 도메인을 사용하는 경우 모두 등록해야 합니다.

### 5단계: JavaScript 키 설정

발급받은 JavaScript 키를 프로젝트에 적용합니다.

#### 방법 1: `js/main.js` 파일 수정

1. `js/main.js` 파일 열기
2. 다음 두 곳의 코드를 찾아서 수정:

```javascript
// 첫 번째 위치 (약 7번째 줄)
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    try {
        Kakao.init('YOUR_JAVASCRIPT_KEY_HERE'); // ← 여기에 발급받은 키 입력
        console.log('✅ Kakao SDK 초기화 성공:', Kakao.isInitialized());
    } catch (error) {
        console.log('⚠️ Kakao SDK 초기화 대기 중...');
    }
}

// 두 번째 위치 (약 70번째 줄)
if (!Kakao.isInitialized()) {
    try {
        Kakao.init('YOUR_JAVASCRIPT_KEY_HERE'); // ← 여기에도 같은 키 입력
    } catch (error) {
        console.error('Kakao 초기화 실패:', error);
    }
}
```

**수정 예시:**
```javascript
Kakao.init('1234567890abcdef1234567890abcdef'); // 실제 발급받은 키로 교체
```

3. 파일 저장

## 🎯 동작 방식

### 정상 동작 시
1. 사용자가 헤더의 노란색 "공유" 버튼 클릭
2. 카카오톡 공유 팝업 창 표시
3. 사용자가 대화방 선택 및 전송
4. 친구가 카카오톡에서 링크 수신 및 확인

### JavaScript 키 미설정 시
1. 버튼 클릭 시 경고 메시지 표시
2. 대체 공유 방법 제공:
   - **모바일**: Web Share API 사용 (다른 앱으로 공유)
   - **데스크톱**: URL 클립보드 복사

## 📝 공유 내용 커스터마이징

공유될 내용을 수정하려면 `js/main.js` 파일의 `shareKakao()` 함수에서 다음 부분을 수정하세요:

```javascript
Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
        title: '증산도 경주 노서도장',  // ← 공유 제목
        description: '후천가을 문명시대를 준비하는 증산도 경주 노서도장입니다. 증산도 소개, 입도 안내, 도장 소식을 확인하세요.',  // ← 공유 설명
        imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',  // ← 공유 이미지 URL
        link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
        },
    },
    buttons: [
        {
            title: '웹사이트 방문',  // ← 버튼 텍스트
            link: {
                mobileWebUrl: currentUrl,
                webUrl: currentUrl,
            },
        },
    ],
});
```

### 이미지 변경 방법
- 공유 썸네일 이미지를 변경하려면 `imageUrl` 값을 원하는 이미지 URL로 변경
- 권장 이미지 크기: 800x800px 이상
- 권장 이미지 형식: JPG, PNG
- 이미지는 반드시 **HTTPS** URL이어야 함

## 🎨 버튼 디자인

### 현재 디자인
- **배경색**: 카카오 노란색 (#FEE500)
- **위치**: 헤더 상단, 로고와 네비게이션 사이
- **아이콘**: 💬 이모지
- **텍스트**: "공유" (모바일에서는 숨김)

### 디자인 변경 방법
`css/style.css` 파일의 `.kakao-share-btn` 클래스를 수정:

```css
.kakao-share-btn {
    background: #FEE500;  /* 배경색 */
    color: #3C1E1E;       /* 텍스트 색상 */
    padding: 0.6rem 1rem; /* 여백 */
    border-radius: 8px;   /* 모서리 둥글기 */
    /* 기타 스타일 속성... */
}
```

## 🔧 문제 해결

### 1. "카카오톡 공유 기능을 사용할 수 없습니다" 오류
**원인**: Kakao SDK가 로드되지 않음
**해결**:
- 인터넷 연결 확인
- `index.html` 파일에 Kakao SDK 스크립트가 있는지 확인
- 브라우저 콘솔에서 오류 메시지 확인

### 2. "Kakao 초기화 실패" 오류
**원인**: JavaScript 키가 설정되지 않았거나 잘못됨
**해결**:
- `js/main.js` 파일에서 `YOUR_JAVASCRIPT_KEY_HERE`를 실제 키로 교체했는지 확인
- 카카오 개발자 사이트에서 키가 정확한지 확인
- 키에 공백이나 특수문자가 포함되지 않았는지 확인

### 3. "도메인이 등록되지 않았습니다" 오류
**원인**: 카카오 개발자 사이트에 플랫폼(도메인)이 등록되지 않음
**해결**:
- 카카오 개발자 사이트 > 앱 설정 > 플랫폼에서 현재 도메인 등록
- 도메인 형식 확인 (`https://` 포함)

### 4. 공유 버튼을 눌러도 반응이 없음
**해결**:
- 브라우저 개발자 도구(F12) > Console 탭에서 오류 확인
- JavaScript 파일이 정상적으로 로드되었는지 확인
- 브라우저 캐시 삭제 후 다시 시도

## 📱 테스트 방법

### 1. 로컬 테스트
1. 카카오 개발자 사이트에 `http://localhost:포트번호` 등록
2. 로컬 서버 실행
3. 브라우저에서 사이트 접속
4. 공유 버튼 클릭하여 테스트

### 2. 배포 후 테스트
1. 실제 도메인을 카카오 개발자 사이트에 등록
2. 배포된 사이트 접속
3. 모바일과 데스크톱에서 각각 테스트
4. 카카오톡에서 공유된 메시지 확인

## 📚 참고 자료

- [카카오 개발자 사이트](https://developers.kakao.com)
- [Kakao JavaScript SDK 가이드](https://developers.kakao.com/docs/latest/ko/javascript/getting-started)
- [카카오톡 공유 가이드](https://developers.kakao.com/docs/latest/ko/message/js)
- [카카오톡 링크 API](https://developers.kakao.com/docs/latest/ko/message/js-link)

## ⚠️ 주의사항

1. **JavaScript 키는 공개되어도 안전합니다**: JavaScript 키는 클라이언트에서 사용하는 키로, 코드에 노출되어도 문제없습니다.
2. **플랫폼 등록 필수**: 사용할 도메인을 반드시 카카오 개발자 사이트에 등록해야 합니다.
3. **이미지 URL은 HTTPS 필수**: 공유 이미지는 반드시 HTTPS 프로토콜을 사용해야 합니다.
4. **대체 공유 방법 제공**: Kakao SDK가 작동하지 않는 경우를 대비해 Web Share API와 클립보드 복사 기능이 자동으로 작동합니다.

## ✅ 체크리스트

설정 완료 후 다음 사항을 확인하세요:

- [ ] 카카오 개발자 계정 생성
- [ ] 애플리케이션 등록
- [ ] JavaScript 키 발급
- [ ] 플랫폼(도메인) 등록
- [ ] `js/main.js` 파일에 JavaScript 키 입력 (2곳)
- [ ] 로컬 환경에서 테스트
- [ ] 배포 환경에서 테스트
- [ ] 모바일에서 테스트
- [ ] 카카오톡에서 공유 메시지 확인

---

문제가 발생하거나 추가 도움이 필요하시면 카카오 개발자 포럼을 참고하거나 개발팀에 문의하세요.
