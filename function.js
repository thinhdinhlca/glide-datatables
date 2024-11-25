window.function = function (table, tableID, buttons, colReorder, domOptions, defaultPageLength) {
  if (table.value === undefined) return undefined;
  if (tableID.value === undefined) return undefined;
  var buttonSpec = buttons.value ? buttons.value : `''`;
  var col_ordering = colReorder.value ? colReorder.value : false;
  var dom = domOptions.value ? domOptions.value : 'BRfrtlip';
  var pageLength = defaultPageLength.value ? parseInt(defaultPageLength.value, 10) : 10; // Default to 10 if not provided.

  const BASE_OPTIONS = `
    <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.6.3.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    `;

  const EXPORT_OPTIONS = `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/2.3.2/css/buttons.dataTables.min.css">
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.html5.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.print.min.js"></script>
  `;

  const COLVIS_OPTIONS = `
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.colVis.min.js"></script>
  `;

  const FIXED_HEADER_OPTIONS = `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/fixedheader/3.3.1/css/fixedHeader.dataTables.min.css">
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/fixedheader/3.3.1/js/dataTables.fixedHeader.min.js"></script>
  `;

  const COLREORDER_OPTIONS = col_ordering === true ? 
    `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/colreorder/1.6.1/css/colReorder.dataTables.min.css">
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/colreorder/1.6.1/js/dataTables.colReorder.min.js"></script>
    ` : '';
  
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    ${BASE_OPTIONS}
    ${EXPORT_OPTIONS}
    ${COLVIS_OPTIONS}
    ${FIXED_HEADER_OPTIONS}
    ${COLREORDER_OPTIONS}
  </head>
  <style>
body {
  font: 90%/1.45em "Inter", sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #fff;
}

table {
  font-family: "Inter", sans-serif;
}
</style>

  <body>
   ${table.value}
  </body>
  </html>
  <script type="text/javascript" class="init">
    $(document).ready(function () {
      var table = $('#${tableID.value}').DataTable({
        colReorder: ${col_ordering},
        responsive: true,
        pageLength: ${pageLength},
        lengthMenu: [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        dom: '${dom}',
        buttons: [
            ${buttonSpec}
        ]
      });

      // Initialize Fixed Header
      new $.fn.dataTable.FixedHeader(table);
    });
  </script>
  `;

  var enc = encodeURIComponent(html);
  var uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}
