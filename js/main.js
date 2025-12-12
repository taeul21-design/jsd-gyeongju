// ===========================
// 정적 웹사이트 모드 (GitHub Pages용)
// ===========================
const STATIC_MODE = true; // GitHub Pages는 백엔드 API가 없으므로 정적 모드 사용
console.log('🌐 정적 웹사이트 모드:', STATIC_MODE ? '활성화' : '비활성화');

// ===========================
// Kakao SDK 초기화
// ===========================
// Kakao JavaScript Key (실제 키로 교체 필요)
// 카카오 개발자 사이트: https://developers.kakao.com
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    // JavaScript 키를 여기에 입력하세요
    // 현재는 테스트용 더미 키입니다. 실제 서비스에서는 카카오 개발자 사이트에서 발급받은 키를 사용하세요.
    try {
        Kakao.init('YOUR_JAVASCRIPT_KEY_HERE'); // 실제 JavaScript 키로 교체 필요
        console.log('✅ Kakao SDK 초기화 성공:', Kakao.isInitialized());
    } catch (error) {
        console.log('⚠️ Kakao SDK 초기화 대기 중...');
    }
}

// ===========================
// PWA Service Worker 등록
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker 등록 성공:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Service Worker 등록 실패:', error);
            });
    });
}

// PWA 설치 프롬프트
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // 설치 버튼 표시 (선택사항)
    showInstallPromotion();
});

// 설치 완료 이벤트
window.addEventListener('appinstalled', () => {
    console.log('✅ PWA 앱이 설치되었습니다!');
    deferredPrompt = null;
});

function showInstallPromotion() {
    // 사용자에게 앱 설치를 권장하는 UI를 표시할 수 있습니다
    // 예: 배너, 버튼 등
    console.log('💡 앱을 홈 화면에 추가할 수 있습니다!');
}

// ===========================
// 전역 변수
// ===========================
let currentPage = 1;
let currentCategory = 'all';
const postsPerPage = 6;
let allPosts = [];
let currentUser = null;

// ===========================
// ImgBB API 설정
// ===========================
// ImgBB API 키를 여기에 입력하세요
// 발급 방법: https://api.imgbb.com/ 에서 "Get API Key" 클릭
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY_HERE'; // ← 실제 API 키로 교체하세요
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';
const IMGBB_ENABLED = IMGBB_API_KEY !== 'YOUR_IMGBB_API_KEY_HERE' && IMGBB_API_KEY.length > 0;

// ===========================
// 유틸리티 함수
// ===========================
// 카카오톡 공유하기
function shareKakao() {
    // 현재 페이지 URL 가져오기
    const currentUrl = window.location.href.split('?')[0].split('#')[0];
    
    // Kakao SDK가 로드되지 않았거나 초기화되지 않은 경우
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
        console.log('⚠️ 카카오 SDK가 초기화되지 않았습니다. 대체 공유 방법을 사용합니다.');
        useFallbackShare(currentUrl);
        return;
    }
    
    try {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '증산도 경주 노서도장',
                description: '후천가을 문명시대를 준비하는 증산도 경주 노서도장입니다. 증산도 소개, 입도 안내, 도장 소식을 확인하세요.',
                imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
                link: {
                    mobileWebUrl: currentUrl,
                    webUrl: currentUrl,
                },
            },
            buttons: [
                {
                    title: '웹사이트 방문',
                    link: {
                        mobileWebUrl: currentUrl,
                        webUrl: currentUrl,
                    },
                },
            ],
        });
        console.log('✅ 카카오톡 공유 실행 완료');
    } catch (error) {
        console.error('❌ 카카오톡 공유 오류:', error);
        useFallbackShare(currentUrl);
    }
}

// 대체 공유 방법
function useFallbackShare(url) {
    // Web Share API 사용 (모바일 우선)
    if (navigator.share) {
        navigator.share({
            title: '증산도 경주 노서도장',
            text: '후천가을 문명시대를 준비하는 증산도 경주 노서도장입니다. 증산도 소개, 입도 안내, 도장 소식을 확인하세요.',
            url: url,
        })
        .then(() => console.log('✅ Web Share API 공유 성공'))
        .catch((err) => {
            if (err.name !== 'AbortError') {
                console.log('⚠️ Web Share API 실패, 클립보드 복사로 전환');
                copyToClipboard(url);
            }
        });
    } else {
        // Web Share API가 없으면 클립보드 복사
        copyToClipboard(url);
    }
}

// 클립보드에 URL 복사
function copyToClipboard(url) {
    // 최신 Clipboard API 사용
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showShareSuccessMessage();
            })
            .catch(() => {
                // Fallback: 기존 방식
                fallbackCopyToClipboard(url);
            });
    } else {
        fallbackCopyToClipboard(url);
    }
}

// Fallback 클립보드 복사 (구형 브라우저)
function fallbackCopyToClipboard(url) {
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showShareSuccessMessage();
    } catch (err) {
        console.error('클립보드 복사 실패:', err);
        alert('공유 링크:\n' + url + '\n\n위 링크를 복사해서 공유해주세요.');
    }
    document.body.removeChild(textarea);
}

