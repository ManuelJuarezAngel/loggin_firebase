import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5eRIPevBvU-L4qyNDPE1VZ5vo5RKjGi4",
    authDomain: "uhab-students.firebaseapp.com",
    projectId: "uhab-students",
    storageBucket: "uhab-students.appspot.com",
    messagingSenderId: "560538681011",
    appId: "1:560538681011:web:2d002565824d1cf3427ac6",
    measurementId: "G-CXDXY3MXLR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', (event) => {
    // Seleccionar elementos del DOM
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginEmailButton = document.getElementById('login-email');
    const signupEmailButton = document.getElementById('signup-email');
    const loginGoogleButton = document.getElementById('login-google');
    const logoutButton = document.getElementById('logout-button');
    const usernameElement = document.getElementById('username');

    // Verificar si estamos en la página de inicio de sesión
    if (loginEmailButton && signupEmailButton && loginGoogleButton) {
        // Función para loguearse con email y contraseña
        loginEmailButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validar campos vacíos
            if (email === "" || password === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos son obligatorios',
                });
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Guardar la información del usuario en el localStorage
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = 'logged.html';
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "¡Ocurrió un error!",
                        text: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        });

        // Función para registrarse con email y contraseña
        signupEmailButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validar campos vacíos
            if (email === "" || password === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos son obligatorios',
                });
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Guardar la información del usuario en el localStorage
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = 'logged.html';
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "¡Ocurrió un error!",
                        text: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        });

        // Función para loguearse con Google
        loginGoogleButton.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    // Guardar la información del usuario en el localStorage
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = 'logged.html';
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "¡Ocurrió un error!",
                        text: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        });
    }

    // Verificar si estamos en la página de logged.html
    if (logoutButton && usernameElement) {
        // Obtener la información del usuario del localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameElement.textContent = user.email;
        } else {
            // Redirigir a la página de login si no hay información del usuario
            if (window.location.pathname.endsWith('logged.html')) {
                window.location.href = 'index.html';
            }
        }

        // Manejar el cierre de sesión
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                Swal.fire({
                    title: "Cerrar sesión",
                    text: "¿Estás seguro de cerrar sesión?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, cerrar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "¡Cerraste sesión!",
                            icon: "success"
                        });
                        // Eliminar la información del usuario del localStorage
                        localStorage.removeItem('user');
                        // Redirigir a la página de login
                        window.location.href = 'index.html';
                    }
                });
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "¡Ocurrió un error!",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        });
    }
});
