//sprites
var trex,chao,subChao,nuvem,cacto,escolherCacto,tempoJogo;

//imagens e animações
var trexCorrendo,imagemChao,imagemNuvem;

//imagens dos cactos
var imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,   imagemCacto5,imagemCacto6;

var trexColidiu,fimDeJogo,imagemReiniciar;

//variaveis do som
var somPulo,somMorrendo,somCheckPoint

const jogar = 1;
const encerrar = 0;
var estadoJogo = jogar;

//função para carregar imagens e animações
function preload(){
  
  trexCorrendo = loadAnimation("trex1.png",'trex2.png','trex3.png')
  
  trexColidiu = loadAnimation('trex_collided.png')
  
  imagemChao = loadImage('ground2.png')
  
  imagemNuvem = loadImage('cloud.png')
  
  imagemCacto1 = loadImage('obstacle1.png')
  imagemCacto2 = loadImage('obstacle2.png')
  imagemCacto3 = loadImage('obstacle3.png')
  imagemCacto4 = loadImage('obstacle4.png')
  imagemCacto5 = loadImage('obstacle5.png')
  imagemCacto6 = loadImage('obstacle6.png')
  
  imagemFim = loadImage('gameOver.png')
  imagemReiniciar = loadImage('restart.png')
  
  somPulo = loadSound('jump.mp3')
  somMorrendo = loadSound('die.mp3')
  somCheckPoint = loadSound('checkPoint.mp3')
  
}

function setup() {
createCanvas(600,200)
  //criando sprite do trex- colocando a animação
  trex = createSprite (50,100,20,40)
  trex.addAnimation("correndo",trexCorrendo)
 trex.addAnimation('colidiu',trexColidiu)
  trex.scale = 0.5
  
  //criando o sprite do chao e colocando a imagem
  chao = createSprite(200,180,500,10)
  chao.addAnimation('chao',imagemChao)
  
  //criando o subchao e deixando ele invisivel
  subChao = createSprite(200,190,500,10)
  subChao.visible = false
  
  fimDeJogo = createSprite(300,80,30,30)
  fimDeJogo.addAnimation('fimdejogo',imagemFim)
  fimDeJogo.scale = 0.5
  
  reiniciar = createSprite(300,120,30,30)
  reiniciar.addAnimation("reiniciar",imagemReiniciar)
   reiniciar.scale = 0.5
  
  tempoJogo = 0;
  
 trex.setCollider('circle',0,0,40)
  trex.debug = false
  
  grupoDeCactos = new Group();
  grupoDeNuvens = new Group();
  
}
function draw() {
  background(180)
  //mostra o tempo na tela
  text('tempo: '+ tempoJogo,500,30)
  
   if(estadoJogo == jogar){
     
     tempoJogo = tempoJogo+1;
     
   if(tempoJogo > 0 && tempoJogo % 100 == 0){
     somCheckPoint.play()
   }

     fimDeJogo.visible = false
   reiniciar.visible = false
     
     //velocidade do chão
     tempoJogo = tempoJogo + 1
     chao.velocityX = -7
     
   if(chao.x < 0){
      chao.x = chao.width / 2
   }
     
   if(keyDown('space') && trex.y > 161){
      trex.velocityY = - 12 
      somPulo.play()
   }
     
     gerarNuvens()
     gerarCactos()
     
     
     if(grupoDeCactos.isTouching(trex)){
        somMorrendo.play()
     estadoJogo = encerrar;
   }
   
     chao.VelocityX = -(3 + tempoJogo / 100)
     
   }else if (estadoJogo == encerrar){
     chao.velocityX = 0
     
  
     
     grupoDeNuvens.setVelocityXEach(0);
     grupoDeCactos.setVelocityXEach(0);
     
     grupoDeNuvens.setLifetimeEach(-1);
     grupoDeCactos.setLifetimeEach(-1);
     
     trex.VelocityY = 0;
     
     fimDeJogo.visible = true
     reiniciar.visible = true
     
     trex.changeAnimation('colidiu',trexColidiu)
     
     if(mousePressedOver(reiniciar)){
       restart()
     }
   }
  
 trex.velocityY = trex.velocityY + 1
 
 trex.collide(subChao)
  
 drawSprites()
  

  
  
}

function restart(){
  tempoJogo = jogar
   tempoJogo = 0
  fimDeJogo.visible = false;
  reiniciar.visible = false;
 
}


function gerarNuvens(){
  if(frameCount % 60 == 0){
  nuvem = createSprite(600,100,50,10)
  nuvem.velocityX = -3
    
  nuvem.addAnimation('nuvem passando', imagemNuvem) 
  nuvem.y = Math.round(random(60,100))
    
  //igualando a profundidade os sprites
  nuvem .depth = trex.depth
    
  //colocando o trex na frente da nuvem
  trex.depth = trex.depth + 1
    
  //diminui o tamanho da nuvem
  nuvem.scale = 0.4
    
  //destroi a nuvem
  nuvem.lifetime = 300
    
  grupoDeNuvens.add(nuvem);
    
}
}
function gerarCactos(){
  if(frameCount % 60 == 0 ){
  cacto = createSprite(600,165,10,40)
    cacto.velocityX = -(3 + tempoJogo / 100)
    cacto.velocityX = -7
    
    escolherCacto = Math.round(random(1,6))
    //gerar cactos aleatórios
    switch(escolherCacto){
  case 1 : cacto.addImage(imagemCacto1)
      break;
  case 2 : cacto.addImage(imagemCacto2)
      break;
  case 3 : cacto.addImage(imagemCacto3)
      break;
  case 4 : cacto.addImage(imagemCacto4)
      break;
  case 5 : cacto.addImage(imagemCacto5)
      break;
  case 6 : cacto.addImage(imagemCacto6)
      break;
          
}
  //diminui o tamanho do cacto
  cacto.scale = 0.4 
    
  //destroi o cacto
  cacto.lifetime = 300;
    
  grupoDeCactos.add(cacto);
    
}
}
function restart (){
  estadoJogo = jogar
  fimDeJogo.visible = false
  reiniciar.visible = false
  
  grupoDeCactos.destroyEach()
  grupoDeNuvens.destroyEach()
  trex.changeAnimation('correndo',trexCorrendo)
}