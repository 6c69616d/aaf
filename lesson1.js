//-------- function to return today's date--------//

/* let todaysDate = function() {
    var date = new Date();

    var dd =  date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    
    

    return(dd+'/'+mm+'/'+yyyy)
}

console.log(todaysDate()) */

//-------- end --------//


//--- Handling JSON ---//
let fs = require('fs');
let json = JSON.parse(fs.readFileSync('timetable.json', 'utf8'));
//console.log(json); // The whole data structure
//console.log(json.classes[0]);// The first data item
//----- All item except the first ---//
for (x in json.classes){
    if (x != 0){
        console.log(json.classes[x])
    }
}
//--- end ----//
//------- end ------//