let gazetteerModal = $("#gazetteer-modal");
let companyDModal = $("#companyD-modal");
let ecommerceModal = $("#ecommerce-modal");

$(document).ready(function () {
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');
  });

  // tooltips calling after page loads
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // gazetter modal
  $('#gazetteerProject').on('click', function () {
    $('.main-loader').removeClass('d-none');
    gazetteerModal.modal("show");
    gazetteerModal.on('shown.bs.modal', function () {
      $('.main-loader').addClass('d-none');
    })
  })

  // companyD modal
  $('#companyDProject').on('click', function () {
    $('.main-loader').removeClass('d-none');
    companyDModal.modal("show");
    companyDModal.on('shown.bs.modal', function () {
      $('.main-loader').addClass('d-none');
    })
  })

  // ecommerce Modal
  $('#ecommerceProject').on('click', function () {
    $('.main-loader').removeClass('d-none');
    ecommerceModal.modal("show");
    ecommerceModal.on('shown.bs.modal', function () {
      $('.main-loader').addClass('d-none');
    })
  })

  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    },
      500,
      'linear'
    );
  });
});


// Handle contact form submission
$('#emailForm').submit(function (e) {
  e.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'emails/send.php',
    data: formData,
    beforeSend: function () {
      $('.form-send').addClass('d-none');
      $('.preloader').addClass('d-inline');
    },
    success: function (response) {
      // Parse the JSON response
      const data = JSON.parse(response);
      // Display the success modal
      if (data.status === 'success') {
        $('#successModal').modal('show');
      } else {
        $('#failedModal').modal('show');
      }
      $('#emailForm')[0].reset();
    },
    complete: function () {
      setTimeout(function () {
        $('.form-send').removeClass('d-none');
        $('.preloader').removeClass('d-inline');
      }, 1000);
    },
    error: function (xhr, status, error) {
      console.log('HTTP Status Code:', xhr.status);
      $('.response-message').html('Error: ' + error);
    }
  });
});

// main preloader
$(window).on('load', function () {
  $('.main-loader').addClass('d-none');
});