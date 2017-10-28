console.log('Loaded!');
var IntervalTime=20;//You can change its value to make the game easier or tougher...Increse to make it easier and decrease to make it tougher...
var LastTime=12;//You can change its value to make the game easier or tougher...Increse to make it easier and decrease to make it tougher...

var MovingUpSpeed=9;
var Score=0;
var Interval=setInterval(MoveCircles,20);
var CurrentCircleNumber=2;



var TotalLife=4;


var deg=0;
var Time=1;


var MoveLA=false;


var LifeRight=350;

var GameStarted=false;

var CountDownStarted=false;


var index=2;

var CheckCountDown=setInterval(CountDownUpdate,1000);
window.onload=function()
{
    RandomPosition();

}
function RandomPosition()
{
    if(Score>=200)
        {
            document.getElementsByClassName("Circles")[2].style.display="block";
            CurrentCircleNumber=3;
        }
    else
        {
             document.getElementsByClassName("Circles")[2].style.display="none";
        }

    if(Score>=700)
        {
            document.getElementById("LastCircle").style.display="block";
            CurrentCircleNumber=4;
        }
    else
        {
            document.getElementById("LastCircle").style.display="none";
        }
    var Circles=document.getElementsByClassName("Circles");
    var CY;
    var CX;
    var CurrentCircle;
   
    var Radius=parseInt(Circles[0].getAttribute("r"));
    var PCCX;//Stands for Previous Current Circle X
    for(var i=0;i<Circles.length;i++)
        {
            CurrentCircle=Circles[i];
            CY=RangedRandomNumberGenerator(600,700);
            CurrentCircle.setAttribute("cy",CY);
            PCCX=parseInt(CurrentCircle.getAttribute("cx"));
            
           



            if(i==0)
                {
                    CX=RangedRandomNumberGenerator(25,275);
                    CurrentCircle.setAttribute("cx",CX);
                }
            else 
                {
                    
                    CX=RangedRandomNumberGenerator(25,275);
                    CurrentCircle.setAttribute("cx",CX);
                    Colliding(i);

                            

                }
           
        }
}






function AddScore(e)
{
    Score+=10;
    document.getElementById("Score").innerHTML="Score : "+Score;
    document.getElementsByClassName("Circles")[e].setAttribute("style","fill:#fff");

    document.getElementsByClassName("Circles")[e].setAttribute("clicked",true)
    if(Score%100==0)
        {
            if(TotalLife<=1)
                {
                    MoveLA=true;
                    document.getElementById("AddLife").setAttribute("y",RangedRandomNumberGenerator(90,300));
                }
            if(IntervalTime>LastTime)
                IntervalTime--;
            clearInterval(Interval);
            Interval=setInterval(MoveCircles,IntervalTime);
        }
 
}






function ResetCirlcles()
{
    var Circles=document.getElementsByClassName("Circles");
    for(var i=0;i<Circles.length;i++)
        {
            Circles[i].style.fill="#A5D8C0";
            Circles[i].setAttribute("clicked",false);
        }
}

function Colliding(CurrentCircle)
{
    var Circles=document.getElementsByClassName("Circles");
    var CX=parseInt(Circles[CurrentCircle].getAttribute("cx"));
    var CY=parseFloat(Circles[CurrentCircle].getAttribute("cy"));
    var Radius=20;
    var OtherCX,OtherCY;
    for(var i=0;i<Circles.length;i++)
        {
            if(i==CurrentCircle)
                continue;

            OtherCX=parseInt(Circles[i].getAttribute("cx"));
            OtherCY=parseFloat(Circles[i].getAttribute("cy"));
            if(((CX-Radius)< (OtherCX-Radius) + (Radius) &&
               ((CX-Radius))+(Radius) >OtherCX-Radius  &&
               (CY-Radius) <OtherCY + (Radius) &&
                ((CY-Radius))+(Radius) >OtherCY-Radius))
                  {
                     // console.log("true");
                 
                     RandomPosition();
                      return true;
                  }
                  

        }

   // console.log("false");
    return false;


}


function RangedRandomNumberGenerator(Min,Max)//This function generates random number within a specified range;
{
    return Math.floor(Math.random()*(Max-Min+1))+Min;
}





