$(document).ready(function () {
    function updateHeader() {
        const loggedInUser = sessionStorage.getItem("user");

        if (loggedInUser) {
            document.querySelector(
                ".nav-item:nth-child(1) a"
            ).textContent = `Hello, ${loggedInUser}!`;
            document.querySelector(".nav-item:nth-child(2) a").textContent =
                "Log out";
            document.querySelector(".nav-item:nth-child(2) a").href = "/logout";
        }
    }
    updateHeader();
    
    $(".nav-item:nth-child(2) a").on("click", function (event) {
        if (event.target.textContent === "Log out") {
            event.preventDefault();
            sessionStorage.removeItem("user");
            window.location.href = "/logout";
        }
    });

    var actions = $("table td:last-child").html();

    $('[data-toggle="tooltip"]').tooltip();
    const list = document.querySelector("#list");
    const addBtn = document.querySelector("#add-btn");
    const modal = document.querySelector("#deleteModal");
    const confirmDeleteBtn = document.querySelector("#confirm-delete-btn");
    const cancelDeleteBtn = document.querySelector("#cancel-delete-btn");

    $("#add-btn").on("click", function () {
        $("#addModal").css("display", "block");
    });

    $(document).on("click", ".add", function () {
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if (!empty) {
            input.each(function () {
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
    });
    // Edit row on edit button click
    // $(document).on("click", ".edit", function () {
    //   $(this)
    //     .parents("tr")
    //     .find("td:not(:last-child)")
    //     .each(function () {
    //       $(this).html(
    //         '<input type="text" class="form-control" value="' +
    //           $(this).text() +
    //           '">'
    //       );
    //     });
    //   $(this).parents("tr").find(".add, .edit").toggle();
    //   $(".add-new").attr("disabled", "disabled");
    // });
    // Delete row on delete button click
    $(document).on("click", ".delete", function () {
        $('[data-toggle="tooltip"]').tooltip("hide");

        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });

    $("#new-table").click(function () {
        var html = `<div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-8">
                <input type="text" name="inputBox" placeholder="Enter name" />
              </div>
              <div class="col-sm-4">
                <button type="button" class="btn btn-info add-new">
                  <i class="fa fa-plus"></i> Add New Row
                </button>
              </div>
            </div>
          </div>
          <table class="table table-bordered" id="table-1">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </div>`;

        $(".table-responsive").append(html);

        //get last add new button and add click event
        var lastAddNew = $(".table-responsive").find(".add-new").last();
        lastAddNew.click(function () {
            //get parent and get table sibling
            var table = $(this).parent().parent().parent().siblings("table");
            var index = table.find("tbody tr:last-child").index();
            var row =
                "<tr>" +
                '<td><input type="text" class="form-control" name="name" id="name"></td>' +
                '<td><input type="text" class="form-control" name="department" id="department"></td>' +
                '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
                "<td>" +
                actions +
                "</td>" +
                "</tr>";
            table.append(row);
            table
                .eq(index + 1)
                .find(".add, .edit")
                .toggle();
            $('[data-toggle="tooltip"]').tooltip();
        });
    });

    //add new row should add a new row to the table
    $(".add-new").click(function () {
        //get parent and get table sibling
        var table = $(this).parent().parent().parent().siblings("table");
        var index = table.find("tbody tr:last-child").index();
        var row =
            "<tr>" +
            '<td><input type="text" class="form-control" name="name" id="name"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            "<td>" +
            actions +
            "</td>" +
            "</tr>";
        table.append(row);
        table
            .eq(index + 1)
            .find(".add, .edit")
            .toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
});
