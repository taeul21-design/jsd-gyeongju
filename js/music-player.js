// ===========================
// 음악 플레이어 기능
// ===========================

// 전역 변수는 main.js에 이미 선언됨
// let currentAudio = null;
// let currentMusicId = null;
// let allMusic = [];

// ===========================
// 음악 목록 로드
// ===========================
async function loadMusic() {
    // 정적 모드인 경우 기본 음악 목록 사용
    if (typeof STATIC_MODE !== 'undefined' && STATIC_MODE === true) {
        console.log('🎵 정적 모드: 기본 음악 목록 로드');
        allMusic = getDefaultMusicList();
        renderMusicList();
        return;
    }
    
    try {
        const response = await fetch('tables/music?limit=1000&sort=-created_at');
        if (!response.ok) throw new Error('음악 목록을 불러올 수 없습니다.');
        
        const data = await response.json();
        allMusic = (data.data || []).filter(music => music.published === true);
        
        console.log('로드된 음악:', allMusic.length + '곡');
        
        renderMusicList();
        
    } catch (error) {
        console.error('음악 로드 오류:', error);
        // 에러 발생 시 기본 목록으로 폴백
        console.log('⚠️ API 실패, 기본 음악 목록 사용');
        allMusic = getDefaultMusicList();
        renderMusicList();
    }
}

// ===========================
// 기본 음악 목록 (정적 모드용)
// ===========================
function getDefaultMusicList() {
    return [
        {
            id: 'music-001',
            title: '천지성공',
            artist: '증산도',
            category: '성곡',
            audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            thumbnail_url: '',
            published: true,
            created_at: Date.now()
        },
        {
            id: 'music-002',
            title: '개벽의 노래',
            artist: '증산도',
            category: '성곡',
            audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            thumbnail_url: '',
            published: true,
            created_at: Date.now() - 1000
        },
        {
            id: 'music-003',
            title: '태을주 수행곡',
            artist: '증산도',
            category: '수행',
            audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            thumbnail_url: '',
            published: true,
            created_at: Date.now() - 2000
        },
        {
            id: 'music-004',
            title: '상생의 길',
            artist: '증산도',
            category: '성곡',
            audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            thumbnail_url: '',
            published: true,
            created_at: Date.now() - 3000
        },
        {
            id: 'music-005',
            title: '후천개벽가',
            artist: '증산도',
            category: '성곡',
            audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            thumbnail_url: '',
            published: true,
            created_at: Date.now() - 4000
        }
    ];
}

