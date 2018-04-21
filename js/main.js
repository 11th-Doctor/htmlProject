$(function () {
    
    var indexArray = new Array();
    
    showTable();
    
    function showTable()
    {
        for (var i=0, count=localStorage.length; i< count; i++) {
            indexArray[i] = localStorage.key(i);
            showRecord(indexArray[i]);
        }
    }
    

    // console.log(indexArray);
    
    $("#addBtn").click(function(){
        
    $("#isbn").blur(function(){
        if (indexArray.indexOf($("#isbn").val()) !== -1) {
            $("#hint").html("&times;該ISBN已存在!");  
           }
           else {
               $("#hint").html("");
           }
        });
    });
    
    $("#formOfAdding").submit(function(e) {
        
        // use every() to ensure that all existed ISBNs are not the same as the submitted isnb
        
        // Function of indexOf returns -1 when the submitted isbn does not exist in the array indexArray
        
        
        if (indexArray.indexOf($("#isbn").val()) === -1) {
            
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
            
        } else { // Add the record into localStorage as the submitted isbn does not repeat
            
            e.preventDefault();
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
        var buttons = "<td>" + '<button class="btn btn-outline-success btn-sm" data-toggle="modal"'
            + ' data-target="#ModalEdit">修改</button>' 
            + ' <button class="btn btn-outline-danger btn-sm">刪除</button></td>';
        
        // Generating tr
        var tTr = $("<tr></tr>").append(isbn).append(bookName).append(author)
        .append(publicationDate).append(price).append(buttons).attr("data-isbn",bookList.isbn);
        
        // Appending tr to tbody
        $("#mainTable tbody").append(tTr);
    }  

    //Delete the record that the user wants to 

    $("#mainTable tbody tr .btn-outline-danger").click(function(e){
        var isbn = $(this).parents("tr").attr("data-isbn");
        var index = indexArray.indexOf(isbn);
        $(this).parents("tr").remove();
        indexArray.splice(index,1);
        localStorage.removeItem(isbn);
    });


    //Get the reference of the form 0f formOfEditing
    //and deal with the submit event of it.
    
    $("#mainTable tbody tr .btn-outline-success").click(function() {
        //var isbn = $(this).parents("tr").data("isbn");
        var isbn = $(this).parents("tr").attr("data-isbn");
        
        var bookList = JSON.parse(localStorage.getItem(isbn));
            
            $("#isbnE").val(bookList.isbn);
            $("#bookNameE").val(bookList.bookName);
            $("#authorE").val(bookList.author);
            $("#publicationDateE").val(bookList.publicationDate);
            $("#priceE").val(bookList.price);
            
        $("#formOfEditing").submit(function(e){

            var rows = {
                    isbn:$("#isbnE").val(),
                    bookName:$("#bookNameE").val(),
                    author:$("#authorE").val(),
                    publicationDate:$("#publicationDateE").val(),
                    price:$("#priceE").val()
                }
                
            localStorage.setItem(isbn,JSON.stringify(rows));
            
        });
    });
    
    $("#mainTable").tablesorter();
    
});

