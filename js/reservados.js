var listaReservados = [];
var $listaVehiculosReservados = $('#listaVehiculosReservados');

$.ajax({
  url: 'http://blackcrozz.com/apimanu/reservas',
  method: 'GET'
}).done(function(res) {
  if (res.status == 'success') {
    listaReservados = res.content;
    mostrarReservados(listaReservados);
  }
  }).fail(function() {
  alert('No se pudo obtener los vehiculos');
});

function mostrarReservados(listaReservados) {
  console.log(listaReservados);
  $.each(listaReservados,function(x, reservado){
    //Necesito precio con descuento
    $listaVehiculosReservados.append('<ul class="collapsible" data-collapsible="accordion">'+
        '<li>'+
        '<div class="collapsible-header">'+
          '<i class="material-icons">bookmark</i>'+
          '<span class="blue-text text-darken-2">ID '+reservado.id+
          '<span class="white-text text-darken-2">  '+reservado.modelo+
        '</div>'+
        '<div class="collapsible-body">'+
            '<table class="responsive-table">'+
            ' <thead><tr>'+
                 '<th>Interior</th>'+
                 '<th>Exterior</th>'+
                 '<th>Precio</th>'+
                 '<th>Agencia</th>'+
                 '<th>Llegada Aproximada</th>'+
                 '<th>Equipo</th>'+
                 '<th>Comprador</th>'+
                 '<th>Exportador</th>'+
               '</tr></thead>'+
             '<tbody><tr>'+
                 '<td>'+reservado.interior+'</td>'+
                 '<td>'+reservado.exterior+'</td>'+
                 '<td>'+reservado.precio+'</td>'+
                 '<td>'+reservado.agencia+'</td>'+
                 '<td>'+reservado.fentrega+'</td>'+
                 '<td>'+reservado.equipo+'</td>'+
                 '<td>'+reservado.reserva.comprador+'</td>'+
                 '<td>'+reservado.reserva.vendedor+'</td>'+
               '</tr></tbody>'+
           '</table>'+
           //<!-- Modal Trigger Ingreso Apartado-->
           '<a class="waves-effect waves-light btn modal-trigger" href="#apartar-'+x+'">Realizar Apartado</a>'+
           //<!-- Modal Structure Ingreso Apartado-->
           '<div id="apartar-'+x+'" class="modal">'+
           '<div class="modal-content grey darken-4">'+
           '<div class="file-field input-field">'+
           '<div class="btn">'+
           '<span>Comprobante</span>'+
           '<input type="file" name="comprobante-'+x+'">'+
           '</div>'+
           '<div class="file-path-wrapper">'+
           '<input class="file-path validate" type="text">'+
           '</div>'+
           '</div>'+
           '<div class="input-field col s6">'+
           '<input id="monto-'+x+'" type="number" name="cantidad-'+x+'">'+
           '<label for="monto-'+x+'">Monto</label>'+
           '</div>'+
           '<div class="modal-footer grey darken-4">'+
           '<button  class="btn waves-effect waves-light" id="b-'+x+'">Enviar</button>'+
           '</div>'+
           '</div>'+
           '</div>'+

          //  // <!-- Modal Trigger Lista-->
          //  '<a class="waves-effect waves-light btn modal-trigger" href="#apartados-'+x+'">Lista de Apartados</a>'+
          //  //  <!-- Modal Structure Lista -->
          //   '<div id="apartados-'+x+'" class="modal bottom-sheet">'+
          //     '<div class="modal-content">'+
          //    ' <div id="contenido-'+x+'"></div>'+
          //     '</div>'+
          //   '</div>'+

          //<!-- Modal Trigger Facturar-->
            '<a class="waves-effect waves-light btn modal-trigger" href="#factura-'+x+'">Facturar<i class="material-icons right">arrow_forward</i></a>'+
            //<!-- Modal Structure Facturar -->
             '<div id="factura-'+x+'" class="modal">'+
              ' <div class="modal-content grey darken-4">'+
                 '<div class="row">'+
                   '<div class="input-field col s9">'+
                     '<input id="vin-'+x+'" type="text" class="validate">'+
                      '<label for="vin-'+x+'">Vin</label>'+
                   '</div>'+
                  '</div>'+
                '<div class="modal-footer grey darken-4">'+
                    ' <button onClick="facturar('+reservado.reserva.id+','+x+')" class="btn waves-effect indigo">Facturar<i class="material-icons right">arrow_forward</i></button>'+
                '</div>'+
              '</div>'+
            '</div>'+
                    //Antiguo
                //  '<button class="btn waves-effect waves-light" onclick="nuevoApartado('+reservado.reserva.id+','+x+')" >Mostrar</button>'+
                //  '<div id="ingresoApartado-'+x+'"></div>'+
                 '<div id="listaDeApartados-'+x+'"></div>'+
          '</div>'+
        '</li>'+
      '</ul>');

      $('.collapsible').collapsible();
      $('.modal').modal();
      $('.materialboxed').materialbox();

      document.querySelector('#b-'+x).addEventListener('click', function () {
            var data = new FormData();
            var arc = jQuery('input[name^="comprobante-'+x+'"]')[0].files[0];
            data.append('comprobante', arc);
            data.append('reserva_id', reservado.reserva.id);
            data.append('cantidad', jQuery('input[name=cantidad-'+x+']').val());
            jQuery.ajax({
                url: 'http://blackcrozz.com/apimanu/apartado',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){
                    console.log(data);
                    alert("Apartado ingresado con exito");
                    location.reload();
                }
            });
          });

        var $listaDeApartados=$('#listaDeApartados-'+x);
        var $contenido=$('#contenido-'+x);
        var apartados = [];
        apartados = reservado.reserva.apartados;
        console.log(apartados);
        $.each(apartados,function(y,apartado){

          //Lista Pequena abajo
        $listaDeApartados.append('<ul class="collection">'+
             '<li class="collection-item avatar">'+
               '<img src="http://'+apartado.urlImgComprobate+'" alt="" class="circle materialboxed" width="150" height="150">'+
               '<span class="title">Apartado: '+(y+1)+'</span>'+
               '<p>Cantidad: '+apartado.cantidad+'</p>'+
               '<p>Fecha: '+apartado.fecha+'</p>'+
               '<a href="http://'+apartado.urlImgComprobate+'" class="secondary-content" download="Apartado '+(y+1)+'"><i class="material-icons">cloud_download</i></a>'+
             '</li>'+
           '</ul>');


      //   // Lista Pequena Caja
      //   $contenido.append('<ul class="collection">'+
      //        '<li class="collection-item avatar">'+
      //          '<img src="http://'+apartado.urlImgComprobate+'" alt="" class="circle materialboxed" width="150" height="150">'+
      //          '<span class="title">Apartado: '+(y+1)+'</span>'+
      //          '<p>Cantidad: '+apartado.cantidad+'</p>'+
      //          '<p>Fecha: '+apartado.fecha+'</p>'+
      //          '<a href="http://'+apartado.urlImgComprobate+'" class="secondary-content" download="Apartado '+(y+1)+'"><i class="material-icons">cloud_download</i></a>'+
      //        '</li>'+
      //      '</ul>');


      });
  });
}

    function facturar(i,x){
      var vinStr=$('#vin-'+x+'').val();
      var facturaNueva={
        vin: vinStr,
        reserva_id: i
      };
      $.ajax({
        url: 'http://blackcrozz.com/apimanu/facturacion',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(facturaNueva)
      })
      .done(function(res) {
        if(res.status==="error"){
          alert("No se ingreso el vehiuclo, verifique los datos");
        }
        console.log(res);
        console.log("success");
        alert("Se Facturo el vehiculo con Exito");
        location.reload();
      })
      .fail(function() {
        console.log("error no se pudo ingresar el vehiculo");
      })
    };
