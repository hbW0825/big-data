/**
 * 大数据专业介绍网站 - JavaScript 交互脚本
 * 功能包含：导航栏高亮、轮播图、表单验证、选项卡切换、回到顶部、动画效果
 */

// ===== DOM 加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initCarousel();
    initTabs();
    initBackToTop();
    initScrollAnimations();
    initFormValidation();
    initBarChart();
});

// ===== 导航栏功能 =====
function initNavigation() {
    // 获取当前页面文件名，用于高亮当前导航项
    const currentPage = window.location.pathname.split('/').pop() || 'Index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // 移动端汉堡菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            // 汉堡菜单动画
            hamburger.classList.toggle('active');
        });

        // 点击导航链接后自动关闭菜单
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 滚动时导航栏阴影效果
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== 轮播图功能 =====
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;
    let autoPlayTimer = null;
    const totalItems = items.length;

    // 切换到指定幻灯片
    function goToSlide(index) {
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;
        currentIndex = index;
        inner.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        // 更新指示点
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // 下一张
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // 上一张
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // 自动播放
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // 绑定按钮事件
    if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); stopAutoPlay(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); stopAutoPlay(); startAutoPlay(); });

    // 绑定指示点事件
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goToSlide(i);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // 鼠标悬停暂停自动播放
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // 启动自动播放
    startAutoPlay();
}

// ===== 选项卡切换功能 =====
function initTabs() {
    const tabNavButtons = document.querySelectorAll('.tab-nav button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabNavButtons.length === 0) return;

    tabNavButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-tab');

            // 移除所有 active 状态
            tabNavButtons.forEach(function (btn) { btn.classList.remove('active'); });
            tabContents.forEach(function (content) { content.classList.remove('active'); });

            // 激活当前选项
            this.classList.add('active');
            var targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.classList.add('active');
            }
        });
    });
}

// ===== 回到顶部按钮 =====
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    // 滚动显示/隐藏按钮
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 滚动动画（元素进入视口时触发） =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .course-item, .timeline-item, .stat-item');

    // 添加初始隐藏样式
    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Intersection Observer 检测元素是否进入视口
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });
}

// ===== 表单验证功能 =====
function initFormValidation() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // 清除所有错误状态
        var groups = form.querySelectorAll('.form-group');
        groups.forEach(function (group) {
            group.classList.remove('error');
        });

        // 验证姓名
        const nameInput = form.querySelector('#name');
        if (nameInput && nameInput.value.trim() === '') {
            showError(nameInput, '请输入您的姓名');
            isValid = false;
        }

        // 验证邮箱
        const emailInput = form.querySelector('#email');
        if (emailInput) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, '请输入您的邮箱');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            }
        }

        // 验证手机号
        const phoneInput = form.querySelector('#phone');
        if (phoneInput) {
            var phoneRegex = /^1[3-9]\d{9}$/;
            if (phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value)) {
                showError(phoneInput, '请输入有效的手机号码');
                isValid = false;
            }
        }

        // 验证留言内容
        const messageInput = form.querySelector('#message');
        if (messageInput && messageInput.value.trim() === '') {
            showError(messageInput, '请输入留言内容');
            isValid = false;
        }

        // 验证通过
        if (isValid) {
            showSuccessMessage();
            form.reset();
        }
    });

    // 显示错误信息
    function showError(input, message) {
        var group = input.closest('.form-group');
        group.classList.add('error');
        var errorMsg = group.querySelector('.error-msg');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }

    // 显示成功提示
    function showSuccessMessage() {
        var successDiv = document.createElement('div');
        successDiv.style.cssText = 'position:fixed;top:20px;right:20px;background:#34a853;color:white;padding:15px 25px;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.2);z-index:9999;animation:fadeIn 0.3s ease;';
        successDiv.textContent = '✓ 提交成功！感谢您的留言。';
        document.body.appendChild(successDiv);

        setTimeout(function () {
            successDiv.style.opacity = '0';
            setTimeout(function () { successDiv.remove(); }, 300);
        }, 3000);
    }

    // 实时清除错误状态
    var inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            var group = this.closest('.form-group');
            if (group) group.classList.remove('error');
        });
    });
}

// ===== 柱状图动画 =====
function initBarChart() {
    const bars = document.querySelectorAll('.bar');
    if (bars.length === 0) return;

    // 初始高度为 0
    bars.forEach(function (bar) {
        bar.style.height = '0';
    });

    // 使用 Intersection Observer 触发动画
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var barsInChart = entry.target.querySelectorAll('.bar');
                barsInChart.forEach(function (bar, index) {
                    setTimeout(function () {
                        bar.style.height = bar.getAttribute('data-height') + '%';
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    var chartContainer = document.querySelector('.bar-chart');
    if (chartContainer) {
        observer.observe(chartContainer);
    }
}
