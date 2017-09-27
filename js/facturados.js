var listaFacturados = [];
var $listaVehiculosFacturados = $('#listaVehiculosFacturados');

$.ajax({
  url: 'http://blackcrozz.com/apimanu/facturados',
  method: 'GET'
}).done(function(res) {
  if (res.status == 'success') {
    listaFacturados = res.content;
    mostrarFacturados(listaFacturados);
  }
  }).fail(function() {
  alert('No se pudo obtener los vehiculos');
});
function mostrarFacturados(listaFacturados) {
  console.log(listaFacturados);
  $.each(listaFacturados,function(x, facturado){
    $listaVehiculosFacturados.append('<ul class="collapsible" data-collapsible="accordion">'+
        '<li>'+
        '<div class="collapsible-header">'+
          '<i class="material-icons">call_to_action</i>'+
          '<span class="blue-text text-darken-2">ID '+facturado.id_vehiculo+
          '<span class="white-text text-darken-2">  '+facturado.modelo+
        '</div>'+
          '<div class="collapsible-body">'+
            '<table class="responsive-table">'+
            ' <thead><tr>'+
                 '<th>Vin</th>'+
                 '<th>Fecha</th>'+
                 '<th>Agencia</th>'+
                 '<th>Exportador</th>'+
                 '<th>Comprador</th>'+
                 '<th>Precio</th>'+
                 '<th>Apartados</th>'+
                 '<th>Pagos</th>'+
                 '<th>Pendiente</th>'+
               '</tr></thead>'+
             '<tbody><tr>'+
                 '<td>'+facturado.vin+'</td>'+
                 '<td>'+facturado.ffact+'</td>'+
                 '<td>'+facturado.agencia+'</td>'+
                 '<td>'+facturado.vendedor+'</td>'+
                 '<td>'+facturado.comprador+'</td>'+
                 '<td>'+facturado.precio+'</td>'+
                 '<td>'+facturado.totalApartados+'</td>'+
                 '<td>'+facturado.totalPagos+'</td>'+
                 '<td>'+facturado.precioRestante+'</td>'+
               '</tr></tbody>'+
           '</table>'+
           // <!-- Modal Trigger Ingreso Factura-->
           '<a class="waves-effect waves-light btn modal-trigger" href="#ingresoFactura-'+x+'">Subir Factura</a>'+
           //  <!-- Modal Structure Ingreso Factura -->
            '<div id="ingresoFactura-'+x+'" class="modal">'+
              '<div class="modal-content grey darken-4">'+
                 '<div class="file-field input-field">'+
                     '<div class="btn">'+
                       '<span>PDF</span>'+
                       '<input type="file" name="pdf-'+x+'">'+
                     '</div>'+
                     '<div class="file-path-wrapper">'+
                       '<input class="file-path validate" type="text">'+
                     '</div>'+
                 '</div>'+
                 '<div class="file-field input-field">'+
                     '<div class="btn">'+
                       '<span>XML</span>'+
                       '<input type="file" name="xml-'+x+'">'+
                     '</div>'+
                     '<div class="file-path-wrapper">'+
                       '<input class="file-path validate" type="text">'+
                     '</div>'+
                 '</div>'+
                 '<div class="modal-footer grey darken-4">'+
                   '<button  class="btn waves-effect waves-light" id="b-'+x+'">Enviar</button>'+
                 '</div>'+
              '</div>'+
            '</div>'+
            //<!-- Modal Trigger Ingreso Pago-->
            '<a class="waves-effect waves-light btn modal-trigger" href="#ingresoPago-'+x+'">Pagar</a>'+
            //<!-- Modal Structure Ingreso Pago -->
             '<div id="ingresoPago-'+x+'" class="modal">'+
              ' <div class="modal-content grey darken-4">'+
                 '<div class="row">'+
                   '<div class="input-field col s9">'+
                     '<input id="montoPago-'+x+'" type="text" class="validate">'+
                      '<label for="montoPago-'+x+'">Cantidad</label>'+
                   '</div>'+
                   '<div class="input-field col s3">'+
                    ' <button onClick="nuevoPago('+facturado.id+','+x+')" class="btn waves-effect indigo">Enviar</button>'+
                  ' </div>'+
                 '</div>'+
              '</div>'+
            '</div>'+
            //<!-- Modal Trigger Ingreso Comision-->
            '<a class="waves-effect waves-light btn modal-trigger" href="#ingresoComision-'+x+'">Comision</a>'+
            //<!-- Modal Structure Ingreso Comision -->
             '<div id="ingresoComision-'+x+'" class="modal">'+
              ' <div class="modal-content grey darken-4">'+
                 '<div class="row">'+
                   '<div class="input-field col s6">'+
                     '<select id="tipo-'+x+'">'+
                     '<option value="" disabled selected>Tipo de Comision</option>'+
                     '<option value="porcentaje">Porcentaje</option>'+
                     '<option value="efectivo">Efectivo</option>'+
                     '</select>'+
                     '<label>Tipo</label>'+
                   '</div>'+
                     '<div class="input-field col s9">'+
                       '<input id="montoComision-'+x+'" type="text" class="validate">'+
                        '<label for="montoComision-'+x+'">Monto</label>'+
                     '</div>'+
                   '<div class="input-field col s3">'+
                    ' <button onClick="nuevaComision('+facturado.id+','+x+')" class="btn waves-effect indigo">Enviar</button>'+
                  ' </div>'+
                 '</div>'+
              '</div>'+
            '</div>'+
            //<!-- Modal Trigger Lista Pagos-->
            '<a class="waves-effect waves-light btn modal-trigger" href="#listarPagos-'+x+'">Lista Pagos</a>'+
            //<!-- Modal Structure Lista Pagos -->
             '<div id="listarPagos-'+x+'" class="modal bottom-sheet">'+
              ' <div class="modal-content grey darken-4">'+
                 '<div class="row">'+
                   '<div id="pagos-'+x+'">'+
                   '</div>'+
                 '</div>'+
              '</div>'+
            '</div>'+
            //<!-- Modal Trigger Lista Facturas-->
            '<a class="waves-effect waves-light btn modal-trigger" href="#listarFacturas-'+x+'">Lista Facturas</a>'+
            //<!-- Modal Structure Lista Facturas -->
             '<div id="listarFacturas-'+x+'" class="modal bottom-sheet">'+
              ' <div class="modal-content grey darken-4">'+
                  '<div id="documentos-'+x+'">'+
                  '</div>'+
              '</div>'+
            '</div>'+

          '</div>'+
        '</li>'+
      '</ul>');

      $('.collapsible').collapsible();
      $('.modal').modal();
      $('.materialboxed').materialbox();
      $('select').material_select();

      document.querySelector('#b-'+x).addEventListener('click', function () {
            var data = new FormData();
            var pdf = jQuery('input[name^="pdf-'+x+'"]')[0].files[0];
            var xml = jQuery('input[name^="xml-'+x+'"]')[0].files[0];
            data.append('pdf', pdf);
            data.append('xml', xml);
            data.append('facturacion_id', facturado.id);
            jQuery.ajax({
                url: 'http://blackcrozz.com/apimanu/factura',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){
                    console.log(data);
                    alert("Factura ingresada con exito");
                    location.reload();
                }
            });
          });

      //Listado de documentos
      var $documentos=$('#documentos-'+x);
      var listaDocumentos = [];
      listaDocumentos = facturado.facturas;
      $.each(listaDocumentos,function(z,documento){
        //Lista Pequena caja
        //Error con los links de XMl me manda a la carpeta de PDF
      $documentos.append('<ul class="collection">'+
       '<li class="collection-item avatar">'+
         '<i class="material-icons circle">folder</i>'+
         '<span class="title">Factura: '+(z+1)+'</span>'+
         '<a href="http://'+documento.urlPdf+'" class="secondary-content"><i class="material-icons">grade</i></a>'+
       '</li>'+
       '<li class="collection-item avatar">'+
         '<i class="material-icons circle">insert_chart</i>'+
         '<span class="title">XML: '+(z+1)+'</span>'+
         '<a href="http://'+documento.urlPdf+'" class="secondary-content download"><i class="material-icons">grade</i></a>'+
       '</li>'+
      '</ul>');
       });

      //Listado de Pagos
      var $pagos=$('#pagos-'+x);
      var listaPagos = [];
      listaPagos = facturado.pagos;
      $.each(listaPagos,function(y,pago){
        //Lista Pequena caja
      $pagos.append('<ul class="collection">'+
           '<li class="collection-item avatar">'+
             ' <i class="material-icons circle green">monetization_on</i>'+
             '<span class="title">Pago: '+(y+1)+'</span>'+
             '<p>Cantidad: '+pago.monto+'</p>'+
             '<p>Fecha: '+pago.fecha+'</p>'+
             '<a href="#!" class="secondary-content"><i class="material-icons">attach_money</i></a>'+
           '</li>'+
         '</ul>');
       });
  });
}
function nuevoPago(idPago,y){
  var pagoStr=$('#montoPago-'+y).val();
  var pagoNuevo={
    monto: pagoStr,
    facturacion_id: idPago
  };
  $.ajax({
    url: 'http://blackcrozz.com/apimanu/pago',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(pagoNuevo)
  })
  .done(function(res) {
    if(res.status==="error"){
      alert("No se ingreso el pago");
    }
    console.log(res);
    console.log("success");
    alert("Se ingreso el pago con Exito");
    location.reload();
  })
  .fail(function() {
    console.log("No se Pudo ingresar el pago");
  })
};

function nuevaComision(idComi,y){
  var cantidadStr=$('#montoComision-'+y).val();
  var tipoStr=$('#tipo-'+y).val();
  var ComisionNueva={
    cantidad: cantidadStr,
    tipo: tipoStr,
    facturacion_id: idComi
  };
  $.ajax({
    url: 'http://blackcrozz.com/apimanu/notas',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(ComisionNueva)
  })
  .done(function(res) {
    if(res.status==="error"){
      alert("No se ingreso la comision");
    }
    console.log(res);
    console.log("success");
    alert("Se ingreso la comision con Exito");
    location.reload();
  })
  .fail(function() {
    console.log("No se Pudo ingresar el pago");
  })
};
