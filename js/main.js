
$(function () {
    
    $("#formOfAdding").submit(function() {
        
        if (typeof(Storage) !== "undefined") {
            var rows = {
                isbn:$("#isbn").val(),
                bookName:$("#bookName").val(),
                author:$("#author").val(),
                publicationDate:$("#publicationDate").val(),
                price:$("#price").val()
            }
            
            localStorage.setItem("isbn",JSON.stringify(rows));
    
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    });
      
});