// ===========================
// 음악 목록 렌더링
// ===========================
function renderMusicList() {
    const container = document.getElementById('musicItems');
    
    if (!container) return;
    
    if (allMusic.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-compact-disc fa-3x"></i>
                <p>아직 등록된 음악이 없습니다.</p>
                ${currentUser && (currentUser.is_admin || currentUser.username === 'taeul21') ? 
                    '<p style="font-size: 0.9rem; margin-top: 1rem;">하단의 "음악 업로드" 버튼을 눌러 첫 음악을 추가해보세요!</p>' : ''}
            </div>
        `;
        return;
    }
    
    // 관리자 권한 확인 (정적 모드에서는 편집 기능 비활성화)
    const isAdmin = !STATIC_MODE && currentUser && (currentUser.is_admin || currentUser.username === 'taeul21');
    
    container.innerHTML = allMusic.map(music => {
        const isPlaying = currentMusicId === music.id;
        return `
            <div class="music-item ${isPlaying ? 'playing' : ''}" data-music-id="${music.id}">
                <div class="music-thumbnail" onclick="playMusic('${music.id}')">
                    ${music.thumbnail_url ? 
                        `<img src="${music.thumbnail_url}" alt="${music.title}">` : 
                        `<i class="fas fa-music"></i>`
                    }
                </div>
                <div class="music-info" onclick="playMusic('${music.id}')">
                    <div class="music-title">${music.title}</div>
                    <div class="music-meta">
                        <span class="music-artist">
                            <i class="fas fa-user"></i> ${music.artist || '작자 미상'}
                        </span>
                        <span class="music-category">
                            <i class="fas fa-tag"></i> ${music.category || '기타'}
                        </span>
                    </div>
                </div>
                <div class="music-controls">
                    <div class="music-play-icon" onclick="playMusic('${music.id}')">
                        <i class="fas ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                    </div>
                    ${isAdmin ? `
                        <div class="music-admin-actions">
                            <button class="music-edit-btn" onclick="event.stopPropagation(); editMusic('${music.id}')" title="수정">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="music-delete-btn" onclick="event.stopPropagation(); deleteMusic('${music.id}')" title="삭제">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ===========================
// URL 변환 (네이버 MYBOX 등)
// ===========================
function convertToDirectUrl(url) {
    // 네이버 MYBOX 링크 변환
    // 예: https://mybox.naver.com/share/... → 직접 재생 가능한 링크
    if (url.includes('mybox.naver.com')) {
        // MYBOX 공유 링크에서 파일 ID 추출
        // 실제 다운로드 링크로 변환
        // 주의: 네이버 MYBOX는 직접 스트리밍을 지원하지 않을 수 있음
        console.log('네이버 MYBOX 링크 감지:', url);
        
        // MYBOX 링크는 그대로 사용 (브라우저가 처리)
        return url;
    }
    
    // Google Drive 링크 자동 변환
    if (url.includes('drive.google.com/file/d/')) {
        const fileIdMatch = url.match(/\/d\/([^\/]+)/);
        if (fileIdMatch) {
            const fileId = fileIdMatch[1];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
    }
    
    // Dropbox 링크 자동 변환
    if (url.includes('dropbox.com') && url.includes('dl=0')) {
        return url.replace('dl=0', 'dl=1');
    }
    
    // 그 외 링크는 그대로 반환
    return url;
}

// ===========================
// 음악 재생
// ===========================
async function playMusic(musicId) {
    const music = allMusic.find(m => m.id === musicId);
    if (!music) return;
    
    // 같은 음악을 다시 클릭하면 일시정지/재생
    if (currentMusicId === musicId && currentAudio) {
        togglePlayPause();
        return;
    }
    
    // 기존 오디오 정지
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // URL 변환 (네이버 MYBOX 등)
    const directUrl = convertToDirectUrl(music.music_url);
    console.log('원본 URL:', music.music_url);
    console.log('변환된 URL:', directUrl);
    
    // 새 오디오 객체 생성
    currentAudio = new Audio(directUrl);
    currentMusicId = musicId;
    
    // 자동 재생 설정
    currentAudio.autoplay = true;
    currentAudio.preload = 'auto';
    
    // 오디오 이벤트 리스너
    currentAudio.addEventListener('loadedmetadata', () => {
        console.log('✅ 오디오 메타데이터 로드 완료');
        updateTotalTime();
    });
    
    currentAudio.addEventListener('canplay', () => {
        console.log('✅ 오디오 재생 준비 완료');
    });
    
    currentAudio.addEventListener('playing', () => {
        console.log('▶️ 오디오 재생 시작');
    });
    
    currentAudio.addEventListener('timeupdate', () => {
        updateProgress();
    });
    
    currentAudio.addEventListener('ended', () => {
        console.log('⏹️ 오디오 재생 종료');
        onSongEnded();
    });
    
    currentAudio.addEventListener('error', (e) => {
        console.error('❌ 오디오 로드 오류:', e);
        console.error('오류 상세:', {
            code: currentAudio.error?.code,
            message: currentAudio.error?.message,
            url: directUrl
        });
        
        let errorMessage = '음악을 재생할 수 없습니다.\n\n';
        
        switch(currentAudio.error?.code) {
            case 1: // MEDIA_ERR_ABORTED
                errorMessage += '재생이 중단되었습니다.';
                break;
            case 2: // MEDIA_ERR_NETWORK
                errorMessage += '네트워크 오류가 발생했습니다.\n인터넷 연결을 확인해주세요.';
                break;
            case 3: // MEDIA_ERR_DECODE
                errorMessage += '음악 파일 형식이 올바르지 않습니다.\nMP3 파일인지 확인해주세요.';
                break;
            case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
                errorMessage += '지원하지 않는 음악 파일 형식이거나\nURL이 올바르지 않습니다.\n\n';
                errorMessage += '💡 네이버 MYBOX는 직접 스트리밍을 지원하지 않을 수 있습니다.\n';
                errorMessage += 'Archive.org 또는 Dropbox 사용을 권장합니다.';
                break;
            default:
                errorMessage += 'URL을 확인해주세요.';
        }
        
        alert(errorMessage);
        stopMusic();
    });
    
    // 재생 시도
    try {
        console.log('🎵 재생 시도 중...');
        
        // UI 먼저 업데이트 (즉각적인 피드백)
        updateNowPlaying(music);
        renderMusicList();
        
        // 재생 시도
        const playPromise = currentAudio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('✅ 재생 성공!');
                    // 재생 횟수 증가
                    incrementPlayCount(musicId);
                })
                .catch((error) => {
                    console.error('❌ 재생 실패:', error);
                    
                    // 자동 재생 차단된 경우
                    if (error.name === 'NotAllowedError') {
                        alert('브라우저가 자동 재생을 차단했습니다.\n\n' +
                              '다시 한 번 클릭하여 재생해주세요.\n' +
                              '(브라우저 설정에서 자동 재생을 허용할 수 있습니다)');
                    } else {
                        alert('음악 재생에 실패했습니다.\n\n' +
                              '네이버 MYBOX 링크가 올바른지 확인해주세요.\n' +
                              'Archive.org 또는 Dropbox 사용을 권장합니다.');
                    }
                    stopMusic();
                });
        }
        
    } catch (error) {
        console.error('❌ 재생 오류:', error);
        alert('음악 재생에 실패했습니다.\n\n' +
              '네이버 MYBOX는 직접 스트리밍을 지원하지 않을 수 있습니다.\n' +
              'Archive.org 또는 Dropbox 사용을 권장합니다.');
        stopMusic();
    }
}

// ===========================
// 재생/일시정지 토글
// ===========================
function togglePlayPause() {
    if (!currentAudio) return;
    
    if (currentAudio.paused) {
        currentAudio.play();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        currentAudio.pause();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    }
}

// ===========================
// 음악 정지
// ===========================
function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    currentMusicId = null;
    
    // UI 초기화
    document.getElementById('nowPlaying').style.display = 'none';
    renderMusicList();
}

// ===========================
// 현재 재생 중인 음악 정보 업데이트
// ===========================
function updateNowPlaying(music) {
    document.getElementById('currentSongTitle').textContent = music.title;
    document.getElementById('currentSongArtist').textContent = music.artist || '작자 미상';
    document.getElementById('nowPlaying').style.display = 'block';
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
}

// ===========================
// 진행 바 업데이트
// ===========================
function updateProgress() {
    if (!currentAudio) return;
    
    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    
    // 현재 시간 표시
    const currentMinutes = Math.floor(currentAudio.currentTime / 60);
    const currentSeconds = Math.floor(currentAudio.currentTime % 60);
    document.getElementById('currentTime').textContent = 
        `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
}

// ===========================
// 전체 시간 업데이트
// ===========================
function updateTotalTime() {
    if (!currentAudio) return;
    
    const totalMinutes = Math.floor(currentAudio.duration / 60);
    const totalSeconds = Math.floor(currentAudio.duration % 60);
    document.getElementById('totalTime').textContent = 
        `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
}

// ===========================
// 곡 종료 시
// ===========================
function onSongEnded() {
    // 다음 곡 자동 재생 (선택사항)
    const currentIndex = allMusic.findIndex(m => m.id === currentMusicId);
    if (currentIndex < allMusic.length - 1) {
        playMusic(allMusic[currentIndex + 1].id);
    } else {
        stopMusic();
    }
}

// ===========================
// 재생 횟수 증가
// ===========================
async function incrementPlayCount(musicId) {
    try {
        const music = allMusic.find(m => m.id === musicId);
        if (!music) return;
        
        const newCount = (music.play_count || 0) + 1;
        
        await fetch(`tables/music/${musicId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ play_count: newCount })
        });
        
        // 로컬 데이터 업데이트
        music.play_count = newCount;
        
    } catch (error) {
        console.error('재생 횟수 업데이트 오류:', error);
    }
}

