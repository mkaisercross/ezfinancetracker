# EZFinanceTracker


## menu design ##
- make menu toggle button more visually appealling. better animation, possibly circle shaped. compound shapes.

## visualizations needed. graphs/charts/tables. 

### layout and design ###
- final layout. tabs for "bar graph", 
- carousel for switching graphs
- custom graphical icon for each graph. to make locating graph in a list easy.
- carousel that shows only current item and a list of dots below showing approximately what position you are in the list. requires spacial memory only from user.
- possible layout. instead of carousel animation between graphs; virtual flyover and vertical land on what looks like logical groups of graphs.


### chart types ###
- pie chart. money spent by category
- table. items where min_time < purchase date < max_time
- bar graph. 
    - total spent in categories in time period
    - total spent in stores in time period
    - total spent on items in time period
- special graphs.
    - time vs stacked receipt. time on x axis. on y axis a series of vertically stacked bars. showing each item in a receipt.
- table. receipts in chronological order.
- line graph. amount spent vs time.
- monthly calendar. shows total spent each day. 


## functional reqs
- initial login screen
- review and modification of OCR results
- schedule recurring purchase/deposit
- manually enter purchase/deposit
- search for items by date, price, store, and category. Results displayed in a list.
- backup of data.
- icons for graphs are screen captures of the latest loading of the graph. 
- clicking on items in graphs allows more details
- category
- tags
- integration with other expense tracking services. 
- integration with google apps
- integration with 

## nonfunctional requirements 
- available on ios, android, windows phone
- The user data must be available without internet connection.
- The OCR results must detect 50% of the fields accurately in order to be considered a useful feature.


## notes 


## Build Dependencies
phonegap --version -> 5.0.0-0.28.0
cordova --version -> 4.2.0
cordova plugin whitelist
cordova plugin camera


## Debugging Tips
- phonegap android app
- chrome desktop. inspect android webviews by browsing to chrome://inspect/#devices in desktop chrome while android phone connected via usb