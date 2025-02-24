let inpCPF = document.getElementById("userCPF");/*Contém o elemento input onde é digitado o cpf */
// let outResp = document.getElementById("resultado");/*Contem o elemento div onde é mostrado o resultado*/
let CPF = " ";
let CPFPure = 0;

function validateCPF() {
    CPF = inpCPF.value;
    if (CPF.length < 14) {
        Swal.fire({
            title: "Digite todos os digitos do CPF",
            text: "Um CPF deve ter 11 Digitos",
            icon: "warning"
        })
    } else {
        CPF = removeCharCPF();
        if (response(CPF) === true) {
            Swal.fire({
                title: "CPF Válido",
                text: "Este CPF passou no cálculo !",
                icon: "success"
            })
        } else {
            Swal.fire({
                title: "CPF Inválido",
                text: "Este CPF não passou no cálculo !",
                icon: "error"
            })
        }
    }
}

function response(respCPF) {
    String(respCPF);

    if((respCPF[0] === respCPF[1] && respCPF[2] === respCPF[3] && respCPF[4] === respCPF[5] && respCPF[6] === respCPF[7] && respCPF[8] === respCPF[9] && respCPF[10] === respCPF[0])){
        return false;
    }

    let peso1 = 0;
    for (let pos = 0, mult = 10; mult >= 2 && pos <= 9; mult--, pos++) {
        peso1 += respCPF[pos] * mult;
    }

    let peso2 = 0;
    for (let pos = 0, mult = 11; mult >= 2 && pos <= 10; mult--, pos++) {
        peso2 += respCPF[pos] * mult;
    }

    return (11 - (peso1 % 11) == CPF[9] && 11 - (peso2 % 11) == CPF[10])
}

/*O cpf tratado é a string pega da input, depois de ter removidos os pontos e hífen */

function removeCharCPF() {
    CPFPure =  inpCPF.value.replace(/\D/g, "");
    return String(CPFPure);
}

inpCPF.addEventListener("input", function (event) {
    
    // Remove tudo que não for número
    let cpfValue = inpCPF.value.replace(/\D/g, "");

    // Limita o CPF para no máximo 11 digitos
    if (cpfValue.length > 11) {
        cpfValue = cpfValue.slice(0, 11);
    }

    // Aplica a máscara progressiva conforme a quantidade de dígitos
    if (event.inputType !== "deleteContentBackward") {
        if (cpfValue.length >= 3 && cpfValue.length < 6) {
            inpCPF.value = cpfValue.replace(/(\d{3})/, "$1.");
        } else if (cpfValue.length >= 6 && cpfValue.length < 9) {
            inpCPF.value = cpfValue.replace(/(\d{3})(\d{3})/, "$1.$2.");
        } else if (cpfValue.length >= 9 && cpfValue.length < 11) {
            inpCPF.value = cpfValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
        } else if (cpfValue.length <= 11) {
            inpCPF.value = cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
    }
});

document.getElementById("buttonValidate").addEventListener("click", function(){
    validateCPF();
})