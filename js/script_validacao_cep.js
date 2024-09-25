let cep = 0; 
let URL = `https://viacep.com.br/ws//json/` /*Contém a url da api utilizada*/

const inpCEP = document.getElementById("userCEP"); /*Contém o elemento input do DOM onde o CEP é digitado*/
const outpResultado = document.getElementById("resultado"); /*Contém o elemento div onde o resultado é exibido*/

function checkCEP(){
    outpResultado.innerHTML = "<span style=\"color: #0a4\">Verificando...</span>"; /*Exibe o status de verificação em andamento*/
    cep = inpCEP.value; /*Pega o valor digitado pelo usuário*/
    let URL = "https://viacep.com.br/ws/"+cep+"/json/"; /*Altera a URL para fazer a busca do CEP*/
    /*Comunicação com a api*/
    fetch(URL).then(resp =>{
        resp.json().then(respJson =>{
            if(respJson.erro !== "true"){
                outpResultado.innerHTML =
                `<p>CEP - ${respJson.cep} <br>
                LOGRADOURO - ${respJson.logradouro.toUpperCase()} <br>
                BAIRRO - ${respJson.bairro.toUpperCase()} <br>
                MUNICÍPIO - ${respJson.localidade.toUpperCase()} <br>
                ESTADO - ${respJson.uf.toUpperCase()}</p>`;
            }else{
                outpResultado.innerHTML = "<span class=\"invalido\">CEP INVÁLIDO</span>";
            }
        }) /*}Catch para caso a comunicação falhe*/
    }).catch((erro)=>{
       outpResultado.innerHTML = "DIGITE 8 DIGITOS SENDO TODOS NÚMEROS\n" ;
    })
    
}

/*Eventos de teclado*/
document.addEventListener("keyup",(tecla)=>{
    if(tecla.key === "Enter"){
        checkCEP();
    }

    /*Para evitar conflito com o codigo abaixo [43-47], ao apagar */
    if(tecla.key === "Backspace" && inpCEP.value.length == 6){
        inpCEP.value = String(inpCEP.value).slice(0, -1);
    }
})
/*Adiciona o hífen antes dos 3 últimos digitos*/
inpCEP.addEventListener("input", (inp)=>{
    if(inpCEP.value.length == 5){
        inpCEP.value = String(inpCEP.value) + '-';
    }
/*Limita os carcateres da input*/
    if(inpCEP.value.length > 9){
        inpCEP.value = String(inpCEP.value).slice(0, -1);
    }

    
})