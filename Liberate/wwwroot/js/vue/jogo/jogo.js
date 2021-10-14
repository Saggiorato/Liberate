var jogo = new Vue({
    el: "#jogo",
    data: {
        //Cena
        Canvas: "",
        Contexto: "",
        //Engine
        FpsTela: 60,
        FpsEngine: 60,
        FrameAtual: 0,
        FPSRealCounter: 0,
        FPSReal: 0,
        BotoesApertados: [],
        //Objestos
        Objetos: [],
        TotalRescursos: 1,
        TotalRecursosCarregados: 0,
        //teste
        MouseClickX: "",
        MouseClickY: "",
        Alvo: "",
    },
    methods: {
        //START
        Start: function () {
            var self = this;

            for (var i = 0; i < self.Objetos.length; i++) {

                if (self.Objetos[i].Inicializar) {
                    self.Objetos[i].Inicializar();
                }
            }
        },
        //UPDATE
        Update: function (event) {
            var self = this;

            if (self.BotoesApertados[ObterCharCodeDeChar("d")]) {
                self.Objetos[0].PosX += self.Objetos[0].Velocidade;
            }

            if (self.BotoesApertados[ObterCharCodeDeChar("a")]) {
                self.Objetos[0].PosX -= self.Objetos[0].Velocidade;
            }

            if (self.BotoesApertados[ObterCharCodeDeChar("w")]) {
                self.Objetos[0].PosY -= self.Objetos[0].Velocidade;
            }

            if (self.BotoesApertados[ObterCharCodeDeChar("s")]) {
                self.Objetos[0].PosY += self.Objetos[0].Velocidade;
            }
        },
        UpdateImagens: function () {
            var self = this;

            self.Canvas.width = self.Canvas.width; // clears the canvas 

            //for - cada objeto
            for (var i in self.Objetos) {

                var obj = self.Objetos[i];

                if (obj.DestXAPercorrer < 0 || obj.DestXAPercorrer > 0) {

                    //se a distancia a ser percorrida eh menor que a velocidade(o tanto que ele anda por frame)
                    //para testar eh necessario o valor da distancia a ser percorrida ser positivo
                    if ((-obj.DestXAPercorrer > 0 ? -obj.DestXAPercorrer : obj.DestXAPercorrer) < obj.Velocidade) {

                        obj.DestXAPercorrer = obj.DestXAPercorrer - obj.DestXAPercorrer;
                        obj.PosX = obj.PosX + obj.DestXAPercorrer;

                    } else {
                        obj.DestXAPercorrer = obj.DestXAPercorrer - (obj.DestXAPercorrer > 0 ? obj.Velocidade : - obj.Velocidade);
                        obj.PosX = obj.PosX + (obj.DestXAPercorrer > 0 ? obj.Velocidade : - obj.Velocidade);
                    }
                }

                if (obj.DestYAPercorrer < 0 || obj.DestYAPercorrer > 0) {

                    if ((-obj.DestYAPercorrer > 0 ? -obj.DestYAPercorrer : obj.DestYAPercorrer) < obj.Velocidade) {

                        obj.DestYAPercorrer = obj.DestYAPercorrer - (obj.DestYAPercorrer);
                        obj.PosY = obj.PosY + (obj.DestYAPercorrer);

                    } else {
                        obj.DestYAPercorrer = obj.DestYAPercorrer - (obj.DestYAPercorrer > 0 ? obj.Velocidade : - obj.Velocidade);
                        obj.PosY = obj.PosY + (obj.DestYAPercorrer > 0 ? obj.Velocidade : - obj.Velocidade);
                    }
                }

                switch (obj.Tag) {

                    case "Player":
                        self.Contexto.fillText("HP:" + obj.Hp, obj.PosX + 30, obj.PosY + 5);
                        self.Contexto.fillText("PosX:" + obj.PosX + " PosY:" + obj.PosY, obj.PosX + 30, obj.PosY -5);
                        break;
                    case "Enemy":
                        self.Contexto.fillText("HP:" + obj.Hp, obj.PosX + 20, obj.PosY + 10);
                        self.Contexto.fillText(obj.Mensagem, obj.PosX + 20, obj.PosY - 5);
                        

                        //for (var ii in self.Objetos) {
                        //    var objEnemy = self.Objetos[ii];

                        //    var diferencaX = objEnemy.PosX

                        //    if()

                        //    DistanciaPerseguir
                        //}

                        break;
                    case "Tiro":

                        //verifica se colidiu em algo
                        for (var ii in self.Objetos) {

                            var objTiro = self.Objetos[ii];

                            if (objTiro.Tag === "Enemy") {

                                var colidiu = isCollide(obj, objTiro);

                                if (colidiu) {
                                    self.Objetos.splice(i, 1);
                                    self.Objetos[ii].Hp -= obj.Dano;

                                    if (self.Objetos[ii].Hp <= 0) {
                                        self.Objetos.splice(ii, 1);
                                    }

                                    break;
                                }
                            }
                        }

                        break;
                    default:
                }

                self.Contexto.drawImage(obj.Imagem, obj.PosX, obj.PosY, obj.TamanhoX, obj.TamanhoY);
            }

            self.FrameAtual++;
            self.FPSRealCounter++;

            if (self.FrameAtual === self.FpsTela) self.FrameAtual = 0;
        },
        //ENGINE
        ProcurarAlvo: function (targetTag) {
            var self = this;

            for (var i = 0;i < self.Objetos.length; i++) {
                if (self.Objetos[i].Tag == targetTag) {
                    return self.Objetos[i];
                }
            }
        },
        //FUNCOES
        GravaEstadoBotao: function (key, apertado) {
            var self = this;

            self.BotoesApertados[key] = apertado;
        },
        //TESTE
        PersonagemTeste: function () {
            var self = this;

            //get imagens
            //for

            //PLAYER
            var imagemObjeto = new Image();

            imagemObjeto.width = 25;
            imagemObjeto.src = "images/3.png";

            self.Objetos.push({
                Id: "Player",
                Tag: "Player",
                Index: 0,
                Imagem: imagemObjeto,
                PosX: 250,
                PosY: 50,
                TamanhoX: 100,
                TamanhoY: 100,
                Velocidade: 3,
                Hp: 100,
                Inicializar: function () { }
            });

            //INIMIGO
            var imagemObjeto2 = new Image();

            imagemObjeto2.width = 25;
            imagemObjeto2.src = "images/image.gif";

            self.Objetos.push({
                Id: "Enemy1",
                Tag: "Enemy",
                Index: 1,
                Imagem: imagemObjeto2,
                PosX: 450,
                PosY: 50,
                TamanhoX: 100,
                TamanhoY: 100,
                Velocidade: 2,
                Hp: 100,
                DistanciaPerseguir: 200,
                DistanciaAtacar: 5,
                Mensagem: "",
                DestXAPercorrer: 0, //destino - posicao atual
                DestYAPercorrer: 0,
                Inicializar: function () {
                    var _this = this;

                    setInterval(function (){
                        var alvo = self.ProcurarAlvo("Player");

                        var diferencaPosicaoX = alvo.PosX - _this.PosX;
                        var diferencaPosicaoY = alvo.PosY - _this.PosY;

                        if ((diferencaPosicaoX >= _this.DistanciaPerseguir * -1 && diferencaPosicaoX <= _this.DistanciaPerseguir) && (diferencaPosicaoY >= _this.DistanciaPerseguir * -1 && diferencaPosicaoY <= _this.DistanciaPerseguir)) {

                            _this.Mensagem = "Inimigo próximo";

                            if (_this.PosX != diferencaPosicaoX) {
                                _this.DestXAPercorrer = alvo.PosX - _this.PosX;
                            }

                            if (_this.PosY != diferencaPosicaoY) {
                                _this.DestYAPercorrer = alvo.PosY - _this.PosY;
                            }

                        } else {
                            _this.Mensagem = "Inimigo longe";
                        }

                    }, 300);
                }
            });
        },
        Atirar: function (event) {
            var self = this;

            var mousePost = getMousePos(self.Canvas, event);

            self.MouseClickX = mousePost.x.toFixed(2) - 10;
            self.MouseClickY = mousePost.y.toFixed(2) - 10;

            self.MoverTiro();
        },
        MoverTiro: function () {
            var self = this;

            //imagem
            var imagemObjeto = new Image();

            //imagemObjeto.onLoad = function () {
            //    self.RecursoCarregado();
            //};

            imagemObjeto.width = 25;
            imagemObjeto.src = "images/shot.png";

            self.Objetos.push({
                Id: "Tiro",
                Tag: "Tiro",
                Index: 1,
                Imagem: imagemObjeto,
                PosX: self.Objetos[0].PosX + 15,
                PosY: self.Objetos[0].PosY + 15,
                TamanhoX: 20,
                TamanhoY: 20,
                Velocidade: 20,
                DestXAPercorrer: self.MouseClickX - self.Objetos[0].PosX,
                DestYAPercorrer: self.MouseClickY - self.Objetos[0].PosY,
                Dano: 10
            });
        }
    },
    mounted: function () {
        var self = this;

        self.Canvas = document.getElementById("myCanvas");

        self.Contexto = self.Canvas.getContext("2d");

        self.PersonagemTeste();

        window.addEventListener("keydown", function (e) {
            self.GravaEstadoBotao(e.keyCode, true);
        });

        window.addEventListener("keyup", function (e) {
            self.GravaEstadoBotao(e.keyCode, false);
        });

        setInterval(self.Update, 1000 / self.FpsEngine);
        setInterval(self.UpdateImagens, 1000 / self.FpsTela);
        setInterval(function () {
            self.FPSReal = self.FPSRealCounter; 
            self.FPSRealCounter = 0;
        }, 1000);
        self.Start();
    },
    created: function () {


    }
});

//The fillRect(x,y,width,height) method draws a rectangle, filled with the fill style, on the canvas