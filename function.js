window.function = function (table) {
  if (table.value === undefined) return undefined;
  
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/dataTables.jqueryui.min.css">
    <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.12.1/js/dataTables.jqueryui.min.js"></script>
  </head>
  <body>`

  html += table.value;
  html += `
    </body>
    </html>
    <script type="text/javascript" class="init">

    $(document).ready(function () {
      const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    var rows = params.rows;
    document.getElementById("tbody").innerHTML = rows;

    $('#books').DataTable();
  });
</script>
`;

  return html;
}
