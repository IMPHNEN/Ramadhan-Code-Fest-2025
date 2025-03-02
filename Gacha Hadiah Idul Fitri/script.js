document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('resetButton');
    const openButton = document.getElementById('openButton');
    const giftBoxContainer = document.querySelector('.gift-box-container');
    const giftBox = document.querySelector('.gift-box');
    const giftBoxLeft = document.querySelector('.gift-box-left');
    const giftBoxRight = document.querySelector('.gift-box-right');
    const giftLid = document.querySelector('.gift-lid');
    const prizeContainer = document.querySelector('.prize-container');
    const prizeText = document.querySelector('.prize-text');
    const prizeIcon = document.querySelector('.prize-icon');
    const prizeImage = document.querySelector('.prize-image');
    
    // Sembunyikan tombol reset pada awalnya
    resetButton.style.display = 'none';
    
    // Daftar hadiah dengan ikon
    const prizes = [
        { text: "THR Rp 50.000 (buat beli es teh doang)", icon: "🧃", type: "icon" },
        { text: "THR Rp 100.000 (cukup buat traktir bocil)", icon: "🍟", type: "icon" },
        { text: "THR Rp 200.000 (sultan dadakan)", icon: "💰", type: "icon" },
        { text: "Parcel Lebaran (isinya mie instan)", icon: "🍜", type: "icon" },
        { text: "Kue Nastar (tapi isinya tinggal remah)", icon: "🍪", type: "icon" },
        { text: "Kue Kastengel (tapi keju dikit banget)", icon: "🧀", type: "icon" },
        { text: "Bingkisan Idul Fitri (ternyata hanya amplop kosong)", icon: "📭", type: "icon" },
        { text: "Ketupat dan Opor (tapi opornya abis duluan)", icon: "🍲", type: "icon" },
        { text: "Ucapan Selamat Idul Fitri (dari orang tak dikenal)", icon: "📝", type: "icon" },
        { text: "Kurma Premium (ternyata cuma 3 biji)", icon: "🍇", type: "icon" },
        { text: "Sarung Baru (tapi motifnya Doraemon)", icon: "👘", type: "icon" },
        { text: "Sirup Lebaran (tapi cuma tinggal sedotan)", icon: "🥤", type: "icon" },
        { text: "Voucher Belanja (tapi kadaluarsa)", icon: "🛍️", type: "icon" },
        { text: "Hadiah Misterius (kok malah zonk?)", icon: "❓", type: "icon" },
        { text: "Gorengan Gratis (tapi udah dingin)", icon: "🍩", type: "icon" },
        { text: "Ultraman Surprise! (Ultraman KW)", icon: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/09/Ultraman-banner.jpeg?q=50&fit=crop&w=740&h=370", type: "image" },
        { text: "Sendal Baru (tapi beda warna)", icon: "https://down-id.img.susercontent.com/file/b795a450ffef3551fd7503ff72920452", type: "image" },
        { text: "Mainan Bocil (happy meal versi irit)", icon: "https://th.bing.com/th/id/OIP.PiNDfoBzxPs5SwXDHdN9oAHaD2?rs=1&pid=ImgDetMain", type: "image" },
        { text: "Peci Keren (tapi ukurannya kekecilan)", icon: "https://down-id.img.susercontent.com/file/id-11134207-7r98x-lrd8r5zj3m2l58", type: "image" }
    ];    
    
    // Efek audio
    const clickSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    const openSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    const rewardSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    
    // Fungsi untuk membuat konfeti
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#D4AC0D', '#1E8449', '#FEF9E7', '#145A32'][Math.floor(Math.random() * 4)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.opacity = Math.random();
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            // Hapus konfeti setelah animasi selesai
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Fungsi untuk membuat efek partikel
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.backgroundColor = ['#D4AC0D', '#1E8449', '#FEF9E7', '#145A32'][Math.floor(Math.random() * 4)];
            particle.style.width = Math.random() * 8 + 3 + 'px';
            particle.style.height = particle.style.width;
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.animation = `particleBurst ${Math.random() * 1 + 0.5}s ease-out forwards`;
            
            prizeContainer.appendChild(particle);
            
            // Hapus partikel setelah animasi selesai
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }
    
    // Fungsi untuk memilih hadiah acak
    function getRandomPrize() {
        return prizes[Math.floor(Math.random() * prizes.length)];
    }
    
    let isAnimating = false;
    
    function openBox() {
        if (isAnimating) return;
        
        isAnimating = true;
        clickSound.play();
        openButton.style.display = 'none';
        
        // Animasi giftbox bergetar
        giftBox.style.animation = 'shake 0.8s ease-in-out';
        
        setTimeout(() => {
            // Animasi membuka kotak
            giftLid.style.animation = 'openLid 0.5s ease-in-out forwards';
            
            setTimeout(() => {
                // Animasi membuka pintu
                giftBoxLeft.style.animation = 'openLeft 0.8s ease-in-out forwards';
                giftBoxRight.style.animation = 'openRight 0.8s ease-in-out forwards';
                openSound.play();
                
                setTimeout(() => {
                    // Pilih hadiah acak
                    const prize = getRandomPrize();
                    prizeText.textContent = prize.text;
                    
                    // Tampilkan ikon atau gambar hadiah
                    if (prize.type === 'icon') {
                        prizeIcon.textContent = prize.icon;
                        prizeIcon.classList.remove('hidden');
                        prizeImage.classList.add('hidden');
                    } else if (prize.type === 'image') {
                        prizeImage.src = prize.icon;
                        prizeImage.classList.remove('hidden');
                        prizeIcon.classList.add('hidden');
                    }
                    
                    // Tampilkan hadiah dengan animasi
                    prizeContainer.classList.add('show');
                    
                    // Buat efek konfeti dan partikel
                    createConfetti();
                    createParticles();
                    
                    // Putar efek suara
                    rewardSound.play();
                    
                    // Tampilkan tombol reset
                    resetButton.style.display = 'inline-block';
                    
                    isAnimating = false;
                }, 800);
            }, 500);
        }, 800);
    }
    
    // Event listener untuk tombol "Buka Box"
    openButton.addEventListener('click', openBox);
    giftBoxContainer.addEventListener('click', openBox);
    
    // Fungsi untuk mereset gacha
    resetButton.addEventListener('click', function() {
        // Sembunyikan hadiah
        prizeContainer.classList.remove('show');
        
        // Reset animasi
        giftLid.style.animation = '';
        giftBox.style.animation = '';
        giftBoxLeft.style.animation = '';
        giftBoxRight.style.animation = '';
        
        // Sembunyikan tombol reset
        resetButton.style.display = 'none';
        
        // Tampilkan kembali tombol buka
        setTimeout(() => {
            openButton.style.display = 'inline-block';
            prizeText.textContent = '';
            prizeIcon.textContent = '';
            prizeImage.src = '';
        }, 500);
    });
});