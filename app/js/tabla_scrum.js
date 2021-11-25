const initializer = {
  init(){
    this.sortTable(),
    this.portle(),
    this.portleToggle()
  },
  sortTable(){
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      cancel: ".portlet-toggle",
      placeholder: "portlet-placeholder ui-corner-all",
    });
  },
  portle(){
    $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
  },
  portleToggle(){
    $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });
  }
};

function modalCrearTarjeta(idDiv){
  const modal = bootbox.dialog({
    title: 'Crear una tarjeta',
    message: `
    <form>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" class="form-control" id="nombre">
      </div>
      <div class="form-group">
        <label for="codigo">Codigo</label>
        <input type="text" class="form-control" id="codigo">
      </div>
      <div class="form-group">
        <label for="etiquetas">Etiquetas</label>
        <select class="form-control" id="etiquetas">
          <option style="background-color:#BDF9DA;" value="Requerimiento">Requerimiento</option>
          <option style="background-color:#B9F2F7;" value="Mantenimiento">Mantenimiento</option>
          <option style="background-color:#F0F7B9;" value="Solucion">Solucion</option>
          <option style="background-color:#F7BDB9;" value="Bug">Bug</option>
        </select>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea class="form-control" id="descripcion" rows="3"></textarea>
      </div>
    </form>
    `,
    size: 'large',
    buttons: {
        cancel: {
            label: "Cancelar",
            className: 'btn-danger',
            callback: function(){
            }
        },
        ok: {
            label: "Guardar",
            className: 'btn-info',
            callback: function(){
              const json = {nombre: $("#nombre").val(), etiqueta: $("#etiquetas").val(),codigo: $("#codigo").val(), descripcion: $("#descripcion").val(), iddiv: idDiv}
              añadirTarjetaADOM(json);
            }
        }
    }
  });
}

function pintarEtiqueta(etiqueta) {
  let resultado = "";
  switch (etiqueta) {
    case "Requerimiento":
      resultado = `<div style="background-color:#BDF9DA;border-radius:5px;">${etiqueta}</div>`
      break;
    case "Mantenimiento":
      resultado = `<div style="background-color:#B9F2F7;border-radius:5px;">${etiqueta}</div>`
      break;
    case "Solucion":
      resultado = `<div style="background-color:#F0F7B9;border-radius:5px;">${etiqueta}</div>`
      break;
    case "Bug":
      resultado = `<div style="background-color:#F7BDB9;border-radius:5px;">${etiqueta}</div>`
      break;
  }
  return resultado;
}

function añadirTarjetaADOM(json){
  $(`#${json.iddiv}`).append(`<div style="cursor:pointer" class="portlet">
    <div class="portlet-header">[${json.codigo}] - ${json.nombre}</div>
    <div class="portlet-content">${pintarEtiqueta(json.etiqueta)}</div>
    <div class="portlet-content"><button class="btn btn-primary btn-sm" onClick="modalActualizarTarjeta('${json.codigo}', '${json.nombre}', '${json.etiqueta}', '${json.descripcion}')">Ver Detalle</button></div>
  </div>`)
}

function modalActualizarTarjeta(codigo, nombre, etiqueta, descripcion){
  const modal = bootbox.dialog({
    title: 'Actualizar tarjeta',
    message: `
    <form>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" class="form-control" id="nombre" value="${nombre}">
      </div>
      <div class="form-group">
        <label for="codigo">Codigo</label>
        <input type="text" class="form-control" id="codigo" value="${codigo}" disabled="true">
      </div>
      <div class="form-group">
        <label for="etiquetas">Etiquetas</label>
        <select class="form-control" id="etiquetas">
          <option style="background-color:#BDF9DA;" value="Requerimiento">Requerimiento</option>
          <option style="background-color:#B9F2F7;" value="Mantenimiento">Mantenimiento</option>
          <option style="background-color:#F0F7B9;" value="Solucion">Solucion</option>
          <option style="background-color:#F7BDB9;" value="Bug">Bug</option>
        </select>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea class="form-control" id="descripcion" rows="3"></textarea>
      </div>
    </form>
    `,
    size: 'large',
    buttons: {
        cancel: {
            label: "Cancelar",
            className: 'btn-danger',
            callback: function(){
            }
        },
        ok: {
            label: "Actualizar",
            className: 'btn-info',
            callback: function(){
              const json = {nombre: $("#nombre").val(), etiqueta: $("#etiquetas").val(),codigo: $("#codigo").val(), descripcion: $("#descripcion").val(), iddiv: idDiv}
              //añadirTarjetaADOM(json);
            }
        }
    }
  });

  modal.init(function(){
    $("#etiquetas").val(etiqueta);
    $("#descripcion").val(descripcion);
  });
}

function pintarTareas(json){
  $(`#${json.iddiv}`).append(`<div style="cursor:pointer" class="portlet">
  <div class="portlet-header">[${json.codigo}] - ${json.nombre}</div>
  <div class="portlet-content">${pintarEtiqueta(json.etiqueta)}</div>
  <div class="portlet-content"><button class="btn btn-primary btn-sm" onClick="modalActualizarTarjeta('${json.codigo}', '${json.nombre}', '${json.etiqueta}', '${json.descripcion}')">Ver Detalle</button></div>
</div>`)
}

function obtenerTareas(){
  $.get("http://localhost:3000/obtenerTareas", (data)=>{
    data.forEach(pintarTareas)
  });
}


init = () => {
  initializer.init();
  obtenerTareas();
};

init();
