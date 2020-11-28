
var db = firebase.firestore();
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

