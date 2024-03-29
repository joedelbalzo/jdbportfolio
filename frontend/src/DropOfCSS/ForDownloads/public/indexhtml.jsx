export const indexhtml = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>A Drop of CSS</title>
      <link rel="icon" type="image/x-icon" href="/static/colorwheel.png" />
      <script src="/dist/main.js" defer></script>
      <link rel="stylesheet" href="/static/styles.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto:400" />
      <script>
        window.client_id = "<%= client_id %>";
      </script>
    </head>
    <body>
      <div id="root">this is under construction still! feel free to download individual components</div>
    </body>
  </html>
  `;
};
