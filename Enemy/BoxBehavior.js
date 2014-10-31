import System.IO; 

public var playerCamera : GameObject;
var cube : GameObject;
var spawnPosition : Vector3;
var timer = 0.0;
var ceillingPosition : Transform;
var leftWall : Transform;
var rightWall : Transform;
var difficulty : String;
private var lastSpawnPosition : float = 0.0;
private var fallFrequency : float = 1.0;

public var isGameOver : boolean;

var HARD : int = 2;
var NORMAL : int = 4;

function spawn_cube()
{
	spawnPosition.x = Random.Range(leftWall.position.x+0.15,rightWall.position.x-0.1)*3.5;
	spawnPosition.x = (Mathf.Ceil(spawnPosition.x) + Mathf.Ceil(spawnPosition.x) -1)/7.5;
			
	spawnPosition.y = ceillingPosition.position.y-0.2;
	
	if(spawnPosition.x > leftWall.position.x || spawnPosition.x < rightWall.position.x)
		spawn_cube();
	else
	{
		var cubeSpawnTimer = Instantiate(cube, spawnPosition, Quaternion.identity);
		cubeSpawnTimer.name = "Box";
	}

	/*
	Test Code with static box position
	
	spawnPosition.y = ceillingPosition.position.y-0.2;
	spawnPosition.x = 4.547007;
		var cubeSpawnTimer = Instantiate(cube, spawnPosition, Quaternion.identity);
		cubeSpawnTimer.name = "Box";*/
}

function Start () 
{
	difficulty = readFile();
}

function FixedUpdate ()
 {
	if(!isGameOver) 
	{
		timer += Time.deltaTime * fallFrequency;
		
		if(difficulty.Equals("H"))
			if(timer > HARD)
			{
				spawn_cube();								
				timer = 0.0;
			 }
			 
		if((difficulty.Equals("N")))
			if(timer > NORMAL)
			{
				spawn_cube();			
				timer = 0.0;
			}
		
		var inGameTimer = playerCamera.GetComponent(PlayerCamera).timer;
	
		/*
		each 30 seconds fall speed increment and make sure this will happen once with timer == 0
		otherwise this will happen around 25 times because of the fast update speed.
		*/
		if((Mathf.Round(inGameTimer) % 15 == 0) && (timer == 0.0) && fallFrequency < 2.5)
			fallFrequency += 0.2;
	}
}

function readFile()
 {
	sr = new StreamReader("setup.txt");
	line = sr.ReadLine();
	sr.Close();
	return line;
	/*
	*Considerando que so ha uma informaçao no arquivo setup - a implementacao se deu dessa maneira
	*/
 }