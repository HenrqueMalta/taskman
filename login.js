const fixedUser = "admin";
const fixedPass = "1";

function validateLogin(username, password) {
    console.log(`Validating user: ${username} with password: ${password}`);
    return username == fixedUser && password == fixedPass;
}

// Exemplo de uso:
const usernameInput = document.getElementById("email").value; // Substitua pelo valor real do input
const passwordInput = document.getElementById("senha").value; // Substitua pelo valor real do input

if (validateLogin(usernameInput, passwordInput)) {
    console.log(usernameInput); 
    console.log(passwordInput);
    console.log("Login bem-sucedido!");
} else {
    console.log("Login falhou.");
    console.log(usernameInput); 
    console.log(passwordInput);
    console.log("Usuário ou senha incorretos.");
}