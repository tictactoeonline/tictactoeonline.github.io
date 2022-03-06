// GAME

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

var firstTurnPossible = true;
var yourTurn = false;

var shiftKey = false;

var chatBan = false;
var chatBanTime = 5;
var tempMessageCount = 0;
var tempMessageLimit = 8;

setInterval(() => {
  if (tempMessageCount > 0) tempMessageCount--;
}, 5000);

{
  var a1Locked = false,
    a2Locked = false,
    a3Locked = false,
    b1Locked = false,
    b2Locked = false,
    b3Locked = false,
    c1Locked = false,
    c2Locked = false,
    c3Locked = false;
}

function x(querySelector) {
  if (yourTurn == false || window[querySelector.replace("#", "") + "Locked"])
    return;
  $(querySelector).text("X").css("color", "white");
  conn.send({ type: "turn", data: querySelector });
  yourTurn = false;
  $("#turn").text("OPPONENT'S TURN");
}

function reset() {
  if (yourTurn) $("#turn").text("YOUR TURN");
  else $("#turn").text("OPPONENT'S TURN");
  $("#a1").text("");
  $("#a2").text("");
  $("#a3").text("");
  $("#b1").text("");
  $("#b2").text("");
  $("#b3").text("");
  $("#c1").text("");
  $("#c2").text("");
  $("#c3").text("");
  a1Locked = false;
  a2Locked = false;
  a3Locked = false;
  b1Locked = false;
  b2Locked = false;
  b3Locked = false;
  c1Locked = false;
  c2Locked = false;
  c3Locked = false;
  tempMessageCount = 0;
  chatBanTime = 5;
}

function win(box1, box2, box3) {
  $(box1).css("color", "rgb(255, 255, 150)");
  $(box2).css("color", "rgb(255, 255, 150)");
  $(box3).css("color", "rgb(255, 255, 150)");
  $("#turn").text("YOU WIN");
  setTimeout(() => {
    reset();
  }, 3000);
}

function lose(box1, box2, box3) {
  $(box1).css("color", "rgb(255, 255, 150)");
  $(box2).css("color", "rgb(255, 255, 150)");
  $(box3).css("color", "rgb(255, 255, 150)");
  $("#turn").text("YOU LOSE");
  setTimeout(() => {
    reset();
  }, 3000);
}

setInterval(() => {
  if (tempMessageCount > tempMessageLimit && chatBan == false) {
    warning("Chat disabled for " + chatBanTime + "s.");
    chatBan = true;
    setTimeout(() => {
      chatBan = false;
      tempMessageCount = 0;
    }, chatBanTime * 1000);
    chatBanTime *= 2;
  }

  if ($("#a1").text() != "") a1Locked = true;
  else a1Locked = false;
  if ($("#a2").text() != "") a2Locked = true;
  else a2Locked = false;
  if ($("#a3").text() != "") a3Locked = true;
  else a3Locked = false;
  if ($("#b1").text() != "") b1Locked = true;
  else b1Locked = false;
  if ($("#b2").text() != "") b2Locked = true;
  else b2Locked = false;
  if ($("#b3").text() != "") b3Locked = true;
  else b3Locked = false;
  if ($("#c1").text() != "") c1Locked = true;
  else c1Locked = false;
  if ($("#c2").text() != "") c2Locked = true;
  else c2Locked = false;
  if ($("#c3").text() != "") c3Locked = true;
  else c3Locked = false;

  if (
    $("#a1").text() != "" &&
    $("#a2").text() != "" &&
    $("#a3").text() != "" &&
    $("#b1").text() != "" &&
    $("#b2").text() != "" &&
    $("#b3").text() != "" &&
    $("#c1").text() != "" &&
    $("#c2").text() != "" &&
    $("#c3").text() != ""
  ) {
    $("#turn").text("TIE!");
    setTimeout(() => {
      reset();
    }, 3000);
  }

  if (
    $("#a1").text() == "X" &&
    $("#a2").text() == "X" &&
    $("#a3").text() == "X"
  )
    win("#a1", "#a2", "#a3");
  if (
    $("#b1").text() == "X" &&
    $("#b2").text() == "X" &&
    $("#b3").text() == "X"
  )
    win("#b1", "#b2", "#b3");
  if (
    $("#c1").text() == "X" &&
    $("#c2").text() == "X" &&
    $("#c3").text() == "X"
  )
    win("#c1", "#c2", "#c3");
  if (
    $("#a1").text() == "X" &&
    $("#b1").text() == "X" &&
    $("#c1").text() == "X"
  )
    win("#a1", "#b1", "#c1");
  if (
    $("#a2").text() == "X" &&
    $("#b2").text() == "X" &&
    $("#c2").text() == "X"
  )
    win("#a2", "#b2", "#c2");
  if (
    $("#a3").text() == "X" &&
    $("#b3").text() == "X" &&
    $("#c3").text() == "X"
  )
    win("#a3", "#b3", "#c3");
  if (
    $("#a1").text() == "X" &&
    $("#b2").text() == "X" &&
    $("#c3").text() == "X"
  )
    win("#a1", "#b2", "#c3");
  if (
    $("#a3").text() == "X" &&
    $("#b2").text() == "X" &&
    $("#c1").text() == "X"
  )
    win("#a3", "#b2", "#c1");

  if (
    $("#a1").text() == "O" &&
    $("#a2").text() == "O" &&
    $("#a3").text() == "O"
  )
    lose("#a1", "#a2", "#a3");
  if (
    $("#b1").text() == "O" &&
    $("#b2").text() == "O" &&
    $("#b3").text() == "O"
  )
    lose("#b1", "#b2", "#b3");
  if (
    $("#c1").text() == "O" &&
    $("#c2").text() == "O" &&
    $("#c3").text() == "O"
  )
    lose("#c1", "#c2", "#c3");
  if (
    $("#a1").text() == "O" &&
    $("#b1").text() == "O" &&
    $("#c1").text() == "O"
  )
    lose("#a1", "#b1", "#c1");
  if (
    $("#a2").text() == "O" &&
    $("#b2").text() == "O" &&
    $("#c2").text() == "O"
  )
    lose("#a2", "#b2", "#c2");
  if (
    $("#a3").text() == "O" &&
    $("#b3").text() == "O" &&
    $("#c3").text() == "O"
  )
    lose("#a3", "#b3", "#c3");
  if (
    $("#a1").text() == "O" &&
    $("#b2").text() == "O" &&
    $("#c3").text() == "O"
  )
    lose("#a1", "#b2", "#c3");
  if (
    $("#a3").text() == "O" &&
    $("#b2").text() == "O" &&
    $("#c1").text() == "O"
  )
    lose("#a3", "#b2", "#c1");
});

