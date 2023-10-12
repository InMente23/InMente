
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8FpKQGFQ8ebW30xTAOVIaQB75g0Kb5IE",
    authDomain: "inmente-25b9c.firebaseapp.com",
    databaseURL: "https://inmente-25b9c-default-rtdb.firebaseio.com",
    projectId: "inmente-25b9c",
    storageBucket: "inmente-25b9c.appspot.com",
    messagingSenderId: "43340175743",
    appId: "1:43340175743:web:8f408da74874a684db624a",
    measurementId: "G-1QZZDXMLHB"

}; 

firebase.initializeApp(firebaseConfig);

  
const auth = firebase.auth();

// Verifica se o usuário está autenticado
auth.onAuthStateChanged((user) => {

    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const deleteAccountButton = document.getElementById("delete-account-button");
    const logoutButton = document.getElementById("logout-button");

    if (user) {
        // O usuário está logado, exibe as informações do perfil
        userName.textContent = user.displayName || "Nome do Usuário";
        userEmail.textContent = user.email || "E-mail do Usuário";
       

       // ...

// Adicione um event listener para o botão de exclusão de conta
deleteAccountButton.addEventListener("click", () => {
    if (confirm("Tem certeza de que deseja excluir sua conta? Essa ação é irreversível.")) {
        // Reautentique o usuário antes de excluir a conta
        const password = prompt("Por favor, digite sua senha para confirmar a exclusão da conta:");
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);

        user.reauthenticateWithCredential(credentials)
            .then(() => {
                // O usuário foi reautenticado com sucesso
                user.delete()
                    .then(() => {
                        // Conta excluída com sucesso, desloga o usuário
                        firebase.auth().signOut()
                            .then(() => {
                                // Redireciona para a página de login após a exclusão da conta
                                window.location.href = "login.html";
                            })
                            .catch((error) => {
                                console.error("Erro ao fazer logout:", error.message);
                            });
                    })
                    .catch((error) => {
                        console.error("Erro ao excluir a conta:", error.message);
                    });
            })
            .catch((error) => {
                console.error("Erro ao reautenticar o usuário:", error.message);
                alert("Senha incorreta. Por favor, tente novamente.");
            });
    }
});


        logoutButton.addEventListener("click", () => {
            firebase.auth().signOut()
                .then(() => {

                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Erro ao fazer logout:", error.message);
                });
        });
    } else {
        // O usuário não está logado, redireciona para a página de login
        if (!window.location.href.includes("login.html")) {
      
        }
    }
});

// Aguarde o carregamento do DOM antes de adicionar os event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Event listener para o formulário de cadastro
    const cadastroForm = document.getElementById("cadastro-form");
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("password").value;
            
            // Crie um novo usuário com email e senha
            auth.createUserWithEmailAndPassword(email, senha)
                .then((userCredential) => {
                    // Define o nome do usuário
                    userCredential.user.updateProfile({
                        displayName: nome
                    }).then(() => {
                        // Redirecionar para a página de login após o cadastro
                        window.location.href = "login.html";
                    }).catch((error) => {
                        console.error("Erro ao definir o nome do usuário:", error.message);
                    });
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Erro ao cadastrar usuário:", error.message);
                });
        });
    }

    // Event listener para o formulário de login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const senha = document.getElementById("password").value;
            // Fazer login
            auth.signInWithEmailAndPassword(email, senha)
                .then((userCredential) => {
                    // Login bem-sucedido, redireciona para o painel do usuário
                    window.location.href = "user_panel.html";
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Erro ao fazer login:", error.message);
                });
        });
    }
});



// Código JavaScript no app.js
document.addEventListener("DOMContentLoaded", function () {
    const resetPasswordForm = document.getElementById("reset-password-form");
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            
            // Enviar e-mail de redefinição de senha
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    alert("Um e-mail de redefinição de senha foi enviado. Verifique sua caixa de entrada.");
                    // Redirecionar de volta para a página de login
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Erro ao enviar e-mail de redefinição de senha:", error.message);
                });
        });
    }
});



// Código JavaScript no app.js
document.addEventListener("DOMContentLoaded", function () {
    // ...

    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function (e) {
            e.preventDefault();

            firebase.auth().signOut()
                .then(() => {
                    // Logout bem-sucedido, redireciona para a página de login
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Erro ao fazer logout:", error.message);
                });
        });
    }


    
});































