// names = ['liam', 'BOB', 'michelle', 'joesphine'];

// console.log(names.filter(names => names.length > 6)) //1a
// console.log(names.reduce((a, b) => a.length > b.length ? a : b))//1b
// console.log(names.map(names => names.toLowerCase()))//1c     
// console.log(names.map(names => names.split('').reverse().join('')))//1d

newReleases = [
    { "id": 70111470, "title": "Die Hard", "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",  "uri": "",  "rating": [4.0], "bookmark": [] },
    { "id": 654356453, "title": "Bad Boys", "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": [5.0], "bookmark": [{ id: 432534, time: 65876586 }] },
    { "id": 65432445, "title": "The Chamber", "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": [4.0], "bookmark": [] }, 
    { "id": 675465, "title": "Fracture", "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": 5.0, }
    ]
    
 releases = []
 
 //newReleases.forEach(x => releases.push([x.id, x.title]))//4a
//console.log(releases)
//console.log(newReleases.filter( newReleases => newReleases.rating == 5 ))//4b


newReleases.filter( newReleases => newReleases.rating == 5 ).forEach(x => releases.push([x.id, x.title]))
console.log(releases)//4c



