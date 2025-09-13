// Variables globales
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const loginButton = document.getElementById('loginButton');
const spinner = document.getElementById('spinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const rememberUser = document.getElementById('rememberUser');

// Datos de usuarios mock (simulando una base de datos)
const usuariosMock = [
    { 
        email: 'usuario@ucss.edu.pe', 
        password: 'password123',
        nombre: 'Usuario Demo',
        id: 1
    },
    { 
        email: 'admin@ucss.edu.pe', 
        password: 'admin123',
        nombre: 'Administrador',
        id: 2
    },
    { 
        email: 'docente@ucss.edu.pe', 
        password: 'docente123',
        nombre: 'Docente Ejemplo',
        id: 3
    }
];

// Functions de utilidad
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function setLoading(isLoading) {
    loginButton.disabled = isLoading;
    if (isLoading) {
        loginButton.classList.add('loading');
        spinner.style.display = 'block';
    } else {
        loginButton.classList.remove('loading');
        spinner.style.display = 'none';
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username && !password) {
        showError('Ambos campos no pueden estar vacíos');
        return false;
    }

    if (!username) {
        showError('El campo usuario no puede estar vacío');
        usernameInput.focus();
        return false;
    }

    if (!password) {
        showError('El campo contraseña no puede estar vacío');
        passwordInput.focus();
        return false;
    }

    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        passwordInput.focus();
        return false;
    }

    // Validar formato de email si se ingresa un email
    if (username.includes('@') && !validateEmail(username)) {
        showError('Por favor, ingresa un email válido');
        usernameInput.focus();
        return false;
    }

    return true;
}

// Función para simular llamada a API
async function mockAPIAuth(email, password) {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Buscar usuario en los datos mock
    const usuario = usuariosMock.find(user => 
        user.email === email && user.password === password
    );
    
    if (usuario) {
        return {
            success: true,
            data: {
                token: 'mock-jwt-token-' + Date.now(),
                user: {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email
                }
            }
        };
    } else {
        throw {
            success: false,
            message: 'Credenciales incorrectas. Verifica tu usuario y contraseña.'
        };
    }
}

// Event Listeners
passwordToggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordToggle.textContent = isPassword ? '🔴' : '💡';
    passwordToggle.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');

    // Animación suave
    passwordToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        passwordToggle.style.transform = 'scale(1)';
    }, 150);
});

// Manejo de teclas para accesibilidad
passwordToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        passwordToggle.click();
    }
});

// Validación en tiempo real
usernameInput.addEventListener('input', () => {
    if (usernameInput.value.trim()) {
        hideMessages();
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value) {
        hideMessages();
    }
});

// Navegación con teclado
loginForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (document.activeElement === usernameInput) {
            passwordInput.focus();
        } else {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Manejo del formulario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setLoading(true);
    hideMessages();

    try {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Llamar a la API mock
        const response = await mockAPIAuth(username, password);
        
        if (response.success) {
            showSuccess(`¡Inicio de sesión exitoso! Bienvenido ${response.data.user.name}`);
            
            // Guardar usuario si está marcada la opción
            if (rememberUser.checked) {
                localStorage.setItem('rememberedUser', username);
                localStorage.setItem('userToken', response.data.token);
            } else {
                sessionStorage.setItem('userToken', response.data.token);
            }
            
            // Guardar datos del usuario
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            
            // Simular redirección
            setTimeout(() => {
                alert('Redirección al dashboard principal. Token: ' + response.data.token);
                // En una aplicación real: window.location.href = '/dashboard';
            }, 1500);
        }
    } catch (error) {
        if (error.message) {
            showError(error.message);
        } else {
            showError('Error de conexión. Intenta nuevamente.');
        }
    } finally {
        setLoading(false);
    }
});

// Cargar usuario recordado
window.addEventListener('load', () => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        usernameInput.value = rememberedUser;
        rememberUser.checked = true;
        passwordInput.focus();
    } else {
        usernameInput.focus();
    }
});

// Enlaces de navegación
document.getElementById('forgotPassword').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Funcionalidad de recuperación de contraseña - próximamente');
});

document.getElementById('createAccount').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Funcionalidad de registro - próximamente');
});

// Efectos visuales adicionales
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Animación de entrada
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});