// 공유 성공 메시지 표시
function showShareSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'share-success-toast';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>링크가 클립보드에 복사되었습니다!</span>
    `;
    document.body.appendChild(message);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        message.classList.add('fade-out');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// 외부 링크 이동 확인
function confirmExternalLink(url, siteName) {
    // 새 창에서 바로 열기 (확인 모달 없이)
    window.open(url, '_blank', 'noopener,noreferrer');
}

// 간단한 해시 함수 (실제 프로덕션에서는 서버에서 처리해야 함)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

// ===========================
// ImgBB 이미지 업로드 함수
// ===========================
async function uploadToImgBB(file) {
    // API 키 확인
    if (!IMGBB_ENABLED) {
        console.log('ImgBB API 키가 설정되지 않아 Base64 방식을 사용합니다.');
        return null;
    }
    
    try {
        // FormData 생성
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', IMGBB_API_KEY);
        
        // ImgBB에 업로드
        const response = await fetch(IMGBB_UPLOAD_URL, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('ImgBB 업로드 실패: ' + response.status);
        }
        
        const data = await response.json();
        
        if (data.success) {
            return {
                url: data.data.url,
                display_url: data.data.display_url,
                delete_url: data.data.delete_url || null,
                size: data.data.size
            };
        } else {
            throw new Error('ImgBB 응답 오류');
        }
        
    } catch (error) {
        console.error('ImgBB 업로드 오류:', error);
        return null;
    }
}

// ===========================
// 이미지 파일 업로드 처리
// ===========================
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 파일 크기 체크
    const maxSize = IMGBB_ENABLED ? 32 * 1024 * 1024 : 5 * 1024 * 1024; // ImgBB: 32MB, Base64: 5MB
    if (file.size > maxSize) {
        const maxSizeMB = maxSize / 1024 / 1024;
        alert(`이미지 파일 크기는 ${maxSizeMB}MB 이하여야 합니다.\n현재 파일 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        event.target.value = '';
        return;
    }
    
    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        event.target.value = '';
        return;
    }
    
    // 파일명 표시
    document.getElementById('imageFileName').textContent = file.name;
    
    // 로딩 표시
    const previewContainer = document.getElementById('imagePreview');
    previewContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i>
            <p style="margin-top: 1rem; color: var(--gray-600);">
                ${IMGBB_ENABLED ? 'ImgBB에 업로드 중...' : '이미지 처리 중...'}
            </p>
        </div>
    `;
    previewContainer.style.display = 'block';
    
    // ImgBB 업로드 시도
    let imageUrl = null;
    
    if (IMGBB_ENABLED) {
        const uploadResult = await uploadToImgBB(file);
        if (uploadResult) {
            imageUrl = uploadResult.display_url;
            console.log('✅ ImgBB 업로드 성공:', imageUrl);
        } else {
            console.log('⚠️ ImgBB 업로드 실패, Base64 방식으로 전환합니다.');
        }
    }
    
    // ImgBB 실패 시 Base64 방식 사용
    if (!imageUrl) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result;
            displayImagePreview(imageUrl, 'Base64');
        };
        reader.onerror = function() {
            alert('이미지 파일을 읽는 중 오류가 발생했습니다.');
            event.target.value = '';
            previewContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
        return;
    }
    
    // ImgBB 성공 시 미리보기 표시
    displayImagePreview(imageUrl, 'ImgBB');
}

// 이미지 미리보기 표시
function displayImagePreview(imageUrl, source) {
    const previewContainer = document.getElementById('imagePreview');
    const sourceLabel = source === 'ImgBB' ? 
        '<span style="background: #1e88e5; color: white; padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.75rem; margin-left: 0.5rem;">☁️ 클라우드</span>' : 
        '<span style="background: #757575; color: white; padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.75rem; margin-left: 0.5rem;">💾 로컬</span>';
    
    previewContainer.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <div style="margin-bottom: 0.5rem;">
                <span style="color: var(--gray-600); font-size: 0.85rem;">업로드 완료</span>
                ${sourceLabel}
            </div>
            <img src="${imageUrl}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <button type="button" onclick="clearImageUpload()" style="position: absolute; top: 40px; right: 10px; background: #C8102E; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 1.2rem; line-height: 1;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    previewContainer.style.display = 'block';
    
    // hidden input에 URL 저장
    document.getElementById('postImageUrl').value = imageUrl;
    
    // URL 입력 필드 비우기
    document.getElementById('postImageUrlDirect').value = '';
}

// 이미지 URL 직접 입력 처리
function handleImageUrlInput(event) {
    const url = event.target.value.trim();
    if (!url) return;
    
    // hidden input에 URL 저장
    document.getElementById('postImageUrl').value = url;
    
    // 미리보기 표시
    const previewContainer = document.getElementById('imagePreview');
    previewContainer.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <img src="${url}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
                 onerror="this.parentElement.innerHTML='<p style=color:#C8102E><i class=fas fa-exclamation-triangle></i> 이미지를 불러올 수 없습니다.</p>'">
            <button type="button" onclick="clearImageUpload()" style="position: absolute; top: 10px; right: 10px; background: #C8102E; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 1.2rem; line-height: 1;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    previewContainer.style.display = 'block';
    
    // 파일 업로드 초기화
    document.getElementById('postImageFile').value = '';
    document.getElementById('imageFileName').textContent = '';
}

// 이미지 업로드 초기화
function clearImageUpload() {
    document.getElementById('postImageFile').value = '';
    document.getElementById('postImageUrl').value = '';
    document.getElementById('postImageUrlDirect').value = '';
    document.getElementById('imageFileName').textContent = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('imagePreview').style.display = 'none';
}

// 썸네일 파일 업로드 처리
async function handleThumbnailUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 파일 크기 체크
    const maxSize = IMGBB_ENABLED ? 32 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
        const maxSizeMB = maxSize / 1024 / 1024;
        alert(`썸네일 파일 크기는 ${maxSizeMB}MB 이하여야 합니다.\n현재 파일 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        event.target.value = '';
        return;
    }
    
    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        event.target.value = '';
        return;
    }
    
    // 파일명 표시
    document.getElementById('thumbnailFileName').textContent = file.name;
    
    // 로딩 표시
    const previewContainer = document.getElementById('thumbnailPreview');
    previewContainer.innerHTML = `
        <div style="text-align: center; padding: 1rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; color: var(--primary-color);"></i>
            <p style="margin-top: 0.5rem; color: var(--gray-600); font-size: 0.85rem;">업로드 중...</p>
        </div>
    `;
    previewContainer.style.display = 'block';
    
    // ImgBB 업로드 시도
    let thumbnailUrl = null;
    
    if (IMGBB_ENABLED) {
        const uploadResult = await uploadToImgBB(file);
        if (uploadResult) {
            thumbnailUrl = uploadResult.display_url;
            console.log('✅ 썸네일 ImgBB 업로드 성공:', thumbnailUrl);
        } else {
            console.log('⚠️ 썸네일 ImgBB 업로드 실패, Base64 방식으로 전환합니다.');
        }
    }
    
    // ImgBB 실패 시 Base64 방식 사용
    if (!thumbnailUrl) {
        const reader = new FileReader();
        reader.onload = function(e) {
            thumbnailUrl = e.target.result;
            displayThumbnailPreview(thumbnailUrl, 'Base64');
        };
        reader.onerror = function() {
            alert('썸네일 파일을 읽는 중 오류가 발생했습니다.');
            event.target.value = '';
            previewContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
        return;
    }
    
    // ImgBB 성공 시 미리보기 표시
    displayThumbnailPreview(thumbnailUrl, 'ImgBB');
}

// 썸네일 미리보기 표시
function displayThumbnailPreview(thumbnailUrl, source) {
    const previewContainer = document.getElementById('thumbnailPreview');
    const sourceLabel = source === 'ImgBB' ? 
        '<span style="background: #1e88e5; color: white; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.7rem; margin-left: 0.3rem;">☁️</span>' : 
        '<span style="background: #757575; color: white; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.7rem; margin-left: 0.3rem;">💾</span>';
    
    previewContainer.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <div style="margin-bottom: 0.3rem;">
                <span style="color: var(--gray-600); font-size: 0.75rem;">업로드 완료</span>
                ${sourceLabel}
            </div>
            <img src="${thumbnailUrl}" style="max-width: 200px; max-height: 150px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <button type="button" onclick="clearThumbnailUpload()" style="position: absolute; top: 35px; right: 5px; background: #C8102E; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; font-size: 1rem; line-height: 1;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    previewContainer.style.display = 'block';
    
    // hidden input에 URL 저장
    document.getElementById('postThumbnail').value = thumbnailUrl;
}

// 썸네일 업로드 초기화
function clearThumbnailUpload() {
    document.getElementById('postThumbnailFile').value = '';
    document.getElementById('postThumbnail').value = '';
    document.getElementById('thumbnailFileName').textContent = '';
    document.getElementById('thumbnailPreview').innerHTML = '';
    document.getElementById('thumbnailPreview').style.display = 'none';
}

// ===========================
// 초기화
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    // 관리자 계정 초기화
    await initializeAdminAccount();
    
    // 로그인 상태 확인
    checkLoginStatus();
    
    // ImgBB 상태 표시
    updateImageUploadInfo();
    
    // 네비게이션 이벤트 설정
    setupNavigation();
    
    // 카테고리 필터 이벤트 설정
    setupCategoryFilters();
    
    // 게시글 로드
    await loadPosts();
    
    // 방명록 초기화
    setupGuestbook();
    
    // 스크롤 애니메이션
    setupScrollAnimations();
}

