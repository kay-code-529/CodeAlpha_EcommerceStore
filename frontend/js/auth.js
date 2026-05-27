const { createClient } = supabase

const sb = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

function showMsg(text, type) {
  const msg = document.getElementById('msg')
  msg.textContent = text
  msg.className = type === 'success' ? 'success-msg' : 'error-msg'
}

async function login() {
  const email    = document.getElementById('email').value
  const password = document.getElementById('password').value

  if (!email || !password) {
    showMsg('Please fill in both fields', 'error')
    return
  }

  const { error } = await sb.auth.signInWithPassword({ email, password })

  if (error) {
    showMsg('Login failed: ' + error.message, 'error')
  } else {
    showMsg('Welcome back! Redirecting...', 'success')
    setTimeout(() => window.location.href = 'index.html', 1000)
  }
}

async function register() {
  const email    = document.getElementById('email').value
  const password = document.getElementById('password').value

  if (!email || !password) {
    showMsg('Please fill in both fields', 'error')
    return
  }

  if (password.length < 6) {
    showMsg('Password must be at least 6 characters', 'error')
    return
  }

  const { error } = await sb.auth.signUp({ email, password })

  if (error) {
    showMsg('Register failed: ' + error.message, 'error')
  } else {
    showMsg('Account created! Please check your email to confirm.', 'success')
    setTimeout(() => window.location.href = 'login.html', 2000)
  }
}