function MoveCircles()
{
    if(!GameStarted)
        return;
    var Circles=document.getElementsByClassName("Circles");
    var CY;

    var CurrentCircle;
    
    for(var i=0;i<Circles.length;i++)
        {
            CurrentCircle=Circles[i];
            CY=parseInt(CurrentCircle.getAttribute("cy"));
            CY-=MovingUpSpeed;
            CurrentCircle.setAttribute("cy",CY);
            

        }
    MovingUpSpeed-=0.1;
   if(MovingUpSpeed<-9)
    {
        CheckLives();
        MovingUpSpeed=9;
        RandomPosition();
        ResetCirlcles();
    }

}


function CheckLives()
{
    var Circles=document.getElementsByClassName("Circles");
    var Lives=document.getElementsByClassName("Lives");
    for(var i=0;i<CurrentCircleNumber;i++)
        {
            if(TotalLife<=0)
                continue;
            if(Circles[i].getAttribute("clicked")=="false")
                {
                    Lives[TotalLife-1].style.display="none";
                    TotalLife--;
                    break;

                }


            
        }

    if(TotalLife<=0)
        {
            alert("Game over!!\nScore : "+Score+"\nNew game will start as you continue...Better luck next time!");
            Reset();
        }

}




function Play()
{
    document.getElementById("StartNowText").style.opacity="0";
    document.getElementById("Start").style.opacity="0";
    document.getElementById("Instructions").style.opacity="1";
}










function Continue()
{
    document.getElementById("PlaygroundParent").style.opacity="1";
    document.getElementById("Score").style.display="block";
    document.getElementById("PlaygroundParent").style.display="block";
    document.getElementById("MainMenu").style.display="none";
    CountDownStarted=true;
  
}



function CountDownUpdate()
{
    if(!CountDownStarted)
        return;
    document.getElementById("CountDown").innerHTML=index;
   
    if(index==0)
        {
             document.getElementById("CountDownParent").style.display="none";
            clearInterval(CheckCountDown);
            GameStarted=true;
           
        }
     index--;
    
}






function Load()
{
    if(deg==0)
        {
            Time++;
            if(Time>35)
                {
                    Time=0;
                }
            else
                {
                    return;
                }
            
        }
    var LoadingBar=document.getElementById("Load");
    LoadingBar.style.transform="rotate("+deg+"deg)";
    LoadingBar.style.webkitTransform="rotate("+deg+"deg)";
   // LoadingBar.style.mozTransform="rotate("+deg+"deg)";
    deg+=2;
    if(deg>=360)
        {
            deg=0;
            
        }
    if(deg==100)
        {
            LoadingBar.style.borderBottomColor="#74678A";
           
        }
    if(deg==50)
        {
            
            LoadingBar.style.borderRightColor="#74678A";
        }
    if(deg==200)
        {
            
        }
    if(deg==320)
        {
            LoadingBar.style.borderBottomColor="#fff";

           /// LoadingBar.style.borderRightColor="#1D1D1D";
        }
    if(deg==330)
        {
         //   LoadingBar.style.borderBottomColor="#1D1D1D";

            LoadingBar.style.borderRightColor="#fff";
        }
 

}








function MoveLifeAdder()
{
    if(!MoveLA)
        return;



    var life=document.getElementById("AddLife");
    LifeRight--;
    life.setAttribute("x",LifeRight);
    if(LifeRight<=-40)
        {
            LifeRight=350;
            MoveLA=false;
            document.getElementById("AddLife").style.fill="#146290";
          
        }
    
}



















function HideLoadingBar()
{
    document.getElementById("L_Parent").style.display="none";
    
    document.getElementById("MainMenu").style.opacity=1;
}











function AddLife()
{

    TotalLife=2;
    document.getElementById("AddLife").setAttribute("style","fill: #fff");

    
    for(var i=0;i<TotalLife;i++)
        {
            document.getElementsByClassName("Lives")[i].style.display="inline-block";
        }
}




setInterval(Load,4);
setInterval(MoveLifeAdder,10);











function Reset()
{
    MovingUpSpeed=9;
    Score=0;
    clearInterval(Interval);
    Interval=setInterval(MoveCircles,20);
    IntervalTime=20;
    LastTime=12;
    CurrentCircleNumber=2;
    TotalLife=4;
    deg=0;
    Time=1;
    MoveLA=false;
    LifeRight=350;
    document.getElementById("Score").innerHTML="Score : "+Score;
    document.getElementById("AddLife").setAttribute("x",350);
    for(var i=0;i<TotalLife;i++)
        {
            document.getElementsByClassName("Lives")[i].style.display="inline-block";
        }
}