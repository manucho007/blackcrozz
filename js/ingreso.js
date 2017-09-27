function carga(){
  var modeloStr =$('#modelo').val();
  var agenciaStr =$('#agencia').val();
  var exteriorStr =$('#exterior').val();
  var interiorStr =$('#interior').val();
  var equipoStr =$('#equipo').val();
  var fentregaStr =$('#fentrega').val();
  var precioStr =$('#precio').val();
  var tipoStr =$('#tipo').val();
  var montoStr =$('#monto').val();

  var vehiculoNuevo={
    modelo: modeloStr,
    agencia: agenciaStr,
    exterior: exteriorStr,
    interior: interiorStr,
    equipo: equipoStr,
    fentrega: fentregaStr,
    precio: precioStr,
    tipo: tipoStr,
    monto: montoStr
  };
  console.log(vehiculoNuevo);
  $.ajax({
    url: 'http://blackcrozz.com/apimanu/vehiculo',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(vehiculoNuevo)
  })
  .done(function(res) {
    if(res.status==="error"){
      alert("No se ingreso el vehiuclo, verifique los datos");
      console.log(vehiculoNuevo);
    }else if(res.status==="success"){
      console.log("success");
      console.log(vehiculoNuevo);
      alert("Vehiculo Ingresado con exito");
      location.reload();
    }
  })
  .fail(function() {
    console.log("error no se pudo ingresar el vehiculo");
  })

}
