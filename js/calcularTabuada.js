function calcularTabuada()
{
    var resultado = "";
    tabuada = document.getElementById("tabuada").value;
    tamanho = document.getElementById("tamanho").value;

    if(tabuada<0)
    {
        document.getElementById("tabuada").value = 0;
    }

    if(tamanho<0)
    {
        document.getElementById("tamanho").value = 0;
    }
    
    if(tabuada != "" && tamanho != "")
    {
        for(i=0;i<=tamanho;i++)
        {
            resultado += `<div style='margin-bottom: 20px'><p> ${tabuada} x ${i} = ${tabuada*i} </p></div>`;
        }
        
        document.getElementById("container_principal").innerHTML = resultado;
    }
}