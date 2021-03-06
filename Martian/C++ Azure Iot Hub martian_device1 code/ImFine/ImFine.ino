#include <stdlib.h>
#include <WiFi101.h> 
#include "DHT.h"


////////////////////////Martian IoT hub code//////////////////////


 -------------------------------------------------------------------
 ImFine I/O pin definitions
#define buzzer 3
#define buttonLED 4
#define pinButton 5
#define onboardLED 6

 -------------------------------------------------------------------

#define DHTPIN 7      
#define DHTTYPE DHT22  
DHT dht(DHTPIN, DHTTYPE, 30); 



String deviceId = "Grandma";

// WiFi Config
char ssid[] = "IOT";    
char pass[] = "Aman@132";  

char azureIotHost[]   = "ImFineDev.azure-devices.net";    // Azure IoT Hub hostname 
char azureDeviceSAS[] = "SharedAccessSignature sr=ImFineDev.azure-devices.net%2fdevices%2fGrandma&sig=GtJVahJYdxIcpyxRbvP7peiOJpMqHwC9ByOlbnQpA74%3d&se=1459252560";


unsigned long lastGETTime  = 0;
unsigned long lastPOSTTime = 0;
unsigned long intervalGET  = 5000L;  
unsigned long intervalPOST = 60000L; 

volatile int buttonActivated = 0; 
int wifiStatus = WL_IDLE_STATUS;
WiFiSSLClient azure;


void setup() {
	Serial.begin(115200);
	Serial.println("ImFine!");

	pinMode(onboardLED, OUTPUT);
  digitalWrite(onboardLED, LOW);
	
	pinMode(buttonLED, OUTPUT);
  digitalWrite(buttonLED, LOW);

  pinMode(buzzer, OUTPUT);
	
	pinMode(pinButton, INPUT_PULLUP);
	attachInterrupt(pinButton, ISRButtonHandler, FALLING);


  beeper(5, 1000, 250, 300); // Sound
	blinkButtonLed(5); // Light


	dht.begin();

	
	if (WiFi.status() != WL_CONNECTED)
		wifiConnect();

	azureDisconnect();

	while (!azureConnect());
	azureHttpPOST("Grandma is awake...");

  beeper(3, 3000, 250, 300);
	blinkButtonLed(3);
}


void loop()
{
	if (buttonActivated)
	{
		
		azureHttpPOST("Button pressed!");
		
		// Turn off the LED in the button to indicate the message is sent to Azure
		delay(200); 
		digitalWrite(buttonLED, LOW);

		
		buttonActivated = 0;
	}

	
	if (WiFi.status() != WL_CONNECTED)
		wifiConnect();

	String command = getCommandFromCloud();
	if (!command.equals("")) {
        handleCommandFromCloud(command);
	}

	SendDHT22DataToCloud();
	
	delay(1000);
}

// ------------------- Application code -----------------------------
void beeper(int beeps, int frequency, int duration, int pause)
{
  // Beep the buzzer a few times
  for (int i = 0; i < beeps; i++)
  {
    tone(buzzer, frequency, duration);
    delay(pause);
  }
}

void blinkButtonLed(int blinks)
{
	// Blink the button LED a few times
	for (int i = 0; i < blinks; i++)
	{
		digitalWrite(buttonLED, HIGH);
		delay(500);
		digitalWrite(buttonLED, LOW);
		delay(300);
	}
}

// Handle messages coming from the Azure IotHub
void handleCommandFromCloud(String commandData)
{
	Serial.print("Incoming   ");
	Serial.println(commandData);

  String command = getValue(commandData, ';', 0);
  if (command.equals("ACK")) {
      beeper(3, 2500, 250, 500);
  } else {
      beeper(1, 800, 1000, 100);
  }

  //beeper(2, 2500, 250, 500);
}


void ISRButtonHandler()
{
	buttonActivated++;

	
	digitalWrite(buttonLED, HIGH);
}


void SendDHT22DataToCloud() {
  if (millis() - lastPOSTTime > intervalPOST) {
    // Check wifi status and connect if not connected
    if (WiFi.status() != WL_CONNECTED)
		  wifiConnect();

    // Open new server connection if it is not already open...
    if (!azure.connected()) {
      azureConnect();
    }

    // Get data from DHT22 sensor
    String dht22 = getDHT22Data();
    if (!dht22.equals(""))
    {
      // Send data to Azure IoTHub
      azureHttpPOST(dht22);
    }

    lastPOSTTime = millis();
  }
}


// Read data from the DHT22 sensor and return data as a String
String getDHT22Data() {
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit
  //float f = dht.readTemperature(true);
  
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return "";
  }

  int t1 = t * 100;
  int h1 = h * 100;

  String temp = String(t1, 10);
  String hum = String(h1, 10);
    
  String msg = "DHT22;";
  msg += temp;
  msg += ";";
  msg += hum;

  return msg;
}



void wifiConnect()
{
	while (WiFi.status() != WL_CONNECTED) {
		Serial.println("WiFi connecting...");
		wifiStatus = WiFi.begin(ssid, pass);
		delay(3000);
		if ((wifiStatus != WL_CONNECTED))
			delay(7000);
	}
	Serial.println("WiFi connected");
}

void wifiDisconnect()
{
	WiFi.disconnect();
}