// 방명록 초기화
function setupGuestbook() {
    // 글자 수 카운터
    const messageTextarea = document.getElementById('guestMessage');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = 'var(--primary-color)';
            } else {
                charCount.style.color = 'var(--gray-600)';
            }
        });
    }
    
    // 방명록 폼 제출
    const guestbookForm = document.getElementById('guestbookForm');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', submitGuestbook);
        console.log('✅ 방명록 폼 이벤트 등록 완료');
    } else {
        console.warn('⚠️ 방명록 폼을 찾을 수 없습니다.');
    }
    
    // 정렬 버튼
    const sortButtons = document.querySelectorAll('.sort-btn');
    if (sortButtons.length > 0) {
        sortButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sortGuestbook(this.dataset.sort);
            });
        });
        console.log(`✅ 정렬 버튼 ${sortButtons.length}개 이벤트 등록 완료`);
    }
    
    // 방명록 로드
    loadGuestbook(1);
}

// ImgBB 업로드 정보 업데이트
function updateImageUploadInfo() {
    const infoElement = document.getElementById('imageUploadLimit');
    if (!infoElement) return;
    
    if (IMGBB_ENABLED) {
        infoElement.innerHTML = `
            <span style="color: #1e88e5; font-weight: 600;">☁️ 클라우드 업로드 활성화</span> - 최대 32MB, JPG/PNG/GIF 형식
        `;
        console.log('✅ ImgBB 클라우드 스토리지 활성화됨 (최대 32MB)');
    } else {
        infoElement.innerHTML = `
            권장: 5MB 이하, JPG/PNG/GIF 형식
            <br><span style="color: #ff9800; font-size: 0.85rem;">💡 ImgBB API 키를 설정하면 최대 32MB까지 업로드 가능합니다</span>
        `;
        console.log('⚠️ ImgBB API 키 미설정 - Base64 방식 사용 (최대 5MB)');
    }
}

// 관리자 계정 초기화
async function initializeAdminAccount() {
    try {
        // 기존 사용자 확인
        const response = await fetch('tables/users?limit=1000');
        if (!response.ok) {
            console.log('사용자 테이블이 아직 생성되지 않았습니다.');
            return;
        }
        
        const data = await response.json();
        const users = data.data || [];
        
        // admin 계정이 이미 있는지 확인
        const adminExists = users.find(u => u.username === 'admin');
        
        if (!adminExists) {
            // 관리자 계정 생성
            const adminData = {
                username: 'admin',
                password: simpleHash('password'),
                name: '김정연',
                phone: '054-742-1691',
                active: true,
                is_admin: true
            };
            
            const createResponse = await fetch('tables/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminData)
            });
            
            if (createResponse.ok) {
                console.log('✅ 관리자 계정이 생성되었습니다.');
            }
        } else {
            console.log('✅ 관리자 계정이 이미 존재합니다.');
        }
    } catch (error) {
        console.error('관리자 계정 초기화 오류:', error);
    }
}

// ===========================
// 인증 관련 함수
// ===========================
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    // 로그인 여부와 관계없이 UI 업데이트
    updateAuthUI();
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const writeButton = document.getElementById('writeButton');
    const displayName = document.getElementById('displayName');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'block';
        writeButton.style.display = 'block';
        
        // 관리자 표시
        if (currentUser.is_admin) {
            displayName.innerHTML = `${currentUser.name} <span style="background: #FFD700; color: #000; padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8em; margin-left: 0.3rem;">관리자</span>`;
        } else {
            displayName.textContent = currentUser.name;
        }
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        writeButton.style.display = 'none';
    }
    
    // 음악 업로드 버튼 업데이트 (music-player.js에 정의됨)
    if (typeof updateMusicUploadButton === 'function') {
        updateMusicUploadButton();
    }
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
        
        // 음악 재생 중이면 정지
        if (typeof stopMusic === 'function') {
            stopMusic();
        }
        
        alert('로그아웃 되었습니다.');
    }
}

// ===========================
// 로그인 모달
// ===========================
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.getElementById('loginForm').reset();
    }
}

// 비밀번호 재설정 안내
function showPasswordResetInfo() {
    const message = `━━━━━━━━━━━━━━━━━━━━━━━━
🔐 비밀번호 찾기 안내
━━━━━━━━━━━━━━━━━━━━━━━━

비밀번호를 잊으셨다면 관리자에게 
직접 연락해주세요.

📞 도장 연락처
전화: 054-742-1691
주소: 경북 경주시 금성로 271, 3층

⏰ 상담 가능 시간
평일 오전 10시 ~ 오후 6시

━━━━━━━━━━━━━━━━━━━━━━━━

✅ 관리자 기본 계정 정보:
• 아이디: admin
• 초기 비밀번호: password

* 보안을 위해 첫 로그인 후 
  비밀번호를 변경해주세요.

━━━━━━━━━━━━━━━━━━━━━━━━`;

    alert(message);
    
    // 선택: 전화 걸기 옵션 제공
    const callNow = confirm('지금 바로 전화하시겠습니까?');
    if (callNow) {
        window.location.href = 'tel:054-742-1691';
    }
}

// 로그인 폼 제출
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // 모든 사용자 조회
        const response = await fetch('tables/users?limit=1000');
        if (!response.ok) throw new Error('로그인에 실패했습니다.');
        
        const data = await response.json();
        const users = data.data || [];
        
        console.log('전체 사용자 수:', users.length);
        
        // 사용자 찾기
        const hashedPassword = simpleHash(password);
        console.log('입력한 비밀번호 해시:', hashedPassword);
        console.log('찾는 사용자:', username);
        
        const user = users.find(u => {
            console.log(`검사 중: ${u.username}, 해시: ${u.password}, 활성: ${u.active}`);
            return u.username === username && u.password === hashedPassword && u.active === true;
        });
        
        if (user) {
            currentUser = {
                id: user.id,
                username: user.username,
                name: user.name,
                phone: user.phone,
                is_admin: user.is_admin || false
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateAuthUI();
            closeLoginModal();
            
            if (user.is_admin) {
                alert(`${user.name}님(관리자), 환영합니다!`);
            } else {
                alert(`${user.name}님, 환영합니다!`);
            }
        } else {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
        
    } catch (error) {
        console.error('로그인 오류:', error);
        alert('로그인에 실패했습니다: ' + error.message);
    }
});

// ===========================
// 회원가입 모달
// ===========================
function openRegisterModal() {
    closeLoginModal();
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.getElementById('registerForm').reset();
    }
}

// 회원가입 폼 제출
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    
    // 비밀번호 확인
    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }
    
    try {
        // 아이디 중복 확인
        const checkResponse = await fetch('tables/users?limit=1000');
        if (checkResponse.ok) {
            const checkData = await checkResponse.json();
            const existingUser = (checkData.data || []).find(u => u.username === username);
            if (existingUser) {
                alert('이미 사용 중인 아이디입니다.');
                return;
            }
        }
        
        // 회원가입
        const userData = {
            username: username,
            password: simpleHash(password),
            name: name,
            phone: phone,
            is_admin: false,
            active: true
        };
        
        const response = await fetch('tables/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) throw new Error('회원가입에 실패했습니다.');
        
        alert('회원가입이 완료되었습니다! 로그인 해주세요.');
        closeRegisterModal();
        openLoginModal();
        
    } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입에 실패했습니다: ' + error.message);
    }
});

