#pragma strict

function OnCollisionEnter2D(coll: Collision2D) 
{       
  if(coll.gameObject.name == "Background Image" || coll.gameObject.name == "Box")
   	 gameObject.rigidbody2D.isKinematic = true;
  	 
  if(coll.gameObject.name == "Ceiling") 
  	 Application.LoadLevel("GameOver");
   	 
}

function Start () {

}

function Update () {

}