function sendMessage() {
  if (!$("#message").val().trim() || chatBan) return;
  $("#messenger").append(
    $("<div class='message sent'>").text($("#message").val().trim())
  );
  conn.send({ type: "message", data: $("#message").val().trim() });
  $("#message").val("");
  document
    .getElementById("messenger")
    .scrollTo({ top: 999999999999999, behavior: "smooth" });
  tempMessageCount++;
}

function warning(str) {
  $("#messenger").append($("<div class='message warning'>").text("> " + str));
  document
    .getElementById("messenger")
    .scrollTo({ top: 999999999999999, behavior: "smooth" });
}

function onKeyDown(e) {
  if (e.key == "Shift") shiftKey = true;
  if (e.key == "Enter" && !shiftKey) sendMessage();
  if (e.key == "t")
    setTimeout(() => {
      $("#message").focus();
    });
}

function onKeyUp(e) {
  if (e.key == "Shift") shiftKey = false;
}

// NETWORKING

var peer = new Peer();
var conn = null;

peer.on("open", (id) => {
  $("#peerID").text(id);
});

peer.on("connection", (c) => {
  firstTurnPossible = false;
  c.on("data", ({ type, data }) => {
    if (type === "turn") {
      if (yourTurn) {
        conn.send({
          type: "disconnect",
          data: "You have been kicked for cheating.",
        });
        return;
      }
      $(data).text("O").css("color", "rgb(255,120,120)");
      yourTurn = true;
      $("#turn").text("YOUR TURN");
    } else if (type === "message") {
      $("#messenger").append($("<div class='message received'>").text(data));
      document.getElementById("messenger").scrollBy(0, 50);
    } else if (type === "warning") {
      warning(data);
    } else if (type === "disconnect") {
      conn = peer.disconnect();
      $("#game").hide();
      $("#connect").show();
      reset();
      $("#remoteID").val("");
      setTimeout(() => {
        alert(data);
      }, 300);
    }
  });
});

peer.on("error", (err) => {
  if (err.type == "invalid-id") {
    alert("Invalid ID.");
    $("#remoteID").val("");
  }
});

function c() {
  if (firstTurnPossible) {
    yourTurn = true;
    $("#turn").text("YOUR TURN");
  } else $("#turn").text("OPPONENT'S TURN");
  var id = $("#remoteID").val();
  conn = peer.connect(id);
  $("#connect").hide();
  $("#game").show();
}

function dc() {
  if (!confirm("Are you sure you want to disconnect?")) return;
  conn = peer.disconnect();
  $("#game").hide();
  $("#connect").show();
  reset();
}
