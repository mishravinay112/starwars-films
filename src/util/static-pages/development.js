export default head => `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width">
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
      <div id='app'></div>
      <script src='/bundle.js'></script>
    </body>
  </html>`;
