function obtenerUltimoDiaMes(anho, mes) {

    if (mes == '1' || mes == '3' || mes == '5' || mes == '7' || mes=='8' || mes=='10' || mes == '12') {
        return '31';
    }
    
    if (mes == '4' || mes == '6' || mes == '9' || mes == '11') {
        return '30';
    }

    if (mes == '2') {
        return esBisiesto(anho) ? '29' : '28';
    }

}

console.log(obtenerUltimoDiaMes('2019', '4'));

function esBisiesto(anho) {
    if (Number(anho) % 4 === 0) {
        
        anho = anho.toString();
        let length = anho.length;
        if (anho[length-1] + anho[length - 2] == "00") {
            if (Number(anho) % 400 == 0) {
                return true;
            } else {
                return false;
            }
        } 

        return true;
    } else {
        return false;
    }
}
