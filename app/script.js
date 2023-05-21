// Mendefinisikan URL HLS untuk setiap channel
const channelUrls = [
    'http://10.200.1.90:8080/live/cnn.m3u8',
    'http://10.200.1.90:8080/live/transtv.m3u8',
    'http://10.200.1.90:8080/live/trans7.m3u8',
    'https://customer-cyz81jzjbuvvtyw1.cloudflarestream.com/9dcd7f87b07ec6bc82a0f0e50ab3f2cf/manifest/video.m3u8',
    // 'https://example.com/channel5.m3u8',
    // 'https://example.com/channel6.m3u8',
    // 'https://example.com/channel7.m3u8',
    // 'https://example.com/channel8.m3u8',
    // 'https://example.com/channel9.m3u8',
    // 'https://example.com/channel10.m3u8',
    // 'https://example.com/channel11.m3u8',
    // 'https://example.com/channel12.m3u8',
    // 'https://example.com/channel13.m3u8',
    // 'https://example.com/channel14.m3u8',
    // 'https://example.com/channel15.m3u8',
    // 'https://example.com/channel16.m3u8',
  ];
  
  // Mendefinisikan jumlah channel yang akan ditampilkan pada tampilan awal
  const initialViewCount = 4;
  
  // Mendefinisikan array untuk menyimpan objek video
  const videoElements = [];
  
  // Menginisialisasi video streaming
  function initializeStreaming() {
    const videoContainer = document.getElementById('videoContainer');
  
    // Membuat video elements sesuai dengan jumlah tampilan awal
    for (let i = 0; i < initialViewCount; i++) {
      const videoBox = document.createElement('div');
      videoBox.classList.add('video-box');
  
      const videoElement = document.createElement('video');
      // videoElement.autoplay = true;
      // videoElement.autoplay = true;
      videoElement.setAttribute('controls', 'controls');
      videoElement.setAttribute('muted', '');
      videoElement.addEventListener('click', () => toggleMute(videoElement));
  
      videoBox.appendChild(videoElement);
      videoContainer.appendChild(videoBox);
  
      videoElements.push(videoElement);
    }
  
    // Memulai streaming video untuk setiap channel
    for (let i = 0; i < initialViewCount; i++) {
      startVideoStream(videoElements[i], channelUrls[i]);
    }
  }
  
  // Memulai streaming video pada elemen video tertentu dari URL HLS
  function startVideoStream(videoElement, url) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        videoElement.play();
    });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = url;
    }
  }
  
  // Toggle mute pada elemen video
  function toggleMute(videoElement) {
    videoElement.muted = true;
  }
  
  // Mengubah tampilan video menjadi tampilan grid dengan jumlah channel tertentu
  function changeView(count) {
    const videoContainer = document.getElementById('videoContainer');
  
    // Menghapus semua elemen video yang ada
    videoElements.forEach(videoElement => {
      videoElement.src = '';
      videoElement.parentNode.remove();
    });
    videoElements.length = 0;
  
    // Membuat video elements sesuai dengan jumlah tampilan yang baru
    for (let i = 0; i < count; i++) {
      const videoBox = document.createElement('div');
      videoBox.classList.add('video-box');
  
      const videoElement = document.createElement('video');
      videoElement.autoplay = true;
      videoElement.setAttribute('controls', '');
      videoElement.setAttribute('muted', '');
      videoElement.addEventListener('click', () => toggleMute(videoElement));
  
      videoBox.appendChild(videoElement);
      videoContainer.appendChild(videoBox);
  
      videoElements.push(videoElement);
    }
  
    // Memulai streaming video untuk setiap channel yang baru
    for (let i = 0; i < count; i++) {
      startVideoStream(videoElements[i], channelUrls[i]);
    }
  }
  
  // Mengatur zoom pada elemen video
  function setZoom(videoElement, zoomValue) {
    videoElement.style.transform = `scale(${zoomValue})`;
  }
  
  // Memulai streaming video
  initializeStreaming();
  