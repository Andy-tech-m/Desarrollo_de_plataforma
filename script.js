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

        // Funciones de utilidad
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

            return true;
        }

        // Event Listeners
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.textContent = isPassword ? '🙈' : '👁️';
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
                // Simulación de autenticación (reemplazar con llamada real)
                await new Promise(resolve => setTimeout(resolve, 2000));

                const username = usernameInput.value.trim();
                const password = passwordInput.value;

                // Simulación de validación (reemplazar con lógica real)
                if (username === 'admin' && password === 'admin123') {
                    showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
                    
                    // Guardar usuario si está marcada la opción
                    if (rememberUser.checked) {
                        localStorage.setItem('rememberedUser', username);
                    }

                    setTimeout(() => {
                        // Aquí iría la redirección al dashboard
                        alert('Redirección al dashboard principal');
                    }, 1500);
                } else {
                    showError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
                }
            } catch (error) {
                showError('Error de conexión. Intenta nuevamente.');
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
            alert('Funcionalidad de recuperación de contraseña - Próximamente');
        });

        document.getElementById('createAccount').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidad de registro - Próximamente');
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

        // Animación de entrada para la página
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.5s ease';
            }, 100);
        });