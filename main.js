var products = [
	{id:1, name:"Product1", price:1000},
	{id:2, name:"Product2", price:2000},
	{id:3, name:"Product3", price:3000},
	{id:4, name:"Product4", price:4000},
	{id:5, name:"Product5", price:5000},
];

var select = '';
select += '<select class="form-select form-select-sm w-auto" no="1" onchange="setPrice(this.value, this)">';

select += '<option disabled selected>Select Product</option>';	
$.each(products,function(key, value){
	select += '<option value="'+value.id+'">' + value.name + '</option>';
});	
select += '</select>';
		
$("#td1").append(select);

var index = 2;
$("#addBtn").click(function(){
		var tr = '';
		tr += '<tr>';
		tr += 	'<th scope="row">'+index+'</th>';
		tr += 	'<td>';
		tr += '<select class="form-select form-select-sm w-auto" no="'+index+'" onchange="setPrice(this.value, this)">';
		tr += '<option disabled selected>Select Product</option>';	
		$.each(products,function(key, value){
			tr += '<option value="'+value.id+'">' + value.name + '</option>';
		});	
		tr += '</select>';	
		tr +=	'</td>';	
		tr += 	'<td><input type="number" class="form-control-plaintext form-control-sm" no="'+index+'" id="price'+index+'" readonly></td>';	
		tr += 	'<td><input type="number" class="form-control form-control-sm" no="'+index+'" id="qty'+index+'" onkeyup="updatePrice(this)" onchange="updatePrice(this)"></td>';
		tr += 	'<td><input type="number" class="form-control-plaintext form-control-sm gtotal" id="total'+index+'" readonly></td>';
		tr += 	'<td class="text-center"> <a role="button" id="rmvBtn"><i class="bi bi-dash-circle"></i></a></td>';
		tr += '</tr>';
				
		$("#res").append(tr);
		index++;
});


$(document).on('click', '#rmvBtn', function(){
	$(this).closest('tr').remove();
	setGtotal();
});

function setPrice(v, e){
	var product = products.find(p => {return p.id == v});
	var index = $(e).attr('no');
	$('#price'+index).val(product.price);
	$('#qty'+index).val(1);
	$('#total'+index).val(product.price * 1);
	setGtotal();
}

function updatePrice(v){
	var index = $(v).attr('no');
	var qty   = $(v).val();
	var price = $('#price'+index).val();
    var total = price * qty;
	$('#total'+index).val(total);
	setGtotal();
}

function setGtotal(){
	var sum = 0;
	$('.gtotal').each(function(){
		sum = sum + Number($(this).val());
	});
	$('#gt').text(sum);
}