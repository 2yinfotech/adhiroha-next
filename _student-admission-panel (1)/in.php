<?php include "../dp.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Admission Panel | Adhiroha</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5139050,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
<style>
#wizardModal .modal-dialog,
#courseDetailsModal .modal-dialog {
    max-height: 90vh; /* Maximum height for both modals */
    height: auto; /* Allow height to adjust based on content */
    margin: 1.75rem auto; /* Default margin for smaller screens */
}

#wizardModal .modal-content,
#courseDetailsModal .modal-content {
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

@media (min-width: 992px) {
    
    #wizardModal .modal-dialog {
        max-width: 60%;
        margin-right: 36%; /* Push main modal to the left */
    }

    #courseDetailsModal .modal-dialog.course-details-modal {
        position: fixed;
        right: 60px;
        top: 1.75rem;
        width: 30%;
        margin: 0;
        z-index: 1051;
    }
}

@media (max-width: 992px) {
   #courseDetailsModal .modal-dialog.course-details-modal {
        position: fixed !important;
        right: 0px !important;
        top: 620px !important;
        width: 100% !important;
        margin: 0;
        z-index: 1051;
    }
     
  
}
.student-details{
    padding:10px !important;
}
    /* Existing styles */
.fees-display .non-retreat {
    display: none;
}

/* Style for select dropdowns to add space to the right of the arrow */
.form-group select.form-control {
    -webkit-appearance: none; /* Remove default browser arrow for WebKit browsers */
    -moz-appearance: none; /* Remove default browser arrow for Firefox */
    appearance: none; /* Remove default browser arrow */
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%225%22%20viewBox%3D%220%200%2010%205%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%234A3C2A%22%20stroke-width%3D%222%22%20d%3D%22M1%201l4%204%204-4%22/%3E%3C/svg%3E'); /* Custom arrow */
    background-repeat: no-repeat;
    background-position: right 15px center; /* Move the arrow 15px from the right edge */
    padding-right: 40px; /* Add enough padding to create a gap between text and arrow */
    border-radius: 8px; /* Match your existing design */
    border: 1px solid #ced4da; /* Bootstrap default border */
}

/* Ensure Firefox displays the custom arrow correctly */
.form-group select.form-control::-ms-expand {
    display: none; /* Remove default arrow in IE/Edge */
}

.balance-fee-container .total-registration-fees {
    font-size: 18px; /* Same size as balance fee */
    font-weight: bold;
    color: #4A3C2A; /* Different color to distinguish */
    margin-bottom: 5px;
}

.balance-fee-container {
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: white;
    padding: 10px;
    text-align: center;
}

.balance-fee-container p {
    color: #ed1c25;
    font-weight: bold;
    font-size: 18px; /* Increased font size */
}

.nav-tabs {
    border-bottom: 2px solid #6B5A3B;
    margin-bottom: 20px;
}

.nav-tabs .nav-link {
    color: #4A3C2A;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px 8px 0 0;
    padding: 10px 20px;
    background-color: #F8F6F4;
}

.nav-tabs .nav-link.active {
    background-color: #6B5A3B;
    color: #FFFFFF;
}

.nav-tabs .nav-link:hover {
    background-color: #D4A373;
    color: #FFFFFF;
}

.tab-content {
    background-color: #FFFFFF;
    border-radius: 0 0 15px 15px;
    padding: 20px;
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

.fees-display p {
    font-size: 14px;
    margin-bottom: 8px;
}

.fees-display p strong {
    color: #6B5A3B;
}

#balanceFeeText {
    font-weight: bold;
    font-size: 16px;
}

@media (max-width: 768px) {
    .nav-tabs {
        flex-direction: row;
        overflow-x: auto;
        white-space: nowrap;
        padding: 5px;
    }
    .nav-tabs .nav-link {
        font-size: 12px;
        padding: 8px 15px;
    }
    .fees-display p {
        font-size: 12px;
    }
    #balanceFeeText {
        font-size: 14px;
    }
}

.modal-dialog {
    max-height: 90vh;
    margin: 1.75rem auto;
}

.modal-content {
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.modal-body {
    max-height: calc(90vh - 150px);
    overflow-y: auto;
    flex: 1;
}

.modal-footer {
    flex-shrink: 0;
    position: sticky;
    bottom: 0;
    background-color: #FFFFFF;
    z-index: 1;
}

.wizard-header {
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 1;
}

.modal-backdrop {
    display: none;
}

body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: #4A3C2A;
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
}

body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('engine-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    z-index: -1;
}

.overlay {
    position: relative;
    z-index: 1;
    padding: 20px;
    background-color: rgba(248, 246, 244, 0.6);
    min-height: 100vh;
}

button:disabled,
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #cccccc;
    border-color: #cccccc;
    color: #666666;
}

button:disabled:hover,
.btn:disabled:hover {
    background-color: #cccccc;
    border-color: #cccccc;
    cursor: not-allowed;
}

.modal-content {
    background-color: #FFFFFF;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.wizard-header {
    background-color: #6B5A3B;
    color: #FFFFFF;
    padding: 15px;
    text-align: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

h5 {
    font-size: 18px;
    font-weight: 500;
}

p, label, input, select {
    font-size: 14px;
    color: #4A3C2A;
}

.wizard-step {
    display: none;
}

.wizard-step.active {
    display: block;
}

.btn-primary, .btn-secondary {
    background-color: #6B5A3B;
    border-color: #6B5A3B;
    font-size: 14px;
    padding: 10px;
    min-height: 44px;
    border-radius: 8px;
    width: 100%;
    max-width: 200px;
}

.btn-primary:hover, .btn-secondary:hover {
    background-color: #D4A373;
    border-color: #D4A373;
}

.stepwizard {
    display: flex;
    margin-bottom: 20px;
    background-color: #F8F6F4;
    border-radius: 8px;
    padding: 10px;
}

.stepwizard-step {
    flex: 1 0 33.33%; /* Adjust for 3 steps */
    text-align: center;
    background: #EAEAEA;
    color: #4A3C2A;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    margin: 0 5px;
    position: relative;
}

@media (max-width: 768px) {
    .stepwizard-step {
        flex: 0 0 30%; /* Adjust for 3 steps on mobile */
        min-width: 100px;
        margin: 0 2px;
        padding: 8px;
        font-size: 12px;
        line-height: 1.2;
    }
}

.stepwizard-step.active {
    background: #6B5A3B;
    color: #FFFFFF;
}

.stepwizard-step.completed {
    background: #D4A373;
    color: #FFFFFF;
}

#courseInfoPanel {
    background-color: #F8F6F4;
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
}

#toggleInfoBtn {
    display: none;
    margin-top: 10px;
    font-size: 14px;
    width: 100%;
    max-width: 200px;
}

.course-fee-i {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.course-item {
    background-color: #FFFFFF;
    font-size: 12px;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    min-width: 120px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.icon {
    font-size: 18px;
    margin-bottom: 5px;
}

.card {
    border: none;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.form-check-label {
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
    margin-top: 5px;
}

.form-check-input {
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;
}

.form-check {
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
}

.accom-section {
    background-color: #F8F6F4;
    border-radius: 15px;
    padding: 15px;
}

.room-selection-section {
    background-color: #F8F6F4;
    border-radius: 10px;
    display: none;
}

.room-selection-section h Ascent
h6 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #4A3C2A;
}

.room-options {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

.room-option {
    background-color: #FFFFFF;
    padding: 8px 3px 5px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 120px;
    text-align: center;
}

.room-option.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.room-option.disabled::after {
    content: ' (Full)';
    color: #DC3545;
    font-style: italic;
    font-size: 12px;
}

.student-entry {
    padding: 10px-dot:10px;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    margin-bottom: 15px;
    background-color: #FFFFFF;
}

.student-header {
    background-color: #F8F6F4;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.student-controls {
    display: flex;
    gap: 10px;
}

.error-message {
    color: #DC3545;
    font-size: 12px;
    margin-top: 5px;
}

.fees-display {
    margin-top: 10px;
    font-size: 12px;
    color: #4A3C2A;
}

.fees-display p {
    margin: 5px 0;
}

.form-check.disabled {
    opacity: 0.5;
    pointer-events: none;
}

.form-check-label.disabled::after {
    content: ' (Full or Unavailable)';
    color: #DC3545;
    font-style: italic;
}

.payment-section {
    background-color: #F8F6F4;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
    text-align: left;
}

.payment-section .paypal-header {
    display: flexed;
    align-items: center;
    margin-bottom: 10px;
}

.payment-section .paypal-header i {
    color: #0070BA;
    margin-right: 10px;
    font-size: 20px;
}

.payment-section .fee-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.payment-section .fee-details span {
    font-size: 14px;
}

.payment-section .fee-details .highlight {
    background-color: #FFE4C4;
    padding: 2px 8px;
    border-radius: 5px;
}

.payment-section .total-amount {
    font-size: 16px;
    font-weight: bold;
    color: #4A3C2A;
}

.paypal-button-container {
    background-color: #C82333;
    color: #FFFFFF;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
}

.payment-footer {
    text-align: center;
    font-size: 12px;
    color: #4A3C2A;
    margin-top: 10px;
}

.disabled .card-img-top {
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.full-label {
    color: #DC3545;
    font-size: 0.9em;
    margin-left: 5px;
}

/* Adjust main modal to accommodate course details modal */
#wizardModal .modal-dialog {
    max-width: 60%; /* Reduce width to make space for course details modal */
    margin-right: 36%; /* Push main modal to the left */
}

/* Style for course details modal */
#courseDetailsModal .modal-dialog.course-details-modal {
    position: fixed;
    right: 60px;
    top: 1.75rem;
    width: 30%; /* Adjust width as needed */
    max-height: 90vh;
    margin: 0;
    z-index: 1051; /* Ensure it appears above main modal */
}

#courseDetailsModal .modal-content {
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

#courseDetailsModal .modal-body {
    padding: 15px;
    flex: 1;
    overflow-y: auto;
}

#courseDetailsModal .wizard-header {
    background-color: #6B5A3B;
    color: #FFFFFF;
    padding: 15px;
    text-align: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

/* Ensure course details modal is always visible */
#courseDetailsModal {
    display: block; /* Always visible */
}

@media (max-width: 992px) {
    #wizardModal .modal-dialog {
        max-width: 90%;
        margin: 1.75rem auto;
    }
}

@media (max-width: 768px) {
    .overlay {
        padding: 15px;
    }
    h5 {
        font-size: 16px;
    }
    p, label, input, select {
        font-size: 12px;
    }
    . Jurisdiction {
        flex-direction: row;
        overflow-x: auto;
        white-space: nowrap;
        padding: 10px 5px;
        gap: 5px;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .stepwizard::-webkit-scrollbar {
        display: none;
    }
    .stepwizard-step {
        flex: 0 0 auto;
        width: 33%;
        min-width: 80px;
        margin: 0 2px;
        padding: 8px;
        font-size: 12px;
        line-height: 1.2;
        border-radius: 5px;
    }
    .modal-dialog {
        margin: 10px;
        max-width: 100%;
    }
    .card-img-top {
        height: 150px;
    }
    .course-item {
        min-width: 100px;
    }
    .btn-primary, .btn-secondary, #addStudentBtn, #toggleInfoBtn, #nextBtn, #prevBtn {
        width: 100%;
        max-width: none;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 12px;
        min-height: 40px;
    }
    #addStudentBtn {
        background-color: #28a745;
        border-color: #28a745;
    }
    #addStudentBtn:hover {
        background-color: #218838;
        border-color: #218838;
    }
    #nextBtn {
        background-color: #ed1c25;
        border-color: #ed1c25;
        margin-bottom: 0;
        width: 100%;
    }
    #nextBtn:hover {
        background-color: #c8101e;
        border-color: #c8101e;
    }
    .modal-content {
        display: flex;
        flex-direction: column;
        height: 80vh;
    }
    .modal-body {
        padding: 15px;
        flex: 1;
        overflow-y: auto;
        padding-bottom: 60px;
    }
    .modal-footer {
        position: sticky;
        bottom: 0;
        background-color: #FFFFFF;
        border-top: none;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        z-index: 2;
    }
    .payment-section .fee-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    .paypal-button-container {
        font-size: 14px;
        padding: 8px;
    }
    .room-selection-section {
        padding: 10px;
    }
    .accom-section {
        padding: 10px;
    }
    .room-options {
        justify-content: flex-start;
    }
    .room-option {
        flex: 1 1 45%;
        max-width: 150px;
    }
    #wizardModal .modal-dialog {
        max-width: 100%;
        margin: 0px;
    }
    #courseDetailsModal .modal-dialog.course-details-modal {
        width: 100%;
        margin: 10px auto;
    }
}

@media (max-width: 576px) {
    .col-md-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .form-group {
        margin-bottom: 10px;
    }
    .room-option {
        flex: 1 1 100%;
        max-width: none;
    }
}

@media (min-width: 769px) {
    .stepwizard {
        flex-direction: row;
        overflow-x: hidden;
    }
    .stepwizard-step {
        flex: 1;
        margin: 0 5px;
        padding: 10px;
    }
    .modal-footer {
        display: flex;
        justify-content: space-between; /* Previous on left, Next on right */
        flex-direction: row;
        gap: 10px;
    }
    .modal-footer.first-step {
        justify-content: flex-end; /* Next button to the right in first step */
    }
    .btn-primary, .btn-secondary, #addStudentBtn, #toggleInfoBtn, #nextBtn, #prevBtn {
        width: auto;
        min-width: 150px;
        border-radius: 8px;
        max-width: 150px;
        height: 43px;
    }
    #prevBtn {
        order: -1; /* Ensures Previous stays on the left */
    }
    .room-options {
        justify-content: center;
    }
    .room-option {
        flex: 1 1 150px;
        max-width: 400px;
    }
}
@keyframes slideUp {
  from { top: 620px; }
  to { top: 50px; }
}

@keyframes slideDown {
  from { top: 50px; }
  to { top: 620px; }
}

@media (max-width: 992px) {
  #courseDetailsModal .modal-dialog.course-details-modal {
    transition: top 0.3s ease-in-out; /* Smooth transition for sliding */
  }

  #courseDetailsModal .modal-dialog.course-details-modal.shown {
    top: 50px !important;
  }

  #courseDetailsModal .modal-dialog.course-details-modal.hidden {
    top: 620px !important;
  }
}

/* Style for wizard-header */
#courseDetailsModal .wizard-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
}

