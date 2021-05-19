# ebusy-free-courts-widget
:tennis: widget displaying free courts for eBuSy 8 Buchungssystem

This widget displays the currently available (tennis)-courts in your club, if they use the eBuSy 8 Buchungssystem.
Here is a screenshot for the demo version:

![demo version green](./img/demo-version-green.png)

The amount of available courts is colour coded based on the total amount of courts.
* green indicates that more than two thirds of the courts are available ![demo version green](./img/demo-version-green.png)
* orange indicates that more than one third of the courts are available ![demo version orange](./img/demo-version-orange.png)
* red indicates that less than one third of the courts are available ![demo version red](./img/demo-version-red.png)
If your phone has no internet connection or if the data could not be loaded from the website, the following widget screen is shown:

![demo version check connection](./img/demo-version-check-connection.png)

## Requirements
* Apple Device with iOS 14.
* Scriptable latest (https://scriptable.app/).

## Setup
1. Copy the source code ("raw").
2. Open Scriptable.
3. Select "+" and insert the copy of the script.
4. Choose the title of the script (e. g. Free Tennis Courts).
5. Save with "Done".
6. Go back to the iOS Homescreen and get into the "wiggle mode".
7. Press the "+" symbol and look for "Scriptable".
8. Choose widget size (small) and "Add widget".
9. Go into the settings of the widget to edit it.
10. ![demo version setup scriptable](./img/demo-version-setup-scriptable.png)
* Choose script of step #4.
* Select when interacting "Run Script" or "Open URL".
** In case "Open URL" was selected: Provide the URL of your club's eBuSy 8 Buchungssystem (e. g. https://demo8.ebusy.de/lite-module/920)
* Provide 2 parameters separated by comma: first the URL of your club's eBuSy 8 Buchungssystem and then the amount of courts that can be booked (e. g. https://demo8.ebusy.de/lite-module/920,6)
11. Save and enjoy the widget!
