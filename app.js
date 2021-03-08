const express = require("express");
const app = express();
const port = 3000;

const WebSocketServer = require("ws").Server;
const server = require("http").createServer(app);
const wss = new WebSocketServer({ server });
const port = 3000;

app.use("/js", express.static(path.join(__dirname, "ui/js/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/ui/html/index.html"));
});

app.get("/test", (req, res) => {
  res.set("X-my-custom-header", "example text");
  res.status(418);
  res.send("i dont know");
});

function handleQuery(query, cb) {
  cb("Awesome");
}

let cc = 0;

wss.on("connection", function connection(ws) {
  console.log("client connections: ", ++cc);

  ws.on("message", function incoming(message) {
    try {
      const { payload, type } = JSON.parse(message);
      switch (type) {
        case "query":
          handleQuery(payload, (response) => {
            ws.send(
              JSON.stringify({ type: "queryResponse", payload: response })
            );
          });
          return;
        default:
          console.log(message);
      }
    } catch (e) {
      console.error("Error from message: ", e);
    }
  });

  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify({ type: "connected", payload: "Welcome!" }));
  }

  ws.on("close", function close() {
    --cc;
    if (cc === 0) {
      clearInterval(pingInterval);
    }
    console.log("disconnected");
  });

  ws.on("error", function error() {
    --cc;
    console.log("error");
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

app.listen(port, () => console.log(` app listen on port: ${port}`));
