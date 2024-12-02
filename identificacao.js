function showIdentification() {
    // Captura os valores dos inputs
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;

    // Verifica se todos os campos foram preenchidos
    if (name && course && year) {
        location.href = 'confirmacao.html'
        // guarde as informções em variaveis
        localStorage.setItem("name", name);
            
            localStorage.setItem("course", course);
                
                localStorage.setItem("year", year);
                    
        // Mostra a identificação no output
       // document.getElementById("output").innerHTML = `<strong>Nome:</strong> ${name}<br><strong>Curso:</strong> ${course}<br><strong>Série:</strong> ${year}`;
    } else {
        // Se algum campo não foi preenchido, exibe uma mensagem de erro
        alert("Por favor, preencha todos os campos.");
    }
}