// ===========================
// 진행 바 클릭으로 위치 이동
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            if (!currentAudio) return;
            
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            currentAudio.currentTime = percent * currentAudio.duration;
        });
    }
});

// ===========================
// 음악 업로드 모달
// ===========================
function openMusicUploadModal() {
    // 권한 확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('음악 업로드 권한이 없습니다.');
        return;
    }
    
    const modal = document.getElementById('musicUploadModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeMusicUploadModal() {
    const modal = document.getElementById('musicUploadModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.getElementById('musicUploadForm').reset();
    }
}

// ===========================
// 음악 업로드 폼 제출
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('musicUploadForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 권한 재확인
            if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
                alert('음악 업로드 권한이 없습니다.');
                return;
            }
            
            const musicData = {
                title: document.getElementById('musicTitle').value,
                artist: document.getElementById('musicArtist').value,
                category: document.getElementById('musicCategory').value,
                description: document.getElementById('musicDescription').value,
                music_url: document.getElementById('musicUrl').value,
                thumbnail_url: document.getElementById('musicThumbnail').value || '',
                uploaded_by: currentUser.username,
                play_count: 0,
                published: true
            };
            
            try {
                const response = await fetch('tables/music', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(musicData)
                });
                
                if (!response.ok) throw new Error('음악 업로드에 실패했습니다.');
                
                showSuccessToast('음악이 성공적으로 업로드되었습니다! 🎵');
                closeMusicUploadModal();
                await loadMusic(); // 목록 새로고침
                
            } catch (error) {
                console.error('음악 업로드 오류:', error);
                alert('음악 업로드에 실패했습니다: ' + error.message);
            }
        });
    }
});

