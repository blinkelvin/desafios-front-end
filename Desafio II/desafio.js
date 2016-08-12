var escolas = [];
//localStorage.clear();
var itemsPerPage = 5;
var currentPage = 0;
var end = 5;
var start = 0;

window.onload = function () {

	//Converte o JSON de string para objeto e popula o array
	if (localStorage.getItem('dados') != null) {
		escolas = JSON.parse(localStorage.getItem('dados'));
	}

	if (escolas != null){
		showlist();
	}

	item =	"<input onclick='addItem()' type='button' name='create' value='Criar'>";
	document.getElementById("CreateEdit").innerHTML = item;

}

var addItem = function(){

	var escola = document.getElementById("escola").value;
	var cidade = document.getElementById("cidadeSelect").value;
	var id = 1;

	if (escolas.length != 0)
		id = escolas[escolas.length - 1].id + 1;

	if (escola.length != 0 && cidade.length != 0) {
		escolas.push({
			"id": id,
			"escola": escola,
			"cidade": cidade
		});

		showlist();
		document.getElementById("escola").value = "";
		document.getElementById("cidadeSelect").value = "";
		alert("Criado com sucesso!")
	}else{
		alert("Campos em branco!");
	}
	//console.log(escolas)

}

var removeItem = function(i){

	escolas.splice(i, 1);

	showlist();

}

var editItem = function(i){

	document.getElementById("escola").value = escolas[i].escola;
	document.getElementById("cidadeSelect").value = escolas[i].cidade;

	item = "<input onclick='confirmEditItem(" + i + ")' type='button' name='create' value='Editar item " + (i+1) + "'>";
	document.getElementById("CreateEdit").innerHTML = item;

}

var confirmEditItem = function(i){

	var escola = document.getElementById("escola").value;
	var cidade = document.getElementById("cidadeSelect").value;

	escolas[i].escola = escola;
	escolas[i].cidade = cidade;

	item = "<input onclick='addItem()' type='button' name='create' value='Criar'>";
	document.getElementById("CreateEdit").innerHTML = item;
	document.getElementById("escola").value = "";
	document.getElementById("cidadeSelect").value = "";
	showlist();
	alert("Editado com sucesso!");

}

var selectAll = function() {

	if (document.getElementById("checkall").checked){
		for (i=0; i<escolas.length; i++){
			var chkbox = document.getElementById("checkbox"+escolas[i].id);

			if (chkbox !== null) {
				chkbox.checked = true;
			}
		}
	}else{
		for (i=0; i<escolas.length; i++){
			var chkbox = document.getElementById("checkbox"+escolas[i].id);

			if (chkbox !== null) {
				chkbox.checked = false;
			}
		}
	}

}


var deleteSelected = function () {

	var Excluido = false;
	for (i = escolas.length-1; i>=0; i--){
		chkbox = document.getElementById("checkbox"+escolas[i].id);
		if (chkbox !== null) {
			if (chkbox.checked == true){
				escolas.splice(i, 1);
				document.getElementById("filterEscola").value = ""
				Excluido = true
			}
		}
	}

	if (Excluido){
		showlist();
		alert("Excluido com sucesso!")
	}

}

var filter = function () {

	var filter = []
	var escola = document.getElementById("filterEscola").value;

	if (escola !== "") {
		for (i = escolas.length-1; i>=0; i--){
			if (escolas[i].escola == escola){
				filter.push(escolas[i])
			}
		}
		showlist(filter);
	} else {
		showlist()
	}

}


var showlist = function(filter){

	var show = [];

	if (typeof filter !== "undefined") {
		show = filter
	} else {
	show = escolas
		//Salva o array de objetos em localStorage, convertendo em JSON, pois localStorage armazena somente string
		localStorage.setItem('dados', JSON.stringify(show));
	}

	var TotalPage = Math.ceil(show.length/itemsPerPage);
	//Cabeçalho
	var item = "<tr>\
			<th><input type='checkbox' id='checkall' onclick='selectAll()'/></th>\
			<th>Escola</th>\
			<th>Cidade</th>\
			<th>Editar</th>\
			<th>Excluir</th>\
	   </tr>";

	// Lista
	for (i=start; i<end; i++){
		if (!show[i]) {
			document.getElementsByClassName("next")[0].style.display = 'none';
			break;
		}
		else {
			document.getElementsByClassName("next")[0].style.display = 'inline-block';
		}

		item += "<tr>\
					<td align='center'><input type='checkbox' id='checkbox" + show[i].id + "' value=" + i + "/></td>\
					<td>" + show[i].escola + "</td>\
					<td>" + show[i].cidade + "</td>\
					<td><input type='button' value='Editar'  onclick='editItem  (" + i + ");'/></td>\
					<td><input type='button' value='Excluir' onclick='removeItem(" + i + ");'/></td>\
				</tr>";
	}

	document.getElementById("list").innerHTML = item;

	if (start == 0)
		document.getElementsByClassName("prev")[0].style.display = 'none';
	else
		document.getElementsByClassName("prev")[0].style.display = 'inline-block';

	document.getElementsByClassName("total")[0].innerHTML = (currentPage+1) + "/" + TotalPage;
}

var selectCidade = function() {
	// Primeiro item
	var item = "<option value=''>Selecione a cidade</option>";

	// Lista
	for (i=0; i<cidades.length; i++){
		item += "<option value='" + cidades[i].cidade + "/" + cidades[i].estado + "'>" + cidades[i].cidade + "/" + cidades[i].estado + "</option>"
	}

	document.getElementById("cidadeSelect").innerHTML = item;
}

var page_prev = function () {
	currentPage--;
	end = (itemsPerPage)*(currentPage+1);
	start -= itemsPerPage;
	showlist();
}

var page_next = function () {
	currentPage++;
	end = (itemsPerPage)*(currentPage+1);
	start += itemsPerPage;

	showlist();
}
