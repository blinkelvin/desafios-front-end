var cidades = [];
$(document).ready(function(){

	if (localStorage.getItem('cidades') != null) {
		cidades = JSON.parse(localStorage.getItem('cidades'));
        for (i=0; i<cidades.length;i++){
            $("#listCity").append("\
            <tr id=row" + cidades[i].id + ">\
            <td>" + cidades[i].cidade + "</td>\
            <td>" + cidades[i].estado + "</td>\
            <td><button class='editar' value='" + cidades[i].id + "'>Editar</button></td>\
            <td><button class='excluir' value='" + cidades[i].id + "'>Excluir</button></td>\
            </tr>");
        }

        selectCidade();
	}

    // Salvar
    $('body').on("click","#salvar", function() {
        if ($('#cidade').val()!="" && $('#estado').val()!=""){
            var id = 1

        	if (cidades.length != 0)
        		id = cidades[cidades.length - 1].id + 1;

    		cidades.push({
    			"id": id,
    			"cidade": $('#cidade').val(),
                "estado": $('#estado').val()
    		});

            $("#listCity").append("\
            <tr id=row" + id + ">\
                <td>" + $('#cidade').val() + "</td>\
                <td>" + $('#estado').val() + "</td>\
                <td><button class='editar' value='" + id + "'>Editar</button></td>\
                <td><button class='excluir' value='" + id + "'>Excluir</button></td>\
            </tr>");

            $('#cidade').val("");
            $('#estado').val("");

            selectCidade();
        	localStorage.setItem('cidades', JSON.stringify(cidades));
        }
    });

    // Editar
    $('body').on("click",".editar", function(e) {
        var id = e.target.value;
        var i = returnIndexByID(id);

        $('#cidade').val(cidades[i].cidade);
        $('#estado').val(cidades[i].estado);

        $('#salvar').html("Editar");
        $('#salvar').val(id);
        $('#salvar').attr("id","editar");
    });

    // Confirmar Edição
    $('body').on("click","#editar", function(e) {
        var id = e.target.value;
        var i = returnIndexByID(id);

        cidades[i].cidade = $('#cidade').val();
        cidades[i].estado = $('#estado').val();

        $("#row"+id).html("\
            <td>" + $('#cidade').val() + "</td>\
            <td>" + $('#estado').val() + "</td>\
            <td><button class='editar' value='" + id + "'>Editar</button></td>\
            <td><button class='excluir' value='" + id + "'>Excluir</button></td>\
        ");

        $('#editar').html("Salvar");
        $('#editar').val("");
        $('#editar').attr("id","salvar");

         $('#cidade').val("");
         $('#estado').val("");

         localStorage.setItem('cidades', JSON.stringify(cidades));
         selectCidade();
    });

    // Excluir
    $('body').on("click",".excluir", function(e) {
        var id = e.target.value;
        var i = returnIndexByID(id);

        cidades.splice(i, 1);

        $("#row"+id).remove();
        localStorage.setItem('cidades', JSON.stringify(cidades));
    });

    // Retorna o index do array a partir do ID
    function returnIndexByID(id) {
        index = -1;
        for(var i = 0, len = cidades.length; i < len; i++) {
            if (cidades[i].id == id) {
                return i;
            }
        }
    }

});