$(document).ready(function () {
    $('#save-button').click(function () {
      savePDF();
    });
  });
  
  function savePDF() {
    var doc = new jsPDF('portrait', 'pt', 'a4');
    var data = new Date();
    var margins = {
      top: 50,
      bottom: 50,
      left: 40,
      right: 40,
    };
  
    // Título do PDF centralizado
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Preto
    doc.setFillColor(135, 206, 250); // Cor de fundo do cabeçalho (#87cefa)
    doc.rect(0, 0, 595.28, 40, 'F'); // Retângulo do cabeçalho
    var titleText = "Meu Gerenciamento de Tempo";
    var titleWidth = doc.getStringUnitWidth(titleText) * 18;
    var xPosition = (595.28 - titleWidth) / 2; // Centralizar horizontalmente
    doc.text(titleText, xPosition, 30);
  
    // Frase aleatória sobre gerenciamento de tempo (centralizada)
    var randomMessages = [
      "A gestão do tempo é a chave para o sucesso.",
      "Priorize o que é importante, não apenas o urgente.",
      "Organização é a base de um bom gerenciamento de tempo.",
      "Aprenda a dizer não para tarefas não essenciais.",
      "Use seu tempo com sabedoria e foco no que realmente importa.",
      "O tempo é um recurso valioso; gaste-o com sabedoria.",
      "O sucesso não é medido pelo tempo que você gasta, mas pelo que você realiza.",
      "A produtividade é o resultado de um bom gerenciamento de tempo.",
      "A cada minuto gasto em planejamento, economiza-se dez minutos de execução.",
      "Organização é a chave para eliminar o caos e o desperdício de tempo.",
      "Cada tarefa concluída é um passo em direção aos seus objetivos.",
      "A disciplina é a ponte entre metas e realizações.",
      "Estabeleça metas claras para direcionar seu tempo de forma eficaz.",
      "Não deixe o perfeito ser inimigo do bom; progresso é mais importante que perfeição.",
      "Lembre-se de que cada dia é uma oportunidade para fazer melhorias.",
      "A motivação é a faísca que acende a chama da produtividade.",
      "Gerenciar seu tempo é o primeiro passo para controlar sua vida.",
      "O segredo do sucesso está na eficiência do seu tempo.",
      "O tempo desperdiçado nunca é recuperado, então valorize-o.",
      "A produtividade começa com um planejamento eficaz.",
      "Mantenha sua lista de tarefas atualizada para se manter no controle.",
    ];
  
    var randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    doc.setTextColor(0, 0, 0); // Preto
    doc.setFontSize(12);
    var messageWidth = doc.getStringUnitWidth(randomMessage) * 12;
    var xPosition = (595.28 - messageWidth) / 2; // Centralizar horizontalmente
    doc.text(randomMessage, xPosition, 70);
  
    // Espaço abaixo do cabeçalho
    var startY = 90;
  
    // Títulos dos quadrantes em negrito e centralizados
    doc.setFontType('bold');
    doc.setFontSize(14);
  
    var taskIds = [
      "agenda-urgent-important",
      "agenda-urgent-not-important",
      "agenda-not-urgent-important",
      "agenda-not-urgent-not-important",
    ];
  
    var quadrantTitles = [
      "Urgente e Importante",
      "Urgente, mas Não Importante",
      "Não Urgente, mas Importante",
      "Não Urgente e Não Importante",
    ];
  
    for (var i = 0; i < taskIds.length; i++) {
      var taskId = taskIds[i];
      var taskText = document.getElementById(taskId).value;
      var quadrantTitle = quadrantTitles[i];
  
      // Verifique se há texto na tarefa antes de adicioná-la ao PDF
      if (taskText.trim() !== "") {
        // Título do quadrante
        doc.setFontType('bold');
        doc.setFontSize(14);
        var titleWidth = doc.getStringUnitWidth(quadrantTitle) * 14;
        var xPosition = (595.28 - titleWidth) / 2; // Centralizar horizontalmente
        doc.text(quadrantTitle, xPosition, startY + i * 110);
  
        // Conteúdo da tarefa
        doc.setFontType('normal');
        doc.setFontSize(12);
        var taskWidth = doc.getStringUnitWidth(taskText) * 12;
        xPosition = (595.28 - taskWidth) / 2; // Centralizar horizontalmente
        doc.text(taskText, xPosition, startY + i * 110 + 20); // Adicione 20 para ajustar a posição vertical
      }
    }
  
    // Margens
    doc.setDrawColor(135, 206, 250); // Cor da borda (azul)
    doc.rect(margins.left, margins.top, 515.28, 670, 'D'); // Retângulo com borda
  
    // Salvar o PDF
    doc.save("Meu_Gerenciamento_de_Tempo - " + data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + ".pdf");
  }
  