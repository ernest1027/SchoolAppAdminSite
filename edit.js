const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get("name");
console.log(id);

var db = firebase.firestore();
var docRef = db.collection("Announcements").doc(id);
docRef.get().then(function(doc) {
    db.collection("Announcements").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        updatePage();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    if (doc.exists) {
        document.getElementById("club").value = doc.data().corp;
        document.getElementById("date").value = doc.data().date;
        document.getElementById("img").value = doc.data().img;
        document.getElementById("title").value = doc.data().title;
        for(var i= 0; i < doc.data().body.length; i++)
        {
            document.getElementById("body").value += doc.data().body[i] + "\n";
        }
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

function addAnnouncement(){
    var lines = [];
        $.each($('#body').val().split(/\n/), function(i, line){
            if(line){
                lines.push(line);
            } else {
                lines.push("");
            }
        });
        console.log(lines);
    db.collection("Announcements").doc(document.getElementById("title").value).set({
        corp: document.getElementById("club").value,
        date: document.getElementById("date").value,
        img: document.getElementById("img").value,
        title: document.getElementById("title").value,
        body: lines
    
    })
    .then(function() {
        console.log("Document successfully written!");
        location.href = "/home.html"
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
    
}
var button = document.getElementById("submit")
button.addEventListener("click", addAnnouncement);