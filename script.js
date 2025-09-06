document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const correctUser = "andy@siu.com";
  const correctPass = "1234";

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user.includes("@")) {
    alert("⚠️ El usuario debe ser un correo electrónico (debe contener '@')");
  } else if (user === correctUser && pass === correctPass) {
    alert("✅ Bienvenido ");
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});