// ===========================
// 네비게이션
// ===========================
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 모바일 메뉴 토글
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // 네비게이션 링크 클릭
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 외부 링크(http로 시작)는 기본 동작 허용
            if (href.startsWith('http://') || href.startsWith('https://')) {
                // 모바일 메뉴만 닫기
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                return; // 기본 동작(새 탭에서 열기) 허용
            }
            
            // 내부 링크만 preventDefault
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // 활성 링크 업데이트
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // 모바일 메뉴 닫기
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // 스크롤 시 활성 링크 업데이트
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// 카테고리 필터
// ===========================
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 버튼 활성화 상태 업데이트
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 카테고리 변경 및 게시글 재로드
            currentCategory = button.getAttribute('data-category');
            currentPage = 1;
            
            // 정적 모드에서는 로컬 데이터 필터링
            if (STATIC_MODE) {
                displayPosts();
            } else {
                loadPosts();
            }
            
            // 카테고리별 글쓰기 버튼 표시
            updateCategoryWriteButton(currentCategory);
        });
    });
}

// 카테고리별 글쓰기 버튼 표시 업데이트
function updateCategoryWriteButton(category) {
    const postWriteSection = document.getElementById('postWriteSection');
    if (!postWriteSection) return;
    
    // 정적 모드에서는 글쓰기 버튼 숨김
    if (STATIC_MODE) {
        postWriteSection.style.display = 'none';
        return;
    }
    
    // 로그인하지 않았거나 "전체" 카테고리면 숨김
    if (!currentUser || category === 'all') {
        postWriteSection.style.display = 'none';
        return;
    }
    
    // 공지사항은 관리자 또는 특정 회원만 가능
    if (category === 'notice') {
        if (currentUser.is_admin || currentUser.username === 'taeul21') {
            postWriteSection.style.display = 'block';
        } else {
            postWriteSection.style.display = 'none';
        }
    } 
    // 다른 카테고리는 모든 로그인 사용자 가능
    else {
        postWriteSection.style.display = 'block';
    }
}

// ===========================
// 로컬 저장소 게시판 관리 (정적 모드용)
// ===========================
function loadPostsFromLocal() {
    try {
        const stored = localStorage.getItem('posts_data');
        allPosts = stored ? JSON.parse(stored) : getSamplePosts();
        
        // 저장된 데이터가 없으면 샘플 데이터 저장
        if (!stored) {
            savePostsToLocal();
        }
        
        displayPosts();
        console.log(`✅ 로컬 게시판 로드: ${allPosts.length}개`);
    } catch (error) {
        console.error('로컬 게시판 로드 실패:', error);
        allPosts = getSamplePosts();
        displayPosts();
    }
}

function savePostsToLocal() {
    try {
        localStorage.setItem('posts_data', JSON.stringify(allPosts));
        console.log('✅ 로컬 게시판 저장 완료');
    } catch (error) {
        console.error('로컬 게시판 저장 실패:', error);
    }
}

function addPostToLocal(post) {
    const newPost = {
        id: 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        title: post.title,
        content: post.content,
        category: post.category,
        author: post.author || (currentUser ? currentUser.name : '익명'),
        author_id: post.author_id || (currentUser ? currentUser.id : null),
        views: 0,
        published: true,
        created_at: Date.now(),
        ...post
    };
    
    allPosts.unshift(newPost);
    savePostsToLocal();
    displayPosts();
    
    return newPost;
}

function getSamplePosts() {
    return [
        {
            id: 'post_001',
            title: '증산도 경주 노서도장을 소개합니다',
            content: '안녕하세요. 증산도 경주 노서도장입니다. 후천가을 문명시대를 준비하는 도량으로 여러분을 초대합니다.',
            category: 'notice',
            author: '관리자',
            author_id: 'admin',
            views: 152,
            published: true,
            created_at: Date.now() - 86400000 * 7
        },
        {
            id: 'post_002',
            title: '정기 치성 안내',
            content: '매주 일요일 오전 10시 30분, 수요일 저녁 7시 30분에 정기 치성이 있습니다. 많은 참여 바랍니다.',
            category: 'dojang',
            author: '관리자',
            author_id: 'admin',
            views: 98,
            published: true,
            created_at: Date.now() - 86400000 * 3
        },
        {
            id: 'post_003',
            title: '태을주 수행 모임',
            content: '매주 토요일 오후 2시 태을주 수행 모임이 있습니다. 초보자도 환영합니다.',
            category: 'dojang',
            author: '관리자',
            author_id: 'admin',
            views: 76,
            published: true,
            created_at: Date.now() - 86400000 * 2
        }
    ];
}

function displayPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;
    
    // 카테고리 필터링
    let filteredPosts = allPosts;
    if (currentCategory && currentCategory !== 'all') {
        filteredPosts = allPosts.filter(post => post.category === currentCategory);
    }
    
    // 게시 여부 필터링
    filteredPosts = filteredPosts.filter(post => post.published === true);
    
    if (filteredPosts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-newspaper fa-3x"></i>
                <p>게시글이 없습니다.</p>
            </div>
        `;
        return;
    }
    
    // 게시글 카드 생성
    container.innerHTML = filteredPosts.map(post => createPostCardHTML(post)).join('');
}

function createPostCardHTML(post) {
    const date = new Date(post.created_at);
    const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    
    const categoryInfo = {
        'notice': { icon: 'bullhorn', color: '#C8102E', label: '공지사항' },
        'dojang': { icon: 'home', color: '#1976D2', label: '도장소식' },
        'event': { icon: 'calendar-alt', color: '#FF9800', label: '행사사진' },
        'free': { icon: 'comment-dots', color: '#4CAF50', label: '자유게시판' }
    };
    
    const catInfo = categoryInfo[post.category] || { icon: 'file', color: '#666', label: '기타' };
    
    return `
        <div class="post-card" onclick="viewPost('${post.id}')">
            <div class="post-category" style="background: ${catInfo.color};">
                <i class="fas fa-${catInfo.icon}"></i> ${catInfo.label}
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
            <div class="post-meta">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-calendar"></i> ${dateStr}</span>
                <span><i class="fas fa-eye"></i> ${post.views || 0}</span>
            </div>
        </div>
    `;
}

// 게시글 상세보기
function viewPost(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (!post) {
        alert('게시글을 찾을 수 없습니다.');
        return;
    }
    
    // 조회수 증가
    post.views = (post.views || 0) + 1;
    if (STATIC_MODE) {
        savePostsToLocal();
    }
    
    const categoryInfo = {
        'notice': { icon: 'bullhorn', color: '#C8102E', label: '공지사항' },
        'dojang': { icon: 'home', color: '#1976D2', label: '도장소식' },
        'event': { icon: 'calendar-alt', color: '#FF9800', label: '행사사진' },
        'free': { icon: 'comment-dots', color: '#4CAF50', label: '자유게시판' }
    };
    
    const catInfo = categoryInfo[post.category] || { icon: 'file', color: '#666', label: '기타' };
    const date = new Date(post.created_at);
    const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    // 모달 표시
    const modalHTML = `
        <div class="modal show" id="postViewModal" onclick="if(event.target === this) closePostViewModal()">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <span class="post-category" style="background: ${catInfo.color}; padding: 0.5rem 1rem; border-radius: 20px; color: white; font-size: 0.9rem; display: inline-block; margin-bottom: 1rem;">
                        <i class="fas fa-${catInfo.icon}"></i> ${catInfo.label}
                    </span>
                    <h2 style="margin: 0.5rem 0; word-break: keep-all;">${post.title}</h2>
                    <div class="post-meta" style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                        <span style="margin: 0 1rem;">|</span>
                        <span><i class="fas fa-calendar"></i> ${dateStr}</span>
                        <span style="margin: 0 1rem;">|</span>
                        <span><i class="fas fa-eye"></i> ${post.views}</span>
                    </div>
                    <button class="btn-close" onclick="closePostViewModal()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 2rem; line-height: 1.8; white-space: pre-wrap; word-break: keep-all;">
                    ${post.content}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closePostViewModal()">
                        <i class="fas fa-times"></i> 닫기
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closePostViewModal() {
    const modal = document.getElementById('postViewModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
        
        // 목록 새로고침 (조회수 반영)
        if (STATIC_MODE) {
            displayPosts();
        }
    }
}

// 게시글 작성 모달 열기
function openPostModal() {
    if (!currentUser) {
        alert('로그인이 필요합니다.');
        showLoginModal();
        return;
    }
    
    alert('게시글 작성 기능은 준비 중입니다.\n\n문의: 054-742-1691');
}

// ===========================
// 게시글 로드
// ===========================
async function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    
    // 정적 모드에서는 로컬 저장소 사용
    if (STATIC_MODE) {
        console.log('🌐 정적 모드: 게시판 로컬 저장소 사용');
        loadPostsFromLocal();
        return;
    }
    
    // 로딩 표시
    if (loadingElement) loadingElement.style.display = 'block';
    if (postsContainer) postsContainer.innerHTML = '';
    if (paginationElement) paginationElement.innerHTML = '';
    
    try {
        // API 호출
        const response = await fetch(`tables/posts?page=${currentPage}&limit=${postsPerPage}`);
        if (!response.ok) throw new Error('게시글을 불러오는데 실패했습니다.');
        
        const data = await response.json();
        allPosts = data.data || [];
        
        // 카테고리 필터링
        let filteredPosts = allPosts;
        if (currentCategory !== 'all') {
            filteredPosts = allPosts.filter(post => post.category === currentCategory);
        }
        
        // 게시 여부 필터링
        filteredPosts = filteredPosts.filter(post => post.published === true);
        
        // 게시글 표시
        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #6C757D;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    <p style="font-size: 1.2rem;">게시글이 없습니다.</p>
                </div>
            `;
        } else {
            filteredPosts.forEach(post => {
                const postCard = createPostCard(post);
                postsContainer.appendChild(postCard);
            });
        }
        
        // 페이지네이션 표시 (전체 데이터 기준)
        renderPagination(data.total || 0);
        
    } catch (error) {
        console.error('게시글 로드 오류:', error);
        if (postsContainer) {
            postsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #C8102E;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    <p style="font-size: 1.2rem;">게시글을 불러오는데 실패했습니다.</p>
                    <p style="color: #6C757D; margin-top: 0.5rem;">${error.message}</p>
                </div>
            `;
        }
    } finally {
        // 로딩 숨김
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

// ===========================
// 게시글 카드 생성
// ===========================
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.onclick = () => openViewModal(post);
    
    // 썸네일
    const thumbnail = post.thumbnail || 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800';
    
    // 내용 미리보기 (첫 100자)
    const excerpt = post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '');
    
    // 날짜 포맷
    const date = post.created_at ? new Date(post.created_at).toLocaleDateString('ko-KR') : '날짜 없음';
    
    card.innerHTML = `
        <img src="${thumbnail}" alt="${post.title}" class="post-thumbnail" onerror="this.src='https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800'">
        <div class="post-card-content">
            <span class="post-category-badge ${post.category}">${post.category}</span>
            <h3>${escapeHtml(post.title)}</h3>
            <p class="post-excerpt">${escapeHtml(excerpt)}</p>
            <div class="post-meta">
                <span class="post-author">
                    <i class="fas fa-user"></i>
                    ${escapeHtml(post.author)}
                </span>
                <span class="post-date">
                    <i class="fas fa-calendar"></i>
                    ${date}
                </span>
                <span class="post-views">
                    <i class="fas fa-eye"></i>
                    ${post.views || 0}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

// ===========================
// 페이지네이션
// ===========================
function renderPagination(totalPosts) {
    const paginationElement = document.getElementById('pagination');
    if (!paginationElement) return;
    
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    
    if (totalPages <= 1) {
        paginationElement.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // 이전 버튼
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> 이전
        </button>
    `;
    
    // 페이지 번호
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span style="padding: 0.5rem;">...</span>`;
        }
    }
    
    // 다음 버튼
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            다음 <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationElement.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    loadPosts();
    
    // 게시판 섹션으로 스크롤
    const postsSection = document.getElementById('news');
    if (postsSection) {
        postsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===========================
// 글쓰기 모달
// ===========================
function openPostModal(defaultCategory = null) {
    const modal = document.getElementById('postModal');
    const categorySelect = document.getElementById('postCategory');
    const guestNameField = document.getElementById('guestNameField');
    
    if (modal) {
        // 카테고리 옵션 필터링
        updateCategoryOptions();
        
        // 기본 카테고리 설정
        if (defaultCategory && categorySelect) {
            categorySelect.value = defaultCategory;
        }
        
        // 비회원 이름 입력 필드 표시/숨김
        if (guestNameField) {
            if (!currentUser) {
                guestNameField.style.display = 'block';
            } else {
                guestNameField.style.display = 'none';
            }
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// 카테고리 옵션 업데이트 (권한에 따라)
function updateCategoryOptions() {
    const categorySelect = document.getElementById('postCategory');
    if (!categorySelect) return;
    
    // 모든 옵션 제거 (첫 번째 제외)
    while (categorySelect.options.length > 1) {
        categorySelect.remove(1);
    }
    
    // 관리자 또는 taeul21은 모든 카테고리 접근 가능
    if (currentUser && (currentUser.is_admin || currentUser.username === 'taeul21')) {
        const allCategories = ['공지사항', '도장소식', '행사사진', '자유게시판'];
        allCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    } 
    // 일반 회원은 공지사항 제외
    else if (currentUser) {
        const userCategories = ['도장소식', '행사사진', '자유게시판'];
        userCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    }
    // 비회원은 자유게시판만
    else {
        const option = document.createElement('option');
        option.value = '자유게시판';
        option.textContent = '자유게시판';
        categorySelect.appendChild(option);
    }
}

function closePostModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // 모달 제목 원래대로 복원
        const modalTitle = modal.querySelector('.modal-header h2');
        if (modalTitle) {
            modalTitle.innerHTML = '<i class="fas fa-pen"></i> 글쓰기';
        }
        
        // 폼 초기화
        const form = document.getElementById('postForm');
        if (form) {
            form.reset();
            
            // 폼 제출 이벤트를 원래대로 복원
            form.onsubmit = null;
        }
        
        // 파일 업로드 관련 초기화
        clearImageUpload();
        clearThumbnailUpload();
    }
}

// 모달 외부 클릭시 닫기
document.addEventListener('click', (e) => {
    const postModal = document.getElementById('postModal');
    const viewModal = document.getElementById('viewModal');
    const bookclubModal = document.getElementById('bookclubModal');
    const stbModal = document.getElementById('stbModal');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (e.target === postModal) {
        closePostModal();
    }
    if (e.target === viewModal) {
        closeViewModal();
    }
    if (e.target === bookclubModal) {
        closeBookclubInfo();
    }
    if (e.target === stbModal) {
        closeSTBInfo();
    }
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === registerModal) {
        closeRegisterModal();
    }
});

// ===========================
// 게시글 등록
// ===========================
document.getElementById('postForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const category = document.getElementById('postCategory').value;
    
    // 자유게시판이 아닌 경우 로그인 필수
    if (category !== '자유게시판' && !currentUser) {
        alert('로그인이 필요합니다.');
        openLoginModal();
        return;
    }
    
    // 공지사항은 관리자 또는 taeul21만 작성 가능
    if (category === '공지사항' && currentUser) {
        if (!currentUser.is_admin && currentUser.username !== 'taeul21') {
            alert('공지사항은 관리자만 작성할 수 있습니다.');
            return;
        }
    }
    
    // 작성자 정보 결정
    let authorName, authorId;
    if (currentUser) {
        authorName = currentUser.name;
        authorId = currentUser.id;
    } else {
        // 비회원인 경우 이름 입력 필수
        const guestName = document.getElementById('guestName')?.value.trim();
        if (!guestName) {
            alert('이름을 입력해주세요.');
            return;
        }
        authorName = guestName;
        authorId = 'guest';
    }
    
    const formData = {
        category: category,
        title: document.getElementById('postTitle').value,
        author: authorName,
        author_id: authorId,
        content: document.getElementById('postContent').value,
        image_url: document.getElementById('postImageUrl').value || '',
        video_url: document.getElementById('postVideoUrl').value || '',
        thumbnail: document.getElementById('postThumbnail').value || '',
        views: 0,
        published: true
    };
    
    try {
        const response = await fetch('tables/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('게시글 등록에 실패했습니다.');
        
        // 성공 메시지
        alert('게시글이 성공적으로 등록되었습니다!');
        
        // 모달 닫기
        closePostModal();
        
        // 게시글 새로고침
        currentPage = 1;
        await loadPosts();
        
    } catch (error) {
        console.error('게시글 등록 오류:', error);
        alert('게시글 등록에 실패했습니다: ' + error.message);
    }
});

// ===========================
// 게시글 상세보기 모달
// ===========================
let currentViewingPost = null; // 현재 보고 있는 게시글 저장

// ===========================
// 음악 플레이어 전역 변수
// ===========================
let currentAudio = null; // 현재 재생 중인 오디오 객체
let currentMusicId = null; // 현재 재생 중인 음악 ID
let allMusic = []; // 전체 음악 목록

async function openViewModal(post) {
    const modal = document.getElementById('viewModal');
    if (!modal) return;
    
    // 현재 게시글 저장
    currentViewingPost = post;
    
    // 조회수 증가
    try {
        await fetch(`tables/posts/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                views: (post.views || 0) + 1
            })
        });
    } catch (error) {
        console.error('조회수 업데이트 오류:', error);
    }
    
    // 모달 내용 설정
    document.getElementById('viewTitle').textContent = post.title;
    document.getElementById('viewCategory').textContent = post.category;
    document.getElementById('viewCategory').className = `post-category-badge ${post.category}`;
    document.getElementById('viewAuthor').textContent = post.author;
    document.getElementById('viewDate').textContent = post.created_at 
        ? new Date(post.created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : '날짜 없음';
    document.getElementById('viewViews').textContent = (post.views || 0) + 1;
    document.getElementById('viewContent').textContent = post.content;
    
    // 관리자 권한 확인 및 수정/삭제 버튼 표시
    updateAdminActions();
    
    // 이미지 처리
    const imageContainer = document.getElementById('viewImageContainer');
    if (!imageContainer) {
        // 이미지 컨테이너가 없으면 동적으로 생성
        const container = document.createElement('div');
        container.id = 'viewImageContainer';
        container.className = 'image-container';
        container.style.display = 'none';
        document.getElementById('viewVideoContainer').parentNode.insertBefore(container, document.getElementById('viewVideoContainer'));
    }
    
    const imgContainer = document.getElementById('viewImageContainer');
    if (post.image_url && post.image_url.trim() !== '') {
        imgContainer.style.display = 'block';
        imgContainer.innerHTML = `<img src="${post.image_url}" alt="${post.title}" style="max-width: 100%; height: auto; border-radius: 10px;">`;
    } else {
        imgContainer.style.display = 'none';
        imgContainer.innerHTML = '';
    }
    
    // 동영상 처리
    const videoContainer = document.getElementById('viewVideoContainer');
    const videoElement = document.getElementById('viewVideo');
    
    if (post.video_url && post.video_url.trim() !== '') {
        videoContainer.style.display = 'block';
        videoElement.innerHTML = getVideoEmbed(post.video_url);
    } else {
        videoContainer.style.display = 'none';
        videoElement.innerHTML = '';
    }
    
    // 모달 표시
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeViewModal() {
    const modal = document.getElementById('viewModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // 현재 게시글 초기화
        currentViewingPost = null;
        
        // 게시글 새로고침 (조회수 반영)
        loadPosts();
    }
}

// ===========================
// 관리자 액션 업데이트
// ===========================
function updateAdminActions() {
    const adminActions = document.getElementById('adminPostActions');
    
    if (!adminActions) return;
    
    // 관리자 또는 taeul21 계정인 경우에만 버튼 표시
    if (currentUser && (currentUser.is_admin || currentUser.username === 'taeul21')) {
        adminActions.style.display = 'flex';
    } else {
        adminActions.style.display = 'none';
    }
}

// ===========================
// 게시글 수정
// ===========================
function editPost() {
    if (!currentViewingPost) {
        alert('게시글 정보를 불러올 수 없습니다.');
        return;
    }
    
    // 권한 확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('수정 권한이 없습니다.');
        return;
    }
    
    // 상세보기 모달 닫기
    closeViewModal();
    
    // 수정 모달 열기
    openEditModal(currentViewingPost);
}

