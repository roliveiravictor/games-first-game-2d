#pragma strict

var isGame : boolean = false;
var isQuit : boolean = false;
var isMenu : boolean = false;
var selected : AudioClip;

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
 	
 	else if(isMenu == true)
 	 	Application.LoadLevel("MainMenu");
 }

function Start () {

}

function Update () 
{
	//quit game if escape key is pressed
 	if (Input.GetKey(KeyCode.Escape))
 	   	Application.Quit();
}