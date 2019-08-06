const fs = require('fs');

const OUTDIR = 'dist';
const INDIR = 'presentations';

const htmlTemplate = body => (`
<!DOCTYPE html>
<html>
  <head>
    <title>Title</title>
    <meta charset="utf-8">
    <style>
      @import url(https://fonts.googleapis.com/css?family=Droid+Serif);
      @import url(https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
      @import url(https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);

      body {
        font-family: 'Droid Serif';
      }
      h1, h2, h3 {
        font-family: 'Yanone Kaffeesatz';
        font-weight: 400;
        margin-bottom: 0;
      }
      .remark-slide-content h1 { font-size: 3em; }
      .remark-slide-content h2 { font-size: 2em; }
      .remark-slide-content h3 { font-size: 1.6em; }
      .footnote {
        position: absolute;
        bottom: 3em;
      }
      li p { line-height: 1.25em; }
      .red { color: #fa0000; }
      .large { font-size: 2em; }
      a, a > code {
        color: rgb(249, 38, 114);
        text-decoration: none;
      }
      code {
        background: #e7e8e2;
        border-radius: 5px;
      }
      .remark-code, .remark-inline-code { font-family: 'Ubuntu Mono'; }
      .remark-code-line-highlighted     { background-color: #373832; }
      .pull-left {
        float: left;
        width: 47%;
      }
      .pull-right {
        float: right;
        width: 47%;
      }
      .pull-right ~ p {
        clear: both;
      }
      #slideshow .slide .content code {
        font-size: 0.8em;
      }
      #slideshow .slide .content pre code {
        font-size: 0.9em;
        padding: 15px;
      }
      .inverse {
        background: #272822;
        color: #777872;
        text-shadow: 0 0 20px #333;
      }
      .inverse h1, .inverse h2 {
        color: #f3f3f3;
        line-height: 0.8em;
      }

      /* Slide-specific styling */
      #slide-inverse .footnote {
        bottom: 12px;
        left: 20px;
      }
      #slide-how .slides {
        font-size: 0.9em;
        position: absolute;
        top:  151px;
        right: 140px;
      }
      #slide-how .slides h3 {
        margin-top: 0.2em;
      }
      #slide-how .slides .first, #slide-how .slides .second {
        padding: 1px 20px;
        height: 90px;
        width: 120px;
        -moz-box-shadow: 0 0 10px #777;
        -webkit-box-shadow: 0 0 10px #777;
        box-shadow: 0 0 10px #777;
      }
      #slide-how .slides .first {
        background: #fff;
        position: absolute;
        top: 20%;
        left: 20%;
        z-index: 1;
      }
      #slide-how .slides .second {
        position: relative;
        background: #fff;
        z-index: 0;
      }

      /* Two-column layout */
      .left-column {
        color: #777;
        width: 20%;
        height: 92%;
        float: left;
      }
        .left-column h2:last-of-type, .left-column h3:last-child {
          color: #000;
        }
      .right-column {
        width: 75%;
        float: right;
        padding-top: 1em;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
`);

const remarkBody = source => (`
    <textarea id="source">
      ${source}
    </textarea>
    <script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
    <script>
      var slideshow = remark.create({ 
        highlightStyle: 'monokai',
        highlightLines: true
      });
    </script>
`);

const htmlLink = (url, test) => `<a href="${url}">${test}</a>`;

try {
  fs.mkdirSync(OUTDIR);
} catch (error) {
  if (!error.message.startsWith('EEXIST')) {
    console.error(error.message);
    process.exit(1);
  }
}

const filenames = fs.readdirSync(INDIR)
  .filter(file => file.endsWith('.md'))
  .map(file => file.replace('.md', ''))
  
filenames.map(filename => fs.readFileSync(INDIR + '/' + filename + '.md'))
  .map(content => htmlTemplate(remarkBody(content)))
  .forEach((content, i) => fs.writeFile(OUTDIR + '/' + filenames[i] + '.html', content, error => {
    if (error) {
      console.error(error.message);
      process.exit(1);
    } else {
      console.log(`${filenames[i]}.html created`);
    }
  }));

fs.writeFile(OUTDIR + '/index.html', htmlTemplate(`
        <div style="width: 960px; margin: 5em auto; text-align: center;">
          <h1 style="font-size: 5em; margin-bottom: 0.5em;">Vevcom Presentations</h1>
          <div style="display:flex; flex-direction:column; font-size: 2.5em;">
            ${filenames.map(file => htmlLink('./' + file + '.html', file)).join('')}
          </div>
        </div>
`), error => {
  if (error) {
    console.log(error.message);
    process.exit(1);
  } else {
  }
})