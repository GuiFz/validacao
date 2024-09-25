let inpCPF = document.getElementById("userCPF");/*Contém o elemento input onde é digitado o cpf */
let outResp = document.getElementById("resultado");/*Contem o elemento div onde é mostrado o resultado*/
let CPF = " "; 
let CPFTratado = 0;

function verificaCPF(){
    CPF = inpCPF.value;
    if(CPF.length < 14){
        outResp.innerText = "DIGITE 11 DIGITOS SENDO TODOS NÚMEROS !";        
    }else{
        CPF = trataCPF(CPF);
        if(resposta(CPF) === true){
            outResp.innerHTML = `<span class=\"valido\">CPF VÁLIDO</span>`;       
        }else{
            outResp.innerHTML = `<span class=\"invalido\">CPF INVÁLIDO</span>`;            
        }
    }
}

function resposta(respCPF){
    let peso1 = 0;
    for(let pos = 0, mult  = 10 ; mult >= 2 && pos <= 9; mult--, pos++){
        peso1 += respCPF[pos]*mult; 
    }

    let peso2 = 0;
    for(let pos = 0, mult  = 11 ; mult >= 2 && pos <= 10; mult--, pos++){
        peso2 += respCPF[pos]*mult; 
    }
    
    return (11-(peso1 % 11) == CPF[9] && 11 - (peso2 % 11) == CPF[10])
}

/*O cpf tratado é a string pega da input, depois de ter removidos os pontos (.) e hífen */
function trataCPF(usCPF){
        CPFTratado = usCPF.replaceAll(".","");
        CPFTratado = CPFTratado.replace("-","");
    return String(CPFTratado);
 }

 /*Limita digitos da input */
inpCPF.addEventListener("input", ()=>{
    if(inpCPF.value.length > 14){
        inpCPF.value = String(inpCPF.value).slice(0, -1);
    }    
})

/*Eventos de teclado */
document.addEventListener("keyup",(tecla)=>{
    if(tecla.key === "Enter"){
        document.getElementById("check").click();
    }
    else if(tecla.key === "Backspace"){
        if (inpCPF.value.length === 4 || inpCPF.value.length === 8 || inpCPF.value.length === 12){
            inpCPF.value = String(inpCPF.value).slice(0, -2);
        }
    }
    else if (typeof(Number(tecla.key)) != isNaN){
        if (inpCPF.value.length === 3 || inpCPF.value.length === 7 ){ 
            inpCPF.value += ".";
        }else if(inpCPF.value.length === 11){
            inpCPF.value += "-"
        }
    }
})