import System.IO; 

var isQuit : boolean = false;
var isDifficulty : boolean = false;
var isGame : boolean = false;
var isHard = false;
var isNormal = false;

var selected : AudioClip;
var btStart : GameObject;
var btDifficulty : GameObject;
var btQuit : GameObject;
var btHard : GameObject;
var btNormal : GameObject;
var fader : GameObject;


/*
To change resolution problems you could use:
function Running960(){
return Screen.width==960; //so it works in the editor
}
In the end, just handle which resolution you are taking to which resources resolution
you are going to user.
*/
 
 function OnMouseEnter()
{
	//change text color
 	renderer.material.color=Color.red;
 	//Play selected sound
 	audio.PlayOneShot(selected);
 }
 
 function OnMouseExit()
 {
 	//change text color<br
 	renderer.material.color=Color.white;
 }
 	
 function OnMouseUp()
 {  
 	if(isGame == true)
 		Application.LoadLevel("FirstGame");
	
 	else if(isQuit==true)
 		Application.Quit();
 	
 	else if(isDifficulty == true)		
 		adjustDifficultyScreen();
 	
 	else if(isHard == true)
 	{
 		adjustMainScreen();
 		writeOnFile("H");
 	}
 	else if(isNormal == true)
 	{
 		adjustMainScreen();
 		writeOnFile("N");
 	}
 }
 
 function Start()
 {
 	if(!isHard && !isNormal){
 		btHard.active = false;
 		btNormal.active = false;
 	}
 }
 
 function Update()
 {
 	//quit game if escape key is pressed
 	if (Input.GetKey(KeyCode.Escape)) {
    	Application.Quit();
    }
 }
 
 function adjustMainScreen()
 {	
 	btStart.active = true;
 	btDifficulty.active = true;
 	btQuit.active = true;
 	btHard.active = false;
 	btNormal.active = false;
 	
 	//change text color<br
 	renderer.material.color=Color.white;
 }
 
 function adjustDifficultyScreen()
 {
 	btStart.active = false;
 	btDifficulty.active = false;
 	btQuit.active = false;
 	btHard.active = true;
 	btNormal.active = true;
 	
 	//change text color<br
 	renderer.material.color=Color.white;
 }
      
 function writeOnFile(conf)
 {
	sw = new StreamWriter("setup.txt");
	sw.Write(conf);
	sw.Close();
}