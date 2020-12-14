const socket = new WebSocket('ws://localhost:3000/');

socket.onopen = (event) => {
  console.log('Tryna open', { openEvent: event });
};

socket.onmessage = (event) => {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
    );
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.error('[close] Connection died');
  }
};

const clickHandler = (e) => {
  socket.send(e.target.id);
};

const smiley = document.getElementById('smiley-face');
const crying = document.getElementById('crying-face');
const noEvil = document.getElementById('see-no-evil');
const scared = document.getElementById('scared-face');
const relieved = document.getElementById('relieved-face');
const dice = document.getElementById('single-dice');

smiley.addEventListener('click', clickHandler);
crying.addEventListener('click', clickHandler);
noEvil.addEventListener('click', clickHandler);
scared.addEventListener('click', clickHandler);
relieved.addEventListener('click', clickHandler);
dice.addEventListener('click', clickHandler);

socket.onerror = function (error) {
  console.error({ error });
};
