const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get("name");
console.log(id);
var cnt=Math.random()*10000%1;
var db = firebase.firestore();
var docRef = db.collection("Announcements").doc(id);
docRef.get().then(function(doc) {
    
    if (doc.exists) {
        document.getElementById("club").value = doc.data().corp;
        document.getElementById("date").value = doc.data().date;
        document.getElementById("title").value = doc.data().title;
        cnt = doc.data().cnt;
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

function addAnnouncement(url, name){
  
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
   
        
    }

    
}
 
function uploadImage() {
    const ref = firebase.storage().ref();
    if(document.querySelector("#photo").files[0] == undefined)
    {
        
            addAnnouncement("https://wallpaperaccess.com/full/4334562.jpg", "")
       
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

       
            addAnnouncement(url,name)
      
      })
      .catch(console.error);
    
  }
var button = document.getElementById("submit")
button.addEventListener("click", uploadImage);