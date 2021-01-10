var db = firebase.firestore();
let d = new Date();
function updatePage(){
    var html="";
    var cnt = 0;
    db.collection("Announcements").get().then(function(querySnapshot) {
      
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var month = parseInt((parseInt(doc.data().date)/10000))-1
          var day = parseInt((parseInt(doc.data().date)%10000)/100)
          console.log( month + " " + day + " " + d.getMonth() + " " + d.getDate())
          if(d.getMonth()==month && d.getDate()== day){
                    db.collection("Announcements").doc(doc.id).delete().then(function() {
                      console.log("Document successfully deleted!");
                  }).catch(function(error) {
                      console.error("Error removing document: ", error);
                  });
             
          }
          else
          {
              if(doc.id!="Hello World" && doc.id!="Counter"){
                cnt++;
                console.log(doc.id, " => ", doc.data());
                html+= `
                
              <div class="card">
              <img src="${doc.data().imgURL}" alt="Image" style="width:75px;">
                <div class="container">
                <a href="/view.html?name=${doc.id}">
                  <h4><b>${doc.data().title}</b></h4>
                  </a>
                  <button class="pull-right edit${doc.data().cnt} btn btn-primary" style="height:50px; width:80px; margin:25px;">Edit</button>
                  <button class="pull-right delete${doc.data().cnt} btn btn-danger" style="height:50px; width:80px; margin:25px;">Delete</button>
                  <p>${doc.data().corp}</p>
                  
                </div>
              </div>
            
              `      
              $(document).ready(function() {
    
                
                $(`.delete${doc.data().cnt}`).click(function() {
                    db.collection("Announcements").doc(doc.id).delete().then(function() {
                      console.log("Document successfully deleted!");
                      updatePage();
                  }).catch(function(error) {
                      console.error("Error removing document: ", error);
                  });
                  
                  alert("Announcemment Deleted");
                });
                $(`.edit${doc.data().cnt}`).click(function() {
                  location.href = `edit.html?name=${doc.id}`
              });
    
              });  
        
          }
            
            // $(document).ready(function() {
    
            //   $(`.box${doc.id}`).hover(function() {
            //     $(`.box-right${doc.id}`).toggleClass('cl-box2');
            //     $(`.bar${doc.id}`).toggleClass('cl-bar2');
            //     console.log("hovered");
            //   });
            
            //   $(`.bar${doc.id}`).click(function() {
            //     alert("Deleted");
            //   });
            // });     
            //<div type='button' name='delete'  class='box box${doc.id}' >
            //   <div class='box-left box-left${doc.id}'>
            //     <i class='but-icon fa fa-lg fa-times'></i>
            //     <div class='bar bar${doc.id}'>
            //       <i class='but-icon fa fa-lg fa-check'></i>
            //     </div>
            //   </div>
            //   <div class='box-right box-right${doc.id}'></div>
            // </div> 
          }
          
      });
     console.log(html);
     document.getElementById("announcement-cards").innerHTML=html;
     
  });
  
        
}
document.getElementById("addAnnouncement").onclick = function () {
    location.href = "/add.html";
};

updatePage();
