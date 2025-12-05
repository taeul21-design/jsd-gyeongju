# 🔑 비밀번호 변경 가이드

## ⚠️ 문제 상황

**사용자가 보고한 로그인 오류:**
- **계정**: `taeul21`
- **입력한 비밀번호**: `haewon2000!`
- **오류 메시지**: "아이디 또는 비밀번호가 올바르지 않습니다."

---

## 🔍 원인 분석

1. **DB에 저장된 비밀번호**: 기본값 `password`로 설정됨
2. **사용자가 입력한 비밀번호**: `haewon2000!`
3. **결과**: 비밀번호 해시값이 일치하지 않아 로그인 실패

**데이터베이스 초기 설정 시 `taeul21` 계정은 기본 비밀번호 `password`로 생성되었습니다.**

---

## ✅ 해결 방법

### **방법 1: Debug 페이지로 비밀번호 변경 (권장)**

#### Step 1: Debug 페이지 접속
```
https://jsd-gyeongju.com/debug-users.html
```
또는 Genspark 환경에서:
```
[배포 URL]/debug-users.html
```

#### Step 2: 비밀번호 변경 섹션 사용
1. **아이디 입력**: `taeul21` (이미 입력되어 있음)
2. **새 비밀번호 입력**: `haewon2000!` (이미 입력되어 있음)
3. **"비밀번호 변경" 버튼 클릭**

#### Step 3: 변경 결과 확인
성공 메시지가 표시되면 즉시 새 비밀번호로 로그인 가능합니다.

```
✅ 비밀번호 변경 완료!

계정 정보:
• 아이디: taeul21
• 새 비밀번호: haewon2000!
• 비밀번호 해시: [자동 생성된 해시값]
• 이름: 김정연
• 활성 상태: 활성

이제 새 비밀번호로 로그인할 수 있습니다.
```

---

### **방법 2: API 직접 호출 (고급 사용자)**

Postman, cURL, 또는 브라우저 콘솔을 통해 직접 API를 호출할 수 있습니다.

#### Step 1: 사용자 ID 조회
```bash
GET https://jsd-gyeongju.com/tables/users?limit=1000
```

#### Step 2: 비밀번호 해시 계산
```javascript
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

const newPasswordHash = simpleHash('haewon2000!');
console.log(newPasswordHash);
```

#### Step 3: 비밀번호 업데이트
```bash
PATCH https://jsd-gyeongju.com/tables/users/[USER_ID]
Content-Type: application/json

{
  "password": "[계산된 해시값]"
}
```

---

## 🧪 테스트 방법

### 1. Debug 페이지에서 로그인 테스트
```
1. debug-users.html 접속
2. "🧪 taeul21 로그인 테스트" 버튼 클릭
3. 결과 확인:
   - 성공: "✅ 로그인 성공!" 메시지 표시
   - 실패: 원인 분석 메시지 표시
```

### 2. 실제 로그인 페이지에서 테스트
```
1. 메인 페이지에서 "로그인" 버튼 클릭
2. 아이디: taeul21
3. 비밀번호: haewon2000!
4. "로그인" 버튼 클릭
5. "김정연님(관리자), 환영합니다!" 메시지 확인
```

---

## 📋 비밀번호 해시 참고

| 비밀번호 | 해시값 |
|---------|-------|
| `password` | `5e884898da28047151d0e56f8dc62927` (예시) |
| `haewon2000!` | *debug-users.html에서 확인 가능* |

**참고**: 실제 해시값은 `simpleHash()` 함수를 통해 계산됩니다.

---

## 🛠️ Debug 페이지 주요 기능

### 1. 사용자 목록 조회
- 모든 등록된 사용자 확인
- 비밀번호 해시값 확인
- 활성/비활성 상태 확인

### 2. 비밀번호 해시 테스트
- 원하는 비밀번호의 해시값 계산
- DB 저장값과 비교 가능

### 3. 로그인 테스트
- Admin 계정 테스트
- taeul21 계정 테스트
- 실패 원인 자동 분석

### 4. 계정 생성
- 기본 계정 자동 생성 (admin, taeul21)
- 초기 비밀번호: `password`

### 5. **비밀번호 변경** ⭐ NEW!
- 특정 사용자의 비밀번호를 원하는 값으로 변경
- 실시간 변경 결과 확인

---

## 🔒 보안 권장사항

1. **비밀번호 변경 후 debug-users.html 접근 제한**
   - GitHub Pages에서는 파일을 삭제하거나 이름 변경 권장
   - 또는 `.htaccess`로 접근 차단

2. **기본 비밀번호 즉시 변경**
   - `admin` 계정의 기본 비밀번호 `password`도 변경 필요
   - 첫 로그인 후 반드시 변경 권장

3. **비밀번호 강도 강화**
   - 최소 8자 이상
   - 영문 대소문자, 숫자, 특수문자 조합
   - 예: `haewon2000!` ✅

---

## 📞 추가 지원

비밀번호 변경 중 문제가 발생하면:

**경주 노서도장 연락처**
- 📞 전화: **054-742-1691**
- 📍 주소: 경북 경주시 금성로 271, 3층
- ⏰ 상담 시간: 평일 오전 10시 ~ 오후 6시

---

## 📝 변경 이력

### v2.0.2 - 비밀번호 변경 기능 추가
- `debug-users.html`에 비밀번호 변경 UI 추가
- `updatePassword()` 함수 구현
- taeul21 계정 비밀번호 변경 지원
- PASSWORD_UPDATE_GUIDE.md 문서 생성

---

**✅ 이제 `taeul21` 계정으로 `haewon2000!` 비밀번호를 사용하여 로그인할 수 있습니다!**
