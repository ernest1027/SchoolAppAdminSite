
var db = firebase.firestore();
var docRef = db.collection("Announcements").doc("Counter");

function addAnnouncement(url, name, cnt){
    console.log(url + " " + name + " " + cnt)
    if(document.getElementById("club").value == "" || document.getElementById("date").value == "" ||  document.getElementById("title").value == ""){
        alert("Please fill in all textboxes")

    }
    else{
            var lines = [];
            $.each($('#body').val().split(/\n/), function(i, line){
                if(line){
                    lines.push(line);
                } else {
                    lines.push("");
                }
            });
            console.log(lines);
            db.collection("Announcements").doc("Counter").set({
                cnt: cnt
              
            }).then(function(){
                console.log("here")
                db.collection("Announcements").doc(document.getElementById("title").value).set({
                    corp: document.getElementById("club").value,
                    date: document.getElementById("date").value,
                    imgURL: url,
                    imgName: name,
                    title: document.getElementById("title").value,
                    body: lines,
                    cnt: cnt
                
                })
                .then(function() {
                    console.log("Document successfully written!");
                    location.href = "/home.html"
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            })
        
    }

    
}
 
function uploadImage() {
    const ref = firebase.storage().ref();
    if(document.querySelector("#photo").files[0] == undefined)
    {
        docRef.get().then(function(doc) {
            console.log(doc)
           
            

            var cnt = doc.data().cnt+1
            addAnnouncement("https://wallpaperaccess.com/full/4334562.jpg", "",cnt)
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
        return
    }
    const file = document.querySelector("#photo").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);

        docRef.get().then(function(doc) {
            console.log(doc)
           
            

            var cnt = doc.data().cnt+1
            addAnnouncement(url, name,cnt)
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
      })
      .catch(console.error);
    
  }
var button = document.getElementById("submit")
button.addEventListener("click", uploadImage);