// 수정 모달 열기
function openEditModal(post) {
    const modal = document.getElementById('postModal');
    if (!modal) return;
    
    // 모달 제목 변경
    modal.querySelector('.modal-header h2').innerHTML = '<i class="fas fa-edit"></i> 게시글 수정';
    
    // 폼 데이터 채우기
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postContent').value = post.content;
    document.getElementById('postImageUrl').value = post.image_url || '';
    document.getElementById('postVideoUrl').value = post.video_url || '';
    document.getElementById('postThumbnail').value = post.thumbnail || '';
    
    // 기존 이미지 미리보기
    if (post.image_url) {
        const preview = document.getElementById('imagePreview');
        if (preview) {
            preview.style.display = 'block';
            preview.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img src="${post.image_url}" style="max-width: 200px; border-radius: 8px;">
                    <button type="button" onclick="removeEditImage()" 
                        style="position: absolute; top: 5px; right: 5px; background: red; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">
                        ×
                    </button>
                </div>
            `;
        }
    }
    
    // 폼 제출 이벤트 변경
    const form = document.getElementById('postForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        await updatePost(post.id);
    };
    
    // 모달 표시
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 게시글 업데이트 실행
async function updatePost(postId) {
    const category = document.getElementById('postCategory').value;
    
    // 권한 재확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('수정 권한이 없습니다.');
        return;
    }
    
    const formData = {
        category: category,
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        image_url: document.getElementById('postImageUrl').value || '',
        video_url: document.getElementById('postVideoUrl').value || '',
        thumbnail: document.getElementById('postThumbnail').value || ''
    };
    
    try {
        const response = await fetch(`tables/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('게시글 수정에 실패했습니다.');
        
        // 성공 메시지
        showSuccessToast('게시글이 성공적으로 수정되었습니다! ✅');
        
        // 모달 닫기
        closePostModal();
        
        // 게시글 새로고침
        currentPage = 1;
        await loadPosts();
        
    } catch (error) {
        console.error('게시글 수정 오류:', error);
        alert('게시글 수정에 실패했습니다: ' + error.message);
    }
}

// 수정 모달에서 이미지 제거
function removeEditImage() {
    document.getElementById('postImageUrl').value = '';
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.style.display = 'none';
        preview.innerHTML = '';
    }
}

