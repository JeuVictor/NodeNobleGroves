/*let sexo = prompt("Digite o seu sexo: M - [Masculino]  F - [Feminino] I - [Indefinido] " ).toUpperCase();
console.log(sexo);
switch (sexo){
    case 'M':
        console.log ("A pessoa é do genero masculino, homem.");
        break;
        case 'F':
            console.log("A pessoa é do genero feminino, uma mulher.");
            break
            default:
                console.log("A pessoa não se identifica com nenhum genero. ");
                break
} */
/*
let ano = prompt("Digite o ano que gostaria de consultar: ");
if (ano %4 ==0 && ano%100 !=0 || ano%4 ==0 && ano%100==0 && ano%400==0) {
    console.log("É um ano bissexto!")
}
else {
    console.log("Não é um ano bissexto!")
} */


let valorInserido = 0;
let soma = 0;
do{
    soma += parseFloat(valorInserido);
    valorInserido = prompt("Digite o valor a ser inserido ou ´q´ para ser encerrado:" ).toUpperCase();
   
    console.log("O valor somado é: "+ soma);
} while(valorInserido !='Q');