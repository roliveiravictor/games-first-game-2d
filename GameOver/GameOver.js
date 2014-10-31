#pragma strict

public var spotlight : GameObject;
private var timer : float;

function Start ()
{

}

function Update () 
{	
	timer += Time.deltaTime;
	
	if(timer > 6)
	{
		Application.LoadLevel("Rank");
	}
	else
	{
		spotlight.transform.position.x += 1.3 * Time.deltaTime;
	}
}