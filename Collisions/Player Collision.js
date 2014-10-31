#pragma strict

public var playerObject : GameObject;
public var playerCamera : GameObject;
var bloodObject : GameObject;
var bloodAnim : Animator;
var playerAnim : Animator;
var attack : KeyCode;
var player : GameObject;
var cube : GameObject;
public var dead : AudioClip;

public var fader : GameObject;
private var playerColl : BoxCollider2D;
private var playerRigid : Rigidbody2D;

public var spawner : GameObject;

function OnCollisionEnter2D(collision: Collision2D) 
{ 	
	var contact = collision.contacts[0];
	var rot = Quaternion.FromToRotation(Vector3.up, contact.normal);

  	if(collision.gameObject.name == "Box")
  	{
	  	if(rot.x == 1)
	  	{	
			playerCamera.audio.Stop();
	  		audio.PlayOneShot(dead);
	  	
	  		spawner.GetComponent(BoxBehavior).isGameOver = true;
	  	
	  		bloodObject.active = true;
	  		
	  		playerAnim.SetBool("dead", true);
	  		bloodAnim.SetBool("isBlood", true);  		
	  		playerRigid.isKinematic = true;
	  		playerColl.isTrigger = true;
	  		//Destroy(collision.gameObject);
	  		//fader.GetComponent(FaderFirstGame).EndScene();
	  		//Physics2D.IgnoreCollision(player.GetComponent(BoxCollider2D), cube.GetComponent(BoxCollider2D));
  			//var boxCollider = GetComponent(BoxCollider2D) as BoxCollider2D;
			//boxCollider.size = Vector2(0.0,0.0);
			
		}
	  			
	  	if((rot.z == 0.7071068 || rot.z == -0.7071068) && Input.GetKey(attack))
	  		Debug.Log("Destroy");
	}
}

function OnCollisionStay2D(collision: Collision2D) 
{
		var contact = collision.contacts[0];
		var rot = Quaternion.FromToRotation(Vector3.up, contact.normal);
		
		if((rot.z == 0.7071068 || rot.z == -0.7071068) && Input.GetKey(attack))
		  		Debug.Log("Destroy");
}

function Start () 
{
	playerColl = player.GetComponent(BoxCollider2D);
	playerRigid = player.GetComponent(Rigidbody2D);
}

function Update () 
{

}