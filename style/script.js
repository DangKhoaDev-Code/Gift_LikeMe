const gif = document.getElementById('gif');
const question = document.getElementById('question');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const sound1 = document.getElementById('bg-music1');
const sound2 = document.getElementById('bg-music2');
const sound3 = document.getElementById('bg-music3');
const sound4 = document.getElementById('bg-music4');

const content = [
  { gif: 'https://i.pinimg.com/originals/7a/ef/73/7aef734a86dce4dc206976d4f0586f2c.gif', message: 'Bạn chắc chứ? 😢' },
  { gif: 'https://i.pinimg.com/originals/c8/07/e2/c807e26d8aed392f172f0bf441f60626.gif', message: 'Thử nghĩ lại nha 🥺' },
  { gif: 'https://i.pinimg.com/originals/0d/ac/7e/0dac7e14010362ff081e2167be218341.gif', message: 'Đừng mà, cho tớ cơ hội đi 💔' },
  { gif: 'https://i.pinimg.com/originals/88/e7/86/88e786492cc527584feee199936813dd.gif', message: 'Thiệt luôn đó hả? 😭' },
  { gif: 'https://i.pinimg.com/originals/82/be/ae/82beaeb21c686871437f88bbc1593288.gif', message: 'Một lần nữa thôi, năn nỉ đó 😞' },
  { gif: 'https://i.pinimg.com/originals/97/91/de/9791de11497556c4a5e800427c48fc47.gif', message: 'Tớ buồn đó nha... 😔' },
];

let clickCount = 0;

noBtn.addEventListener('click', () => {
  const index = clickCount % content.length;
  gif.src = content[index].gif;
  question.textContent = content[index].message;
  clickCount++;

  if (clickCount === 3) {
    noBtn.textContent = 'Bấm Có đi 😭';
  } else if (clickCount === 7) {
    noBtn.textContent = 'Năn nỉ đó bấm Có đi 😭';
  }

  if (clickCount <= 5) {
    sound1.play(); 
  } else if (clickCount <= 8) {
    sound2.play(); 
  }else{
    sound3.play();
  }

  const emoji = document.createElement('div');
  emoji.textContent = '😭';
  emoji.classList.add('emoji-effect');

  const rect = noBtn.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  emoji.style.left = `${rect.left + rect.width / 2}px`;
  emoji.style.top = `${rect.top + scrollY}px`;

  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 1000);

  // Thêm class shake
  noBtn.classList.add('shake');

  // Gỡ class sau khi animation kết thúc để có thể lặp lại lần sau
  setTimeout(() => noBtn.classList.remove('shake'), 600);

});

yesBtn.addEventListener('click', () => {
  question.textContent = 'Tớ biết mà! Tớ cũng thích cậu nhiều lắm ❤️';
  gif.src = 'https://i.pinimg.com/originals/7e/f6/9c/7ef69cd0a6b0b78526c8ce983b3296fc.gif';
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
  explodeHearts();
  sound4.currentTime = 103.5;
  sound4.play();
});

function explodeHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    const icons = ['❤️', '💖'];
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.classList.add('emoji-effect');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`; // Không cộng scrollY nữa
    heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  setTimeout(explodeHearts, 500);
}


    // Đoạn code JavaScript để chặn Developer Tools và các thao tác khác
    // Chặn phím tắt F12, Ctrl+Shift+I, Ctrl+U để mở Developer Tools
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.key === 'u')
      ) {
        event.preventDefault();
        return false;
      }
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('selectstart', (event) => event.preventDefault());
    document.addEventListener('cut', (event) => event.preventDefault());
    document.addEventListener('copy', (event) => event.preventDefault());
    document.addEventListener('paste', (event) => event.preventDefault());
    document.addEventListener('dragstart', (event) => event.preventDefault());
  
  
// Biến trạng thái để theo dõi việc phát hiện Developer Tools
let devToolsOpen = false;

// Hàm phát hiện và xử lý khi Developer Tools được mở
function handleDevToolsDetection() {
  const threshold = 160;
  const devToolsIsNowOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;

  if (devToolsIsNowOpen && !devToolsOpen) {
    devToolsOpen = true;
    console.warn("Developer Tools đã được phát hiện! Chuyển hướng ngay lập tức.");
    
    // Chuyển hướng đến một trang trắng ngay lập tức
    window.location.href = "about:blank";
  } else if (!devToolsIsNowOpen && devToolsOpen) {
    // Đặt lại trạng thái nếu DevTools đã đóng
    devToolsOpen = false;
  }
}

// Lắng nghe sự kiện thay đổi kích thước và kiểm tra định kỳ
window.addEventListener('resize', handleDevToolsDetection);
setInterval(handleDevToolsDetection, 500);

// Chặn các phím tắt và hành động chuột
document.addEventListener('keydown', (event) => {
  // Chặn phím F12 và các tổ hợp phím khác
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'C', 'J', 'K'].includes(event.key.toUpperCase())) ||
    (event.metaKey && event.altKey && ['I', 'C', 'J'].includes(event.key.toUpperCase()))
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
});

// Chặn chuột phải và các hành vi sao chép
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('selectstart', (event) => event.preventDefault());
document.addEventListener('copy', (event) => event.preventDefault());
document.addEventListener('cut', (event) => event.preventDefault());
document.addEventListener('paste', (event) => event.preventDefault());
