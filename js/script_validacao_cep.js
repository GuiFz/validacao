const inputCep = document.getElementById("userCEP");
const outputInfo = document.getElementById("outForm");
const outputInfoElements = outputInfo.getElementsByTagName("input");


inputCep.addEventListener("input", function (event) {
    if (!/^\d+$/.test(event.target.value)) {
        inputCep.value = String(inputCep.value).replace(/\D$/g, "");
    }

    if (inputCep.value.length >= 9) {
        inputCep.value = String(inputCep.value).slice(0, -1);
    }

    check();
})

function check() {
    if (inputCep.value.length === 8) {

        fetch(`https://viacep.com.br/ws/${inputCep.value}/json/`).then((responseJSON) => {
            responseJSON.json().then((infoCep) => {
                if (infoCep.erro) {
                    inputCep.blur();    
                    Swal.fire({
                        title: "CEP Inválido",
                        text: "Este CEP não existe",
                        icon: "error"
                    });

                    [...outputInfoElements].map(function (element) {
                        element.value = "CEP Inválido";
                    });

                    return null;
                }
                outputInfoElements[0].value = infoCep.logradouro;
                outputInfoElements[1].value = infoCep.estado;
                outputInfoElements[2].value = infoCep.localidade;
                outputInfoElements[3].value = infoCep.bairro;
            })
        })
    }
}