/* Ensure the modal body is hidden when collapsed */
#courseDetailsModal .modal-body.hidden {
  display: none;
}

/* Ensure modal body is visible when shown */
#courseDetailsModal .modal-body.shown {
  display: block;
}

/* Style for the arrow icon */
#courseDetailsModal .fas {
  font-size: 14px;
  margin-left:10px;
}
</style>
</head>
<body>
  <div class="overlay">
     <div class="modal fade" id="wizardModal" tabindex="-1" role="dialog" aria-labelledby="wizardModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="wizard-header">
            <h5 id="wizardModalLabel">Student Admission Panel</h5>
          </div>
          <div class="modal-body">
            <p class="text-center mb-2">
              <a href="http://www.adhiroha.com">
                <img style="width: 150px;" src="https://www.adhiroha.com/img/adhiroha-logo-14.png">
              </a>
            </p>
           <div class="stepwizard">
  <div class="stepwizard-step step-1 active">Step 1<br><small>Course & Student Details</small></div>
  <div class="stepwizard-step step-2">Step 2<br><small>Accommodation</small></div>
  <div class="stepwizard-step step-3">Step 3<br><small>Payment</small></div>
</div>
            <form id="wizardForm">
              <!-- Step 1 -->
         <div class="wizard-step active" id="step1">
<h5>Step 1: Course & Student Details</h5>
  <hr>
  <div class="row" id="courseSelectionRow">
    <div class="col-md-6 course-col">
      <div class="form-group">
        <label for="course">Courses & Retreats</label>
        <select class="form-control" id="course">
          <option value="">Select Course</option>
          <option value="200 Hour YTTC">200 Hour YTTC</option>
          <option value="300 Hour YTTC">300 Hour YTTC</option>
          <option value="500 Hour YTTC">500 Hour YTTC</option>
          <option value="Sound Healing">Sound Healing TTC</option>
          <option value="Yoga Retreat">Exclusive Yoga Retreats</option>
        </select>
      </div>
    </div>
    <div class="col-md-6 col-6 month-col" style="display: none;">
      <div class="form-group">
        <label for="month">Month</label>
        <select class="form-control" id="month">
          <option value="">Select Month</option>
        </select>
      </div>
    </div>
    <div class="col-md-6 col-6 type-col" style="display: none;">
      <div class="form-group">
        <label for="type">Type</label>
        <select class="form-control" id="type">
          <option value="">Select Type</option>
        </select>
      </div>
    </div>
    <div class="col-md-6 col-6 batch-col">
      <div class="form-group">
        <label for="batch">Batch</label>
        <select class="form-control" id="batch">
          <option value="">Select Batch</option>
        </select>
      </div>
    </div>
  </div>
     <hr>
 <div id="studentDetails" style="display: none;">
         <label for="course">Add Student Details</label>
  <div id="studentsContainer">
      

    <div class="student-entry" data-index="0" data-saved="false" data-course="">
      <div class="student-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Student #1</h6>
        <div class="student-controls">
          <button type="button" class="btn btn-sm btn-outline-primary student-minimize-btn">
            <i class="fas fa-minus"></i>
          </button>
        </div>
      </div>
      <div class="student-details">
        <div class="row">
          <div class="col-md-4 col-6">
            <div class="form-group">
              <label for="name-0">Name</label>
              <input type="text" class="form-control student-name" id="name-0" data-field="name">
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="form-group">
              <label for="gender-0">Gender</label>
              <select class="form-control student-gender" id="gender-0" name="gender-0" data-field="gender">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="form-group">
              <label for="email-0">Email</label>
              <input type="email" class="form-control" id="email-0" data-field="email">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="whatsapp-0">WhatsApp Number</label>
              <input type="tel" class="form-control" id="whatsapp-0" data-field="whatsapp">
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="form-group">
              <label for="country-0">Country</label>
              <input class="form-control" id="country-0" data-field="country">
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="form-group">
              <label for="city-0">City</label>
              <input type="text" class="form-control" id="city-0" data-field="city">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-right mt-3">
    <button style="padding:3px;" type="button" id="addStudentBtn" class="btn btn-primary">
      <i class="fas fa-plus"></i> Add More Student
    </button>
  </div>
  <div id="studentsData" style="display: none;"></div>
</div>
</div>
<script>
document.getElementById('course').addEventListener('change', function() {
  const monthCol = document.querySelector('.month-col');
  const monthSelect = document.getElementById('month');
  
  // Show month dropdown when a course is selected
  if (this.value) {
    monthCol.style.display = 'block';
  } else {
    monthCol.style.display = 'none';
    monthSelect.value = ''; // Reset month selection
  }
});

document.getElementById('month').addEventListener('change', function() {
  const course = document.getElementById('course').value;
  const month = this.value;
  
  // Check if Sound Healing is selected and month is June or July 2025
  if (course === 'Sound Healing' && (month === 'June-2025') {
    alert('For admissions in June or July, please contact the management.');
    this.value = ''; // Deselect the month after alert
  }
});
</script>

              <!-- Step 3 -->
          <!-- Step 3 -->
<!-- Step 3 -->
   <div class="wizard-step" id="step2">
            <h5>Step 2: Choose Accommodation</h5>
            <div class="container my-1 accom-section">
              <div class="row">
                <!-- Triple Sharing Card -->
                <div class="col-md-6 mb-4">
                  <div class="card">
                    <img src="https://www.adhiroha.com/img/triple-sharing-01.webp" class="card-img-top triple-sharing-img" alt="Triple Sharing">
                    <div class="card-body">
                      <div class="form-check" id="tripleSharingFormCheck">
                        <input class="form-check-input" type="radio" name="sharingType" id="tripleSharing" value="triple">
                        <label class="form-check-label" for="tripleSharing">
                          Triple Sharing <span class="full-label" id="tripleSharingFull"></span>
                        </label>
                      </div>
                      <hr>
                      <div class="fees-display" id="tripleFees">
                        <div class="non-retreat">
                          <p><strong>200 Hour YTTC Total Fees:</strong> <span id="t_fees_triple_200">€1275</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_triple_200">€300</span></p>
                          <p><strong>Balance Fee:</strong> <span id="balance_triple_200">Balance Fee to be Paid Upon Arrival: Euros 975</span></p>
                          <div id="sound_triple_200" style="display: none;">
                            <!-- Sound Healing fees for 200 -->
                          </div>
                          <p><strong>300 Hour YTTC Total Fees:</strong> <span id="t_fees_triple_300">€1500</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_triple_300">€500</span></p>
                          <p><strong>Balance Fee:</strong> <span id="balance_triple_300">Balance Fee to be Paid Upon Arrival: Euros 1000</span></p>
                          <div id="sound_triple_300" style="display: none;">
                            <!-- Sound Healing fees for 300 -->
                          </div>
                          <p><strong>500 Hour YTTC Total Fees:</strong> <span id="t_fees_triple_500">€2790</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_triple_500">€750</span></p>
                          <p><strong>Balance Fee:</strong> <span id="balance_triple_500">Balance Fee to be Paid Upon Arrival: Euros 2040</span></p>
                          <div id="sound_triple_500" style="display: none;">
                            <!-- Sound Healing fees for 500 -->
                          </div>
                        </div>
                        <div class="retreat-fees">
                          <p><strong>Yoga Retreat Total Fees:</strong> <span id="t_fees_triple_retreat">€XXX</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_triple_retreat">€XXX</span></p>
                          <div id="sound_triple_retreat" style="display: none;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Double Sharing Card -->
                <div class="col-md-6 mb-4">
                  <div class="card">
                    <img src="https://www.adhiroha.com/img/double-sharing-01.webp" class="card-img-top double-sharing-img" alt="Double Sharing">
                    <div class="card-body">
                      <div class="form-check" id="doubleSharingFormCheck">
                        <input class="form-check-input" type="radio" name="sharingType" id="doubleSharing" value="double">
                        <label class="form-check-label" for="doubleSharing">
                          Double Sharing <span class="full-label" id="doubleSharingFull"></span>
                        </label>
                      </div>
                      <hr>
                      <div class="fees-display" id="doubleFees">
                        <div class="non-retreat">
                          <p><strong>200 Hour YTTC Total Fees:</strong> <span id="t_fees_double_200">€1650</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_double_200">€300</span></p>
                          <p><strong>Balance Fee:</strong> <span id="balance_double_200">Balance Fee to be Paid Upon Arrival: Euros 1350</span></p>
                          <div id="sound_double_200" style="display: none;">
                            <!-- Sound Healing fees for 200 -->
                          </div>
                          <p><strong>300 Hour YTTC Total Fees:</strong> <span id="t_fees_double_300">€2000</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_double_300">€500</span></p>
                          <p><strong>Balance Fee:</strong> <span id="balance_double_300">Balance Fee to be Paid Upon Arrival: Euros 1500</span></p>
                          <div id="sound_double_300" style="display: none;">
                            <!-- Sound Healing fees for 300 -->
                          </div>
                          <p><strong>500 Hour YTTC Total Fees:</strong> <span id="t_fees_double_500">€3690</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_double_500">€750</span></p>
                          <p><strong>Balance Fee:</strong> <span id="balance_double_500">Balance Fee to be Paid Upon Arrival: Euros 2940</span></p>
                          <div id="sound_double_500" style="display: none;">
                            <!-- Sound Healing fees for 500 -->
                          </div>
                        </div>
                        <div class="retreat-fees">
                          <p><strong>Yoga Retreat Total Fees:</strong> <span id="t_fees_double_retreat">€XXX</span></p>
                          <p><strong>Registration Fee:</strong> <span id="r_fees_double_retreat">€XXX</span></p>
                          <div id="sound_double_retreat" style="display: none;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="balance-fee-container"></div>
                </div>
              </div>
            </div>
          </div>
              <!-- Step 4 -->
              <div class="wizard-step" id="step3">
                <h5>Step 3: Payment</h5>
                <div class="payment-section">
                  <div class="paypal-header">
                    <i class="fab fa-paypal"></i>
                    <span>Paypal</span>
                  </div>
                  <div class="fee-details">
                    <span>Registration Fee</span>
                    <span class="total-amount">€<span id="registrationFeeAmount">0.0</span></span>
                  </div>
                  <div class="fee-details">
                    <span>Paypal Transaction Fee <span class="highlight">5.5%</span> (On Registration Fee)</span>
                    <span class="total-amount">€<span id="paypalFeeAmount">0.0</span></span>
                  </div>
                  <div class="fee-details">
                    <span><strong>Total Amount</strong></span>
                    <span class="total-amount">€<span id="totalAmountWithFee">0.0</span></span>
                  </div>
                  <div class="paypal-button-container" id="paypalButtonContainer">
                    Pay €<span id="totalAmountWithFeeButton">0.0</span>
                  </div>
                  <div class="payment-footer">
                    Paypal Accepts & Support Large Number of Credit Cards
                  </div>
                </div>
              </div>
            </form>
        
          </div>
          <div class="modal-footer">
       <button type="button" class="btn btn-danger" id="nextBtn" disabled>Next</button>
                 <button type="button" class="btn btn-secondary" id="prevBtn">Previous</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="courseDetailsModal" tabindex="-1" role="dialog" aria-labelledby="courseDetailsModalLabel" style="width:auto;" aria-hidden="true">
  <div class="modal-dialog modal-md course-details-modal" role="document">
    <div class="modal-content">
    <div class="wizard-header d-flex justify-content-center align-items-center" style="cursor: pointer;">
  <h5 id="courseDetailsModalLabel" class="mb-0 me-2">Show Course Details</h5> 
  <i style="color:white;" class="fas fa-chevron-up"></i>
</div>
      <div class="modal-body">
        <ul class="nav nav-tabs" id="courseTabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="main-course-tab" data-toggle="tab" href="#main-course" role="tab">Yoga TTC</a>
          </li>
          <li class="nav-item" id="sound-healing-tab-li" style="display: none;">
            <a class="nav-link" id="sound-healing-tab" data-toggle="tab" href="#sound-healing" role="tab">Sound Healing TTC</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="main-course" role="tabpanel">
            <div class="row">
              <div class="col-md-12 text-center batch-details">
                <h5>Batch Details</h5>
                <p>No batch selected</p>
                <hr>
              </div>
              <div class="col-md-6 text-center arrival-date">
                <h5>Arrival Date</h5>
                <p>N/A</p>
                <hr>
              </div>
              <div class="col-md-6 text-center accommodation-info">
                <h5>Accommodation</h5>
                <p id="accommodationText">Select on Step 3</p>
                <hr>
              </div>
            </div>
            <div class="row mx-auto text-center">
              <div class="col-md-12">
                         <h5 class="mb-3">Fees Includes</h5>
                <div class="course-fee-i" id="mainCourseFeeItems">
           
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="sound-healing" role="tabpanel">
            <div class="row">
              <div class="col-md-12 text-center batch-details">
                <h5>Batch Details</h5>
                <p id="soundHealingBatchDetails">No batch selected</p>
                <hr>
              </div>
              <div class="col-md-12 text-center arrival-date">
                <h5>Arrival Date</h5>
                <p id="soundHealingArrivalDate">N/A</p>
                <hr>
              </div>
              <div class="col-md-12 text-center accommodation-info">
                <h5>Accommodation</h5>
                <p id="soundHealingAccommodationText">Select on Step 3</p>
                <hr>
              </div>
            </div>
            <div class="row mx-auto text-center">
              <div class="col-md-12">
                <h5 class="mb-3">Fees Includes</h5>
                <div class="course-fee-i" id="soundHealingCourseFeeItems">
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://www.paypal.com/sdk/js?client-id=AZ3m8zGq0U5lW2y5a5GqF5kQe5lK5fM5n5p5q5r5s5t5u5v5w5x5y5z¤cy=EUR"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
  let studentCount = 1;
  let countryData = null;
  let currentStep = 1;
  let studentGender = null;
  let studentDbIds = [];
  let registrationFee = 0;
  let totalWithFee = 0;
  let selectedSharingType = null;
  let selectedRoomName = null;
  let userCountry = '';
  let selectedType;
  let isSoundHealingAdded = false;
  let soundHealingBatchId = null;
  let soundHealingBatchDetails = null;
  let scholarshipDiscount = 100;
  let studentCode = ''; // Store the generated b_code

  fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(location => {
          userCountry = location.country_name || '';
          initializeStudentManagement();
          populateCountryDropdown(0);
      })
      .catch(error => {
          console.error('Error detecting country:', error);
          userCountry = '';
          initializeStudentManagement();
          populateCountryDropdown(0);
      });

  function initializeStudentManagement() {
      document.getElementById('addStudentBtn').addEventListener('click', function() {
          const lastStudentEntry = document.querySelector('.student-entry:last-child');
          if (!lastStudentEntry) {
              alert('No student entries found.');
              return;
          }
          const index = lastStudentEntry.dataset.index;
          validateAndSaveCurrentStudent(index).then(isValid => {
              if (isValid) {
                  addNewStudent();
              }
          }).catch(error => {
              console.error('Error during validation or saving:', error);
              alert('Error validating or saving student data. Please try again.');
          });
      });

      document.getElementById('studentsContainer').addEventListener('click', function(e) {
          if (e.target.classList.contains('student-minimize-btn') || 
              e.target.closest('.student-minimize-btn')) {
              const studentEntry = e.target.closest('.student-entry');
              toggleStudentForm(studentEntry);
              return;
          }

          if (e.target.classList.contains('student-expand-btn') || 
              e.target.closest('.student-expand-btn')) {
              const studentEntry = e.target.closest('.student-entry');
              expandStudentForm(studentEntry);
              return;
          }

          if (e.target.classList.contains('student-minimized') || 
              e.target.closest('.student-minimized')) {
              const studentEntry = e.target.closest('.student-entry');
              expandStudentForm(studentEntry);
              return;
          }
      });

      document.getElementById('studentsContainer').addEventListener('change', function(e) {
          if (e.target.classList.contains('student-gender')) {
              const index = e.target.closest('.student-entry').dataset.index;
              const gender = e.target.value;
              if (gender) {
                  studentGender = gender;
                  const studentEntry = document.querySelector(`.student-entry[data-index="${index}"]`);
                  studentEntry.dataset.saved = "false";
              }
          }
          validateStep2();
      });

      document.getElementById('studentsContainer').addEventListener('input', function(e) {
          if (e.target.classList.contains('student-name') || 
              e.target.classList.contains('student-gender') || 
              e.target.classList.contains('form-control')) {
              validateStep2();
          }
      });

      document.getElementById('addSoundHealing').addEventListener('change', function() {
          isSoundHealingAdded = this.checked;
          if (isSoundHealingAdded) {
              $('#sound-healing-tab-li').show();
              updateCourseInfoPanel();
          } else {
              $('#sound-healing-tab-li').hide();
              $('#sound-healing').removeClass('active');
              $('#main-course').addClass('active');
              $('#main-course-tab').addClass('active');
              $('#sound-healing-tab').removeClass('active');
          }
          updateFees();
          validateStep2();
      });
  }

function validateStep2() {
    const allEntries = document.querySelectorAll('.student-entry');
    let validEntries = 0;

    allEntries.forEach(entry => {
        const index = entry.dataset.index;
        const name = document.getElementById(`name-${index}`).value.trim();
        const gender = document.getElementById(`gender-${index}`).value;
        const email = document.getElementById(`email-${index}`).value.trim();
        const whatsapp = document.getElementById(`whatsapp-${index}`).value.trim();
        const country = document.getElementById(`country-${index}`).value;
        const city = document.getElementById(`city-${index}`).value.trim();

        if (name && gender && email && isValidEmail(email) && whatsapp && country && city) {
            validEntries++;
        } else {
            console.log(`Validation failed for student ${index}:`, {
                name, gender, email, whatsapp, country, city
            });
        }
    });

    const isValid = validEntries > 0;
    if (currentStep === 2) {
        document.getElementById('nextBtn').disabled = !isValid;
    }
    return isValid;
}

  function validateAndSaveCurrentStudent(index) {
      return new Promise((resolve, reject) => {
          const entry = document.querySelector(`.student-entry[data-index="${index}"]`);
          if (!entry) {
              reject(new Error('Student entry not found.'));
              return;
          }

          entry.querySelectorAll('.error-message').forEach(el => el.remove());

          const name = document.getElementById(`name-${index}`).value.trim();
          const gender = document.getElementById(`gender-${index}`).value;
          const email = document.getElementById(`email-${index}`).value.trim();
          const whatsapp = document.getElementById(`whatsapp-${index}`).value.trim();
          const country = document.getElementById(`country-${index}`).value;
          const city = document.getElementById(`city-${index}`).value.trim();

          let isValid = true;

          if (!name) {
              addErrorMessage(`name-${index}`, 'Name is required');
              isValid = false;
          }
          if (!gender) {
              addErrorMessage(`gender-${index}`, 'Gender is required');
              isValid = false;
          }
          if (!email) {
              addErrorMessage(`email-${index}`, 'Email is required');
              isValid = false;
          } else if (!isValidEmail(email)) {
              addErrorMessage(`email-${index}`, 'Please enter a valid email');
              isValid = false;
          }
          if (!whatsapp) {
              addErrorMessage(`whatsapp-${index}`, 'WhatsApp number is required');
              isValid = false;
          }
          if (!country) {
              addErrorMessage(`country-${index}`, 'Country is required');
              isValid = false;
          }
          if (!city) {
              addErrorMessage(`city-${index}`, 'City is required');
              isValid = false;
          }

          if (!isValid) {
              resolve(false);
              return;
          }

          resolve(true);
      });
  }

  function addErrorMessage(elementId, message) {
      const element = document.getElementById(elementId);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.style.color = '#DC3545';
      errorMsg.textContent = message;
      element.parentNode.appendChild(errorMsg);
  }

  function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }

  function formatDateRange(dateRange) {
      if (!dateRange) return 'N/A';
      const [startStr, endStr] = dateRange.split(' - ').map(s => s.trim());
      const formatDate = (dateStr) => {
          const parts = dateStr.split(' ');
          if (parts.length !== 3) return 'Invalid Date';
          const day = parseInt(parts[0], 10);
          const monthStr = parts[1].replace(/[^a-zA-Z]/g, '');
          const year = parts[2];
          const shortMonths = {
              'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
              'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
              'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
          };
          const shortMonth = shortMonths[monthStr] || monthStr;
          return `${ordinal(day)} ${shortMonth} ${year}`;
      };
      return `${formatDate(startStr)} - ${formatDate(endStr)}`;
  }

