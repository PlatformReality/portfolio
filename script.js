document.querySelectorAll(".partners-wrapper").forEach(wrapper => {

    const track = wrapper.querySelector(".carousel-track");
    const prevBtn = wrapper.querySelector(".prev");
    const nextBtn = wrapper.querySelector(".next");

    /* clone once for infinite loop */
    track.innerHTML += track.innerHTML;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function pauseAutoScroll() {
        track.style.animationPlayState = "paused";
    }

    function resumeAutoScroll() {
        track.style.animationPlayState = "running";
    }

    /* arrows */
    prevBtn.addEventListener("click", () => {
        pauseAutoScroll();
        currentTranslate += 180;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    nextBtn.addEventListener("click", () => {
        pauseAutoScroll();
        currentTranslate -= 180;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    /* mouse drag */
    track.addEventListener("mousedown", e => {
        isDragging = true;
        startX = e.clientX;
        pauseAutoScroll();
    });

    window.addEventListener("mousemove", e => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        track.style.transform = `translateX(${prevTranslate + diff}px)`;
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        prevTranslate = currentTranslate;
        resumeAutoScroll();
    });

    /* touch */
    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        pauseAutoScroll();
    });

    track.addEventListener("touchmove", e => {
        const diff = e.touches[0].clientX - startX;
        track.style.transform = `translateX(${prevTranslate + diff}px)`;
    });

    track.addEventListener("touchend", () => {
        prevTranslate = currentTranslate;
        resumeAutoScroll();
    });

    /* infinite loop fix PER carousel */
    function loopFix() {
        const half = track.scrollWidth / 2;
        if (Math.abs(currentTranslate) >= half) {
            currentTranslate = 0;
            prevTranslate = 0;
            track.style.transform = `translateX(0)`;
        }
        requestAnimationFrame(loopFix);
    }

    loopFix();
});

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = document.querySelector(".button-area button");
    btn.disabled = true;
    btn.innerText = "Sending...";

    emailjs.sendForm(
        "service_o1nkwlm",
        "template_l0x4pp9",
        this
    ).then(
        function () {
            alert("✅ Message sent successfully!");
            document.getElementById("contact-form").reset();
            btn.disabled = false;
            btn.innerText = "Send Message";
        },
        function (error) {
            alert("❌ Failed to send message. Try again.");
            console.error(error);
        }
    );
});

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Platform Reality"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});