import System.IO;

var mainCamera : GameObject;
var playerTransform : Transform;
var difficultyInform : TextMesh;
var timerInform : TextMesh;

var stopPosition : float = 1.25;
var lastCameraPos;

public var timer : float;
var timerFormatted : String;
var t : System.TimeSpan;
private var changeScene : float;

public var spawner : GameObject;

function Update () 
{	
	/*
	* Check for game over
	*/
	if(spawner.GetComponent(BoxBehavior).isGameOver)
	{
		changeScene += Time.deltaTime;
		
		/*
		Time to wait until change to game over SceneView
		*/
		if(changeScene > 4)
			Application.LoadLevel("GameOver");
	}
	else
	{
		lastCameraPos = Camera.mainCamera.transform.position.x;
		
		/*
		* Time Count and Format
		*/
		timer += Time.deltaTime;
		t = System.TimeSpan.FromSeconds(timer);
	 	timerFormatted = String.Format("{0:D1}:{1:D2}:{2:D2}", t.Hours, t.Minutes, t.Seconds);
	 	timerInform.text = timerFormatted;
					
		if(playerTransform.transform.position.x < stopPosition && playerTransform.transform.position.x > stopPosition*-1)
			mainCamera.transform.position.x = playerTransform.transform.position.x;
			
		/*
		* Elements position on Screen - Check if camera is moving to move informations with it
		*/
		if(Camera.mainCamera.transform.position.x != lastCameraPos)
		{
			timerInform.transform.position.x = playerTransform.transform.position.x - 2.5;
			difficultyInform.transform.position.x = playerTransform.transform.position.x + 2.0;
		}
	}
}

function Start ()
{
	timerInform.transform.position.x = Camera.mainCamera.transform.position.x - 2.5;
	difficultyInform.transform.position.x = Camera.mainCamera.transform.position.x + 2.0;

	if(readFile().Equals("N"))
		difficultyInform.text = "Normal Mode";
	else
		difficultyInform.text = "Hard Mode";
}

/*
* Aprimorar a leitura de informaçao para variaveis globais
*/

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