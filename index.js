var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let connectedUsers = [];
let drawHistory = [];
let passwords = ["absolwent", "szatan", "żyrafa", "plac", "piłka", "ego", "wers", "trapez", "poczucie niższości", "teatr", "zawias", "rzeczownik", "pamiętnik", "księgarnia", "zwariowany", "zaopatrzenie", "pająk", "latać", "lody", "wanna", "radio", "rzepa", "herold", "imigrant", "alfabet", "skoki do wody", "staranny", "rzep", "dowcip", "umiejętność", "wąż", "gabinet", "tron", "beton", "powierzchnia", "górnik", "maska", "formuła", "kamyki", "rozwiązanie", "moc", "plotka", "beztroska", "iskra", "trofeum", "dyrektor szkoły", "przybicie", "bezradność", "ołów", "elektryk", "przewodnik", "obawa", "kraj", "skoki narciarskie", "tajfun", "lekkoatletyka", "oparzenie", "opanowany", "lubiany", "piana", "naleśnik", "kierowca", "podstępny", "grzyb", "suknia", "zacietrzewienie", "uzda", "stacja paliw", "miesiąc", "dyrektor szkoły", "referendum", "biskup", "firma", "beczka", "motel", "próba", "dociekliwy", "księgowy", "powściągliwość", "podpis", "poduszka", "koralik", "rusztowanie", "pająk", "basen", "rama", "śmiech", "bogaty", "kaloryfer", "gąsienica", "podeszwa", "musztarda", "trwoga", "seler", "uśmiech", "beztroska", "spinacz", "zwycięzca", "przysięga", "prezydent", "sałata", "przyjazny", "żul", "troskliwy", "termometr", "spełnienie", "widelec", "moc", "szewc", "pies", "szwaczka", "szampon", "melon", "banan", "wywar", "limit", "paszport", "bilet", "egzamin", "hokej na lodzie", "opcja", "robot", "kiwi", "powieść", "zamieszki", "lamówka", "strych", "pelikan", "kara", "prawa autorskie", "wybawca", "trawa", "słowo", "przystanek autobusowy", "kelner", "truskawka", "praktyczny", "ekspansywny", "konsjerż", "wiadomość", "fala", "korporacja", "mądrość", "plan", "górnik", "losowanie", "dekorator", "głos", "serwetka", "odrzut", "umysł", "ja", "artretyzm", "satysfakcja", "rzemieślnik", "owsianka", "gwóźdź", "kościół", "zebra", "generał", "keczup", "neon", "wysypka", "ofiarny", "spokój", "aluminium", "doświadczony", "kangur", "dźwigar", "wytrwały", "fizjoterapeuta", "kąpielisko", "rozgłos", "cegła", "wino", "prześwietlenie", "walizka", "inteligentny", "rękawice", "łasica", "wioślarstwo", "szalik", "komitet", "saneczkarstwo", "drapacz chmur", "wściekłość", "przybicie", "portmonetka", "karaluch", "torf", "życzliwość", "malarz", "szampan", "personel", "naturalny", "biathlon", "łódź podwodna", "magik", "prochy", "polowanie", "wyluzowany", "smutny", "bataty", "film", "jedzenie", "komentarz", "samolubny", "serdeczność", "mewa", "parafia", "kameleon", "kolor", "samochód", "czynność", "zwariowany", "ludzie", "miecz", "restauracja", "mrówka", "szachy", "omdlenie", "arbuz", "fajerwerki", "tłum", "okręt", "szczęściarz", "kukurydza", "komiks", "żal", "bataty", "aspiryna", "pielęgniarka", "psychiatra", "przypływ", "słoń", "nagłówek", "hałas", "świeca", "strumień", "uczynny", "źródło", "granat", "wózek", "szkoła", "serdeczny", "płacz", "dżet", "obraz", "ilustrator", "narciarstwo aplejskie", "ogień", "ochraniacz", "spostrzegawczy", "szafka", "rzemieślnik", "bankier", "boże narodzenie", "dyrektor szkoły", "członek", "orangutan", "beztroska", "szorty", "żółw", "krzesło", "arszenik", "samolubny", "prorok", "robot", "kolonia", "kraj", "pianino", "grzmot", "stanowisko", "urzędnik", "poker", "bekon", "uczynny", "zabawka", "społeczność", "próba", "tonik", "biblioteka", "komputer", "liana", "nagłówek", "lokator", "król", "heretyk", "perfumy", "aligator", "mądry", "flota", "maniery", "bikini", "pelikan", "oburzenie", "bagaż", "weterynarz", "kara", "artysta", "furgonetka", "rzeczowy", "energiczny", "pałac", "pub", "polityk", "formuła", "powietrze", "grzebień", "saneczkarstwo", "lato", "zasiłek", "soczewica", "alfabet", "pieniądze", "piramida", "latać", "szewc", "tytuł", "komedia", "licencja", "papieros", "ucieczka", "trawnik", "winogrono", "zdolny", "szał", "serdeczność", "dach", "waga", "maszyna", "deszczowy", "farmaceuta", "wspinaczka", "badanie", "college", "praktyczny", "pracownik", "orangutan", "pomysłowy", "lokówki", "kot", "uroczy", "karaluch", "zły", "akceptacja", "sufit", "stalówka", "pytanie", "cena", "lis", "tsunami", "unia", "kapitan", "chudy", "chór", "sardynka", "komputer", "jeżyna", "groszek", "okup", "enzym", "ufność", "wina", "księgowy", "wieczór", "oliwka", "spokój", "rok", "wróbel", "sofa", "butik", "serdeczność", "żaba", "podkowa", "szczęście", "tłuszcz", "pranie", "alfabet", "taca", "płaszcz", "kłódka", "pielęgniarka", "entuzjazm", "wynik", "mim", "śnieżny", "wiadro", "raport", "kompetentny", "wieża", "remedium", "kontrakt", "komar", "żaba", "kosmetyczka", "wrażliwy", "prezydent", "kruszyna", "laser", "zagadka", "ekscytujący", "godzina", "wiosło", "szachy", "pytanie", "porcelana", "obraza", "figura", "alarm", "sójka", "plac zabaw", "kolor", "krok", "błoto", "poczucie straty", "brew", "plakat", "krawiec", "łańcuch", "pułapka", "deszczowy", "zmartwienie", "decyzja", "sowa", "fabuła", "komiks", "wideo", "pawian", "chór", "restauracja", "przyczepa", "garncarstwo", "kaskader", "energiczny", "termit", "zwycięzca", "deszcz", "kierownik", "pantera", "wejście", "rozsądek", "odrzut", "kopa siana", "wszystko", "tytuł", "śliwka", "pałka", "ojciec", "komiks", "ucieczka", "kwiaciarz", "apartamentowiec", "wymach", "hokej na trawie", "program", "podkowa", "krowa", "rzeka", "zakład", "siatkówka", "modelka", "absolwent", "pamiętnik", "nosze", "generator", "północ", "żeglarstwo", "błyskotliwy", "ruletka"];
let password;
let painter;
let lastPainter;
let intID;
let gameAlreadyStarted = false;
let counter = 180;
const PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  //INIT
  socket.on('username', function (username) {
    if (!connectedUsers.includes(socket.client.id)) {
      connectedUsers.push({
        id: socket.client.id,
        name: username,
        points: 0
      });
      if (drawHistory.length > 0) io.to(`${socket.client.id}`).emit('drawHistory', drawHistory);
      io.to(`${socket.client.id}`).emit('allUsers', connectedUsers);

    }
    socket.broadcast.emit('newPlayer', connectedUsers[connectedUsers.length - 1]);
    if (connectedUsers.length > 1 && !gameAlreadyStarted) {
      startNewGame(connectedUsers);
    }
  });

  socket.on('message', function (msg) {

    io.emit('message', msg);
  });

  //GAME START
  function startTimer(duration, painterID) {
    var timer = duration,
      minutes, seconds;
    intID = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      io.to(`${painterID}`).emit('timer', minutes + ":" + seconds);

      if (--timer < 0) {
        gameAlreadyStarted = false;
        drawHistory = [];
        io.emit('clearCanvas', true);
        io.to(`${painterID}`).emit('disablePaintBar', 'true');
        drawHistory = [];
        startNewGame(connectedUsers);
      }
    }, 1000);
  }

  function choosePainter(cUsers, lastPainter) {
    let newPainter;
    while (lastPainter == newPainter) {
      newPainter = cUsers[Math.floor(Math.random() * cUsers.length)];
    }
    return newPainter;

  }

  function choosePassword() {
    return passwords[Math.floor(Math.random() * passwords.length)];
  }

  function startNewGame(cUsers) {
    gameAlreadyStarted = true;
    clearInterval(intID);
    painter = choosePainter(cUsers, lastPainter);
    lastPainter = painter;
    password = choosePassword();
    startTimer(counter, painter.id);
    io.to(`${painter.id}`).emit("chosenOne", password);
  }
  socket.on('clearCanvas', function () {
    io.emit('clearCanvas', true);
  })
  socket.on('password', function (pass) {
    pass = pass.slice(0, -1); //remove new line character from string
    if (pass == password) {
      gameAlreadyStarted = false;
      let index = connectedUsers.findIndex(user => user.id == socket.client.id);
      let painterIndex = connectedUsers.findIndex(user => user.id == painter.id);
      connectedUsers[index].points += 100;
      connectedUsers[painterIndex].points += 50;
      io.emit('winner', connectedUsers[index].name, pass);
      io.emit('allUsers', connectedUsers);
      io.emit('clearCanvas', true);
      io.to(`${connectedUsers[painterIndex].id}`).emit('disablePaintBar', 'true');
      drawHistory = [];

      startNewGame(connectedUsers);
    }
  })
  socket.on('canvasDrawing', function (x, y, w, h, p, c, b, l) {
    drawHistory.push({
      x: x,
      y: y,
      w: w,
      h: h,
      p: p,
      c: c,
      b: b
    });
    socket.broadcast.emit('canvasPosition', x, y, w, h, p, c, b, l);
  })
  socket.on('canvasStopDrawing', function (x, y, w, h, p, c, b, l) {
    drawHistory.push({
      x: x,
      y: y,
      w: w,
      h: h,
      p: p,
      c: c,
      b: b,
      l: l
    });
    socket.broadcast.emit('canvasPause', true);
  })
  socket.on('disconnect', function () {
    let index = connectedUsers.findIndex(user => user.id == socket.client.id);

    connectedUsers.splice(index, 1);
    if (connectedUsers.length < 2) {
      gameAlreadyStarted = false;
      io.emit('clearCanvas', true);
    }
    io.emit('allUsers', connectedUsers);
  });
});

http.listen(PORT, function () {});