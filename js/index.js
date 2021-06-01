document.write(
  "<script type='text/javascript' src='js/info.js'><" + "/script>"
);

window.onload = function () {
  video.onended = function () {
    var video = document.getElementById("video");
    video.volume = 0.3;
    var canvas = document.getElementById("myCanvas");
    video.style.display = "none";
    canvas.style.display = "block";
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 15;
    var dy = -15;
    var ballRadius = 10;
    var paddleHeight = 10;
    var paddleWidth = 550;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 6;
    var brickColumnCount = 7;
    var brickWidth = 90;
    var brickHeight = 40;
    var brickPadding = 1;
    var brickOffsetTop = 40;
    var brickOffsetLeft = 42;
    var score = 0;
    var lives = 15;
    var level = 1;

    var randomCol = Math.floor(Math.random() * 4) + 1; //특수블럭 나오는 랜덤위치 rowIndex1~5, colIndex1~3
    var randomRow = Math.floor(Math.random() * 3) + 1;
    var randomCol2 = Math.floor(Math.random() * 4) + 1;
    var randomRow2 = Math.floor(Math.random() * 3) + 1;
    var randomCol3 = Math.floor(Math.random() * 4) + 1;
    var randomRow3 = Math.floor(Math.random() * 3) + 1;
    var m = 0.05; //이거는 뭘까
    var n = 0.01;
    var goDown = true;

    var level1 = true; //기본스테이지 게임레벨
    var level2 = false;
    var level3 = false;

    var brickRowCount2 = 6;
    var brickColumnCount2 = 7;
    var brickWidth2 = 90;
    var brickHeight2 = 40;
    var brickPadding2 = 1;
    var brickOffsetTop2 = 40;
    var brickOffsetLeft2 = 42;
    var invisibleBricks = 0;

    var brickRowCount3 = 6;
    var brickColumnCount3 = 7;
    var brickWidth3 = 90;
    var brickHeight3 = 40;
    var brickPadding3 = 1;
    var brickOffsetTop3 = 40;
    var brickOffsetLeft3 = 42;
    var invisibleBall = 0;

    var rightPressed = false;
    var leftPressed = false;

    var img = new Image();
    img_array = [
      "static/choijun1.jpg",
      "static/choijun2.jpg",
      "static/choijun3.jpg",
    ];
    img.src = img_array[sessionStorage.getItem("2")]; //환경설정에서 선택한 최준 사진 설정

    var ball_img = new Image();
    ball_img.src =
      "https://cdn.pixabay.com/photo/2016/03/31/18/31/bean-1294427_960_720.png";

    var special_brick = new Image();
    special_brick.src =
      "https://i.pinimg.com/474x/5d/fd/75/5dfd7562734a524ebcb68e2fc4b7edcc.jpg";

    var sound_effect = new Audio(
      "static/" + sessionStorage.getItem("1") + ".mp3"
    ); //환경설정에서 선택한 효과음 객체 생성 및 불러오기
    var background_sound = new Audio(
      "static/" + sessionStorage.getItem("0") + ".mp3"
    ); //환경설정에서 선택한 배경음악 객체 생성 및 불러오기
    background_sound.loop = true;

    // 2차원 배열 table 선언 - 열(c) 행(R) 블럭의 행,열에 대한 이차원 배열 삽입 (벽돌만들기)
    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    var bricks2 = [];
    for (var c = 0; c < brickColumnCount2; c++) {
      bricks2[c] = [];
      for (var r = 0; r < brickRowCount2; r++) {
        bricks2[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    var bricks3 = [];
    for (var c = 0; c < brickColumnCount3; c++) {
      bricks3[c] = [];
      for (var r = 0; r < brickRowCount3; r++) {
        bricks3[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    function drawBricks() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          //status가 1이면 블럭을 그리고 0이면 그리지 않는다.
          if (bricks[c][r].status === 1) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;

            //블록색
            if (c == randomCol && r == randomRow) {
              // ctx.fillStyle = "black";
              ctx.drawImage(
                special_brick,
                brickX,
                brickY,
                brickWidth,
                brickHeight
              );
            } else {
              ctx.fillStyle = "#f6799b";
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fill();
              ctx.closePath();
            }
          }
        }
      }
    }

    function drawBricks2() {
      for (var c = 0; c < brickColumnCount2; c++) {
        for (var r = 0; r < brickRowCount2; r++) {
          //status가 1이면 블럭을 그리고 0이면 그리지 않는다.
          if (bricks2[c][r].status === 1) {
            var brickX = c * (brickWidth2 + brickPadding2) + brickOffsetLeft2;
            var brickY = r * (brickHeight2 + brickPadding2) + brickOffsetTop2;

            //좌우 이동
            brickX += m;
            m += 0.1;
            if (m >= canvas.width - brickOffsetLeft) {
              m = -1 * (canvas.width - brickOffsetLeft);
            }

            //상하 이동
            brickY += n;
            if (n >= 120) {
              goDown = !goDown;
            } else if (n <= 0) {
              goDown = !goDown;
            }

            if (goDown) {
              n += 0.01;
            } else {
              n -= 0.01;
            }

            bricks2[c][r].x = brickX;
            bricks2[c][r].y = brickY;
            ctx.beginPath();
            /*ctx.rect(brickX, brickY, brickWidth2, brickHeight2);*/
            //블록색
            if (c == randomCol2 && r == randomRow2) {
              ctx.drawImage(
                special_brick,
                brickX + 20,
                brickY + 10,
                brickWidth2 / 2,
                brickHeight2 / 2
              );
            } else {
              ctx.rect(brickX, brickY, brickWidth2, brickHeight2);
              ctx.fillStyle = "#f6799b";
            }

            invisibleBricks++;

            if (invisibleBricks >= 500 && invisibleBricks < 2500) {
              ctx.fillStyle = "rgba(0,0,0,0)";
            }

            if (invisibleBricks == 4000) {
              invisibleBricks = 0;
            }

            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawBricks3() {
      for (var c = 0; c < brickColumnCount3; c++) {
        for (var r = 0; r < brickRowCount3; r++) {
          //status가 1이면 블럭을 그리고 0이면 그리지 않는다.
          if (bricks3[c][r].status === 1) {
            var brickX = c * (brickWidth3 + brickPadding3) + brickOffsetLeft3;
            var brickY = r * (brickHeight3 + brickPadding3) + brickOffsetTop3;
            bricks3[c][r].x = brickX;
            bricks3[c][r].y = brickY;
            ctx.beginPath();
            /*ctx.rect(brickX, brickY, brickWidth3, brickHeight3);*/
            //블록색
            if (c == randomCol3 && r == randomRow3) {
              ctx.drawImage(
                special_brick,
                brickX + 20,
                brickY + 10,
                brickWidth3 / 2,
                brickHeight3 / 2
              );
            } else {
              ctx.rect(brickX, brickY, brickWidth3, brickHeight3);
              ctx.fillStyle = "#f6799b";
            }
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    //x축위 시작 위치
    var paddleX = (canvas.width - paddleWidth) / 2;

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
      ctx.closePath();
      // ctx.drawImage(bean_image, x, y, 10, 10);
      ctx.fillStyle = "#59411b";
      ctx.fill();
      ctx.drawImage(
        ball_img,
        x - ballRadius,
        y - ballRadius,
        ballRadius * 2,
        ballRadius * 2
      );
    }

    function drawBall3() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

      dx = dx * 1.01;
      dy = dy * 1.01;
      if (dx >= 16) {
        // 시작 dx, dy의 값에 2배정도로 맞춰줘야 함
        dx = dx / 2;
        dy = dy / 2;
      }

      invisibleBall++;

      ctx.fillStyle = `rgb(103,71,54)`;
      if (invisibleBall >= 200 && invisibleBall < 250) {
        ctx.fillStyle = "rgba(0,0,0,0)";
      }
      if (invisibleBall == 250) {
        invisibleBall = 0;
      }
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      // padddle color
      ctx.fillStyle = "purple";
      ctx.fill();
      ctx.closePath();
    }

    function draw() {
      //위치 바뀌기 전 공 삭제

      if (level1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_img();
        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();
        drawLives();
        drawStage();

        var check = collisionDetection();
        if (check == 0) {
          return 0;
        }
      } else if (level2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_img2();
        drawBall();
        drawPaddle();
        drawBricks2();
        drawScore();
        drawLives();
        drawStage();
        var check = collisionDetection2();
        if (check == 0) {
          return 0;
        }
      } else if (level3) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_img();
        drawBall3();
        drawPaddle();
        drawBricks3();
        drawScore();
        drawLives();
        drawStage();
        var check = collisionDetection3();
        if (check == 0) {
          return 0;
        }
      }

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      if (y + dy < ballRadius) {
        //좌우충돌
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        //상하충돌
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            // alert("GAME OVER");
            failAlert();
            video.style.display = "block";
            canvas.style.display = "none";
            dx = 0;
            dy = 0;
            location.href = "info.html";
            return 0;
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 15;
            dy = -15;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        //leftPressed 가 투르고 뒤가 0보다 크면
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }

    Alert();
    setTimeout(init, 2500);

    function init() {
      background_sound.volume = 0.3;
      background_sound.play();
      draw();
    }

    var item = [1, 2, 3];
    function collisionDetection() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if (b.status === 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              if (c == randomCol && r == randomRow) {
                var randomEvent = Math.floor(Math.random() * item.length);
                if (randomEvent == item[0]) {
                  //배경음악 사라지기
                  // alert("배경음악 사라지기");
                  background_sound.pause();
                  effectAlert1();
                } else if (randomEvent == item[1]) {
                  // alert("공 속도 변경");
                  dx = (dx / 3) * 2;
                  dy = (dy / 3) * 2;
                  effectAlert2();
                } else {
                  //히든 스테이지
                  location.href = "./hiddenstage.html";
                  return 0;
                }
                item.pop(randomEvent);
              }
              b.status = 0;
              sound_effect.volume = 1;
              sound_effect.play();
              dy = -dy;
              //벽돌에 맞으면 status를 0으로 바꾼다.
              score++;
              if (score === brickRowCount * brickColumnCount) {
                clearAlert1();
                // alert("Level1 Clear");
                x = canvas.width / 2;
                y = canvas.height - 30;
                level1 = false;
                level2 = true;
                level = 2;
              }
            }
          }
        }
      }
    }

    function collisionDetection2() {
      for (var c = 0; c < brickColumnCount2; c++) {
        for (var r = 0; r < brickRowCount2; r++) {
          var b = bricks2[c][r];
          if (b.status === 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth2 &&
              y > b.y &&
              y < b.y + brickHeight2
            ) {
              if (c == randomCol2 && r == randomRow2) {
                var randomEvent = Math.floor(Math.random() * item.length);
                if (randomEvent == item[0]) {
                  // alert("배경음악 사라지기");
                  background_sound.pause();
                  effectAlert1();
                  //배경음악 사라지기
                } else if (randomEvent == item[1]) {
                  // alert("공 속도 변경");
                  dx = (dx / 3) * 2;
                  dy = (dy / 3) * 2;
                  effectAlert2();
                } else {
                  location.href = "./hiddenstage.html";
                  return 0;
                  //히든 스테이지로
                }
              }
              b.status = 0;
              sound_effect.volume = 1;
              sound_effect.play();
              dy = -dy;
              //벽돌에 맞으면 status를 0으로 바꾼다.
              score++;
              if (
                score ===
                brickRowCount * brickColumnCount +
                brickRowCount2 * brickColumnCount2
              ) {
                clearAlert2();
                // alert("Level2 Clear");
                x = canvas.width / 2;
                y = canvas.height - 30;
                level2 = false;
                level3 = true;
                level = 3;
              }
            }
          }
        }
      }
    }

    function collisionDetection3() {
      for (var c = 0; c < brickColumnCount3; c++) {
        for (var r = 0; r < brickRowCount3; r++) {
          var b = bricks3[c][r];
          if (b.status === 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth3 &&
              y > b.y &&
              y < b.y + brickHeight3
            ) {
              if (c == randomCol3 && r == randomRow3) {
                var randomEvent = Math.floor(Math.random() * item.length);
                if (randomEvent == item[0]) {
                  //alert("배경음악 사라지기");
                  background_sound.pause();
                  effectAlert1();
                  //배경음악 사라지기
                } else if (randomEvent == item[1]) {
                  dx = (dx / 3) * 2;
                  dy = (dy / 3) * 2;
                  effectAlert2();
                } else {
                  location.href = "./hiddenstage.html";
                  return 0;
                  //히든 스테이지로
                }
              }
              dy = -dy;
              //벽돌에 맞으면 status를 0으로 바꾼다.
              b.status = 0;
              sound_effect.volume = 1;
              sound_effect.play();
              score++;
              if (
                score ===
                brickRowCount * brickColumnCount +
                brickRowCount2 * brickColumnCount2 +
                brickRowCount3 * brickColumnCount3
              ) {
                clearAlert3();
                //alert("Level3 Clear");
                x = canvas.width / 2;
                y = canvas.height - 30;
                setTimeout(play_video, 5000);
                return;
              }
            }
          }
        }
      }
    }

    //DRAW TOP
    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "green";
      ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function drawStage() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("Level: " + level, canvas.width / 2 - 35, 20);
    }

    function draw_img() {
      ctx.drawImage(img, canvas.width / 2 - 100, brickOffsetTop, 245, 245);
    }

    function draw_img2() {
      var imgX = canvas.width / 2 - 100;
      var imgY = brickOffsetTop;
      imgX += m;
      m += 0.1;
      imgY += n;

      if (n >= 120) {
        goDown = !goDown;
      } else if (n <= 0) {
        goDown = !goDown;
      }

      if (goDown) {
        n += 0.01;
      } else {
        n -= 0.01;
      }
      if (m >= canvas.width - brickOffsetLeft) {
        m = -1 * (canvas.width - brickOffsetLeft);
      }

      if (invisibleBricks < 500 || invisibleBricks >= 2500) {
        ctx.drawImage(img, imgX, imgY, 245, 245);
      }
    }

    //MOUSEMOVE EVENT
    document.addEventListener("mousemove", mouseMoveHandler, false);
    //키보드
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }

    function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
      }
    }

    function play_video() {
      video.setAttribute("src", "static/ending.mp4");
      video.play();
      video.onended = go_info;
    }

    function go_info() {
      location.href = "info.html";
    }

    function Alert() {
      let timerInterval;
      Swal.fire({
        title: "기본 스테이지 입장!",
        html: "<b></b> 뒤에 시작",
        timer: 2500,
        timerProgressBar: true,
        backdrop: `
                  rgba(0,0,0,1)
                  url("https://media1.tenor.com/images/bc92a54fd52558c950378140d66059e3/tenor.gif")
                  center
                  no-repeat
                `,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                b.textContent = Swal.getTimerLeft();
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }

    function clearAlert1() {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "레벨1 클리어!",
        showConfirmButton: false,
        timer: 800,
      });
    }
    function clearAlert2() {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "레벨2 클리어!",
        showConfirmButton: false,
        timer: 800,
      });
    }

    function clearAlert3() {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "레벨3 클리어!",
        showConfirmButton: false,
        timer: 800,
      });
    }

    function effectAlert1() {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "배경음악이 사라집니다.",
        showConfirmButton: false,
        timer: 800,
      });
    }
    function effectAlert2() {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "공의 속도가 느려집니다.",
        showConfirmButton: false,
        timer: 800,
      });
    }
    function failAlert() {
      Swal.fire({
        title: "게임 오버!",
        width: 250,
        timer: 5000,
        backdrop: `
            rgba(0,0,0,1)
            url("https://thumbs.gfycat.com/ConfusedRedBorer-size_restricted.gif")
            center
            no-repeat
          `,
        showConfirmButton: false,
      });
    }
  };
};
