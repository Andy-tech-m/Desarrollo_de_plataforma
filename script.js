document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // evita que se recargue la página

  // Usuario y contraseña correctos (puedes cambiarlos)
  const correctUser = "admin";
  const correctPass = "1234";

  // Valores ingresados
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === correctUser && pass === correctPass) {
    alert("✅ Bienvenido " + user);
    // Aquí podrías redirigir a otra página si quieres
    // window.location.href = "dashboard.html";
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});
