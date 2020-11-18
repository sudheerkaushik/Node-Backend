var cluster = require("cluster");

function startWorker() {
  var worker = cluster.fork();
  console.log("Cluster %d started ", worker.id);
}

if (cluster.isMaster) {
  require("os").cpus().forEach(function() {
    startWorker();
  });

  cluster.on("disconnect", function(worker) {
    console.log("Worker disconnected % d", worker.id);
  });
  cluster.on("exit", function(worker, code, signal) {
    console.log("Worker %d dies with code %d (%s)", worker.id, code, signal);
    startWorker();
  });
} else {
  require("./nodeTest.js")();
}
