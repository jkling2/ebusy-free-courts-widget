// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: baseball-ball;
// default values are demo version of ebusy
let url = "https://demo8.ebusy.de/lite-module/920"
let amountCourts = 6
// 2 parameters are expected: first the url, second the amount of courts
const param = args.widgetParameter
if (param != null) {
    const params = param.split(',')
    url = params[0]
    amountCourts = parseInt(params[1])
}
// url must be in the form https://<name>.ebusy.de/<module>/<number>
const urlSplit = url.split('/')
const name = urlSplit[2].split('.')[0]+"_"+urlSplit[4]
// data and logo ist stored in iCloud
const fm = FileManager.iCloud()
const dir = fm.joinPath(fm.documentsDirectory(), name + "_ebusy-widget")
const pathData = fm.joinPath(dir, "bookingData.txt")
const pathImg = fm.joinPath(dir, "logo")
if(!fm.fileExists(dir)){
	fm.createDirectory(dir)
}
const currentDate = new Date()
const month = (currentDate.getMonth()+1) < 10 ? "0" + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)
const date = month+'/'+currentDate.getDate()+'/'+currentDate.getFullYear()
// load logo from file (if not present, download first)
if (!fm.fileExists(pathImg)) {
	let reqImg = new Request(urlSplit[0]+'//'+urlSplit[2]+'/dynamic-resources/logo')
	reqImg.headers = {
			"Accept": "image/webp,*/*"
		}
	let img = await reqImg.loadImage()
	fm.writeImage(pathImg, img)
}
const logo = fm.readImage(pathImg)
// request to get reservations
let req = new Request(url+"?timestamp=&currentDate="+date)
req.headers = {
        "Accept": "application/json,*/*"
    }
let freeCourts = -1
try {
	bookingDataJSON = await req.loadJSON()
	var reservations
	try {
		// try reading data
		reservations = bookingDataJSON.reservations
		fm.writeString(pathData, JSON.stringify(bookingDataJSON))
	} catch(e) {
		// could not read JSON data => read last data from file
		console.log('Error: ' + e.message)
		reservations = JSON.parse(fm.readString(pathData))
	} finally {
		// calculate free courts
		freeCourts = amountCourts
		for (let reservationIdx in reservations) {	
			let reservation = reservations[reservationIdx]
			let fromTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), reservation.fromTime.split(":")[0], reservation.fromTime.split(":")[1])
			let toTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), reservation.toTime.split(":")[0], reservation.toTime.split(":")[1])
			if (fromTime <= currentDate && currentDate <= toTime) {
 				freeCourts--
				console.log(`Found booked Court: ${reservation.court} for ${reservation.text} ${reservation.info}`)
			}
		}
	}
} catch(e) {
	// could not load data due to no internet connection
	console.log('Error: ' + e.message)
}
// build widget
let widget = new ListWidget()
widget.setPadding(10, 10, 10, 10)
widget.spacing = 10
let stack = widget.addStack()
stack.spacing = widget.spacing
stack.setPadding(0, 5, 0, 5)
stack.centerAlignContent()
let img = stack.addImage(logo)
img.imageSize = new Size(50, 50)
if (freeCourts >= 0) {
	widget.backgroundColor = freeCourts > amountCourts*(2/3) ? new Color("7ec850", 0.5) : freeCourts > amountCourts*(1/3) ? new Color("#ff8800", 0.5) : new Color("#ff0000", 0.5)
	let text = stack.addText(`${freeCourts}`)
	text.font = Font.mediumSystemFont(35)  
    text.textColor = new Color(widget.backgroundColor.hex)  
    text.shadowRadius = 1
	let tennisBallsText = ""
	for (i = 0; i < freeCourts; i++) {
	  tennisBallsText += "🎾"
	} 
	let tennisBalls = widget.addText(tennisBallsText)
	tennisBalls.font = Font.mediumSystemFont(Math.ceil(33 - (20 * (1 - ((21 - freeCourts) * (21 - freeCourts)) / (21 * 21)))))
	tennisBalls.centerAlignText()
} else {
	// data could not be read
	let text = widget.addText("Check 📶 connection")
	text.font = Font.mediumSystemFont(18)  
    text.textColor = new Color("#7393b3")
	text.centerAlignText()
}
// run widget
if (!config.runsInWidget) {
  await widget.presentSmall()
}
Script.setWidget(widget)
Script.complete()