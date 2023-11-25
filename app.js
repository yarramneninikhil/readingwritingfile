const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method; // Retrieve the HTTP method

  // Maintain an array to store user messages
  const messages = [];

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>ReadAndWrite</title></head>");
    res.write("<body>");

    // Display existing messages at the top of the form
    for (const message of messages) {
      res.write(`<p>${message}</p>`);
    }

    res.write('<form action="/message" method="POST">');
    res.write('<input type="text" name="message">');
    res.write('<button type="submit">SEND</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];

      // Add the new message to the messages array
      messages.push(message);

      res.write("<html>");
      res.write("<head><title>ReadAndWrite</title></head>");
      res.write("<body>");

      // Display all messages, including the new one
      for (const msg of messages) {
        res.write(`<p>${msg}</p>`);
      }

      res.write('<form action="/message" method="POST">');
      res.write('<input type="text" name="message">');
      res.write('<button type="submit">SEND</button>');
      res.write("</form>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    });
    return;
  }

  // Handle other routes or request methods here
});

server.listen(3000);
