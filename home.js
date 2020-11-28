var db = firebase.firestore();
function updatePage(){
    var html="";
    db.collection("Announcements").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          if(doc.id!="placeholder"){
            console.log(doc.id, " => ", doc.data());
            html+= `
          <div class="card">
            <img src="${doc.data().img}" alt="Image" style="width:100px;">
            <div class="container">
              <h4><b>${doc.data().title}</b></h4>
              <button class="pull-right edit${doc.id} btn btn-primary" style="height:50px; width:80px; margin:25px;">Edit</button>
              <button class="pull-right delete${doc.id} btn btn-danger" style="height:50px; width:80px; margin:25px;">Delete</button>
              <p>${doc.data().corp}</p>
              
            </div>
          </div>
          `      
          $(document).ready(function() {

            
            $(`.delete${doc.id}`).click(function() {
                db.collection("Announcements").doc(doc.id).delete().then(function() {
                  console.log("Document successfully deleted!");
                  updatePage();
              }).catch(function(error) {
                  console.error("Error removing document: ", error);
              });
              
              alert("Announcemment Deleted");
            });
            $(`.edit${doc.id}`).click(function() {
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
      });
     console.log(html);
     document.getElementById("announcement-cards").innerHTML=html;
     
  });
  
        
}
document.getElementById("addAnnouncement").onclick = function () {
    location.href = "/add.html";
};

function deleteAnnouncement(){

}

function editAnnouncement(){

}
updatePage();
