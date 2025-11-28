// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('open'); // Tambahkan kelas untuk animasi hamburger
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Hanya tutup jika di mobile
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('open');
        }
    });
});

// Smooth Scroll (tetap sama)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Gunakan behavior scroll yang lebih modern
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --------------------
// SCROLL ANIMATION (Performance Fix)
// --------------------
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Mulai animasi sedikit lebih awal
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in'); // Tambahkan class di CSS
            observer.unobserve(entry.target); // Hentikan observasi setelah animasi
        }
    });
}, observerOptions);

animatedElements.forEach(el => {
    observer.observe(el);
});

// Gallery Modal (tetap sama)
// Form Validation (tetap sama)
// Pastikan `<form>` di kontak.html memiliki ID `contactForm`

// --------------------
// NEW FEATURE: MEMUAT BACKGROUND IMAGE DARI DATA-URL
// --------------------
document.addEventListener('DOMContentLoaded', function() {
    // Cari semua div dengan kelas .image-bg yang memiliki data-url
    const imageElements = document.querySelectorAll('.image-bg[data-url]');

    imageElements.forEach(el => {
        const imageUrl = el.getAttribute('data-url');
        
        if (imageUrl) {
            // Set gambar sebagai background-image menggunakan URL dari data-url
            el.style.backgroundImage = `url('${imageUrl}')`;
            // Hapus atribut data-url setelah dimuat
            el.removeAttribute('data-url'); 
        }
    });
});

// --------------------
// REVISI: NAVBAR HIDE/SHOW ON SCROLL
// --------------------
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY; // Simpan posisi gulir terakhir

window.addEventListener('scroll', () => {
    // 1. Logika untuk mengubah gaya (menambahkan .scrolled)
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 2. Logika untuk menyembunyikan/menampilkan (menambahkan .hidden)
    // Mulai menyembunyikan setelah gulir melewati 200px (opsional, untuk menjaga saat di atas)
    if (window.scrollY > 200) { 
        if (window.scrollY > lastScrollY) {
            // Menggulir ke bawah (Sembunyikan navbar)
            navbar.classList.add('hidden');
        } else {
            // Menggulir ke atas (Tampilkan navbar)
            navbar.classList.remove('hidden');
        }
    } else {
        // Jika masih di bagian atas halaman, pastikan navbar terlihat
        navbar.classList.remove('hidden');
    }

    // Perbarui posisi gulir terakhir
    lastScrollY = window.scrollY;
}, { passive: true }); // Penambahan passive: true untuk performa

// --------------------
// ACTIVE MENU HIGHLIGHT (Logic Fix)
// --------------------
const currentLocation = window.location.pathname.split('/').pop().toLowerCase();
const menuItems = document.querySelectorAll('.nav-menu a');

menuItems.forEach(item => {
    const itemHref = item.getAttribute('href').split('/').pop().toLowerCase();
    
    // Hapus class 'active' dari semua
    item.classList.remove('active');

    // Cek kecocokan
    if (itemHref === currentLocation || 
        (currentLocation === '' && itemHref === 'index.html')) {
        item.classList.add('active');
    }
    
    // Perbaikan untuk halaman anak (pages/...)
    if (currentLocation.includes(itemHref) && itemHref !== 'index.html') {
        item.classList.add('active');
    }
});
