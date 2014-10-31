#pragma strict

public var fader : GameObject;
public var fadeSpeed : float = 1.5f;            // Speed that the screen fades to and from black.
private var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.

function Awake ()
{
    // Set the texture so that it is the the size of the screen and covers it.
    guiTexture.pixelInset = new Rect(0f, 0f, Screen.width, Screen.height);
}


function Update ()
{
    // If the scene is starting...
    if(sceneStarting)
        // ... call the StartScene function.
        StartScene();
}


function FadeToClear ()
{
    // Lerp the colour of the texture between itself and transparent.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.clear, fadeSpeed * Time.deltaTime);
}


function FadeToBlack ()
{
    // Lerp the colour of the texture between itself and black.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.black, fadeSpeed * Time.deltaTime);
}


public function StartScene ()
{	       
    // Fade the texture to clear.
    FadeToClear();
    
    // If the texture is almost clear...
    if(guiTexture.color.a <= 0.05f)
    {
        // ... set the colour to clear and disable the GUITexture.
        guiTexture.color = Color.clear;
        guiTexture.enabled = false;
        
        // The scene is no longer starting.
        sceneStarting = false;
        fader.active = false;
    }
}

public function EndScene ()
{
    // Make sure the texture is enabled.
    guiTexture.enabled = true;
    
    // Start fading towards black.
    while(guiTexture.color.a < 0.95f)
    	FadeToBlack();
    
    // If the screen is almost black...
    if(guiTexture.color.a >= 0.95f)
        // ... reload the level.
        Application.LoadLevel("GameOver");
}