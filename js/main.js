
$(function () {
    
    var indexArray = new Array();
    
    for (var i=0, count=localStorage.length; i< count; i++) {
        indexArray[i] = localStorage.key(i);
        showRecord(indexArray[i]);
    }

    // console.log(indexArray);
    
    $("#formOfAdding").submit(function() {
        
        if (typeof(Storage) !== "undefined") {
            var rows = {
                isbn:$("#isbn").val(),
                bookName:$("#bookName").val(),
                author:$("#author").val(),
                publicationDate:$("#publicationDate").val(),
                price:$("#price").val()
            }
            
            localStorage.setItem(rows.isbn,JSON.stringify(rows));
            
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    });
      
     
    function showRecord(isbn) {
        
        // Generating td
        var bookList = JSON.parse(localStorage.getItem(isbn));
        
        var isbn = "<td>" + bookList.isbn + "</td>";
        var bookName = "<td>" + bookList.bookName + "</td>";
        var author = "<td>" + bookList.author + "</td>";
        var publicationDate = "<td>" + bookList.publicationDate + "</td>";
        var price = "<td>" + bookList.price + "</td>";
        var buttons = "<td>" + '<button class="btn btn-success">修改</button>' 
            + ' <button class="btn btn-danger">刪除</button>';
        
        // Generating tr
        var tTr = $("<tr></tr>").append(isbn).append(bookName).append(author)
        .append(publicationDate).append(price).append(buttons).attr("data-isbn",bookList.isbn);
        
        // Appending tr to tbody
        $("#mainTable tbody").append(tTr);
    }  
    
    
    
     
    //  console.log(localStorage);
});