function saveStudentToDatabase(index, course, batchId, batchDateRange) {
    return new Promise((resolve, reject) => {
        const entry = document.querySelector(`.student-entry[data-index="${index}"]`);
        if (!entry) {
            reject(new Error('Student entry not found.'));
            return;
        }

        const name = document.getElementById(`name-${index}`).value.trim();
        const gender = document.getElementById(`gender-${index}`).value;
        const email = document.getElementById(`email-${index}`).value.trim();
        const whatsapp = document.getElementById(`whatsapp-${index}`).value.trim();
        const country = document.getElementById(`country-${index}`).value;
        const city = document.getElementById(`city-${index}`).value.trim();
        const formattedBatch = formatDateRange(batchDateRange);
        const retreatType = course === "Yoga Retreat" ? $("#type").val() : null;

        // Validate retreatType for Yoga Retreat
        if (course === "Yoga Retreat" && !retreatType) {
            console.error('Retreat type is missing for Yoga Retreat');
            reject(new Error('Please select a retreat type for Yoga Retreat.'));
            return;
        }

        // Calculate fees
        let registrationFee = getRegistrationFee(course, retreatType);
        let balanceFee = getBalanceFee(course, retreatType);

        console.log('Calculated Fees - Registration:', registrationFee, 'Balance:', balanceFee); // Debug log

        if (isNaN(registrationFee) || isNaN(balanceFee) || registrationFee === 0 || balanceFee === 0) {
            console.error('Invalid fee calculations:', { registrationFee, balanceFee, course, retreatType });
            reject(new Error('Invalid fee calculations for the selected course and retreat type.'));
            return;
        }

        studentCode = generateStudentCode();

        const studentData = {
            b_name: name,
            b_gender: gender,
            b_country: country,
            b_number: whatsapp,
            b_email: email,
            b_course: course === "Yoga Retreat" ? `Yoga Retreat - ${retreatType}` : course,
            b_acco: selectedSharingType ? 
                (selectedSharingType === "triple" ? "Triple Sharing" : "Double Sharing") : 
                "Triple Sharing",
            b_ramount: registrationFee,
            b_balance: balanceFee,
            b_city: city,
            b_month: formattedBatch,
            bmonth_y: 'N/A',
            room_no: selectedRoomName || 'N/A',
            b_code: studentCode,
            b_location: 'Rishikesh',
            b_status: 'pending',
            b_stime: getCurrentDateTime(),
            b_mail: '1',
            a_paid: 'n/a',
            p_method: 'n/a',
            r_no: 'n/a',
            b_remarks: 'n/a',
            b_reg: 'n/a',
            b_inv: 'null',
            b_check_inv: 'null',
            b_source: 'website',
            c_form: 'Not-uploaded',
            c_name: '',
            retreat_type: retreatType || 'N/A'
        };

        console.log('Student data being sent to server:', studentData);

        $.ajax({
            url: 'save_student.php',
            type: 'POST',
            data: studentData,
            success: function(response) {
                console.log('Server response:', response);
                try {
                    const res = JSON.parse(response);
                    if (res.id) {
                        studentDbIds.push(res.id);
                        console.log(`Student saved successfully for ${course}${retreatType ? ` - ${retreatType}` : ''}, ID:`, res.id);
                        resolve(res.id);
                    } else {
                        console.error('No ID returned from server:', res);
                        reject(new Error(`Failed to save student information for ${course}${retreatType ? ` - ${retreatType}` : ''}. No ID returned.`));
                    }
                } catch (e) {
                    console.error('Error parsing server response:', e, response);
                    reject(new Error('Error parsing server response: ' + e.message));
                }
            },
            error: function(xhr, status, error) {
                console.error(`Error saving student for ${course}${retreatType ? ` - ${retreatType}` : ''}:`, error, 'Status:', status, 'Response:', xhr.responseText);
                reject(new Error(`Failed to save student information for ${course}${retreatType ? ` - ${retreatType}` : ''}. Status: ${status}, Error: ${error}`));
            }
        });
    });
}

