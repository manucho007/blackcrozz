var listaVehiculos = [];
var $cards = $('#cards');
$.ajax({
  url: 'http://blackcrozz.com/apimanu/vehiculos',
  method: 'GET'
}).done(function(res) {
  if (res.status == 'success') {
    listaVehiculos = res.content
    mostrarVehiculos(listaVehiculos);
  }
  }).fail(function() {
  alert('No se pudo obtener los vehiculos');
});

function mostrarVehiculos(listaVehiculos) {
  $.each(listaVehiculos,function(i, vehiculo){

    $cards.append('<div class="row">'+
       '<div class="col s12 m6">'+
         '<div class="card blue-grey darken-4">'+
           '<div class="card-content white-text">'+
             '<span class="card-title">'+vehiculo.modelo+'</span>'+
              '<ul>'+
               '<li>Agencia - 機構: '+vehiculo.agencia+'</li>'+
               '<li>Interior - 室內: '+vehiculo.interior+'</li>'+
               '<li>Exterior - 外觀: '+vehiculo.exterior+'</li>'+
               '<li>Equipo - 設備: '+vehiculo.equipo+'</li>'+
               '<li>Fecha de Entrega - 交貨日期: '+vehiculo.fentrega+'</li>'+
               '<li>Precio - 價格: '+vehiculo.precio+'</li>'+
               '<li>Descuento - 折扣: '+vehiculo.descuento.cantidad+' '+(vehiculo.descuento.tipo==="porcentaje" ? "%" : "$")+'</li>'+
               '<li>Total: '+vehiculo.total+'</li>'+
             '</ul>'+
           '</div>'+
           '<div class="card-action">'+
             '<a href="#" onClick="aprobarVehiculo('+vehiculo.id+')">Aprobar</a>'+
             '<a href="#" onClick="rechazarVehiculo('+vehiculo.id+')">Rechazar</a>'+
           '</div>'+
         '</div>'+
       '</div>'+
     '</div>');
    console.log(vehiculo.id);
    });

}
function aprobarVehiculo(i) {
  confirm("Desea Aprobar el vehiculo?");
  $.ajax({
    url: 'http://blackcrozz.com/apimanu/aprobar',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({id:i})
  })
  .done(function(res) {
    console.log(res);
    console.log("success");
    alert("Vehiculo Aprobado");
    location.reload();
  })
  .fail(function() {
    console.log("error");
  })
}
function rechazarVehiculo(i) {
  confirm("Desea eliminar el vehiculo?");
  $.ajax({
    url: 'http://blackcrozz.com/apimanu/vehiculo',
    type: 'DELETE',
    contentType: 'application/json',
    data: JSON.stringify({id:i})
  })
  .done(function(res) {
    console.log(res);
    console.log("success");
    alert("Vehiculo Rechazado");
    location.reload();
  })
  .fail(function() {
    console.log("error");
  })
}
