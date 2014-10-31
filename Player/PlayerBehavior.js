#pragma strict

var normalSpeed : int = 0.5;
var fastSpeed : int = 1.5;
var isMoving : float;

var moveLeft : KeyCode;
var moveRight : KeyCode;
var jump : KeyCode;
var run : KeyCode;
var attack : KeyCode;

var facingRight : boolean = false;
var anim : Animator;

var lastJump : Time;
var timer = 0.0;

function Start()
{
	anim = GetComponent(Animator);
}	

function FixedUpdate () 
{
	resetAnimations();
	controller();	
}

function resetAnimations()
{
	anim.SetBool("attack", false);
	anim.SetFloat("speed", 0);
}

function controller()
{	
	timer += Time.deltaTime;

	if(Input.GetKey(attack))
		anim.SetBool("attack", true);
	else if(Input.GetKey(attack) && Input.GetKey(run))
		anim.SetBool("attack", true);
	
	if(Input.GetKey(moveLeft) && Input.GetKey (moveRight))
	{
		rigidbody2D.velocity.x = 0;	
	}		

	else if(Input.GetKey (moveLeft))
			if(Input.GetKey(run))
			{
				rigidbody2D.AddForce(Vector2.right * fastSpeed * -1);
				rigidbody2D.velocity = Vector2.ClampMagnitude(rigidbody2D.velocity, fastSpeed);

				if(!Input.GetKey(attack))
					anim.SetFloat("speed", 3.0);
			}
			else
			{
				rigidbody2D.AddForce(Vector2.right * normalSpeed * -1);
				rigidbody2D.velocity = Vector2.ClampMagnitude(rigidbody2D.velocity, normalSpeed);

				if(!Input.GetKey(attack))
					anim.SetFloat("speed", 1.0);
			}

	else if(Input.GetKey (moveRight))
			if(Input.GetKey(run))
			{
				rigidbody2D.AddForce(Vector2.right * fastSpeed);
				rigidbody2D.velocity = Vector2.ClampMagnitude(rigidbody2D.velocity, fastSpeed);

				if(!Input.GetKey(attack))
					anim.SetFloat("speed", 3.0);
			}
			else
			{	
				rigidbody2D.AddForce(Vector2.right * normalSpeed);
				rigidbody2D.velocity = Vector2.ClampMagnitude(rigidbody2D.velocity, normalSpeed);
				
				if(!Input.GetKey(attack))
					anim.SetFloat("speed", 1.0);
			}
					
	else if(Input.GetKeyDown (jump))
		{
			if(timer > 0.5)
			{
				rigidbody2D.AddForce(Vector2.up * 50.0);
				timer = 0;
			}
		}
		
	if(Input.GetKey (moveLeft) && facingRight)
		Flip();
		
	if(Input.GetKey (moveRight) && !facingRight)
		Flip();
	
	if (Input.GetKey(KeyCode.Escape)) {
    	Application.LoadLevel("MainMenu");
    }
}

function Flip () 
{
	facingRight = !facingRight;
	var  scale : Vector3 = transform.localScale;
	scale.x *= -1;
	transform.localScale = scale;
}