function addNewStudent(course = null) {
    if (studentCount >= 3) {
        alert('Maximum of 3 students allowed per booking.');
        return;
    }

    document.querySelectorAll('.student-entry:not(.minimized)').forEach(entry => {
        minimizeStudentForm(entry);
    });

    const newIndex = studentCount;
    studentCount++;

    // Default template agar studentTemplate nahi mila
    let templateElement = document.getElementById('studentTemplate');
    let template;
    if (templateElement) {
        template = templateElement.innerHTML
            .replace(/INDEX/g, newIndex)
            .replace(/NUMBER/g, studentCount);
    } else {
        // Hardcoded fallback template
        console.warn('studentTemplate not found, using fallback template');
        template = `
            <div class="student-entry" data-index="${newIndex}" data-saved="false" data-course="">
                <div class="student-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">Student #${studentCount}</h6>
                    <div class="student-controls">
                        <button type="button" class="btn btn-sm btn-outline-primary student-minimize-btn">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="student-details">
                    <div class="row">
                        <div class="col-md-4 col-6">
                            <div class="form-group mb-3">
                                <input type="text" class="form-control student-name" placeholder="Name" id="name-${newIndex}" data-field="name">
                            </div>
                        </div>
                        <div class="col-md-4 col-6">
                            <div class="form-group mb-3">
                                <select class="form-control student-gender" id="gender-${newIndex}"  name="gender-${newIndex}" data-field="gender">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-12">
                            <div class="form-group mb-3">
                                <input type="email" class="form-control" placeholder="Email" id="email-${newIndex}" data-field="email">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-6">
                            <div class="form-group mb-3">
                                <input class="form-control" id="country-${newIndex}" placeholder="Country" data-field="country">
                            </div>
                        </div>
                        <div class="col-md-4 col-6">
                            <div class="form-group mb-3">
                                <input type="text" class="form-control" placeholder="City" id="city-${newIndex}" data-field="city">
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <input type="tel" class="form-control" placeholder="WhatsApp Number" id="whatsapp-${newIndex}" data-field="whatsapp">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;
    const newStudentEntry = tempDiv.firstElementChild;
    newStudentEntry.dataset.course = course || $("#course").val();

    document.getElementById('studentsContainer').appendChild(newStudentEntry);

    populateCountryDropdown(newIndex);

    if (studentCount >= 3) {
        document.getElementById('addStudentBtn').disabled = true;
    }

    validateStep2();
}

  function populateCountryDropdown(index) {
    const countryInput = document.getElementById(`country-${index}`);
    if (!countryInput) {
        console.error(`Country input with ID country-${index} not found.`);
        return;
    }

    // Set the detected country as the default value for the input field
    if (userCountry) {
        countryInput.value = userCountry;
    }

    // Add input event listener to validate the country field in real-time
    countryInput.addEventListener('input', function() {
        validateStep2();
    });
}

function populateCountryOptions(selectElement, countries, selectedCountry = '') {
    // This function is no longer needed since we're using an input field instead of a select dropdown
    // Keeping it as a placeholder to avoid breaking other parts of the code
    console.warn('populateCountryOptions is deprecated as country is now a text input.');
}

  function toggleStudentForm(studentEntry) {
      if (studentEntry.classList.contains('minimized')) {
          expandStudentForm(studentEntry);
      } else {
          minimizeStudentForm(studentEntry);
      }
  }

  function minimizeStudentForm(studentEntry) {
      const index = studentEntry.dataset.index;
      const name = document.getElementById(`name-${index}`).value || 'Unnamed Student';
      const gender = document.getElementById(`gender-${index}`).value;
      const course = studentEntry.dataset.course || 'N/A';
      const genderText = gender ? 
          (gender === 'male' ? 'Male' : 
           gender === 'female' ? 'Female' : 'Other') : '';
      const detailsDiv = studentEntry.querySelector('.student-details');
      detailsDiv.style.display = 'none';
      const header = studentEntry.querySelector('.student-header');
      header.innerHTML = `
          <div class="student-summary">
              ${name} ${genderText ? '- ' + genderText : ''} (${course})
          </div>
          <div class="student-controls">
              <button type="button" class="btn btn-sm btn-outline-primary student-expand-btn">
                  <i class="fas fa-plus"></i>
              </button>
          </div>
      `;
      studentEntry.classList.add('minimized');
  }

  function expandStudentForm(studentEntry) {
      const index = studentEntry.dataset.index;
      const header = studentEntry.querySelector('.student-header');
      header.innerHTML = `
          <h6 class="mb-0">Student #${parseInt(index) + 1}</h6>
          <div class="student-controls">
              <button type="button" class="btn btn-sm btn-outline-primary student-minimize-btn">
                  <i class="fas fa-minus"></i>
              </button>
          </div>
      `;
      const detailsDiv = studentEntry.querySelector('.student-details');
      detailsDiv.style.display = 'block';
      studentEntry.classList.remove('minimized');
  }

  function generateStudentCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < 11; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
  }

function getRegistrationFee(course, retreatType = null) {
    const fees = {
        "200 Hour YTTC": 300,
        "300 Hour YTTC": 500,
        "500 Hour YTTC": 750,
        "Sound Healing": 300,
        "Yoga Retreat": {
            "Mantra & Meditation": 300,
            "Ayurvedic Wellness Retreat": 300,
            "Gita Vedanta Retreat": 300
        }
    };
    if (course === "Yoga Retreat" && retreatType) {
        return fees[course][retreatType];
    }
    return fees[course] || 0;
}

function getBalanceFee(course, retreatType = null) {
    const balanceFees = {
        200: {
            triple: 975,
            double: 1350
        },
        300: {
            triple: 1000,
            double: 1500
        },
        500: {
            triple: 2040,
            double: 2940
        },
        sound_healing: {
            triple: 390,
            double: 495
        },
        yoga_retreat: {
            "Mantra & Meditation": {
                triple: 99,
                double: 210
            },
            "Ayurvedic Wellness Retreat": {
                triple: 210,
                double: 360
            },
            "Gita Vedanta Retreat": {
                triple: 99,
                double: 210
            }
        }
    };

    const courseType = courseTypeMap[course] || "yoga_retreat";
    console.log('getBalanceFee - Course:', course, 'Retreat Type:', retreatType, 'Selected Sharing:', selectedSharingType); // Debug log

    if (course === "Yoga Retreat") {
        if (!retreatType || !balanceFees.yoga_retreat[retreatType]) {
            console.error('Invalid or missing retreat type for Yoga Retreat:', retreatType);
            return 0; // Fallback to 0
        }
        const sharingType = selectedSharingType || "triple";
        const fee = balanceFees.yoga_retreat[retreatType][sharingType] || 0;
        console.log('Balance Fee for Yoga Retreat:', fee); // Debug log
        return fee;
    }

    const sharingType = selectedSharingType || "triple";
    const fee = balanceFees[courseType][sharingType] || 0;
    console.log('Balance Fee for', courseType, ':', fee); // Debug log
    return fee;
}

  function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function ordinal(number) {
      const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
      const v = number % 100;
      return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const courseTypeMap = {
      "200 Hour YTTC": 200,
      "300 Hour YTTC": 300,
      "500 Hour YTTC": 500,
      "Sound Healing": "sound_healing"
  };

  const courseDays = {
      200: 24,
      300: 30,
      500: 60,
      "sound_healing": 6
  };

  const monthMap = {
      "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
      "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11,
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
  };

function updateCourseFeeItems(course, containerId) {
    const courseFeeItemsContainer = $(`#${containerId}`);
    courseFeeItemsContainer.empty();
    const days = courseDays[courseTypeMap[course]] || 7; // Default to 7 days for Yoga Retreat
    const items = course === "Sound Healing" || course === "Yoga Retreat" ? [
        `<span class="course-item"><i class="fas fa-calendar-alt icon"></i> Stay for ${days} days</span>`,
        `<span class="course-item"><i class="fas fa-utensils icon"></i> Breakfast, Lunch & Dinner</span>`
    ] : [
        `<span class="course-item"><i class="fas fa-calendar-alt icon"></i> Stay for ${days} days</span>`,
        `<span class="course-item"><i class="fas fa-utensils icon"></i> Breakfast, Lunch & Dinner</span>`,
        `<span class="course-item"><i class="fas fa-spa icon"></i> Yoga Session on the Ganga Ji Ghat</span>`,
        `<span class="course-item"><i class="fas fa-shuttle-van icon"></i> Pickup From Dehradun Airport</span>`,
        `<span class="course-item"><i class="fas fa-music icon"></i> Sound Healing Session</span>`,
        `<span class="course-item"><i class="fas fa-hiking icon"></i> Weekly Excursion</span>`
    ];
    courseFeeItemsContainer.append(items.join(''));
}
function populateTypeDropdown() {
    const typeSelect = $("#type");
    typeSelect.empty();
    typeSelect.append('<option value="">Select Type</option>');
    
    // Hardcoded retreat types
    const retreatTypes = ["Ayurvedic Wellness Retreat", "Gita Vedanta Retreat", "Mantra & Meditation"];
    retreatTypes.forEach(function(type) {
        typeSelect.append(`<option value="${type}">${type}</option>`);
    });
    
    $(".type-col").show();
    $(".course-col, .type-col, .batch-col").removeClass('col-md-6').addClass('col-md-4');
}

function updateCourseInfoPanel() {
  const course = $("#course").val();
  const batchId = $("#batch").val();
  const selectedOption = $("#batch").find('option:selected');
  const fullDateRange = selectedOption.data('full-date');

  // Clear previous content
  $("#courseDetailsModal .batch-details p").text("No batch selected");
  $("#courseDetailsModal .arrival-date p").text("N/A");
  $("#courseDetailsModal .accommodation-info p").text("Select on Step 3");
  $("#mainCourseFeeItems, #soundHealingCourseFeeItems").empty();

  if (batchId && course) {
    $("#mainCourseFeeItems").empty();
    updateCourseFeeItems(course, "mainCourseFeeItems");
    $("#courseDetailsModal .batch-details p").text(formatDateRange(fullDateRange));
    var startStr = fullDateRange.split(' - ')[0].trim();
    var parts = startStr.split(' ');
    if (parts.length === 3) {
      var dayStr = parts[0];
      var monthStr = parts[1].replace(/[^a-zA-Z]/g, '');
      var yearStr = parts[2];
      var day = parseInt(dayStr, 10);
      var month = monthMap[monthStr];
      var year = parseInt(yearStr, 10);
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        var sDate = new Date(year, month, day);
        if (!isNaN(sDate.getTime())) {
          if (course === "Sound Healing" || course === "Yoga Retreat") {
            $("#courseDetailsModal .arrival-date p").text(ordinal(day) + ' ' + monthStr + ' ' + year);
          } else {
            var arrival = new Date(sDate.getTime() - 24 * 60 * 60 * 1000);
            var aDay = arrival.getDate();
            var aMon = arrival.toLocaleString('en-US', { month: 'short' });
            var aYear = arrival.getFullYear();
            $("#courseDetailsModal .arrival-date p").text(ordinal(aDay) + ' ' + aMon + ' ' + aYear);
          }
        } else {
          $("#courseDetailsModal .arrival-date p").text('Invalid Date');
        }
      } else {
        $("#courseDetailsModal .arrival-date p").text('Invalid Date');
      }
    } else {
      $("#courseDetailsModal .arrival-date p").text('Invalid Date');
    }

    if (isSoundHealingAdded) {
      $('#sound-healing-tab-li').show();
      fetchSoundHealingBatch(course, fullDateRange);
    } else {
      $('#sound-healing-tab-li').hide();
      $('#sound-healing').removeClass('active');
      $('#main-course').addClass('active');
      $('#main-course-tab').addClass('active');
      $('#sound-healing-tab').removeClass('active');
    }
  } else {
    $('#sound-healing-tab-li').hide();
    $('#sound-healing').removeClass('active');
    $('#main-course').addClass('active');
    $('#main-course-tab').addClass('active');
    $('#sound-healing-tab').removeClass('active');
  }

  $("#nextBtn").prop("disabled", !batchId || !course);
}

function fetchSoundHealingBatch(mainCourse, mainCourseDateRange) {
  const mainCourseType = courseTypeMap[mainCourse];
  let targetMonth = null;
  let targetYear = null;

  if (mainCourseDateRange) {
    const startStr = mainCourseDateRange.split(' - ')[0].trim();
    const parts = startStr.split(' ');
    if (parts.length === 3) {
      const monthStr = parts[1].replace(/[^a-zA-Z]/g, '');
      const yearStr = parts[2];
      targetMonth = monthMap[monthStr];
      targetYear = parseInt(yearStr, 10);
      if (mainCourseType === 300 && mainCourse !== "Sound Healing") {
        targetMonth -= 1;
      }
    }
  }

  $.ajax({
    url: 'get_batches.php',
    type: 'GET',
    data: { type: 'sound_healing' },
    success: function(data) {
      var batches = JSON.parse(data);
      let selectedBatch = null;

      if (targetMonth !== null && targetYear !== null) {
        selectedBatch = batches.find(batch => {
          const batchStart = batch.date_range.split(' - ')[0].trim();
          const batchParts = batchStart.split(' ');
          if (batchParts.length === 3) {
            const batchMonth = monthMap[batchParts[1].replace(/[^a-zA-Z]/g, '')];
            const batchYear = parseInt(batchParts[2], 10);
            return batchMonth === targetMonth && batchYear === targetYear && batch.status !== 'sold';
          }
          return false;
        });
      }

      if (!selectedBatch) {
        selectedBatch = batches.find(batch => batch.status !== 'sold') || batches[0];
      }

      if (selectedBatch) {
        soundHealingBatchId = selectedBatch.id;
        soundHealingBatchDetails = selectedBatch;
        $("#courseDetailsModal #soundHealingBatchDetails").text(formatDateRange(selectedBatch.date_range));
        const startStr = selectedBatch.date_range.split(' - ')[0].trim();
        const parts = startStr.split(' ');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = monthMap[parts[1].replace(/[^a-zA-Z]/g, '')];
          const year = parseInt(parts[2], 10);
          if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            const sDate = new Date(year, month, day);
            if (!isNaN(sDate.getTime())) {
              $("#courseDetailsModal #soundHealingArrivalDate").text(ordinal(day) + ' ' + parts[1] + ' ' + year);
            } else {
              $("#courseDetailsModal #soundHealingArrivalDate").text('Invalid Date');
            }
          } else {
            $("#courseDetailsModal #soundHealingArrivalDate").text('Invalid Date');
          }
        } else {
          $("#courseDetailsModal #soundHealingArrivalDate").text('Invalid Date');
        }
        updateCourseFeeItems("Sound Healing", "soundHealingCourseFeeItems");
      } else {
        $("#courseDetailsModal #soundHealingBatchDetails").text('No Available Batch');
        $("#courseDetailsModal #soundHealingArrivalDate").text('N/A');
        updateCourseFeeItems("Sound Healing", "soundHealingCourseFeeItems");
      }
    },
    error: function() {
      alert('Error fetching Sound Healing batches');
      $("#courseDetailsModal #soundHealingBatchDetails").text('Error Loading Batch');
      $("#courseDetailsModal #soundHealingArrivalDate").text('N/A');
    }
  });
}

function updateProgress(step) {
  $(".stepwizard-step").removeClass("active completed");
  $(".stepwizard-step").each(function(index) {
    if (index + 1 < step) {
      $(this).addClass("completed");
    } else if (index + 1 === step) {
      $(this).addClass("active");
    }
  });
}

