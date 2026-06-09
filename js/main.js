// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 统计数字动画
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间
        const increment = target / (duration / 16); // 每帧增加的数值
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// 监听滚动事件，当统计区域进入视口时触发动画
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 资源下载功能
function downloadResource(resourceName, resourceUrl) {
    alert(`正在下载: ${resourceName}\n下载链接: ${resourceUrl}`);
    // 实际项目中这里应该是真实的下载逻辑
    console.log(`Downloading ${resourceName} from ${resourceUrl}`);
}

// 资源浏览功能
function viewResource(resourceName, resourceUrl) {
    alert(`正在浏览: ${resourceName}`);
    // 实际项目中这里应该打开资源预览窗口
    console.log(`Viewing ${resourceName} at ${resourceUrl}`);
}

// 答题系统
class QuizSystem {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [];
        this.userAnswers = [];
    }

    loadQuestions(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
    }

    displayQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const quizContainer = document.getElementById('quiz-container');

        if (!quizContainer) return;

        let html = `
            <div class="quiz-question">
                <h3>题目 ${this.currentQuestion + 1} / ${this.questions.length}</h3>
                <p>${question.question}</p>
            </div>
            <div class="quiz-options">
        `;

        question.options.forEach((option, index) => {
            html += `
                <div class="quiz-option" onclick="quizSystem.selectAnswer(${index})">
                    ${String.fromCharCode(65 + index)}. ${option}
                </div>
            `;
        });

        html += `
            </div>
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn btn-primary" onclick="quizSystem.nextQuestion()">
                    ${this.currentQuestion < this.questions.length - 1 ? '下一题' : '完成答题'}
                </button>
            </div>
        `;

        quizContainer.innerHTML = html;
    }

    selectAnswer(answerIndex) {
        // 移除所有选项的选中状态
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('selected');
        });

        // 添加选中状态
        options[answerIndex].classList.add('selected');
        this.userAnswers[this.currentQuestion] = answerIndex;
    }

    nextQuestion() {
        if (this.userAnswers[this.currentQuestion] === undefined) {
            alert('请选择一个答案！');
            return;
        }

        // 检查答案是否正确
        const question = this.questions[this.currentQuestion];
        if (this.userAnswers[this.currentQuestion] === question.correct) {
            this.score++;
        }

        this.currentQuestion++;
        this.displayQuestion();
    }

    showResults() {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;

        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = '';

        if (percentage >= 90) {
            message = '优秀！继续保持！';
        } else if (percentage >= 70) {
            message = '良好！再接再厉！';
        } else if (percentage >= 60) {
            message = '及格！还需努力！';
        } else {
            message = '需要加强学习哦！';
        }

        let html = `
            <div class="quiz-result">
                <h2>答题完成！</h2>
                <div class="quiz-score">${this.score} / ${this.questions.length}</div>
                <p style="font-size: 1.5rem; margin-bottom: 1rem;">得分: ${percentage}%</p>
                <p style="font-size: 1.2rem; color: #666;">${message}</p>
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="location.reload()">重新答题</button>
                    <button class="btn btn-secondary" onclick="window.location.href='../Index.html'" style="margin-left: 1rem;">返回首页</button>
                </div>
            </div>
        `;

        quizContainer.innerHTML = html;
    }
}

// 初始化答题系统
const quizSystem = new QuizSystem();

// 示例题目数据
const sampleQuestions = {
    math: [
        {
            question: '计算: 25 + 37 = ?',
            options: ['52', '62', '72', '82'],
            correct: 1
        },
        {
            question: '一个长方形的长是8厘米，宽是5厘米，它的周长是多少厘米？',
            options: ['13', '26', '40', '46'],
            correct: 1
        },
        {
            question: '如果 x + 5 = 12，那么 x 等于多少？',
            options: ['5', '6', '7', '8'],
            correct: 2
        },
        {
            question: '3/4 + 1/4 = ?',
            options: ['1/2', '3/8', '1', '4/8'],
            correct: 2
        },
        {
            question: '一个正方形的边长是6厘米，它的面积是多少平方厘米？',
            options: ['24', '30', '36', '42'],
            correct: 2
        }
    ],
    chinese: [
        {
            question: '下列词语中，没有错别字的一组是：',
            options: ['川流不息、迫不急待', '惊心动魄、再接再励', '聚精会神、全神贯注', '走投无路、走头无路'],
            correct: 2
        },
        {
            question: '"春眠不觉晓，处处闻啼鸟"的作者是：',
            options: ['李白', '杜甫', '孟浩然', '白居易'],
            correct: 2
        },
        {
            question: '下列句子中，标点符号使用正确的是：',
            options: ['老师说："今天的作业是什么？"', '老师说，"今天的作业是什么。"', '老师说："今天的作业是什么。"', '老师说："今天的作业是什么"'],
            correct: 2
        },
        {
            question: '"欲穷千里目，更上一层楼"这句诗告诉我们：',
            options: ['要多爬山', '站得高看得远', '楼越高越好', '要锻炼身体'],
            correct: 1
        },
        {
            question: '下列词语中，属于反义词的是：',
            options: ['高大、矮小', '美丽、漂亮', '快乐、开心', '勇敢、勇气'],
            correct: 0
        }
    ],
    english: [
        {
            question: 'What is the capital of China?',
            options: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
            correct: 1
        },
        {
            question: 'Choose the correct sentence:',
            options: ['He go to school every day.', 'He goes to school every day.', 'He going to school every day.', 'He is goes to school every day.'],
            correct: 1
        },
        {
            question: 'What color is the sky on a sunny day?',
            options: ['Red', 'Green', 'Blue', 'Yellow'],
            correct: 2
        },
        {
            question: 'How many days are there in a week?',
            options: ['5', '6', '7', '8'],
            correct: 2
        },
        {
            question: 'Which word means "学生" in English?',
            options: ['Teacher', 'Student', 'Book', 'School'],
            correct: 1
        }
    ]
};

// 开始答题功能
function startQuiz(subject) {
    if (sampleQuestions[subject]) {
        quizSystem.loadQuestions(sampleQuestions[subject]);
        quizSystem.displayQuestion();
    } else {
        alert('该科目的题库正在建设中...');
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('智学园网站已加载完成！');

    // 添加页面加载动画
    const animatedElements = document.querySelectorAll('.feature-card, .subject-card, .testimonial-card');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
});

// 用户注册表单验证
function validateRegistrationForm() {
    const username = document.getElementById('username')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    if (!username || username.length < 3) {
        alert('用户名至少需要3个字符！');
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        alert('请输入有效的邮箱地址！');
        return false;
    }

    if (!password || password.length < 6) {
        alert('密码至少需要6个字符！');
        return false;
    }

    if (password !== confirmPassword) {
        alert('两次输入的密码不一致！');
        return false;
    }

    alert('注册成功！');
    return false; // 阻止实际提交，这是演示项目
}

// 搜索功能
function searchResources() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            alert(`正在搜索: ${query}`);
            console.log(`Searching for: ${query}`);
        }
    }
}

// 筛选功能
function filterByGrade(grade) {
    console.log(`Filtering by grade: ${grade}`);
    // 实际项目中这里应该实现真实的筛选逻辑
}

function filterBySubject(subject) {
    console.log(`Filtering by subject: ${subject}`);
    // 实际项目中这里应该实现真实的筛选逻辑
}
