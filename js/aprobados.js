var listaVehiculos = [];
var $listaSinApartado = $('#listaSinApartado');

$.ajax({
  url: 'http://blackcrozz.com/apimanu/aprobados',
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
  console.log(listaVehiculos);
  $.each(listaVehiculos,function(i, vehiculo){
  $listaSinApartado.append('<ul class="collapsible" data-collapsible="accordion">'+
      '<li>'+
        '<div class="collapsible-header">'+
          '<i class="material-icons">apps</i>'+
          '<span class="blue-text text-darken-2">ID '+vehiculo.id+
          '<span class="white-text text-darken-2">  '+vehiculo.modelo+
        '</div>'+
            '<div class="collapsible-body">'+
              '<table class="responsive-table">'+
              '<thead>'+
                '<tr>'+
                  '<th>Interior</th>'+
                  '<th>Exterior</th>'+
                  '<th>Agencia</th>'+
                  '<th>Llegada Aproximada</th>'+
                  '<th>Equipo</th>'+
                  '<th>Precio</th>'+
                  '<th>Descuento</th>'+
                  '<th>Total</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody>'+
                '<tr>'+
                  '<td>'+vehiculo.interior+'</td>'+
                  '<td>'+vehiculo.exterior+'</td>'+
                  '<td>'+vehiculo.agencia+'</td>'+
                  '<td>'+vehiculo.fentrega+'</td>'+
                  '<td>'+vehiculo.equipo+'</td>'+
                  '<td>'+vehiculo.precio+'</td>'+
                  '<td>'+vehiculo.descuento.cantidad+' '+(vehiculo.descuento.tipo==="porcentaje" ? "%" : "$")+'</td>'+
                  '<td>'+vehiculo.total+'</td>'+
                '</tr>'+
              '</tbody>'+
            '</table>'+
            // <!-- Modal Trigger Ingreso Comprador y vendedor-->
            '<a class="waves-effect waves-light btn modal-trigger" href="#ingresoComVen-'+i+'">Apartar</a>'+
            //  <!-- Modal Structure Ingreso Comprador y vendedor -->
             '<div id="ingresoComVen-'+i+'" class="modal">'+
               '<div class="modal-content grey darken-4">'+
                 '<div class="row"><div class="input-field col s6">'+
                   '<input id="comprador-'+i+'" type="text" class="validate" required>'+
                   '<label for="comprador-'+i+'">Comprador</label></div>'+
                   '<div class="input-field col s6">'+
                   '<input id="vendedor-'+i+'" type="text" class="validate" required>'+
                   '<label for="vendedor-'+i+'">Exportador</label></div>'+
                 '</div>'+
                 '<div class="modal-footer grey darken-4">'+
                   '<button onClick="apartarVehiculo('+vehiculo.id+','+i+')" class="btn waves-effect waves-light">Apartar</button>'+
                 '</div>'+
              '</div>'+
             '</div>'+
          '</div>'+
        '</li></ul>');

    $(document).ready(function(){
     $('.collapsible').collapsible();
      });
  });
}
function apartarVehiculo(idv,x) {
  var compradorStr =$('#comprador-'+x).val();
  var vendedorStr =$('#vendedor-'+x).val();
  var datosReserva={
    id:idv,
    comprador: compradorStr,
    vendedor:vendedorStr
  };
  console.log(datosReserva);
  $.ajax({
    url: 'http://blackcrozz.com/apimanu/reservar',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(datosReserva)
  })
  .done(function(res) {
    if(res.status==="error"){
      alert("No se ingreso el vehiuclo, verifique los datos");
      console.log(datosReserva);
    }else if(res.status==="success"){
      console.log("success");
      console.log(datosReserva);
      alert("Vehiculo Ingresado con exito");
      location.reload();
    }
  })
  .fail(function() {
    console.log("error");
  })
}