// ===========================
// 게시글 삭제
// ===========================
async function deletePost() {
    if (!currentViewingPost) {
        alert('게시글 정보를 불러올 수 없습니다.');
        return;
    }
    
    // 권한 확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('삭제 권한이 없습니다.');
        return;
    }
    
    // 삭제 확인
    const confirmDelete = confirm(
        `정말로 이 게시글을 삭제하시겠습니까?\n\n` +
        `제목: ${currentViewingPost.title}\n` +
        `카테고리: ${currentViewingPost.category}\n\n` +
        `삭제된 게시글은 복구할 수 없습니다.`
    );
    
    if (!confirmDelete) return;
    
    try {
        const response = await fetch(`tables/posts/${currentViewingPost.id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('게시글 삭제에 실패했습니다.');
        
        // 성공 메시지
        showSuccessToast('게시글이 성공적으로 삭제되었습니다! 🗑️');
        
        // 모달 닫기
        closeViewModal();
        
        // 게시글 새로고침
        currentPage = 1;
        await loadPosts();
        
    } catch (error) {
        console.error('게시글 삭제 오류:', error);
        alert('게시글 삭제에 실패했습니다: ' + error.message);
    }
}

// ===========================
// 동영상 임베드 처리
// ===========================
function getVideoEmbed(url) {
    // YouTube 처리
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
        return `<iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" allowfullscreen></iframe>`;
    }
    
    // Vimeo 처리
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
        return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" allowfullscreen></iframe>`;
    }
    
    // 직접 비디오 URL (MP4 등)
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return `<video controls playsinline webkit-playsinline>
                    <source src="${url}" type="video/mp4">
                    브라우저가 비디오를 지원하지 않습니다.
                </video>`;
    }
    
    // 기본 링크
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #C8102E; text-decoration: underline;">
                <i class="fas fa-external-link-alt"></i> 동영상 보기
            </a>`;
}

// ===========================
// 스크롤 애니메이션
// ===========================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.about-card, .step-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===========================
// 홈에서 카테고리 필터링
// ===========================
function filterCategoryFromHome(category) {
    // 카테고리 설정
    currentCategory = category;
    currentPage = 1;
    
    // 게시판 섹션으로 스크롤 후 필터 적용
    setTimeout(() => {
        // 필터 버튼 활성화 업데이트
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // 게시글 로드
        loadPosts();
    }, 500);
}

// ===========================
// 유틸리티 함수
// ===========================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ===========================
// 황금독서클럽 모달
// ===========================
function openBookclubInfo() {
    const modal = document.getElementById('bookclubModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookclubInfo() {
    const modal = document.getElementById('bookclubModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ===========================
// 상생방송 모달
// ===========================
function openSTBInfo() {
    const modal = document.getElementById('stbModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeSTBInfo() {
    const modal = document.getElementById('stbModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ===========================
// ESC 키로 모달 닫기
// ===========================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePostModal();
        closeViewModal();
        closeBookclubInfo();
        closeSTBInfo();
        closeLoginModal();
        closeRegisterModal();
    }
});

// ===========================
// 방명록 기능
// ===========================
let currentGuestbookPage = 1;
const guestbookPerPage = 10;
let allGuestbook = [];
let currentSort = 'latest';

// ===========================
// 로컬 저장소 방명록 관리 (정적 모드용)
// ===========================
function loadGuestbookFromLocal() {
    try {
        const stored = localStorage.getItem('guestbook_data');
        allGuestbook = stored ? JSON.parse(stored) : [];
        
        // 정렬 적용
        sortGuestbook(currentSort);
        
        // 카운트 업데이트
        const countElement = document.getElementById('guestbookCount');
        if (countElement) {
            countElement.textContent = `(${allGuestbook.length})`;
        }
        
        console.log(`✅ 로컬 방명록 로드: ${allGuestbook.length}개`);
    } catch (error) {
        console.error('로컬 방명록 로드 실패:', error);
        allGuestbook = [];
        displayGuestbook();
    }
}

function saveGuestbookToLocal() {
    try {
        localStorage.setItem('guestbook_data', JSON.stringify(allGuestbook));
        console.log('✅ 로컬 방명록 저장 완료');
    } catch (error) {
        console.error('로컬 방명록 저장 실패:', error);
    }
}

function addGuestbookToLocal(entry) {
    const newEntry = {
        id: 'gb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        name: entry.name,
        email: entry.email || '',
        location: entry.location || '',
        message: entry.message,
        likes: 0,
        created_at: Date.now(),
        ...entry
    };
    
    allGuestbook.unshift(newEntry);
    saveGuestbookToLocal();
    sortGuestbook(currentSort);
    
    // 카운트 업데이트
    const countElement = document.getElementById('guestbookCount');
    if (countElement) {
        countElement.textContent = `(${allGuestbook.length})`;
    }
    
    return newEntry;
}

function updateGuestbookLikes(entryId) {
    const entry = allGuestbook.find(e => e.id === entryId);
    if (entry) {
        // 로컬 스토리지에서 좋아요 기록 확인
        const likedKey = `guestbook_liked_${entryId}`;
        const hasLiked = localStorage.getItem(likedKey);
        
        if (hasLiked) {
            alert('이미 추천하셨습니다.');
            return false;
        }
        
        entry.likes = (entry.likes || 0) + 1;
        localStorage.setItem(likedKey, 'true');
        saveGuestbookToLocal();
        displayGuestbook();
        return true;
    }
    return false;
}

// 방명록 로드
async function loadGuestbook(page = 1) {
    // 정적 모드에서는 localStorage를 사용한 로컬 저장
    if (STATIC_MODE) {
        console.log('🌐 정적 모드: 방명록 로컬 저장소 사용');
        loadGuestbookFromLocal();
        return;
    }
    
    try {
        console.log(`방명록 로드 중... (페이지: ${page})`);
        
        // API 엔드포인트 확인
        const apiUrl = `/tables/guestbook?page=${page}&limit=${guestbookPerPage}&sort=created_at`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            console.error('방명록 로드 응답 오류:', response.status, response.statusText);
            
            // 404 에러인 경우 특별 처리
            if (response.status === 404) {
                console.error('❌ 방명록 테이블을 찾을 수 없습니다. 테이블이 생성되었는지 확인하세요.');
                throw new Error('방명록 테이블을 찾을 수 없습니다. 관리자에게 문의하세요.');
            }
            
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('방명록 데이터:', data);
        
        if (data && data.data) {
            if (page === 1) {
                allGuestbook = data.data;
            } else {
                allGuestbook = [...allGuestbook, ...data.data];
            }
            
            // 정렬 적용
            sortGuestbook(currentSort);
            
            // 카운트 업데이트
            const countElement = document.getElementById('guestbookCount');
            if (countElement) {
                countElement.textContent = data.total || allGuestbook.length;
            }
            
            // 더보기 버튼 표시 여부
            const loadMoreBtn = document.getElementById('guestbookLoadMore');
            if (loadMoreBtn) {
                if (data.total > allGuestbook.length) {
                    loadMoreBtn.style.display = 'block';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            }
            
            console.log(`방명록 로드 완료: ${allGuestbook.length}개`);
        } else {
            console.warn('방명록 데이터가 없습니다.');
            allGuestbook = [];
            displayGuestbook();
        }
    } catch (error) {
        console.error('방명록 로드 실패:', error);
        // 에러가 발생해도 빈 상태로 표시
        allGuestbook = [];
        displayGuestbook();
    }
}

// 방명록 표시
function displayGuestbook() {
    const container = document.getElementById('guestbookItems');
    
    if (!container) {
        console.error('방명록 컨테이너를 찾을 수 없습니다.');
        return;
    }
    
    if (!allGuestbook || allGuestbook.length === 0) {
        container.innerHTML = `
            <div class="guestbook-empty">
                <i class="fas fa-inbox"></i>
                <p>아직 작성된 방명록이 없습니다.</p>
                <p>첫 번째 방명록을 남겨주세요!</p>
            </div>
        `;
        return;
    }
    
    try {
        container.innerHTML = allGuestbook.map(entry => {
            // 안전한 데이터 추출
            const name = entry.name || '익명';
            const message = entry.message || '';
            const location = entry.location || '';
            const createdAt = entry.created_at || new Date().toISOString();
            
            const date = new Date(createdAt);
            const formattedDate = date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // 이름의 첫 글자를 아바타로 사용
            const initial = name.charAt(0).toUpperCase();
            
            // 좋아요 수
            const likesCount = entry.likes || 0;
            const isLiked = isGuestbookLiked(entry.id);
            
            return `
                <div class="guestbook-item" data-id="${entry.id}">
                    <div class="guestbook-header">
                        <div class="guestbook-author">
                            <div class="author-avatar">${initial}</div>
                            <div class="author-info">
                                <div class="author-name">${escapeHtml(name)}</div>
                                <div class="author-meta">
                                    ${location ? `<span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(location)}</span>` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="guestbook-date">
                            <i class="fas fa-clock"></i>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    <div class="guestbook-message">${escapeHtml(message)}</div>
                    <div class="guestbook-footer">
                        <div class="guestbook-actions">
                            <button class="btn-like ${isLiked ? 'liked' : ''}" onclick="toggleLike('${entry.id}', ${likesCount})">
                                <i class="fa${isLiked ? 's' : 'r'} fa-heart"></i>
                                <span class="like-count">${likesCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('방명록 표시 오류:', error);
        container.innerHTML = `
            <div class="guestbook-empty">
                <i class="fas fa-exclamation-triangle"></i>
                <p>방명록을 표시하는 중 오류가 발생했습니다.</p>
                <p>페이지를 새로고침해 주세요.</p>
            </div>
        `;
    }
}

