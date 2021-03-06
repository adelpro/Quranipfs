    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "xxx",
      authDomain: "xxx",
      databaseURL: "xxx",
      projectId: "xxx",
      storageBucket: "xxx",
      messagingSenderId: "xxx",
      appId: "xxx",
      measurementId: "xxx"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    db.settings({timestampInSnapshots: true});
    const messaging = firebase.messaging()
    
    messaging
    .requestPermission()
    .then(() => {
      console.log("Notification permission granted.");

      // get the token in the form of promise
      //return messaging.getToken();
    })
    .catch(err => {
      console.log("Unable to get permission to notify.", err);
    });
  
function counterinc(pageid){
    const counter = document.querySelector("#hit-counter");
    var docid;
    var docdataid;
    var doccount; 
    db.collection('counters').get().then( (snapshot) => {
        snapshot.docs.forEach(doc => {
            docid = doc.data().id;
            if (docid == pageid){
                doccount = doc.data().count+1;
                docdataid = doc.id;
                db.collection('counters').doc(docdataid).update({count: doccount,})
                .then(() => {
                 counter.textContent = "< عدد الزيارات - "+doccount+" >";
                })
                .catch((error) => {
                  console.error("Error updating doc", error);
            });	
            };
            
        });
    });
  
}
function updatehomecounters(){
    var docid;
    var counter;
    var docselector;
    db.collection('counters').get().then( (snapshot) => {
        snapshot.docs.forEach(doc => {
            docid = doc.data().id;
            doccounter = doc.data().count;
            docselector ="#id"+docid+" .counter";
            counter = document.querySelector(docselector);
            counter.textContent = doccounter; 
        });
    });
}
