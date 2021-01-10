var db = firebase.firestore();
let d = new Date();
function updatePage(){
    var html="";
    var cnt = 0;
    db.collection("Announcements").get().then(function(querySnapshot) {
      
      querySnapshot.forEach(function(doc) {
        
              if(doc.id!="Hello World" && doc.id!="Counter"){
                cnt++;
                console.log(doc.id, " => ", doc.data());
                html+= `
                
              <div class="card">
              <img src="${doc.data().imgURL}" alt="Image" style="width:75px;">
                <div class="container">
                <a href="/studentView.html?name=${doc.id}">
                  <h4><b>${doc.data().title}</b></h4>
                  </a>
             
                  <p>${doc.data().corp}</p>
                  
                </div>
              </div>
            
              `      
              
        
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


updatePage();
