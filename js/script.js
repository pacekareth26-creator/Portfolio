/* ============================================
   SCRIPT.JS — Portfolio Daniel Sande Bona
   ============================================
   File JavaScript eksternal untuk semua interaksi:
   - Navbar scroll effect
   - Fade-in animation
   - Skill bar animation
   - Portfolio filter
   - Lightbox popup
   - Form validation
   - Scroll-to-top
   - Smooth scroll navigasi
   ============================================ */


/* ============================================
   1. NAVBAR: Ubah style saat scroll
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Tambahkan kelas 'scrolled' jika sudah scroll > 50px
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/* ============================================
   2. FADE-IN ANIMATION (Intersection Observer)
   ============================================ */
// Observer memantau elemen .fade-in masuk ke viewport
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // Jalankan sekali saja
        }
    });
}, {
    threshold: 0.15      // Aktif saat 15% elemen terlihat
});

fadeElements.forEach(el => fadeObserver.observe(el));


/* ============================================
   3. SKILL BAR ANIMATION
   ============================================ */
// Skill bar akan terisi dari 0% ke nilai data-percent saat terlihat
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percent = entry.target.getAttribute('data-percent');
            entry.target.style.width = percent + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.4
});

skillFills.forEach(bar => skillObserver.observe(bar));


/* ============================================
   4. PORTFOLIO FILTER
   ============================================ */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update status tombol aktif
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter item: tampilkan yang sesuai kategori, sembunyikan yang lain
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});


/* ============================================
   5. LIGHTBOX POPUP
   ============================================ */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');

// Klik item portfolio membuka lightbox
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        const imageSrc = item.getAttribute('data-image');

        // Isi konten lightbox
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        // Tampilkan gambar jika ada, atau gradient placeholder
        const wrapper = item.querySelector('.portfolio-thumb-wrapper');
        const wrapperClasses = wrapper.className.replace('portfolio-thumb-wrapper', '').trim();

        if (imageSrc) {
            // Coba tampilkan gambar; jika gagal, tampilkan placeholder
            lightboxImage.innerHTML =
                '<img src="' + imageSrc + '" alt="' + title + '" ' +
                'style="width:100%; height:100%; object-fit:cover;" ' +
                'onerror="this.parentElement.className=\'lightbox-image ' + wrapperClasses + '\'; ' +
                'this.parentElement.innerHTML=\'&#128444;\';">';
            lightboxImage.className = 'lightbox-image';
        } else {
            lightboxImage.className = 'lightbox-image ' + wrapperClasses;
            lightboxImage.innerHTML = '&#128444;';
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Cegah scroll background
    });
});

// Fungsi tutup lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// Tutup jika klik di luar konten
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Tutup dengan tombol Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});


/* ============================================
   6. FORM VALIDATION
   ============================================ */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Ambil nilai input
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset status error
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    // Validasi nama: wajib diisi
    if (name === '') {
        document.getElementById('nameGroup').classList.add('error');
        isValid = false;
    }

    // Validasi email: format via regex sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailGroup').classList.add('error');
        isValid = false;
    }

    // Validasi pesan: minimal 10 karakter
    if (message.length < 10) {
        document.getElementById('messageGroup').classList.add('error');
        isValid = false;
    }

    // Jika lolos validasi, tampilkan feedback sukses
    if (isValid) {
        formStatus.classList.add('success');
        form.reset();

        // Sembunyikan notifikasi sukses setelah 4 detik
        setTimeout(() => {
            formStatus.classList.remove('success');
        }, 4000);
    }
});


/* ============================================
   7. SCROLL-TO-TOP BUTTON
   ============================================ */
const scrollTopBtn = document.getElementById('scrollTop');

// Tampilkan tombol setelah scroll > 500px
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Klik tombol -> scroll ke atas dengan smooth behavior
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================
   8. SMOOTH SCROLL untuk anchor nav
   ============================================ */
// Memastikan semua anchor link berjalan mulus dengan offset navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80; // Offset untuk navbar fixed
            const top = target.offsetTop - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});