String ApiVersion  = "api-version=2016-02-03";
String httpGET     = "/devices/{deviceid}/messages/devicebound?{apiversion}";
String httpPOST    = "/devices/{deviceid}/messages/events?{apiversion}";
String httpDELETE  = "/devices/{deviceid}/messages/devicebound/{etag}?{apiversion}";
String httpREJECT  = "/devices/{deviceid}/messages/devicebound/{etag}?reject&{apiversion}";
String httpABANDON = "/devices/{deviceId}/messages/devicebound/{etag}/abandon?&{apiversion}";

bool azureConnect() {

	if (azure.connected()) return true;

	// Check wifi status and connect if not connected
	if (WiFi.status() != WL_CONNECTED)
		wifiConnect();

   
	while (!azure.connected())
	{
		Serial.println("Azure connecting...");

		bool connected = azure.connect(azureIotHost, 443);
		if (!connected) {
			Serial.println("Azure connecting - wait 10s");
			delay(10000);
		}
		if (!azure.connected()) {
			Serial.println("Azure connecting - wait 30s");
			delay(30000);
		}
	};

	
	if (azure.connected())
		Serial.println("Azure connected");
	else
		Serial.println("Azure connection failure!");
	
	return azure.connected();
}


void azureDisconnect() {
	azure.stop();
	while (azure.connected());
	Serial.println("Azure connection closed");
}


void azureHttpCommand(String httpType, String url, String content) {
	if (httpType.equals("")) return;
	if (url.equals("")) return;

   
	if (!azure.connected()) {
		azureConnect();
	}
	//while (!azureConnect());

	if (azure.connected()) {
		// Send http command
		azure.print(httpType);
		azure.print(" ");
		azure.print(url);
		azure.println(" HTTP/1.1");

		azure.print("Host: ");
		azure.println(azureIotHost);

		azure.print("Authorization: ");
		azure.println(azureDeviceSAS);

		if (httpType.equals("POST"))
		{
			azure.println("Content-Type: text/plain");

			azure.print("Content-Length: ");
			azure.println(content.length());
			azure.println();

			azure.println(content);
		}
		else
			azure.println();

	  azure.flush();
}
	else
	{
		Serial.println("Connection lost!");
	}
}

// Format and send the IotHub Http GET command
void azureHttpGET() {
	String url = httpGET;
	url.replace("{deviceid}", deviceId);
	url.replace("{apiversion}", ApiVersion);
  azureHttpCommand("GET", url, "");
  delay(500);
}

// Format and send the IotHub Http DELETE command
void azureHttpDELETE(String Etag) {
	String url = httpDELETE;
	url.replace("{deviceid}", deviceId);
	url.replace("{apiversion}", ApiVersion);
	url.replace("{etag}", Etag);
	azureHttpCommand("DELETE", url, "");
	delay(100);
}

void azureHttpPOST(String content) {
	String url = httpPOST;
	url.replace("{deviceid}", deviceId);
	url.replace("{apiversion}", ApiVersion);
	azureHttpCommand("POST", url, content);

	Serial.print("Outgoing   ");
	Serial.println(content);
}



String getCommandFromCloud() {
	String command = "";

	if (millis() - lastGETTime > intervalGET) {
		digitalWrite(onboardLED, LOW);

		azureHttpGET();

		String response = "";
		char c;
		// Read response data from the HttpGET if available
		while (azure.available()) {
			c = azure.read();
			response.concat(c);
		}

		if (!response.equals(""))
		{

      Serial.println("---RESPONSE---");
      Serial.println(response);
    
			if (response.startsWith("HTTP/1.1 200"))
			{
				// Handle received message
				command = getServerCommand(response);

        Serial.println("---COMMAND---");
        Serial.println(command);

				// Delete the message from the Azure hub queue
				String etag = getEtag(response);
        
        Serial.println("---DELETE ETAG---");
				Serial.println(etag);
       
				azureHttpDELETE(etag);

				intervalGET = 100L; // 100 milli seconds
			}
			else
			{
				intervalGET = 2000L; // 2 seconds

				// Consider everything from HTTP responsecodes 200 (OK) and 204 (No Content) as errors
				if (!response.startsWith("HTTP/1.1 204"))
				{
					Serial.println("* * * ERROR * * *");
					Serial.println(response);
				}
			}

			lastGETTime = millis();
		}
		else
		{
			intervalGET = 5000L; // 5 seconds
		}
	}
	else
		command = "";

	return command;
}



String getEtag(String response)
{
	// Get header line 3 (index = 2), which contains the Etag
	String keyVal = getValue(response, '\n', 2);
	int from = keyVal.indexOf('"') + 1;
	int to = keyVal.lastIndexOf('"');
	String etag = keyVal.substring(from, to);
	return etag;

}


String getServerCommand(String response)
{
	int cmdIdx = response.indexOf("\r\n\r\n") + 4;
	return response.substring(cmdIdx);
}



String getValue(String data, char separator, int index)
{
	int found = 0;
	int strIndex[] = {
		0, -1 };
	int maxIndex = data.length() - 1;
	for (int i = 0; i <= maxIndex && found <= index; i++) {
		if (data.charAt(i) == separator || i == maxIndex) {
			found++;
			strIndex[0] = strIndex[1] + 1;
			strIndex[1] = (i == maxIndex) ? i + 1 : i;
		}
	}
	return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}
