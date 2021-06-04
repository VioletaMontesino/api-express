$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    console.log(data)

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Usuario actualizado correctamente");
    })

})

function userDelete(id) {
    //$(e).parents("tr").remove();
    console.log(id)

         var request = {
            "url" : `http://localhost:3000/users/${id}`,
            "method" : "DELETE"
        } 

        $.ajax(request).done(function(response){
            alert("Usuario borrado correctamente!");
            location.reload();
        })

}