// ===========================
// 관리자 업로드 버튼 표시
// ===========================
function updateMusicUploadButton() {
    const uploadSection = document.getElementById('musicUploadSection');
    if (!uploadSection) return;
    
    // 정적 모드에서는 업로드 버튼 숨김
    if (typeof STATIC_MODE !== 'undefined' && STATIC_MODE === true) {
        uploadSection.style.display = 'none';
        return;
    }
    
    // admin 또는 taeul21만 업로드 버튼 표시
    if (currentUser && (currentUser.is_admin || currentUser.username === 'taeul21')) {
        uploadSection.style.display = 'block';
    } else {
        uploadSection.style.display = 'none';
    }
}

// ===========================
// 음악 수정
// ===========================
function editMusic(musicId) {
    // 권한 확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('음악 수정 권한이 없습니다.');
        return;
    }
    
    const music = allMusic.find(m => m.id === musicId);
    if (!music) {
        alert('음악 정보를 찾을 수 없습니다.');
        return;
    }
    
    // 모달 열기
    const modal = document.getElementById('musicUploadModal');
    if (!modal) return;
    
    // 모달 제목 변경
    const modalTitle = modal.querySelector('.modal-header h2');
    if (modalTitle) {
        modalTitle.innerHTML = '<i class="fas fa-edit"></i> 음악 수정';
    }
    
    // 기존 데이터 채우기
    document.getElementById('musicTitle').value = music.title;
    document.getElementById('musicArtist').value = music.artist || '';
    document.getElementById('musicCategory').value = music.category || 'AI창작곡';
    document.getElementById('musicDescription').value = music.description || '';
    document.getElementById('musicUrl').value = music.music_url;
    document.getElementById('musicThumbnail').value = music.thumbnail_url || '';
    
    // 폼 제출 핸들러 변경
    const form = document.getElementById('musicUploadForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        await updateMusic(musicId);
    };
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// ===========================
// 음악 업데이트
// ===========================
async function updateMusic(musicId) {
    // 권한 재확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('음악 수정 권한이 없습니다.');
        return;
    }
    
    const musicData = {
        title: document.getElementById('musicTitle').value,
        artist: document.getElementById('musicArtist').value,
        category: document.getElementById('musicCategory').value,
        description: document.getElementById('musicDescription').value,
        music_url: document.getElementById('musicUrl').value,
        thumbnail_url: document.getElementById('musicThumbnail').value || ''
    };
    
    try {
        const response = await fetch(`tables/music/${musicId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(musicData)
        });
        
        if (!response.ok) throw new Error('음악 수정에 실패했습니다.');
        
        showSuccessToast('음악이 성공적으로 수정되었습니다! ✅');
        closeMusicUploadModal();
        await loadMusic(); // 목록 새로고침
        
        // 현재 재생 중이던 곡이면 정보 업데이트
        if (currentMusicId === musicId) {
            const updatedMusic = allMusic.find(m => m.id === musicId);
            if (updatedMusic) {
                updateNowPlaying(updatedMusic);
            }
        }
        
    } catch (error) {
        console.error('음악 수정 오류:', error);
        alert('음악 수정에 실패했습니다: ' + error.message);
    }
}

// ===========================
// 음악 삭제
// ===========================
async function deleteMusic(musicId) {
    // 권한 확인
    if (!currentUser || (!currentUser.is_admin && currentUser.username !== 'taeul21')) {
        alert('음악 삭제 권한이 없습니다.');
        return;
    }
    
    const music = allMusic.find(m => m.id === musicId);
    if (!music) {
        alert('음악 정보를 찾을 수 없습니다.');
        return;
    }
    
    // 확인 대화상자
    const confirmDelete = confirm(
        `정말로 이 음악을 삭제하시겠습니까?\n\n` +
        `제목: ${music.title}\n` +
        `작곡가: ${music.artist || '작자 미상'}\n` +
        `카테고리: ${music.category || '기타'}\n\n` +
        `삭제된 음악은 복구할 수 없습니다.`
    );
    
    if (!confirmDelete) return;
    
    try {
        // 재생 중이면 정지
        if (currentMusicId === musicId) {
            stopMusic();
        }
        
        const response = await fetch(`tables/music/${musicId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('음악 삭제에 실패했습니다.');
        
        showSuccessToast('음악이 성공적으로 삭제되었습니다! 🗑️');
        await loadMusic(); // 목록 새로고침
        
    } catch (error) {
        console.error('음악 삭제 오류:', error);
        alert('음악 삭제에 실패했습니다: ' + error.message);
    }
}

// ===========================
// 모달 닫을 때 초기화
// ===========================
function closeMusicUploadModalReset() {
    const modal = document.getElementById('musicUploadModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // 모달 제목 복원
        const modalTitle = modal.querySelector('.modal-header h2');
        if (modalTitle) {
            modalTitle.innerHTML = '<i class="fas fa-upload"></i> 음악 업로드';
        }
        
        // 폼 초기화
        const form = document.getElementById('musicUploadForm');
        if (form) {
            form.reset();
            form.onsubmit = null; // 기존 핸들러 제거
        }
    }
}

// closeMusicUploadModal 함수를 새 함수로 대체
window.closeMusicUploadModal = closeMusicUploadModalReset;

// ===========================
// 초기화
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // 음악 섹션이 있으면 초기화
    if (document.getElementById('musicPlayerSection')) {
        loadMusic();
        updateMusicUploadButton();
    }
});
