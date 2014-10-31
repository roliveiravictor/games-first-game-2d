#pragma strict

var mainCamera : GameObject;
var stopPosition : float = 1.4;
var revert : boolean = true;

function Update () {
		
	if(mainCamera.transform.position.x >= stopPosition*-1 && revert)
		mainCamera.transform.position.x += -1*0.001; 
	else if(mainCamera.transform.position.x <= stopPosition){
			mainCamera.transform.position.x += 0.001; 
			revert = false;
			}
			else
			revert=true;
}