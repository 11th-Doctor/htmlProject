
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
        
        var isbn = "<th scope='row'>" + bookList.isbn + "</td>";
        var bookName = "<td>" + bookList.bookName + "</td>";
        var author = "<td>" + bookList.author + "</td>";
        var publicationDate = "<td>" + bookList.publicationDate + "</td>";
        var price = "<td>" + bookList.price + "</td>";
        var buttons = "<td>" + '<button class="btn btn-success" data-toggle="modal"'
            + ' data-target="#ModalEdit">修改</button>' 
            + ' <button class="btn btn-danger">刪除</button>';
        
        // Generating tr
        var tTr = $("<tr></tr>").append(isbn).append(bookName).append(author)
        .append(publicationDate).append(price).append(buttons).attr("data-isbn",bookList.isbn);
        
        // Appending tr to tbody
        $("#mainTable tbody").append(tTr);
    }  

    //Delete the record that the user wants to 

    $("#mainTable tbody tr .btn-danger").click(function(e){
        var isbn = $(this).parents("tr").data("isbn");
        var index = indexArray.indexOf(isbn.toString());
        $(this).parents("tr").remove();
        indexArray.splice(index,1);
        localStorage.removeItem(isbn);
    });


    //Get the reference of the form 0f formOfEditing
    //and deal with the submit event of it.
    
    $("#mainTable tbody tr .btn-success").click(function() {
        isbn = $(this).parents("tr").data("isbn");
        

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
    
});