function showStep(step) {
  $(".wizard-step").removeClass("active");
  $("#step" + step).addClass("active");
  $("#prevBtn").toggle(step > 1);
  $("#nextBtn").toggle(step < 3);

  if (step === 1) {
    $(".modal-footer").addClass("first-step");
    const course = $("#course").val();
    const month = $("#month").val();
    const batch = $("#batch").val();
    const type = $("#type").val();
    const allEntries = document.querySelectorAll('.student-entry');
    let validEntries = 0;

    allEntries.forEach(entry => {
      const index = entry.dataset.index;
      const name = document.getElementById(`name-${index}`)?.value?.trim();
      const gender = document.getElementById(`gender-${index}`)?.value;
      const email = document.getElementById(`email-${index}`)?.value?.trim();
      const whatsapp = document.getElementById(`whatsapp-${index}`)?.value?.trim();
      const country = document.getElementById(`country-${index}`)?.value;
      const city = document.getElementById(`city-${index}`)?.value?.trim();

      if (name && gender && email && isValidEmail(email) && whatsapp && country && city) {
        validEntries++;
      }
    });

    const isValid = validEntries > 0 && course && batch && (course !== "Yoga Retreat" || type) && (course !== "Sound Healing" || month);
    $("#nextBtn").prop("disabled", !isValid);

    // Show or hide studentDetails based on batch selection
    if (batch) {
      $("#studentDetails").slideDown();
    } else {
      $("#studentDetails").slideUp();
    }
  } else {
    $(".modal-footer").removeClass("first-step");
  }

  if (step === 1) {
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").css("color", "#DC3545");
  } else {
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").css("color", "#000000");
  }

  if (step === 3) {
    initializePaypalButton();
    updatePaymentDetails();
    if (selectedSharingType) {
      $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(
        selectedSharingType === "triple" ? "Triple Sharing" : "Double Sharing"
      );
    }
    $("#nextBtn").hide();
  } else {
    $("#nextBtn").text("Next").show();
  }
  updateProgress(step);
  if (step === 2) {
    const course = $("#course").val();
    selectedSharingType = null;
    selectedRoomName = null;
    $("#tripleSharing, #doubleSharing").prop("checked", false);
    $("#roomOptions").empty();
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Select on Step 2");
    $("#tripleFees, #doubleFees").show();
    updateFees();
    if (course === "200 Hour YTTC" || course === "300 Hour YTTC" || course === "500 Hour YTTC") {
      $("#roomSelection").css("display", "block");
      fetchRoomAvailability();
    } else {
      $("#roomSelection").css("display", "none");
      $("#tripleSharingFormCheck, #doubleSharingFormCheck").removeClass('disabled');
      $("#tripleSharing, #doubleSharing").prop('disabled', false);
      $("#tripleSharingFull, #doubleSharingFull").text('');
    }
  } else if (step !== 3) {
    $("#tripleFees, #doubleFees").hide();
    $("#roomSelection").css("display", "none");
    $("#roomOptions").empty();
    selectedSharingType = null;
    selectedRoomName = null;
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Select on Step 2");
  }

  const modalContent = document.querySelector('.modal-content');
  const modalFooter = document.querySelector('.modal-footer');
  if (modalContent && modalFooter) {
    modalContent.appendChild(modalFooter);
  } else {
    console.error('modalContent or modalFooter not found in the DOM');
  }

  $(".modal-body").scrollTop(0);

  if (step === 1) {
    validateStep2();
  }
}

  function updatePaymentDetails() {
      const paypalFee = registrationFee * 0.055;
      totalWithFee = registrationFee + paypalFee;
      $("#registrationFeeAmount").text(registrationFee.toFixed(1));
      $("#paypalFeeAmount").text(paypalFee.toFixed(1));
      $("#totalAmountWithFee").text(totalWithFee.toFixed(1));
      $("#totalAmountWithFeeButton").text(totalWithFee.toFixed(1));
  }
 function initializePaypalButton() {
        $("#paypalButtonContainer").off('click');
        $("#paypalButtonContainer").on('click', function() {
            const course = $("#course").val();
            // Check if studentCode and selectedSharingType are present
            if (!studentCode || !selectedSharingType) {
                alert('Please ensure all student details and accommodation type are selected.');
                return;
            }

            const acco = selectedSharingType === "triple" ? "Triple Sharing" : "Double Sharing";
            const thankYouUrl = `https://adhiroha.com/thank-you.php?view_id=${encodeURIComponent(studentCode)}&acco=${encodeURIComponent(acco)}&room=${encodeURIComponent(selectedRoomName || 'N/A')}`;

            console.log('Constructed Thank You URL:', thankYouUrl);

            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=adhiroha@gmail.com&utm_source=website&utm_medium=signup_form&currency_code=EUR&amount=${totalWithFee.toFixed(2)}&item_name=Registration Fee ${encodeURIComponent(acco)}&return=${encodeURIComponent(thankYouUrl)}`;

            window.location.href = paypalUrl;
        });
    }


  function hideCourseInfo() {
      $("#courseInfoPanel").slideUp();
      $("#toggleInfoBtn").text("Show Course Info");
  }


function updateFees() {
    const course = $("#course").val();
    const retreatType = $("#type").val();
    const mainCourseType = courseTypeMap[course] || course;

    // Reset all fee displays to XXX or hide them
    $("#t_fees_triple_200, #r_fees_triple_200, #t_fees_double_200, #r_fees_double_200").text('€XXX');
    $("#t_fees_triple_300, #r_fees_triple_300, #t_fees_double_300, #r_fees_double_300").text('€XXX');
    $("#t_fees_triple_500, #r_fees_triple_500, #t_fees_double_500, #r_fees_double_500").text('€XXX');
    $("#t_fees_triple_sound_200, #r_fees_triple_sound_200, #t_fees_double_sound_200, #r_fees_double_sound_200").text('€XXX');
    $("#t_fees_triple_sound_300, #r_fees_triple_sound_300, #t_fees_double_sound_300, #r_fees_double_sound_300").text('€XXX');
    $("#t_fees_triple_sound_500, #r_fees_triple_sound_500, #t_fees_double_sound_500, #r_fees_double_sound_500").text('€XXX');
    $("#t_fees_triple_retreat, #r_fees_triple_retreat, #t_fees_double_retreat, #r_fees_double_retreat").text('€XXX');
    $("#scholarship_triple_200, #scholarship_double_200").text('€0');
    $("#scholarship_triple_300, #scholarship_double_300").text('€0');
    $("#scholarship_triple_500, #scholarship_double_500").text('€0');
    $("#total_separate_triple_200, #total_separate_double_200").text('€0');
    $("#total_separate_triple_300, #total_separate_double_300").text('€0');
    $("#total_separate_triple_500, #total_separate_double_500").text('€0');
    $("#combo_triple_200, #combo_double_200").text('€0');
    $("#combo_triple_300, #combo_double_300").text('€0');
    $("#combo_triple_500, #combo_double_500").text('€0');
    $("#total_reg_triple_200, #total_reg_double_200").text('€0');
    $("#total_reg_triple_300, #total_reg_double_300").text('€0');
    $("#total_reg_triple_500, #total_reg_double_500").text('€0');
    $("#balance_triple_200, #balance_double_200").text('Balance Fee to be Paid Upon Arrival: Euros XXX');
    $("#balance_triple_300, #balance_double_300").text('Balance Fee to be Paid Upon Arrival: Euros XXX');
    $("#balance_triple_500, #balance_double_500").text('Balance Fee to be Paid Upon Arrival: Euros XXX');
    $("#balance_triple_retreat, #balance_double_retreat").text('Balance Fee to be Paid Upon Arrival: Euros XXX');
    $("#sound_triple_200, #sound_double_200").hide();
    $("#sound_triple_300, #sound_double_300").hide();
    $("#sound_triple_500, #sound_double_500").hide();
    $("#sound_triple_retreat, #sound_double_retreat").hide();

    // Hide all fee sections by default
    $("#tripleFees .non-retreat, #doubleFees .non-retreat").hide();
    $("#tripleFees .retreat-fees, #doubleFees .retreat-fees").hide();
    $('.accom-section .balance-fee-container').empty().hide();

    // Always show fees if course is selected
    if (!course) {
        return;
    }

    const fees = {
        200: {
            triple: { total: 1275, reg: 300, balance: 975, combo: 1875, separate: 1965, scholarship: 90 },
            double: { total: 1650, reg: 300, balance: 1350, combo: 2350, separate: 2445, scholarship: 95 }
        },
        300: {
            triple: { total: 1500, reg: 500, balance: 1000, combo: 2100, separate: 2190, scholarship: 90 },
            double: { total: 2000, reg: 500, balance: 1500, combo: 2700, separate: 2795, scholarship: 95 }
        },
        500: {
            triple: { total: 2790, reg: 750, balance: 2040, combo: 3270, separate: 3480, scholarship: 210 },
            double: { total: 3690, reg: 750, balance: 2940, combo: 4230, separate: 4485, scholarship: 255 }
        },
        sound_healing: {
            triple: { total: 690, reg: 300, balance: 390 },
            double: { total: 795, reg: 300, balance: 495 }
        },
        yoga_retreat: {
            'Mantra & Meditation': {
                triple: { total: 399, reg: 300, balance: 99 },
                double: { total: 510, reg: 300, balance: 210 }
            },
            'Ayurvedic Wellness Retreat': {
                triple: { total: 510, reg: 300, balance: 210 },
                double: { total: 660, reg: 300, balance: 360 }
            },
            'Gita Vedanta Retreat': {
                triple: { total: 399, reg: 300, balance: 99 },
                double: { total: 510, reg: 300, balance: 210 }
            }
        }
    };

    const courseId = mainCourseType === 200 ? '200' : mainCourseType === 300 ? '300' : mainCourseType === "sound_healing" ? '200' : mainCourseType === "Yoga Retreat" ? 'retreat' : '500';

    if (course === "Yoga Retreat" && retreatType) {
        $("#tripleFees .retreat-fees").html(`
            <p><strong>${retreatType} Total Fees:</strong> <span id="t_fees_triple_retreat">€${fees.yoga_retreat[retreatType].triple.total}</span></p>
            <p><strong>Registration Fee:</strong> <span id="r_fees_triple_retreat">€${fees.yoga_retreat[retreatType].triple.reg}</span></p>
        `);
        $("#doubleFees .retreat-fees").html(`
            <p><strong>${retreatType} Total Fees:</strong> <span id="t_fees_double_retreat">€${fees.yoga_retreat[retreatType].double.total}</span></p>
            <p><strong>Registration Fee:</strong> <span id="r_fees_double_retreat">€${fees.yoga_retreat[retreatType].double.reg}</span></p>
        `);
        $("#balance_triple_retreat").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.yoga_retreat[retreatType].triple.balance}`);
        $("#balance_double_retreat").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.yoga_retreat[retreatType].double.balance}`);
        $("#tripleFees .retreat-fees, #doubleFees .retreat-fees").show();
        $("#tripleFees, #doubleFees").show();
        registrationFee = selectedSharingType === 'double' ? 
            fees.yoga_retreat[retreatType].double.reg : 
            fees.yoga_retreat[retreatType].triple.reg;
    } else if (course === "Sound Healing") {
        $("#tripleSharingFormCheck label").text('Triple Sharing');
        $("#doubleSharingFormCheck label").text('Double Sharing');
        $("#t_fees_triple_200").text(`€${fees.sound_healing.triple.total}`);
        $("#r_fees_triple_200").text(`€${fees.sound_healing.triple.reg}`);
        $("#balance_triple_200").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.sound_healing.triple.balance}`);
        $("#t_fees_double_200").text(`€${fees.sound_healing.double.total}`);
        $("#r_fees_double_200").text(`€${fees.sound_healing.double.reg}`);
        $("#balance_double_200").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.sound_healing.double.balance}`);
        $("#tripleFees .non-retreat, #doubleFees .non-retreat").show();
        $("#tripleFees, #doubleFees").show();
        registrationFee = selectedSharingType === 'double' ? 
            fees.sound_healing.double.reg : 
            fees.sound_healing.triple.reg;
    } else {
        $("#tripleSharingFormCheck label").text('Triple Sharing');
        $("#doubleSharingFormCheck label").text('Double Sharing');
        $("#t_fees_triple_" + courseId).text(`€${fees[mainCourseType].triple.total}`);
        $("#r_fees_triple_" + courseId).text(`€${fees[mainCourseType].triple.reg}`);
        $("#t_fees_double_" + courseId).text(`€${fees[mainCourseType].double.total}`);
        $("#r_fees_double_" + courseId).text(`€${fees[mainCourseType].double.reg}`);
        if (isSoundHealingAdded) {
            $("#t_fees_triple_sound_" + courseId).text(`€${fees.sound_healing.triple.total}`);
            $("#r_fees_triple_sound_" + courseId).text(`€${fees.sound_healing.triple.reg}`);
            $("#t_fees_double_sound_" + courseId).text(`€${fees.sound_healing.double.total}`);
            $("#r_fees_double_sound_" + courseId).text(`€${fees.sound_healing.double.reg}`);
            $("#scholarship_triple_" + courseId).text(`€${fees[mainCourseType].triple.scholarship}`);
            $("#scholarship_double_" + courseId).text(`€${fees[mainCourseType].double.scholarship}`);
            $("#total_separate_triple_" + courseId).text(`€${fees[mainCourseType].triple.separate}`);
            $("#combo_triple_" + courseId).text(`€${fees[mainCourseType].triple.combo}`);
            $("#total_separate_double_" + courseId).text(`€${fees[mainCourseType].double.separate}`);
            $("#combo_double_" + courseId).text(`€${fees[mainCourseType].double.combo}`);
            $("#total_reg_triple_" + courseId).text(`€${fees[mainCourseType].triple.reg + fees.sound_healing.triple.reg}`);
            $("#total_reg_double_" + courseId).text(`€${fees[mainCourseType].double.reg + fees.sound_healing.double.reg}`);
            $("#sound_triple_" + courseId + ", #sound_double_" + courseId).show();
            $("#balance_triple_" + courseId).text(`Balance Fee to be Paid Upon Arrival: Euros ${fees[mainCourseType].triple.combo - (fees[mainCourseType].triple.reg + fees.sound_healing.triple.reg)}`);
            $("#balance_double_" + courseId).text(`Balance Fee to be Paid Upon Arrival: Euros ${fees[mainCourseType].double.combo - (fees[mainCourseType].double.reg + fees.sound_healing.double.reg)}`);
            registrationFee = selectedSharingType === 'double' ? 
                fees[mainCourseType].double.reg + fees.sound_healing.double.reg : 
                fees[mainCourseType].triple.reg + fees.sound_healing.triple.reg;
        } else {
            $("#sound_triple_" + courseId + ", #sound_double_" + courseId).hide();
            $("#balance_triple_" + courseId).text(`Balance Fee to be Paid Upon Arrival: Euros ${fees[mainCourseType].triple.balance}`);
            $("#balance_double_" + courseId).text(`Balance Fee to be Paid Upon Arrival: Euros ${fees[mainCourseType].double.balance}`);
            registrationFee = selectedSharingType === 'double' ? 
                fees[mainCourseType].double.reg : 
                fees[mainCourseType].triple.reg;
        }
        $("#tripleFees .non-retreat, #doubleFees .non-retreat").show();
        $("#tripleFees, #doubleFees").show();
    }

    const balanceContainer = $('.accom-section .balance-fee-container');
    if (selectedSharingType && course) {
        const isSoundHealing = course === "Sound Healing";
        const isYogaRetreat = course === "Yoga Retreat";
        const totalRegAmount = isYogaRetreat ? 
            (selectedSharingType === 'double' ? 
                fees.yoga_retreat[retreatType].double.reg : 
                fees.yoga_retreat[retreatType].triple.reg) :
            (isSoundHealing ? 
                (selectedSharingType === 'double' ? 
                    fees.sound_healing.double.reg : 
                    fees.sound_healing.triple.reg) :
                (isSoundHealingAdded ? 
                    (selectedSharingType === 'double' ? 
                        fees[mainCourseType].double.reg + fees.sound_healing.double.reg : 
                        fees[mainCourseType].triple.reg + fees.sound_healing.triple.reg) : 
                    fees[mainCourseType][selectedSharingType].reg));
        const balanceAmount = isYogaRetreat ? 
            (selectedSharingType === 'double' ? 
                fees.yoga_retreat[retreatType].double.balance : 
                fees.yoga_retreat[retreatType].triple.balance) :
            (isSoundHealing ? 
                (selectedSharingType === 'double' ? 
                    fees.sound_healing.double.balance : 
                    fees.sound_healing.triple.balance) :
                (isSoundHealingAdded ? 
                    (selectedSharingType === 'double' ? 
                        fees[mainCourseType].double.combo - (fees[mainCourseType].double.reg + fees.sound_healing.double.reg) : 
                        fees[mainCourseType].triple.combo - (fees[mainCourseType].triple.reg + fees.sound_healing.triple.reg)) : 
                    fees[mainCourseType][selectedSharingType].balance));
        balanceContainer.html(`
            <div class="col-md-12 mb-2 mt-2">
                <p class="total-registration-fees">Total Registration Fees: Euros ${totalRegAmount}</p>
                <p id="balance_fee_${courseId}">Balance Fee to be Paid Upon Arrival: Euros ${balanceAmount}</p>
            </div>
        `).show();
    } else {
        balanceContainer.empty().hide();
    }
}

function updateRoomOptions(sharingType) {
  const course = $("#course").val();
  const tripleSharingImg = $(".triple-sharing-img");
  const doubleSharingImg = $(".double-sharing-img");
  const roomOptionsContainer = $("#roomOptions");
  roomOptionsContainer.empty();

  // Update accommodation text in course details modal
  $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(
    sharingType === "triple" ? "Triple Sharing" : (sharingType === "double" ? "Double Sharing" : "Select on Step 3")
  );

  // Explicitly hide room selection for Sound Healing and Yoga Retreat
  if (course === "Sound Healing" || course === "Yoga Retreat") {
    $("#roomSelection").css("display", "none");
    $("#roomOptions").empty();
    tripleSharingImg.attr("src", "https://www.adhiroha.com/img/triple-sharing-01.webp");
    tripleSharingImg.attr("alt", "Triple Sharing");
    doubleSharingImg.attr("src", "https://www.adhiroha.com/img/double-sharing-01.webp");
    doubleSharingImg.attr("alt", "Double Sharing");
    return;
  }

  // Room selection for Yoga TTC
  tripleSharingImg.attr("src", "https://www.adhiroha.com/img/triple-sharing-01.webp");
  tripleSharingImg.attr("alt", "Triple Sharing");
  doubleSharingImg.attr("src", "https://www.adhiroha.com/img/double-sharing-01.webp");
  doubleSharingImg.attr("alt", "Double Sharing");

  let rooms = [];
  if (sharingType === "triple") {
    rooms = ['ANUSHASANA-C', 'SHADHNA-C', 'BHAKTI-C', 'ANANDA-C', 'NIYAMA-C', 'ABHYASA-C', 'NIRVANA-C', 'DHYANA-C'];
  } else if (sharingType === "double") {
    rooms = ['SATYA', 'SHANTI', 'SANKALPA', 'BODHI'];
  }

  rooms.forEach(room => {
    const isAvailable = selectedType === "sound_healing" ? true :
      (window.availableRooms && window.availableRooms.includes(room.replace('-C', '')));
    const roomId = room.toLowerCase().replace('-c', '');
    const roomHtml = `
      <div class="room-option${!isAvailable ? ' disabled' : ''}">
        <input type="radio" name="roomName" id="${roomId}" value="${room}" ${!isAvailable ? 'disabled' : ''} ${selectedRoomName === room ? 'checked' : ''}>
        <label for="${roomId}">${room.replace('-C', '')}</label>
      </div>
    `;
    roomOptionsContainer.append(roomHtml);
  });

  $("#roomSelection").css("display", rooms.length > 0 ? "block" : "none");
}

$("#course").off('change').on('change', function() {
    var course = $(this).val();
    isSoundHealingAdded = false;
    $("#addSoundHealing").prop('checked', false).prop('disabled', !course);
    
    const mainCourseTab = $("#main-course-tab");
    const tripleSharingImg = $(".triple-sharing-img");
    const doubleSharingImg = $(".double-sharing-img");

    if (course === "Yoga Retreat") {
        mainCourseTab.text("Yoga Retreat");
        $("#addSoundHealing").closest('.form-check').hide();
        $(".month-col").hide();
        $(".type-col").show();
        $(".course-col, .type-col, .batch-col").removeClass('col-md-6').addClass('col-md-4');
        $("#tripleSharingFormCheck label").text('Triple Sharing');
        $("#doubleSharingFormCheck label").text('Double Sharing');
        tripleSharingImg.attr("src", "https://www.adhiroha.com/img/triple-sharing-01.webp");
        tripleSharingImg.attr("alt", "Triple Sharing");
        doubleSharingImg.attr("src", "https://www.adhiroha.com/img/double-sharing-01.webp");
        doubleSharingImg.attr("alt", "Double Sharing");
        $("#roomSelection").css("display", "none"); // Hide room selection
        populateTypeDropdown();
    } else if (course === "Sound Healing") {
        mainCourseTab.text("Sound Healing TTC");
        $("#addSoundHealing").closest('.form-check').hide();
        $(".month-col").show();
        $(".type-col").hide();
        $(".course-col, .month-col, .batch-col").removeClass('col-md-6').addClass('col-md-4');
        $("#tripleSharingFormCheck label").text('Triple Sharing');
        $("#doubleSharingFormCheck label").text('Double Sharing');
        tripleSharingImg.attr("src", "https://www.adhiroha.com/img/triple-sharing-01.webp");
        tripleSharingImg.attr("alt", "Triple Sharing");
        doubleSharingImg.attr("src", "https://www.adhiroha.com/img/double-sharing-01.webp");
        doubleSharingImg.attr("alt", "Double Sharing");
        $("#roomSelection").css("display", "none"); // Hide room selection
        populateMonthDropdown();
    } else {
        mainCourseTab.text("Yoga TTC");
        $("#addSoundHealing").closest('.form-check').show();
        $(".month-col, .type-col").hide();
        $("#month, #type").empty().append('<option value="">Select</option>');
        $("#batch").empty().append('<option value="">Select Batch</option>');
        $(".course-col, .batch-col").removeClass('col-md-4').addClass('col-md-6');
        $("#tripleSharingFormCheck label").text('Triple Sharing');
        $("#doubleSharingFormCheck label").text('Double Sharing');
        tripleSharingImg.attr("src", "https://www.adhiroha.com/img/triple-sharing-01.webp");
        tripleSharingImg.attr("alt", "Triple Sharing");
        doubleSharingImg.attr("src", "https://www.adhiroha.com/img/double-sharing-01.webp");
        doubleSharingImg.attr("alt", "Double Sharing");
    }
    $('#sound-healing-tab-li').hide();
    $('#sound-healing').removeClass('active');
    $('#main-course').addClass('active');
    $('#main-course-tab').addClass('active');
    $('#sound-healing-tab').removeClass('active');

    if (course) {
        selectedType = courseTypeMap[course] || course;
        updateCourseFeeItems(course, "mainCourseFeeItems");
        if (course !== "Yoga Retreat" && course !== "Sound Healing") {
            $.ajax({
                url: 'get_batches.php',
                type: 'GET',
                data: { type: selectedType },
                success: function(data) {
                    var batches = JSON.parse(data);
                    var batchSelect = $("#batch");
                    batchSelect.empty();
                    batchSelect.append('<option value="">Select Batch</option>');
                    batches.forEach(function(batch) {
                        var fullDateRange = batch.date_range;
                        var startDate = batch.start_date;
                        var optionText = batch.status === 'sold' ? 
                            `${startDate} - (Admission Full - Register For Waiting List)` : 
                            (batch.status && batch.status.trim() !== '' ? 
                            `${startDate} (${batch.status})` : startDate);
                        batchSelect.append(`<option value="${batch.id}" data-status="${batch.status}" data-full-date="${fullDateRange}">${optionText}</option>`);
                    });
                    $("#courseInfoPanel").slideUp();
                    $("#toggleInfoBtn").hide();
                    $("#nextBtn").prop("disabled", true);
                    $("#roomSelection").css("display", "none"); // Hide by default, shown in step 3 for Yoga TTC
                    updateFees();
                },
                error: function() {
                    alert('Error fetching batches');
                    $("#batch").empty().append('<option value="">Select Batch</option>');
                    $("#courseInfoPanel").slideUp();
                    $("#toggleInfoBtn").hide();
                    $("#nextBtn").prop("disabled", true);
                }
            });
        } else {
            $("#batch").empty().append('<option value="">Select Batch</option>');
            $("#roomSelection").css("display", "none"); // Ensure hidden for non-Yoga TTC
            updateFees();
        }
    } else {
        $("#batch, #month, #type").empty().append('<option value="">Select</option>');
        $("#courseInfoPanel").slideUp();
        $("#toggleInfoBtn").hide();
        $("#nextBtn").prop("disabled", true);
        $("#tripleFees, #doubleFees").hide();
        $("#roomSelection").css("display", "none");
        $("#roomOptions").empty();
        $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 3");
        selectedType = null;
        updateFees();
    }
});

$("#type").off('change').on('change', function() {
    var type = $(this).val();
    var batchSelect = $("#batch");
    batchSelect.empty();
    batchSelect.append('<option value="">Select Batch</option>');

    if (type) {
        console.log('Fetching batches for retreat type:', type); // Debug log
        $.ajax({
            url: 'get_batches.php',
            type: 'GET',
            data: { type: 'yoga_retreat', retreat_type: type },
            success: function(data) {
                console.log('Batches response:', data); // Debug log
                try {
                    var batches = JSON.parse(data);
                    if (batches.length === 0) {
                        alert('No batches available for the selected retreat type.');
                        return;
                    }
                    batches.forEach(function(batch) {
                        var fullDateRange = batch.date_range;
                        var startDate = batch.start_date;
                        var optionText = batch.status === 'sold' 
                            ? `${startDate} - (Admission Full - Register For Waiting List)`
                            : startDate; // Only show startDate for Yoga Retreat, no status/month in parentheses
                        batchSelect.append(`<option value="${batch.id}" data-status="${batch.status}" data-full-date="${fullDateRange}">${optionText}</option>`);
                    });
                    updateFees();
                } catch (e) {
                    console.error('Error parsing batches:', e);
                    alert('Error parsing batch data.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching batches:', error, 'Status:', status);
                alert('Error fetching batches for selected type: ' + error);
            }
        });
    } else {
        updateFees();
    }
});

  function fetchRoomAvailability() {
      if (!window.batchDetails || !studentGender) {
          console.log('Missing batch details or student gender');
          alert('Please ensure a batch is selected and student details are saved.');
          return;
      }

      var dateRange = $("#batch option:selected").data('full-date');
      var startStr = dateRange.split(' - ')[0].trim();
      var parts = startStr.split(' ');
      var monthStr = parts[1].replace(/[^a-zA-Z]/g, '');
      var yearStr = parts[2];
      var selectedMonth = monthStr.charAt(0).toUpperCase() + monthStr.slice(1).toLowerCase();

      console.log('Fetching room availability for month:', selectedMonth, 'Gender:', studentGender);

      $.ajax({
          url: 'get_room_availability.php',
          type: 'GET',
          data: { month: selectedMonth, gender: studentGender },
          success: function(response) {
              try {
                  console.log('Room availability response:', response);

                  if (response.error) {
                      console.error('Server-side error fetching room availability:', response.error);
                      alert('Failed to fetch room availability: ' + response.error);
                      return;
                  }

                  window.availableRooms = Array.isArray(response.availableRooms) 
                      ? response.availableRooms 
                      : Object.values(response.availableRooms);
                  console.log('Converted availableRooms to array:', window.availableRooms);

                  var doubleSharingBooked = response.doubleSharingBooked;
                  var tripleSharingBooked = response.tripleSharingBooked;

                  $("#tripleSharingFormCheck, #doubleSharingFormCheck").removeClass('disabled');
                  $("#tripleSharing, #doubleSharing").prop('disabled', false);
                  $("#tripleSharingFull, #doubleSharingFull").text('');

                  if (tripleSharingBooked) {
                      console.log('No triple-sharing rooms available');
                      $("#tripleSharingFormCheck").addClass('disabled');
                      $("#tripleSharing").prop('disabled', true).prop('checked', false);
                      $("#tripleSharingFull").text('(Full)');
                      if (selectedSharingType === "triple") {
                          selectedSharingType = null;
                          selectedRoomName = null;
                          $("#roomSelection").css("display", "none");
                          $("#roomOptions").empty();
                          $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 3");
                      }
                  } else {
                      $("#tripleSharingFull").text('');
                      if (doubleSharingBooked && !selectedSharingType) {
                          $("#tripleSharing").prop('checked', true);
                          selectedSharingType = "triple";
                          updateRoomOptions("triple");
                          $("#roomSelection").css("display", "block");
                      }
                  }

                  if (doubleSharingBooked) {
                      console.log('No double-sharing rooms available');
                      $("#doubleSharingFormCheck").addClass('disabled');
                      $("#doubleSharing").prop('disabled', true).prop('checked', false);
                      $("#doubleSharingFull").text('(Full)');
                      if (selectedSharingType === "double") {
                          selectedSharingType = null;
                          selectedRoomName = null;
                          $("#roomSelection").css("display", "none");
                          $("#roomOptions").empty();
                          $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 3");
                      }
                  } else {
                      $("#doubleSharingFull").text('');
                      if (tripleSharingBooked && !selectedSharingType) {
                          $("#doubleSharing").prop('checked', true);
                          selectedSharingType = "double";
                          updateRoomOptions("double");
                          $("#roomSelection").css("display", "block");
                      }
                  }

                  if (tripleSharingBooked && doubleSharingBooked) {
                      alert('No accommodations are available for the selected batch and gender.');
                  }

                  if (selectedSharingType) {
                      $(`#${selectedSharingType}Sharing`).prop("checked", true);
                      updateRoomOptions(selectedSharingType);
                      $("#roomSelection").css("display", "block");
                      if (selectedRoomName) {
                          $(`input[name='roomName'][value='${selectedRoomName}']`).prop("checked", true);
                      }
                  }
                  $("#tripleFees, #doubleFees").show();
                  updateFees();
              } catch (e) {
                  console.error('Error processing room availability data:', e.message);
                  console.error('Response causing the error:', response);
                  alert('Error processing room availability data: ' + e.message);
              }
          },
          error: function(xhr, status, error) {
              console.error('Error fetching room availability:', error);
              console.error('Status:', status);
              console.error('Response Text:', xhr.responseText);
              alert('Failed to fetch room availability. Status: ' + status + ', Error: ' + error);
          }
      });
  }

  function checkRoomAvailability(roomData, gender, maxOccupancy) {
      console.log(`Checking availability: roomData="${roomData}", gender=${gender}, maxOccupancy=${maxOccupancy}`);
      if (!roomData) {
          console.log('Room is empty, available');
          return true;
      }

      const occupants = roomData.split(',').map(name => name.trim()).filter(name => name.length > 0);
      console.log(`Occupants:`, occupants);

      if (occupants.length >= maxOccupancy) {
          console.log(`Room is full (${occupants.length}/${maxOccupancy})`);
          return false;
      }

      for (const occupant of occupants) {
          const ultrafastGender = occupant.includes('-F') ? 'female' : 
                               occupant.includes('-M') ? 'male' : 'unknown';
          console.log(`Occupant: ${occupant}, Gender: ${ultrafastGender}`);

          if ((gender === 'female' && ultrafastGender === 'male') || 
              (gender === 'male' && ultrafastGender === 'female')) {
              console.log(`Gender mismatch: student=${gender}, occupant=${ultrafastGender}`);
              return false;
          }
      }

      console.log('Room is available');
      return true;
  }

 $("#tripleSharing, #doubleSharing").change(function() {
  const course = $("#course").val();
  const tripleChecked = $("#tripleSharing").is(":checked");
  const doubleChecked = $("#doubleSharing").is(":checked");
  if (tripleChecked && !$("#tripleSharing").prop('disabled')) {
    selectedSharingType = "triple";
    if (course === "200 Hour YTTC" || course === "300 Hour YTTC" || course === "500 Hour YTTC") {
      updateRoomOptions("triple");
      $("#roomSelection").css("display", "block");
    } else {
      $("#roomSelection").css("display", "none");
      $("#roomOptions").empty();
    }
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Triple Sharing");
    setTimeout(() => {
      document.getElementById('roomSelection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else if (doubleChecked && !$("#doubleSharing").prop('disabled')) {
    selectedSharingType = "double";
    if (course === "200 Hour YTTC" || course === "300 Hour YTTC" || course === "500 Hour YTTC") {
      updateRoomOptions("double");
      $("#roomSelection").css("display", "block");
    } else {
      $("#roomSelection").css("display", "none");
      $("#roomOptions").empty();
    }
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Double Sharing");
    setTimeout(() => {
      document.getElementById('roomSelection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    selectedSharingType = null;
    selectedRoomName = null;
    $("#roomSelection").css("display", "none");
    $("#roomOptions").empty();
    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Select on Step 3");
  }
  updateFees();
});

$("body").on('change', "input[name='roomName']", function() {
    selectedRoomName = $(this).val();
    $("#accommodationText, #soundHealingAccommodationText").text(
        selectedSharingType === "triple" ? "Triple Sharing" : "Double Sharing"
    );
});

  $("#toggleInfoBtn").click(function() {
      if ($("#courseInfoPanel").is(":visible")) {
          $("#courseInfoPanel").slideUp();
          $(this).text("Show Course Info");
      } else {
          $("#courseInfoPanel").slideDown();
          $(this).text("Hide Course Info");
      }
  });

  $("#course").change(function() {
      var course = $(this).val();
      isSoundHealingAdded = false;
      $("#addSoundHealing").prop('checked', false).prop('disabled', !course);
      
      const mainCourseTab = $("#main-course-tab");
      if (course === "Sound Healing") {
          mainCourseTab.text("Sound Healing TTC");
          $("#addSoundHealing").closest('.form-check').hide();
          $(".month-col").show();
          $(".course-col, .month-col, .batch-col").removeClass('col-md-6').addClass('col-md-4');
          $("#tripleSharingFormCheck label").text('Double Sharing');
          $("#doubleSharingFormCheck label").text('Single Private');
          populateMonthDropdown();
      } else {
          mainCourseTab.text("Yoga TTC");
          $("#addSoundHealing").closest('.form-check').show();
          $(".month-col").hide();
          $("#month").empty().append('<option value="">Select Month</option>');
          $("#batch").empty().append('<option value="">Select Batch</option>');
          $(".course-col, .batch-col").removeClass('col-md-4').addClass('col-md-6');
          $("#tripleSharingFormCheck label").text('Triple Sharing');
          $("#doubleSharingFormCheck label").text('Double Sharing');
      }
      $('#sound-healing-tab-li').hide();
      $('#sound-healing').removeClass('active');
      $('#main-course').addClass('active');
      $('#main-course-tab').addClass('active');
      $('#sound-healing-tab').removeClass('active');

      const courseId = courseTypeMap[course] || '200';
      const fees = {
          200: {
              triple: { total: 1275, reg: 300, balance: 975, combo: 1875, separate: 1965, scholarship: 90 },
              double: { total: 1650, reg: 300, balance: 1350, combo: 2350, separate: 2445, scholarship: 95 }
          },
          300: {
              triple: { total: 1500, reg: 500, balance: 1000, combo: 2100, separate: 2190, scholarship: 90 },
              double: { total: 2000, reg: 500, balance: 1500, combo: 2700, separate: 2795, scholarship: 95 }
          },
          500: {
              triple: { total: 2790, reg: 750, balance: 2040, combo: 3270, separate: 3480, scholarship: 210 },
              double: { total: 3690, reg: 750, balance: 2940, combo: 4230, separate: 4485, scholarship: 255 }
          },
          sound_healing: {
              triple: { total: 690, reg: 300, balance: 390 },
              double: { total: 795, reg: 300, balance: 495 }
          }
      };

      $("#tripleFees").html(`
          <p><strong>${course === "Sound Healing" ? "Double Sharing" : (course || 'Select Course')} Total Fees:</strong> <span id="t_fees_triple_${courseId}">${course ? (course === "Sound Healing" ? '€' + fees.sound_healing.triple.total : '€' + fees[courseId].triple.total) : '€XXX'}</span></p>
          <p><strong>Registration Fee:</strong> <span id="r_fees_triple_${courseId}">${course ? (course === "Sound Healing" ? '€' + fees.sound_healing.triple.reg : '€' + fees[courseId].triple.reg) : '€XXX'}</span></p>
          <hr>
          <div id="sound_triple_${courseId}" style="display: none;">
              <p><strong>Sound Healing TTC Total Fees:</strong> <span id="t_fees_triple_sound_${courseId}">€${fees.sound_healing.triple.total}</span></p>
              <p><strong>Registration Fee:</strong> <span id="r_fees_triple_sound_${courseId}">€${fees.sound_healing.triple.reg}</span></p>
              <hr>
              <p><strong>Scholarship Amount:</strong> <span id="scholarship_triple_${courseId}">${course ? '€' + (fees[courseId].triple.scholarship || 0) : '€0'}</span></p>
              <p><strong>Total Fees of Both Courses:</strong> <span id="total_separate_triple_${courseId}" style="text-decoration: line-through;">${course ? '€' + (fees[courseId].triple.separate || 0) : '€0'}</span> <span id="combo_triple_${courseId}">${course ? '€' + (fees[courseId].triple.combo || 0) : '€0'}</span></p>
          </div>
      `);

      $("#doubleFees").html(`
          <p><strong>${course === "Sound Healing" ? "Single Private" : (course || 'Select Course')} Total Fees:</strong> <span id="t_fees_double_${courseId}">${course ? (course === "Sound Healing" ? '€' + fees.sound_healing.double.total : '€' + fees[courseId].double.total) : '€XXX'}</span></p>
          <p><strong>Registration Fee:</strong> <span id="r_fees_double_${courseId}">${course ? (course === "Sound Healing" ? '€' + fees.sound_healing.double.reg : '€' + fees[courseId].double.reg) : '€XXX'}</span></p>
          <hr>
          <div id="sound_double_${courseId}" style="display: none;">
              <p><strong>Sound Healing TTC Total Fees:</strong> <span id="t_fees_double_sound_${courseId}">€${fees.sound_healing.double.total}</span></p>
              <p><strong>Registration Fee:</strong> <span id="r_fees_double_sound_${courseId}">€${fees.sound_healing.double.reg}</span></p>
              <hr>
              <p><strong>Scholarship Amount:</strong> <span id="scholarship_double_${courseId}">${course ? '€' + (fees[courseId].double.scholarship || 0) : '€0'}</span></p>
              <p><strong>Total Fees of Both Courses:</strong> <span id="total_separate_double_${courseId}" style="text-decoration: line-through;">${course ? '€' + (fees[courseId].double.separate || 0) : '€0'}</span> <span id="combo_double_${courseId}">${course ? '€' + (fees[courseId].double.combo || 0) : '€0'}</span></p>
          </div>
      `);

      $('.accom-section .balance-fee-container').empty().hide();

      if (course) {
          selectedType = courseTypeMap[course];
          updateCourseFeeItems(course, "mainCourseFeeItems");
          if (course !== "Sound Healing") {
              $.ajax({
                  url: 'get_batches.php',
                  type: 'GET',
                  data: {type: selectedType},
                  success: function(data) {
                      var batches = JSON.parse(data);
                      var batchSelect = $("#batch");
                      batchSelect.empty();
                      batchSelect.append('<option value="">Select Batch</option>');
                      batches.forEach(function(batch) {
                          var fullDateRange = batch.date_range;
                          var startDate = batch.start_date;
                          var optionText;
                          if (batch.status === 'sold') {
                              optionText = `${startDate} - (Admission Full - Register For Waiting List)`;
                          } else if (batch.status && batch.status.trim() !== '') {
                              optionText = `${startDate} (${batch.status})`;
                          } else {
                              optionText = startDate;
                          }
                          batchSelect.append('<option value="' + batch.id + '" data-status="' + batch.status + '" data-full-date="' + fullDateRange + '">' + optionText + '</option>');
                      });
                      $("#courseInfoPanel").slideUp();
                      $("#toggleInfoBtn").hide();
                      $("#nextBtn").prop("disabled", true);
                      updateFees();
                  },
                  error: function() {
                      alert('Error fetching batches');
                      $("#batch").empty();
                      $("#batch").append('<option value="">Select Batch</option>');
                      $("#courseInfoPanel").slideUp();
                      $("#toggleInfoBtn").hide();
                      $("#nextBtn").prop("disabled", true);
                  }
              });
          }
      } else {
          $("#batch").empty();
          $("#batch").append('<option value="">Select Batch</option>');
          $("#month").empty().append('<option value="">Select Month</option>');
          $("#courseInfoPanel").slideUp();
          $("#toggleInfoBtn").hide();
          $("#nextBtn").prop("disabled", true);
          $("#tripleFees, #doubleFees").hide();
          $("#roomSelection").css("display", "none");
          $("#roomOptions").empty();
          $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 3");
          $("#mainCourseFeeItems, #soundHealingCourseFeeItems").empty();
          selectedType = null;
          updateFees();
      }
  });

function populateMonthDropdown() {
  const monthSelect = $("#month");
  monthSelect.empty();
  monthSelect.append('<option value="">Select Month</option>');

  // Define the starting date (current month: July 2025)
  const startDate = new Date(2025, 6); // July 2025 (months are 0-indexed in JavaScript)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate months from July 2025 to June 2026 (12 months total)
  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const monthValue = `${monthName}-${year}`; // Format: "July-2025"
    monthSelect.append(`<option value="${monthValue}">${monthValue}</option>`);
  }
}

// Handle month selection to fetch batches
$("#month").off('change').on('change', function() {
    const selectedMonth = $(this).val();
    const batchSelect = $("#batch");
    const course = $("#course").val();

    // Clear existing options
    batchSelect.empty();
    batchSelect.append('<option value="">Select Batch</option>');

    // Debug log
    console.log('Month changed to:', selectedMonth);

    if (selectedMonth && course === "Sound Healing") {
        // Check for June or July 2025 restriction
        if (selectedMonth === "June-2025" || selectedMonth === "July-2025") {
            alert('For admissions in June or July, please contact the management.');
            $(this).val(''); // Reset month selection
            return;
        }

        $.ajax({
            url: 'get_batches.php',
            type: 'GET',
            data: { type: 'sound_healing', month: selectedMonth },
            success: function(data) {
                console.log('Batches fetched for month:', selectedMonth, 'Data:', data);
                var batches = JSON.parse(data);
                batches.forEach(function(batch) {
                    var fullDateRange = batch.date_range;
                    var startDate = batch.start_date;
                    var optionText = batch.status === 'sold' 
                        ? `${startDate} - (Admission Full - Register For Waiting List)` 
                        : (batch.status && batch.status.trim() !== '' 
                            ? `${startDate} (${batch.status})` 
                            : startDate);
                    batchSelect.append(`<option value="${batch.id}" data-status="${batch.status}" data-full-date="${fullDateRange}">${optionText}</option>`);
                });
                updateFees();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching batches:', error, 'Status:', status);
                alert('Error fetching batches for the selected month');
                batchSelect.empty();
                batchSelect.append('<option value="">Select Batch</option>');
            }
        });
    } else {
        $("#courseInfoPanel").slideUp();
        $("#toggleInfoBtn").hide();
        $("#nextBtn").prop("disabled", true);
        updateFees();
    }
});

// Handle month selection to fetch batches
$("#month").off('change').on('change', function() {
    const selectedMonth = $(this).val();
    const batchSelect = $("#batch");
    batchSelect.empty();
    batchSelect.append('<option value="">Select Batch</option>');

    if (selectedMonth) {
        $.ajax({
            url: 'get_batches.php',
            type: 'GET',
            data: { type: 'sound_healing', month: selectedMonth },
            success: function(data) {
                var batches = JSON.parse(data);
                batches.forEach(function(batch) {
                    var fullDateRange = batch.date_range;
                    var startDate = batch.start_date;
                    var optionText;
                    if (batch.status === 'sold') {
                        optionText = `${startDate} - (Admission Full - Register For Waiting List)`;
                    } else if (batch.status && batch.status.trim() !== '') {
                        optionText = `${startDate} (${batch.status})`;
                    } else {
                        optionText = startDate;
                    }
                    batchSelect.append('<option value="' + batch.id + '" data-status="' + batch.status + '" data-full-date="' + fullDateRange + '">' + optionText + '</option>');
                });
                updateFees(); // Assuming this function updates fees based on selection
            },
            error: function() {
                alert('Error fetching batches for the selected month');
                batchSelect.empty();
                batchSelect.append('<option value="">Select Batch</option>');
            }
        });
    }
});

  $("#month").change(function() {
      var month = $(this).val();
      var course = $("#course").val();
      if (course === "Sound Healing" && month) {
          $.ajax({
              url: 'get_batches.php',
              type: 'GET',
              data: { type: 'sound_healing', month: month },
              success: function(data) {
                  var batches = JSON.parse(data);
                  var batchSelect = $("#batch");
                  batchSelect.empty();
                  batchSelect.append('<option value="">Select Batch</option>');
                  batches.forEach(function(batch) {
                      var fullDateRange = batch.date_range;
                      var startDate = batch.start_date;
                      var optionText;
                      if (batch.status === 'sold') {
                          optionText = `${startDate} - (Admission Full - Register For Waiting List)`;
                      } else {
                          optionText = startDate;
                      }
                      batchSelect.append('<option value="' + batch.id + '" data-status="' + batch.status + '" data-full-date="' + fullDateRange + '">' + optionText + '</option>');
                  });
                  $("#courseInfoPanel").slideUp();
                  $("#toggleInfoBtn").hide();
                  $("#nextBtn").prop("disabled", true);
                  updateFees();
              },
              error: function() {
                  alert('Error fetching batches for selected month');
                  $("#batch").empty();
                  $("#batch").append('<option value="">Select Batch</option>');
                  $("#courseInfoPanel").slideUp();
                  $("#toggleInfoBtn").hide();
                  $("#nextBtn").prop("disabled", true);
              }
          });
      } else {
          $("#batch").empty();
          $("#batch").append('<option value="">Select Batch</option>');
          $("#courseInfoPanel").slideUp();
          $("#toggleInfoBtn").hide();
          $("#nextBtn").prop("disabled", true);
          updateFees();
      }
  });

$("#batch").off('change').on('change', function() {
  var batchId = $(this).val();
  var selectedOption = $(this).find('option:selected');
  var status = selectedOption.data('status');
  var fullDateRange = selectedOption.data('full-date');

  if (!batchId) {
    $("#courseInfoPanel").slideUp();
    $("#toggleInfoBtn").hide();
    $("#nextBtn").prop("disabled", true);
    $("#tripleFees, #doubleFees").hide();
    $("#roomSelection").css("display", "none");
    $("#roomOptions").empty();
    $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 3");
    window.batchDetails = null;
    $("#studentDetails").slideUp(); // Hide studentDetails if no batch is selected
    updateFees();
    return;
  }

  if (status === 'sold') {
    window.location.href = '../waiting-list-register.php?rishikesh_batch_id=' + encodeURIComponent(batchId);
    return;
  }

  $.ajax({
    url: 'get_batch_details.php',
    type: 'GET',
    data: { id: batchId },
    dataType: 'json', // Explicitly expect JSON response
    beforeSend: function() {
      console.log('Fetching batch details for batchId:', batchId);
    },
    success: function(data) {
      try {
        // Log the raw response for debugging
        console.log('Raw batch details response:', data);

        // Check if the response is valid
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format: Expected a JSON object');
        }

        // Validate required fields
        if (!data.id || !data.date_range) {
          throw new Error('Missing required fields in batch details');
        }

        window.batchDetails = data;
        selectedType = courseTypeMap[$("#course").val()];
        updateCourseInfoPanel();
        updateFees();
        $("#courseInfoPanel").slideDown();
        $("#toggleInfoBtn").show().text("Hide Course Info");
        $("#nextBtn").prop("disabled", false);
        $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 3");

        // Check if studentsContainer exists before manipulating it
        const studentsContainer = document.getElementById('studentsContainer');
        if (!studentsContainer) {
          console.error('studentsContainer element not found in the DOM. Checking DOM structure...');
          // Log all elements with ID attributes to help diagnose
          const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
          console.log('All IDs in DOM:', allIds);
          throw new Error('Student container element (ID: studentsContainer) is missing in the DOM. Please verify the HTML structure.');
        }

        // Reset students and add new student
        console.log('Clearing studentsContainer and resetting student count');
        studentsContainer.innerHTML = ''; // Clear existing student entries
        studentCount = 0; // Reset student count
        console.log('Adding new student for course:', $("#course").val());
        addNewStudent($("#course").val()); // Add a new student entry
        const addStudentBtn = document.getElementById('addStudentBtn');
        if (addStudentBtn) {
          addStudentBtn.disabled = false; // Enable the "Add More Student" button
        } else {
          console.warn('addStudentBtn element not found in the DOM');
        }

        // Show studentDetails with slideDown animation
        console.log('Showing studentDetails');
        $("#studentDetails").slideDown();
      } catch (e) {
        console.error('Error processing batch details:', e.message, 'Response:', data);
        alert('Error processing batch details: ' + e.message);
        $("#courseInfoPanel").slideUp();
        $("#toggleInfoBtn").hide();
        $("#nextBtn").prop("disabled", true);
        $("#studentDetails").slideUp(); // Hide studentDetails on error
      }
    },
    error: function(xhr, status, error) {
      console.error('AJAX error fetching batch details:', {
        status: status,
        error: error,
        responseText: xhr.responseText,
        statusCode: xhr.status
      });
      let errorMessage = 'Failed to retrieve batch details. ';
      if (xhr.status === 404) {
        errorMessage += 'Batch details endpoint not found.';
      } else if (xhr.status === 500) {
        errorMessage += 'Server error occurred.';
      } else {
        errorMessage += 'Error: ' + error;
      }
      alert(errorMessage);
      $("#courseInfoPanel").slideUp();
      $("#toggleInfoBtn").hide();
      $("#nextBtn").prop("disabled", true);
      $("#studentDetails").slideUp(); // Hide studentDetails on error
    }
  });
});

$("#nextBtn").off('click').on('click', function() {
  const $nextBtn = $(this);

  if (currentStep === 1) {
    const course = $("#course").val();
    const month = $("#month").val();
    const batch = $("#batch").val();
    const type = $("#type").val();
    const allEntries = document.querySelectorAll('.student-entry');

    if (!course) {
      alert('Please select a course.');
      return;
    }
    if (course === "Sound Healing" && !month) {
      alert('Please select a month for Sound Healing.');
      return;
    }
    if (course === "Yoga Retreat" && !type) {
      alert('Please select a retreat type for Yoga Retreat.');
      return;
    }
    if (!batch) {
      alert('Please select a batch.');
      return;
    }
    if (allEntries.length < 1) {
      alert('Please add at least one student.');
      return;
    }

    const index = allEntries[0].dataset.index;
    validateAndSaveCurrentStudent(index).then(isValid => {
      if (!isValid) {
        alert('Please complete all required fields for the student.');
        return;
      }

      $nextBtn.prop('disabled', true).text('Loading');

      const savePromises = [];
      const batchId = $("#batch").val();
      const batchDateRange = $("#batch option:selected").data('full-date');

      savePromises.push(saveStudentToDatabase(index, course, batchId, batchDateRange));

      if (isSoundHealingAdded && course !== "Sound Healing") {
        if (!soundHealingBatchId || !soundHealingBatchDetails) {
          $nextBtn.prop('disabled', false).text('Next');
          alert('Sound Healing batch details not loaded. Please try again.');
          return;
        }
        savePromises.push(saveStudentToDatabase(index, "Sound Healing", soundHealingBatchId, soundHealingBatchDetails.date_range));
      }

      Promise.all(savePromises).then(() => {
        const studentEntry = document.querySelector(`.student-entry[data-index="${index}"]`);
        studentEntry.dataset.saved = "true";
        minimizeStudentForm(studentEntry);
        currentStep++;
        showStep(currentStep);
      }).catch(error => {
        console.error('Error saving students:', error);
        alert('Error saving student data: ' + error.message);
      }).finally(() => {
        $nextBtn.prop('disabled', false).text('Next');
      });
    }).catch(error => {
      console.error('Error validating student:', error);
      alert('Error validating student data: ' + error.message);
      $nextBtn.prop('disabled', false).text('Next');
    });
  } else if (currentStep === 2) { // Updated to Step 2 (Accommodation)
    const sharingType = $("input[name='sharingType']:checked").val();
    if (!sharingType) {
      alert('Please select an accommodation type.');
      return;
    }
    currentStep++;
    showStep(currentStep);
  }
});

  $("#prevBtn").off('click').on('click', function() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});
$(document).ready(function() {
    $("#studentDetails").hide();
  $('#wizardModal').modal({
    backdrop: 'static',
    keyboard: false
  });
  $('#wizardModal').modal('show');
  
  $('#courseDetailsModal').modal({
    backdrop: false,
    keyboard: false
  });
  $('#courseDetailsModal').modal('show');
  showStep(currentStep);
  $("#addSoundHealing").prop('disabled', true);

  const urlParams = new URLSearchParams(window.location.search);
  const courseSelected = urlParams.get('course_selected');
  const batchId = urlParams.get('rishikesh_batch_id');

  console.log('URL Parameters - course_selected:', courseSelected, 'rishikesh_batch_id:', batchId);

  if (courseSelected && batchId) {
    preselectCourseAndBatch(batchId);
  } else {
    console.log('No course_selected or rishikesh_batch_id in URL, skipping preselection.');
  }

  // Add event listeners for real-time validation on course, month, type, and batch changes
  $("#course, #month, #type, #batch").on('change', function() {
    showStep(1); // Re-validate combined Step 1
  });
});

function preselectCourseAndBatch(batchId) {
  const courseSelected = new URLSearchParams(window.location.search).get('course_selected');
  console.log('Attempting to preselect course:', courseSelected, 'batchId:', batchId);

  if (!courseSelected || !batchId) {
    console.warn('Missing course_selected or rishikesh_batch_id in URL parameters.');
    return;
  }

  // Validate courseSelected against available options
  const validCourses = Array.from($("#course option")).map(opt => opt.value);
  if (!validCourses.includes(courseSelected)) {
    console.error('Invalid course_selected value:', courseSelected);
    alert('The selected course is not available.');
    return;
  }

  // Set the course dropdown
  $("#course").val(courseSelected).trigger('change');

  // Fetch batch details from get_batches.php
  $.ajax({
    url: 'get_batches.php',
    method: 'GET',
    data: { course: courseSelected },
    dataType: 'json',
    success: function(response) {
      try {
        console.log('Batch details response:', response);

        if (!response || !Array.isArray(response.batches)) {
          throw new Error('Invalid or empty batch response from server.');
        }

        // Clear existing batch options
        $("#batch").empty().append('<option value="">Select Batch</option>');

        // Populate batch dropdown
        let batchFound = false;
        response.batches.forEach(batch => {
          if (batch.id === batchId) {
            batchFound = true;
            $("#batch").append(
              `<option value="${batch.id}" data-full-date="${batch.date_range}">${batch.batch}</option>`
            );
          }
        });

        if (!batchFound) {
          console.error('Batch ID not found in response:', batchId);
          alert('The selected batch is not available for this course.');
          return;
        }

        // Set the batch dropdown
        $("#batch").val(batchId).trigger('change');

        // Handle month and type dropdowns based on course
        if (courseSelected === "Sound Healing") {
          $("#month").empty().append('<option value="">Select Month</option>');
          // Assuming response includes months for Sound Healing
          if (response.months && Array.isArray(response.months)) {
            response.months.forEach(month => {
              $("#month").append(`<option value="${month}">${month}</option>`);
            });
            // Auto-select month if provided in batch details (modify as per API response)
            const month = response.batches.find(b => b.id === batchId)?.month;
            if (month) {
              $("#month").val(month).trigger('change');
            }
          } else {
            console.warn('No months provided for Sound Healing course.');
          }
          $(".month-col").show();
        } else if (courseSelected === "Yoga Retreat") {
          $("#type").empty().append('<option value="">Select Type</option>');
          // Assuming response includes types for Yoga Retreat
          if (response.types && Array.isArray(response.types)) {
            response.types.forEach(type => {
              $("#type").append(`<option value="${type}">${type}</option>`);
            });
            // Auto-select type if provided in batch details (modify as per API response)
            const type = response.batches.find(b => b.id === batchId)?.type;
            if (type) {
              $("#type").val(type).trigger('change');
            }
          } else {
            console.warn('No types provided for Yoga Retreat course.');
          }
          $(".type-col").show();
        }

        // Update UI and validate
        updateCourseInfoPanel();
        updateFees();
        showStep(1); // Re-validate combined Step 1
      } catch (e) {
        console.error('Error parsing batch details:', e.message);
        alert('Error loading batch details. Please try again.');
      }
    },
    error: function(xhr, status, error) {
      console.error('AJAX error fetching batch details:', status, error, xhr.responseText);
      alert('Failed to load batch details. Please check your connection or try again later.');
    }
  });
}});
</script>
<script>
// Toggle Course Details Modal on wizard-header click
document.querySelector('#courseDetailsModal .wizard-header').addEventListener('click', function() {
  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const label = document.querySelector('#courseDetailsModalLabel');
  const toggleIcon = this.querySelector('i');

  // Check if modal is currently shown or hidden
  const isShown = modalDialog.classList.contains('shown');

  if (isShown) {
    // Hide the modal
    modalDialog.classList.remove('shown');
    modalDialog.classList.add('hidden');
    modalBody.classList.remove('shown');
    modalBody.classList.add('hidden');
    label.textContent = 'Show Course Details';
    toggleIcon.classList.remove('fa-chevron-down');
    toggleIcon.classList.add('fa-chevron-up');
  } else {
    // Show the modal
    modalDialog.classList.remove('hidden');
    modalDialog.classList.add('shown');
    modalBody.classList.remove('hidden');
    modalBody.classList.add('shown');
    label.textContent = 'Hide Course Details';
    toggleIcon.classList.remove('fa-chevron-up');
    toggleIcon.classList.add('fa-chevron-down');
  }

  // Sync heights after toggle
  syncModalHeights();
});

// Initialize modal state on page load
document.addEventListener('DOMContentLoaded', function() {
  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const label = document.querySelector('#courseDetailsModalLabel');
  const toggleIcon = document.querySelector('#courseDetailsModal .wizard-header i');

  // Set initial state to hidden on mobile
  if (window.innerWidth <= 992) {
    modalDialog.classList.add('hidden');
    modalBody.classList.add('hidden');
    label.textContent = 'Show Course Details';
    toggleIcon.classList.add('fa-chevron-up');
  } else {
    modalDialog.classList.add('shown');
    modalBody.classList.add('shown');
    label.textContent = 'Hide Course Details';
    toggleIcon.classList.add('fa-chevron-down');
  }
});

// Update modal state on window resize
window.addEventListener('resize', function() {
  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const label = document.querySelector('#courseDetailsModalLabel');
  const toggleIcon = document.querySelector('#courseDetailsModal .wizard-header i');

  if (window.innerWidth <= 992) {
    // On mobile, default to hidden state
    if (!modalDialog.classList.contains('shown')) {
      modalDialog.classList.add('hidden');
      modalBody.classList.add('hidden');
      label.textContent = 'Show Course Details';
      toggleIcon.classList.remove('fa-chevron-down');
      toggleIcon.classList.add('fa-chevron-up');
    }
  } else {
    // On larger screens, default to shown state
    modalDialog.classList.remove('hidden');
    modalDialog.classList.add('shown');
    modalBody.classList.remove('hidden');
    modalBody.classList.add('shown');
    label.textContent = 'Hide Course Details';
    toggleIcon.classList.remove('fa-chevron-up');
    toggleIcon.classList.add('fa-chevron-down');
  }

  // Sync heights after resize
  syncModalHeights();
});
</script>
</body>
</html>
