
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get("name");
console.log(id);


document.getElementById("goBack").onclick = function () {
    location.href = "/studentHome.html";
};


var db = firebase.firestore();
var docRef = db.collection("Announcements").doc(id);
docRef.get().then(function(doc) {
    console.log(doc)
        console.log(doc.data().corp)
        // document.getElementById("club").value = doc.data().corp;
        // document.getElementById("date").value = doc.data().date;
        document.getElementById("title").innerHTML = doc.data().title;
        document.getElementById("announcer").innerHTML = doc.data().corp;
        if(doc.data().imgName !="")document.getElementById("announcementImg").src = doc.data().imgURL
        for(var i= 0; i < doc.data().body.length; i++)
        {
            document.getElementById("description").innerHTML += doc.data().body[i] + "\n";
        }
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

