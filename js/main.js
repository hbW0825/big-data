const toggle = document.getElementById('themeToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

const form = document.getElementById('signupForm');
const msg = document.getElementById('formMessage');
if (form && msg) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = new FormData(form).get('name');
    msg.textContent = `提交成功，${name} 同学，我们会尽快联系你。`;
    form.reset();
  });
}