// 방명록 제출
async function submitGuestbook(event) {
    event.preventDefault();
    
    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const location = document.getElementById('guestLocation').value.trim();
    const message = document.getElementById('guestMessage').value.trim();
    
    if (!name || !message) {
        alert('이름과 메시지는 필수 입력 항목입니다.');
        return;
    }
    
    if (message.length > 500) {
        alert('메시지는 500자를 초과할 수 없습니다.');
        return;
    }
    
    try {
        const guestbookData = {
            name: name,
            email: email,
            location: location,
            message: message,
            likes: 0
        };
        
        // 정적 모드에서는 로컬 저장소에 저장
        if (STATIC_MODE) {
            addGuestbookToLocal(guestbookData);
            alert('✅ 방명록이 성공적으로 등록되었습니다!');
            
            // 폼 초기화
            document.getElementById('guestbookForm').reset();
            document.getElementById('charCount').textContent = '0';
            
            // 방명록 섹션으로 스크롤
            const guestbookItems = document.getElementById('guestbookItems');
            if (guestbookItems) {
                guestbookItems.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return;
        }
        
        // API 모드 (원래 코드)
        guestbookData.published = true;
        
        if (currentUser && currentUser.id) {
            guestbookData.user_id = currentUser.id;
        }
        
        console.log('방명록 데이터:', guestbookData);
        
        const apiUrl = '/tables/guestbook';
        console.log('API URL:', apiUrl);
        console.log('전송 데이터:', JSON.stringify(guestbookData, null, 2));
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guestbookData)
        });
        
        console.log('응답 상태:', response.status, response.statusText);
        
        if (response.ok) {
            const result = await response.json();
            console.log('방명록 등록 성공:', result);
            
            // 성공 메시지
            alert('✅ 방명록이 성공적으로 등록되었습니다!');
            
            // 폼 초기화
            document.getElementById('guestbookForm').reset();
            document.getElementById('charCount').textContent = '0';
            
            // 방명록 새로고침
            currentGuestbookPage = 1;
            await loadGuestbook(1);
            
            // 방명록 섹션으로 스크롤
            document.getElementById('guestbookList').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            const errorText = await response.text();
            console.error('서버 응답 오류:', errorText);
            throw new Error(`방명록 등록 실패: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('방명록 제출 오류:', error);
        alert(`방명록 등록 중 오류가 발생했습니다.\n오류 내용: ${error.message}\n\n다시 시도해주세요.`);
    }
}

// 더보기
async function loadMoreGuestbook() {
    currentGuestbookPage++;
    await loadGuestbook(currentGuestbookPage);
}

// 정렬
function sortGuestbook(sortType) {
    currentSort = sortType;
    
    if (sortType === 'latest') {
        allGuestbook.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === 'likes') {
        allGuestbook.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    
    displayGuestbook();
    
    // 정렬 버튼 활성화 상태 업데이트
    document.querySelectorAll('.sort-btn').forEach(btn => {
        if (btn.dataset.sort === sortType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 좋아요 토글
async function toggleLike(entryId, currentLikes) {
    // 정적 모드에서는 로컬 저장소 사용
    if (STATIC_MODE) {
        if (updateGuestbookLikes(entryId)) {
            console.log('✅ 좋아요 업데이트 완료');
        }
        return;
    }
    
    // API 모드
    const likedEntries = JSON.parse(localStorage.getItem('likedGuestbook') || '[]');
    const isLiked = likedEntries.includes(entryId);
    
    let newLikes = currentLikes;
    
    if (isLiked) {
        // 좋아요 취소
        newLikes = Math.max(0, currentLikes - 1);
        const index = likedEntries.indexOf(entryId);
        likedEntries.splice(index, 1);
    } else {
        // 좋아요 추가
        newLikes = currentLikes + 1;
        likedEntries.push(entryId);
    }
    
    // 로컬 스토리지 업데이트
    localStorage.setItem('likedGuestbook', JSON.stringify(likedEntries));
    
    try {
        // 서버 업데이트
        await fetch(`/tables/guestbook/${entryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: newLikes })
        });
        
        // UI 업데이트
        const entry = allGuestbook.find(e => e.id === entryId);
        if (entry) {
            entry.likes = newLikes;
            displayGuestbook();
        }
    } catch (error) {
        console.error('좋아요 업데이트 실패:', error);
    }
}

// 좋아요 확인
function isGuestbookLiked(entryId) {
    const likedEntries = JSON.parse(localStorage.getItem('likedGuestbook') || '[]');
    return likedEntries.includes(entryId);
}

// 성공 토스트 메시지
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'share-success-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// HTML 이스케이프
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
