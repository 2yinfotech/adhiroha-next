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
.payment-card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border: 1px solid #eee;
}

.payment-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 14px;
  font-size: 16px;
}

.fee-line {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
}

.fee-line.total {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 6px;
  font-weight: 600;
}

.pay-btn {
  width: 100%;
  margin-top: 14px;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #fff !important;
}

/* Brand Colors */
.wise-btn { background:#00B578; }
.paypal-btn { background:#003087; }
.razor-btn { background:#0C6FFF; }

/* Hover */
.pay-btn:hover {
  opacity: 0.88;
}
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.payment-option {
flex: 1 1 45%;
    min-width: 300px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
}

.payment-option .paypal-header,
.payment-option .wise-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.payment-option .paypal-header i,
.payment-option .wise-header i {
  margin-right: 10px;
  font-size: 20px;
}

.payment-option .paypal-header i {
  color: #0070BA;
}

.payment-option .wise-header i {
  color: #28A745;
}

.payment-option .fee-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.payment-option .fee-details span {
  font-size: 14px;
}

.payment-option .fee-details .highlight {
  background-color: #FFE4C4;
  padding: 2px 8px;
  border-radius: 5px;
}

.payment-option .total-amount {
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

.wise-button-container {
  background-color: #28A745;
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
  width: 100%;
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
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-761575090"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-761575090');
</script>
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
    <option value="Yoga Retreat">Yoga & Ayurveda Wellness Retreat</option>
  </select>
      </div>
    </div>
<script>
  document.getElementById("course").addEventListener("change", function () {
    const selectedValue = this.value;

    // Sirf in 3 courses ke liye alert
    const specialCourses = ["Hatha", "Ashtanga", "Pranayama"];

    if (specialCourses.includes(selectedValue)) {
      alert(
        "For joining 14 Days specialized courses, please contact our management:\n\n📞 +91-9999-048-900\n📧 info@adhiroha.com"
      );

      // Page refresh after clicking OK
      location.reload();
    }
  });
</script>


  
    <div class="col-md-6 col-6 type-col" style="display: none;">
      <div class="form-group">
        <label for="type">Type</label>
        <select class="form-control" id="type">
          <option value="">Select Type</option>
        </select>
      </div>
    </div>
    <div class="col-md-6 batch-col">
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
         <label for="course">Student Details</label>
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
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="how_know-0">How did you know about us?</label>
              <select class="form-control student-how-know" id="how_know-0" data-field="how_know">
                <option value="">Select Source</option>
                <option value="Google">Google</option>
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>
          <div class="col-sm-6 ref-code-group-0" style="display:none;">
            <div class="form-group">
              <label for="ref_code-0">Referral Code</label>
              <input type="text" class="form-control student-ref-code" id="ref_code-0" data-field="ref_code" placeholder="Enter referral code">
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
  if (course === 'Sound Healing' && month === 'June-2025') {
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
      <!-- Triple Sharing Fees -->
      <div class="fees-display" id="tripleFees">
        <div class="non-retreat">
          <p><strong id="tripleCourseTitle">Total Fees:</strong> <span id="t_fees_triple">€XXX</span></p>
          <p><strong>Registration Fee:</strong> <span id="r_fees_triple">€XXX</span></p>
          <p> <span id="balance_triple">Balance Fee to be Paid Upon Arrival: Euros XXX</span></p>
          <div id="sound_triple" style="display: none;">
            <p><strong>Sound Healing TTC Total Fees:</strong> <span id="t_fees_triple_sound">€XXX</span></p>
            <p><strong>Registration Fee:</strong> <span id="r_fees_triple_sound">€XXX</span></p>
            <p><strong>Scholarship Amount:</strong> <span id="scholarship_triple">€0</span></p>
            <p><strong>Total Fees of Both Courses:</strong> <span id="total_separate_triple" style="text-decoration: line-through;">€0</span> <span id="combo_triple">€0</span></p>
          </div>
        </div>
        <div class="retreat-fees" style="display: none;">
          <p><strong>Total Fees:</strong> <span id="t_fees_triple_retreat">€XXX</span></p>
          <p><strong>Registration Fee:</strong> <span id="r_fees_triple_retreat">€XXX</span></p>
          <p> <span id="balance_triple_retreat">Balance Fee to be Paid Upon Arrival: Euros XXX</span></p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Double Sharing Card -->
<div class="col-md-6 mb-4">
  <div class="card">
    <img src="https://www.adhiroha.com/img/double-sharing-new.webp" class="card-img-top double-sharing-img" alt="Double Sharing">
    <div class="card-body">
      <div class="form-check" id="doubleSharingFormCheck">
        <input class="form-check-input" type="radio" name="sharingType" id="doubleSharing" value="double">
        <label class="form-check-label" for="doubleSharing">
          Double Sharing <span class="full-label" id="doubleSharingFull"></span>
        </label>
      </div>
      <hr>
      <!-- Double Sharing Fees -->
      <div class="fees-display" id="doubleFees">
        <div class="non-retreat">
          <p><strong id="doubleCourseTitle">Total Fees:</strong> <span id="t_fees_double">€XXX</span></p>
          <p><strong>Registration Fee:</strong> <span id="r_fees_double">€XXX</span></p>
          <p> <span id="balance_double">Balance Fee to be Paid Upon Arrival: Euros XXX</span></p>
          <div id="sound_double" style="display: none;">
            <p><strong>Sound Healing TTC Total Fees:</strong> <span id="t_fees_double_sound">€XXX</span></p>
            <p><strong>Registration Fee:</strong> <span id="r_fees_double_sound">€XXX</span></p>
            <p><strong>Scholarship Amount:</strong> <span id="scholarship_double">€0</span></p>
            <p><strong>Total Fees of Both Courses:</strong> <span id="total_separate_double" style="text-decoration: line-through;">€0</span> <span id="combo_double">€0</span></p>
          </div>
        </div>
        <div class="retreat-fees" style="display: none;">
          <p><strong>Total Fees:</strong> <span id="t_fees_double_retreat">€XXX</span></p>
          <p><strong>Registration Fee:</strong> <span id="r_fees_double_retreat">€XXX</span></p>
          <p> <span id="balance_double_retreat">Balance Fee to be Paid Upon Arrival: Euros XXX</span></p>
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
      <!-- Step 3 -->
<div class="wizard-step" id="step3">
  <h5>Step 3: Select Payment Method</h5>

  <div class="row g-4 mt-3">

    <!-- Wise Card -->
    <div class="col-lg-4 col-md-6 col-12">
      <div class="payment-card wise-card">
        <div class="payment-header">
          <img src="wise-icon.png"
               style="height:20px;margin-right:8px;">
          <span>Wise</span>
        </div>

        <div class="fee-line">
          <span>Registration Fee</span>
          <span id="registrationFeeAmountWise">€0.00</span>
        </div>
        <div class="fee-line">
          <span>Wise Fee <strong>3%</strong></span>
          <span id="wiseFeeAmount">€0.00</span>
        </div>
        <div class="fee-line total">
          <span><strong>Total Amount</strong></span>
          <span id="totalAmountWithFeeWise">€0.00</span>
        </div>

        <button class="pay-btn wise-btn" id="wiseButtonContainer">
     <span id="totalAmountWithFeeWiseButton">0.00</span>
        </button>
      </div>
    </div>
   <div class="col-lg-4 col-md-6 col-12">
      <div class="payment-card razor-card">
        <div class="payment-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
               style="height:20px;margin-right:8px;">

        </div>

        <div class="fee-line">
          <span>Registration Fee</span>
          <span id="registrationFeeAmountRazorpay">€0.00</span>
        </div>
        <div class="fee-line">
          <span>Razorpay Fee <strong>5%</strong></span>
          <span id="razorpayFeeAmount">€0.00</span>
        </div>
        <div class="fee-line total">
          <span><strong>Total</strong></span>
          <span id="totalAmountWithFeeRazorpay">€0.00</span>
        </div>

        <button class="pay-btn razor-btn" id="razorpayButtonContainer">
         <span id="totalAmountWithFeeRazorpayButton">0.00</span>
        </button>
      </div>
    </div>

    <!-- PayPal Card -->
    <div class="col-lg-4 col-md-6 col-12">
      <div class="payment-card paypal-card">
        <div class="payment-header">
          <i class="fab fa-paypal" style="font-size:20px;margin-right:6px;"></i>
          <span>PayPal</span>
        </div>

        <div class="fee-line">
          <span>Registration Fee</span>
          <span id="registrationFeeAmount">€0.00</span>
        </div>
        <div class="fee-line">
          <span>PayPal Fee <strong>7.5%</strong></span>
          <span id="paypalFeeAmount">€0.00</span>
        </div>
        <div class="fee-line total">
          <span><strong>Total</strong></span>
          <span id="totalAmountWithFee">€0.00</span>
        </div>

        <button class="pay-btn paypal-btn" id="paypalButtonContainer">
<span id="totalAmountWithFeeButton">0.00</span>
        </button>
      </div>
    </div>


    <!-- Razorpay Card -->
 

  </div>
</div>


            </form>
          <script>
      document.getElementById('batch').addEventListener('change', function() {
  const batchValue = this.value;
  const genderSelects = document.querySelectorAll('.student-gender');
  
  genderSelects.forEach(select => {
    const femaleOption = select.querySelector('option[value="female"]');
    if (batchValue === '85') {
      femaleOption.disabled = true;
      if (select.value === 'female') {
        select.value = ''; // Reset if female was selected
      }
    } else {
      femaleOption.disabled = false;
    }
  });
});
  </script>
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
                <p id="accommodationText">Select on Step 2</p>
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
                <p id="soundHealingAccommodationText">Select on Step 2</p>
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
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

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
    let studentCode = '';

    // Existing fetch for country detection
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

    // Existing initializeStudentManagement function (unchanged)
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

    // Existing validateStep2 function (unchanged)
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

    // Existing validateAndSaveCurrentStudent function (unchanged)
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

    // Existing addErrorMessage function (unchanged)
    function addErrorMessage(elementId, message) {
        const element = document.getElementById(elementId);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#DC3545';
        errorMsg.textContent = message;
        element.parentNode.appendChild(errorMsg);
    }

    // Existing isValidEmail function (unchanged)
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Modified checkRoomAvailability function
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

        // For male students, check if there are any female occupants
        if (gender === 'male') {
            const hasFemaleOccupant = occupants.some(occupant => occupant.includes('-F'));
            if (hasFemaleOccupant) {
                console.log('Female occupant found, room unavailable for male');
                return false;
            }
        }

        // For female students, check if there are any male occupants
        if (gender === 'female') {
            const hasMaleOccupant = occupants.some(occupant => occupant.includes('-M'));
            if (hasMaleOccupant) {
                console.log('Male occupant found, room unavailable for female');
                return false;
            }
        }

        console.log('Room is available');
        return true;
    }

    // Modified fetchRoomAvailability function
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

                    // Only disable triple sharing if all rooms are full or have female occupants (for male students)
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
                            $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 2");
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
                            $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 2");
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

    // Existing functions (unchanged, included for completeness)
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
        const howKnow = document.getElementById(`how_know-${index}`)?.value?.trim() || '';
        const refCode = document.getElementById(`ref_code-${index}`)?.value?.trim() || '';
        const formattedBatch = formatDateRange(batchDateRange);

        let registrationFee = getRegistrationFee(course);
        let balanceFee = getBalanceFee(course);

        console.log('Fee Calculation Details:', {
            course,
            selectedSharingType,
            registrationFee,
            balanceFee
        });

        if (isNaN(registrationFee) || isNaN(balanceFee) || registrationFee === 0 || balanceFee === 0) {
            console.error('Invalid fee calculations:', {
                registrationFee,
                balanceFee,
                course,
                selectedSharingType
            });
            reject(new Error('Invalid fee calculations for the selected course.'));
            return;
        }

        studentCode = generateStudentCode();

        const studentData = {
            b_name: name,
            b_gender: gender,
            b_country: country,
            b_number: whatsapp,
            b_email: email,
            b_course: course,
            b_acco: selectedSharingType ? 
                (selectedSharingType === "triple" ? "Triple Sharing" : "Double Sharing") : 
                "Triple Sharing",
            b_ramount: registrationFee,
            b_balance: balanceFee,
            b_city: city,
            b_month: formattedBatch,
            bmonth_y: 'N/A',
            room_no: (course === "200 Hour YTTC" || course === "300 Hour YTTC" || course === "500 Hour YTTC") ? (selectedRoomName || 'N/A') : 'N/A',
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
            b_source: howKnow || 'website',
            b_ref_code: refCode,
            c_form: 'Not-uploaded',
            c_name: '',
            retreat_type: 'N/A'
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
                        console.log(`Student saved successfully for ${course}, ID:`, res.id);
                        resolve(res.id);
                    } else {
                        console.error('No ID returned from server:', res);
                        reject(new Error(`Failed to save student information for ${course}. No ID returned.`));
                    }
                } catch (e) {
                    console.error('Error parsing server response:', e, response);
                    reject(new Error('Error parsing server response: ' + e.message));
                }
            },
            error: function(xhr, status, error) {
                console.error(`Error saving student for ${course}:`, error, 'Status:', status, 'Response:', xhr.responseText);
                reject(new Error(`Failed to save student information for ${course}. Status: ${status}, Error: ${error}`));
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

    let templateElement = document.getElementById('studentTemplate');
    let template;
    if (templateElement) {
        template = templateElement.innerHTML
            .replace(/INDEX/g, newIndex)
            .replace(/NUMBER/g, studentCount);
    } else {
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
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group mb-3">
                                <select class="form-control student-how-know" id="how_know-${newIndex}" data-field="how_know">
                                    <option value="">How did you know about us?</option>
                                    <option value="Google">Google</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Referral">Referral</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6 ref-code-group-${newIndex}" style="display:none;">
                            <div class="form-group mb-3">
                                <input type="text" class="form-control student-ref-code" id="ref_code-${newIndex}" data-field="ref_code" placeholder="Referral Code">
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

    // Trigger fee update if currently in step 2
    if (currentStep === 2) {
        updateFees();
    }
}

    function populateCountryDropdown(index) {
        const countryInput = document.getElementById(`country-${index}`);
        if (!countryInput) {
            console.error(`Country input with ID country-${index} not found.`);
            return;
        }

        if (userCountry) {
            countryInput.value = userCountry;
        }

        countryInput.addEventListener('input', function() {
            validateStep2();
        });
    }

    function populateCountryOptions(selectElement, countries, selectedCountry = '') {
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
        "Yoga Retreat": 300,
        "Hatha": 300,
        "Ashtanga": 300,
        "Pranayama": 300
    };
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
            double: 495,
            single: 495
        },
        yoga_retreat: {
            triple: 210,
            double: 360
        },
        hatha: {
            triple: 490,
            double: 790
        },
        ashtanga: {
            triple: 490,
            double: 790
        },
        pranayama: {
            triple: 490,
            double: 790
        }
    };

    const courseType = courseTypeMap[course] || "yoga_retreat";
    console.log('getBalanceFee - Course:', course, 'Selected Sharing:', selectedSharingType);

    const sharingType = selectedSharingType || "triple";
    const fee = balanceFees[courseType][sharingType] || 0;
    console.log('Balance Fee for', courseType, ':', fee);
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
    "Sound Healing": "sound_healing",
    "Yoga Retreat": "yoga_retreat",
    "Hatha": "hatha",
    "Ashtanga": "ashtanga",
    "Pranayama": "pranayama"
};

    const courseDays = {
    200: 24,
    300: 30,
    500: 60,
    "sound_healing": 6,
    hatha: 14,
    ashtanga: 14,
    pranayama: 14
};

    const monthMap = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11,
        "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
        "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
const yogaTtcCourses = ["200 Hour YTTC", "300 Hour YTTC", "500 Hour YTTC", "Hatha", "Ashtanga", "Pranayama"];
    // Remaining functions (unchanged)
    function updateCourseFeeItems(course, containerId) {
        const courseFeeItemsContainer = $(`#${containerId}`);
        courseFeeItemsContainer.empty();
        const days = courseDays[courseTypeMap[course]] || 7;
        const items = course === "Sound Healing" || course === "Yoga Retreat" ? [
            `<span class="course-item"><i class="fas fa-calendar-alt icon"></i> Stay for ${days} days</span>`,
            `<span class="course-item"><i class="fas fa-utensils icon"></i> Breakfast, Lunch & Dinner</span>`
        ] : [
            `<span class="course-item"><i class="fas fa-calendar-alt icon"></i> Stay for ${days} days</span>`,
            `<span class="course-item"><i class="fas fa-utensils icon"></i> Breakfast, Lunch & Dinner</span>`,
            `<span class="course-item"><i class="fas fa-spa icon"></i> Yoga Session on the Ganga Ji Ghat</span>`,
            `<span class="course-item"><i class="fas fa-shuttle-van icon"></i> Pickup From Dehradun Airport</span>`,
            `<span class="course-item"><i class="fas fa-hiking icon"></i> Weekly Excursion</span>`
        ];
        courseFeeItemsContainer.append(items.join(''));
    }

    function populateTypeDropdown() {
        const typeSelect = $("#type");
        typeSelect.empty();
        typeSelect.append('<option value="">Select Type</option>');
        
        const retreatTypes = ["Ayurvedic Wellness Retreat", "Vedanta & Meditation Retreat"];
        retreatTypes.forEach(function(type) {
            typeSelect.append(`<option value="${type}">${type}</option>`);
        });
        
        $(".type-col").show();
        $(".course-col, .type-col, .batch-col").removeClass('col-md-6').addClass('col-md-6');
    }

    function updateCourseInfoPanel() {
        const course = $("#course").val();
        const batchId = $("#batch").val();
        const selectedOption = $("#batch").find('option:selected');
        const fullDateRange = selectedOption.data('full-date');

        $("#courseDetailsModal .batch-details p").text("No batch selected");
        $("#courseDetailsModal .arrival-date p").text("N/A");
        $("#courseDetailsModal .accommodation-info p").text("Select on Step 2");
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

            const isValid = validEntries > 0 && course && batch && (course !== "Yoga Retreat" || type);
            $("#nextBtn").prop("disabled", !isValid);

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
     const paypalPercent = 0.075;
    const wisePercent = 0.03;
    const razorPercent = 0.05; // Updated 5%

    // Wise
    const wiseFee = registrationFee * wisePercent;
    const totalWise = registrationFee + wiseFee;

    $("#registrationFeeAmountWise").text(`€${registrationFee.toFixed(2)}`);
    $("#wiseFeeAmount").text(`€${wiseFee.toFixed(2)}`);
    $("#totalAmountWithFeeWise").text(`€${totalWise.toFixed(2)}`);
    $("#totalAmountWithFeeWiseButton").text(`Pay €${totalWise.toFixed(2)}`);


    // PayPal
    const paypalFee = registrationFee * paypalPercent;
    const totalPayPal = registrationFee + paypalFee;

    $("#registrationFeeAmount").text(`€${registrationFee.toFixed(2)}`);
    $("#paypalFeeAmount").text(`€${paypalFee.toFixed(2)}`);
    $("#totalAmountWithFee").text(`€${totalPayPal.toFixed(2)}`);
    $("#totalAmountWithFeeButton").text(`Pay €${totalPayPal.toFixed(2)}`);


    // Razorpay
     const razorpayFee = registrationFee * razorPercent;
    const razorpayTotalAmount = registrationFee + razorpayFee;

    $("#registrationFeeAmountRazorpay").text(`€${registrationFee.toFixed(2)}`);
    $("#razorpayFeeAmount").text(`€${razorpayFee.toFixed(2)}`);
    $("#totalAmountWithFeeRazorpay").text(`€${razorpayTotalAmount.toFixed(2)}`);
    $("#totalAmountWithFeeRazorpayButton").text(`Pay €${razorpayTotalAmount.toFixed(2)}`);
}



function initializePaypalButton() {
   $("#paypalButtonContainer").off('click').on('click', function (e) {
    e.preventDefault(); // Stop form submission
    
    if (!studentCode || !selectedSharingType) {
        alert('Please ensure all student details and accommodation type are selected.');
        return false;
    }

    const paypalPercent = 0.075;
    const totalWithPaypalFee = registrationFee + (registrationFee * paypalPercent);

    const acco = (selectedSharingType === "triple") ? "Triple Sharing" : "Double Sharing";
    
    const thankYouUrl = `https://adhiroha.com/thank-you.php?view_id=${encodeURIComponent(studentCode)}&acco=${encodeURIComponent(acco)}&room=${encodeURIComponent(selectedRoomName || 'N/A')}`;

    const paypalUrl =
        `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=adhiroha@gmail.com` +
        `&currency_code=EUR` +
        `&amount=${totalWithPaypalFee.toFixed(2)}` +
        `&item_name=Registration Fee ${encodeURIComponent(acco)}` +
        `&return=${encodeURIComponent(thankYouUrl)}`;

    window.location.href = paypalUrl;
    return false;
});

    
   $("#razorpayButtonContainer").off('click').on('click', function (e) {
    e.preventDefault(); // 🛑 Stop form auto submit / reload
    
    const totalFeeText = $("#totalAmountWithFeeRazorpay").text().replace("€", "").trim();
    const totalFee = parseFloat(totalFeeText);

    if (!totalFee || totalFee <= 0) {
        alert("Invalid payment amount.");
        return;
    }

    var options = {
        "key": "rzp_live_RmfVue7YYwHXtS",  
        "amount": totalFee * 100,
        "currency": "EUR",
        "name": "Adhiroha",
        "description": "Registration Fee",
        "handler": function (response) {
            window.location.href = `https://adhiroha.com/thank-you.php?view_id=${studentCode}&acco=${encodeURIComponent(acco)}&room=${encodeURIComponent(selectedRoomName || 'N/A')}`;
        },
        "theme": { "color": "#0B72E7" }
    };

    const razor = new Razorpay(options);
    razor.open();

    return false; // extra safety
});



   $("#wiseButtonContainer").off('click').on('click', function (e) {
    e.preventDefault();

    if (!studentCode || !selectedSharingType) {
        alert('Please ensure all student details and accommodation type are selected.');
        return false;
    }

    let wiseUrl = null;
    if (registrationFee === 300) wiseUrl = 'https://wise.com/pay/r/IXNQtDlwmxjeCDY';
    if (registrationFee === 500) wiseUrl = 'https://wise.com/pay/r/pcFuCbxg89g5H28';
    if (registrationFee === 750) wiseUrl = 'https://wise.com/pay/r/u5iZ-SHWyxAr8M0';

    if (!wiseUrl) {
        alert('No Wise payment link available.');
        return false;
    }

    window.location.href = wiseUrl;
    return false;
});

}



    function hideCourseInfo() {
        $("#courseInfoPanel").slideUp();
        $("#toggleInfoBtn").text("Show Course Info");
    }

function updateFees() {
    const course = $("#course").val();
    const batchId = $("#batch").val();
    const selectedOption = $("#batch").find('option:selected');
    const fullDateRange = selectedOption.data('full-date');
    let isFirstBatch = false;

    if (fullDateRange && course === "Sound Healing") {
        const startStr = fullDateRange.split(' - ')[0].trim();
        const day = parseInt(startStr.split(' ')[0], 10);
        isFirstBatch = day === 1;
    }

    // Get the number of students
    const numStudents = document.querySelectorAll('.student-entry').length || 1;

    // Reset all fee displays
    $("#t_fees_triple, #r_fees_triple, #t_fees_double, #r_fees_double").text('€XXX');
    $("#t_fees_triple_retreat, #r_fees_triple_retreat, #t_fees_double_retreat, #r_fees_double_retreat").text('€XXX');
    $("#t_fees_triple_sound, #r_fees_triple_sound, #t_fees_double_sound, #r_fees_double_sound").text('€XXX');
    $("#scholarship_triple, #scholarship_double").text('€0');
    $("#total_separate_triple, #total_separate_double").text('€0');
    $("#combo_triple, #combo_double").text('€0');
    $("#balance_triple, #balance_double").text('Balance Fee to be Paid Upon Arrival: Euros XXX');
    $("#balance_triple_retreat, #balance_double_retreat").text('Balance Fee to be Paid Upon Arrival: Euros XXX');
    $("#sound_triple, #sound_double").hide();
    $("#tripleFees .non-retreat, #doubleFees .non-retreat").show();
    $("#tripleFees .retreat-fees, #doubleFees .retreat-fees").hide();
    $('.accom-section .balance-fee-container').empty().hide();
    $("#tripleCourseTitle, #doubleCourseTitle").text("Total Fees:");

    if (!course || !batchId) {
        $("#registrationFeeAmount").text('0.0');
        $("#paypalFeeAmount").text('0.0');
        $("#totalAmountWithFee").text('0.0');
        $("#totalAmountWithFeeButton").text('0.0');
        registrationFee = 0;
        $("#tripleFees, #doubleFees").hide();
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
            double: { total: 795, reg: 300, balance: 495 },
            single: { total: 795, reg: 300, balance: 495 }
        },
        yoga_retreat: {
            triple: { total: 510, reg: 300, balance: 210 },
            double: { total: 660, reg: 300, balance: 360 }
        },
        hatha: {
            triple: { total: 790, reg: 300, balance: 490, combo: 1390, separate: 1480, scholarship: 90 },
            double: { total: 1090, reg: 300, balance: 790, combo: 1790, separate: 1885, scholarship: 95 }
        },
        ashtanga: {
            triple: { total: 790, reg: 300, balance: 490, combo: 1390, separate: 1480, scholarship: 90 },
            double: { total: 1090, reg: 300, balance: 790, combo: 1790, separate: 1885, scholarship: 95 }
        },
        pranayama: {
            triple: { total: 790, reg: 300, balance: 490, combo: 1390, separate: 1480, scholarship: 90 },
            double: { total: 1090, reg: 300, balance: 790, combo: 1790, separate: 1885, scholarship: 95 }
        }
    };

    const courseId = courseTypeMap[course] || "yoga_retreat";
    const yogaTtcCourses = ["200 Hour YTTC", "300 Hour YTTC", "500 Hour YTTC", "Hatha", "Ashtanga", "Pranayama"];

    if (course === "Yoga Retreat") {
        $("#tripleCourseTitle, #doubleCourseTitle").text("Total Fees:");
        $("#t_fees_triple_retreat").text(`€${fees.yoga_retreat.triple.total * numStudents}`);
        $("#r_fees_triple_retreat").text(`€${fees.yoga_retreat.triple.reg * numStudents}`);
        $("#balance_triple_retreat").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.yoga_retreat.triple.balance * numStudents}`);
        $("#t_fees_double_retreat").text(`€${fees.yoga_retreat.double.total * numStudents}`);
        $("#r_fees_double_retreat").text(`€${fees.yoga_retreat.double.reg * numStudents}`);
        $("#balance_double_retreat").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.yoga_retreat.double.balance * numStudents}`);
        $("#tripleFees .retreat-fees, #doubleFees .retreat-fees").show();
        $("#tripleFees .non-retreat, #doubleFees .non-retreat").hide();
        $("#tripleFees, #doubleFees").show();
        registrationFee = selectedSharingType === 'double' ? 
            fees.yoga_retreat.double.reg * numStudents : 
            fees.yoga_retreat.triple.reg * numStudents;
    } else if (course === "Sound Healing") {
        const tripleFeeType = isFirstBatch ? 'double' : 'triple';
        const doubleFeeType = isFirstBatch ? 'single' : 'double';
        $("#tripleCourseTitle").text(isFirstBatch ? "Double Sharing Total Fees:" : "Triple Sharing Total Fees:");
        $("#doubleCourseTitle").text(isFirstBatch ? "Single Private Total Fees:" : "Double Sharing Total Fees:");
        $("#t_fees_triple").text(`€${fees.sound_healing[tripleFeeType].total * numStudents}`);
        $("#r_fees_triple").text(`€${fees.sound_healing[tripleFeeType].reg * numStudents}`);
        $("#balance_triple").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.sound_healing[tripleFeeType].balance * numStudents}`);
        $("#t_fees_double").text(`€${fees.sound_healing[doubleFeeType].total * numStudents}`);
        $("#r_fees_double").text(`€${fees.sound_healing[doubleFeeType].reg * numStudents}`);
        $("#balance_double").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees.sound_healing[doubleFeeType].balance * numStudents}`);
        $("#tripleFees .non-retreat, #doubleFees .non-retreat").show();
        $("#tripleFees, #doubleFees").show();
        registrationFee = selectedSharingType === 'double' ? 
            fees.sound_healing[doubleFeeType].reg * numStudents : 
            fees.sound_healing[tripleFeeType].reg * numStudents;
    } else if (yogaTtcCourses.includes(course)) {
        $("#tripleCourseTitle").text(`${course} Total Fees:`);
        $("#doubleCourseTitle").text(`${course} Total Fees:`);
        $("#t_fees_triple").text(`€${fees[courseId].triple.total * numStudents}`);
        $("#r_fees_triple").text(`€${fees[courseId].triple.reg * numStudents}`);
        $("#balance_triple").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees[courseId].triple.balance * numStudents}`);
        $("#t_fees_double").text(`€${fees[courseId].double.total * numStudents}`);
        $("#r_fees_double").text(`€${fees[courseId].double.reg * numStudents}`);
        $("#balance_double").text(`Balance Fee to be Paid Upon Arrival: Euros ${fees[courseId].double.balance * numStudents}`);
        if (isSoundHealingAdded) {
            $("#t_fees_triple_sound").text(`€${fees.sound_healing.triple.total * numStudents}`);
            $("#r_fees_triple_sound").text(`€${fees.sound_healing.triple.reg * numStudents}`);
            $("#t_fees_double_sound").text(`€${fees.sound_healing.double.total * numStudents}`);
            $("#r_fees_double_sound").text(`€${fees.sound_healing.double.reg * numStudents}`);
            $("#scholarship_triple").text(`€${fees[courseId].triple.scholarship * numStudents}`);
            $("#scholarship_double").text(`€${fees[courseId].double.scholarship * numStudents}`);
            $("#total_separate_triple").text(`€${fees[courseId].triple.separate * numStudents}`);
            $("#combo_triple").text(`€${fees[courseId].triple.combo * numStudents}`);
            $("#total_separate_double").text(`€${fees[courseId].double.separate * numStudents}`);
            $("#combo_double").text(`€${fees[courseId].double.combo * numStudents}`);
            $("#sound_triple, #sound_double").show();
            registrationFee = selectedSharingType === 'double' ? 
                (fees[courseId].double.reg + fees.sound_healing.double.reg) * numStudents : 
                (fees[courseId].triple.reg + fees.sound_healing.triple.reg) * numStudents;
        } else {
            $("#sound_triple, #sound_double").hide();
            registrationFee = selectedSharingType === 'double' ? 
                fees[courseId].double.reg * numStudents : 
                fees[courseId].triple.reg * numStudents;
        }
        $("#tripleFees .non-retreat, #doubleFees .non-retreat").show();
        $("#tripleFees, #doubleFees").show();
    }

    // Update PayPal payment section
    const paypalFee = registrationFee * 0.055;
    totalWithFee = registrationFee + paypalFee;
    $("#registrationFeeAmount").text(registrationFee.toFixed(1));
    $("#paypalFeeAmount").text(paypalFee.toFixed(1));
    $("#totalAmountWithFee").text(totalWithFee.toFixed(1));
    $("#totalAmountWithFeeButton").text(totalWithFee.toFixed(1));

    const balanceContainer = $('.accom-section .balance-fee-container');
    if (selectedSharingType && course) {
        const isSoundHealing = course === "Sound Healing";
        const isYogaRetreat = course === "Yoga Retreat";
        let effectiveType = selectedSharingType;
        if (isSoundHealing && isFirstBatch) {
            effectiveType = selectedSharingType === "triple" ? "double" : "single";
        }
        const totalAmount = isYogaRetreat ? 
            (selectedSharingType === 'double' ? 
                fees.yoga_retreat.double.total * numStudents : 
                fees.yoga_retreat.triple.total * numStudents) :
            (isSoundHealing ? 
                fees.sound_healing[effectiveType].total * numStudents :
                (isSoundHealingAdded ? 
                    (selectedSharingType === 'double' ? 
                        fees[courseId].double.combo * numStudents : 
                        fees[courseId].triple.combo * numStudents) : 
                    fees[courseId][selectedSharingType].total * numStudents));
        const totalRegAmount = isYogaRetreat ? 
            (selectedSharingType === 'double' ? 
                fees.yoga_retreat.double.reg * numStudents : 
                fees.yoga_retreat.triple.reg * numStudents) :
            (isSoundHealing ? 
                fees.sound_healing[effectiveType].reg * numStudents :
                (isSoundHealingAdded ? 
                    (selectedSharingType === 'double' ? 
                        (fees[courseId].double.reg + fees.sound_healing.double.reg) * numStudents : 
                        (fees[courseId].triple.reg + fees.sound_healing.triple.reg) * numStudents) : 
                    fees[courseId][selectedSharingType].reg * numStudents));
        const balanceAmount = isYogaRetreat ? 
            (selectedSharingType === 'double' ? 
                fees.yoga_retreat.double.balance * numStudents : 
                fees.yoga_retreat.triple.balance * numStudents) :
            (isSoundHealing ? 
                fees.sound_healing[effectiveType].balance * numStudents :
                (isSoundHealingAdded ? 
                    (selectedSharingType === 'double' ? 
                        (fees[courseId].double.combo - (fees[courseId].double.reg + fees.sound_healing.double.reg)) * numStudents : 
                        (fees[courseId].triple.combo - (fees[courseId].triple.reg + fees.sound_healing.triple.reg)) * numStudents) : 
                    fees[courseId][selectedSharingType].balance * numStudents));
        balanceContainer.html(`
            <div class="col-md-12 mb-2 mt-2">
                <p style="margin-bottom:0px;" class="total-fees">Total Fees: Euros ${totalAmount}</p>
                <p class="total-registration-fees">Total Registration Fees: Euros ${totalRegAmount}</p>
                <p id="balance_fee_${courseId}">Balance Fee to be Paid Upon Arrival: Euros ${balanceAmount}</p>
            </div>
        `).show();
    } else {
        balanceContainer.empty().hide();
    }
}

function showStep(step) {
    $(".wizard-step").removeClass("active");
    $("#step" + step).addClass("active");
    $("#prevBtn").toggle(step > 1);
    $("#nextBtn").toggle(step < 3);

    if (step === 1) {
        $(".modal-footer").addClass("first-step");
        const course = $("#course").val();
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

        const isValid = validEntries > 0 && course && batch && (course !== "Yoga Retreat" || type);
        $("#nextBtn").prop("disabled", !isValid);

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
        updateFees(); // Ensure fees are recalculated before showing payment details
        initializePaypalButton();
        updatePaymentDetails();
        if (selectedSharingType) {
            const course = $("#course").val();
            const isSoundHealing = course === "Sound Healing";
            const isFirstBatch = $("#batch option:selected").data('full-date')?.split(' - ')[0].trim().split(' ')[0] === "1";
            let displayText = selectedSharingType === "triple" ? (isSoundHealing && isFirstBatch ? "Double Sharing" : "Triple Sharing") : 
                             (isSoundHealing && isFirstBatch ? "Single Private" : "Double Sharing");
            $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(displayText);
        } else {
            $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Select on Step 2");
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
}else if (step !== 3) {
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

    function updateRoomOptions(sharingType) {
    const course = $("#course").val();
    const tripleSharingImg = $(".triple-sharing-img");
    const doubleSharingImg = $(".double-sharing-img");
    const roomOptionsContainer = $("#roomOptions");
    roomOptionsContainer.empty();

    const batchId = $("#batch").val();
    const selectedOption = $("#batch").find('option:selected');
    const fullDateRange = selectedOption.data('full-date');
    let isFirstBatch = false;

    if (fullDateRange && course === "Sound Healing") {
        const startStr = fullDateRange.split(' - ')[0].trim();
        const day = parseInt(startStr.split(' ')[0], 10);
        isFirstBatch = day === 1;
    }

    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(
        sharingType === "triple" ? (isFirstBatch ? "Double Sharing" : "Triple Sharing") : 
        (sharingType === "double" ? (isFirstBatch ? "Single Private" : "Double Sharing") : "Select on Step 2")
    );

    if (course === "Sound Healing" || course === "Yoga Retreat" || course === "Hatha" || course === "Ashtanga" || course === "Pranayama") {
        tripleSharingImg.attr({
            "src": isFirstBatch && course === "Sound Healing" ? "https://www.adhiroha.com/img/sound-healing-double.webp" : "https://www.adhiroha.com/img/triple-sharing-01.webp",
            "alt": isFirstBatch && course === "Sound Healing" ? "Double Sharing" : "Triple Sharing"
        });
        doubleSharingImg.attr({
            "src": isFirstBatch && course === "Sound Healing" ? "https://www.adhiroha.com/img/sound-healing-single.webp" : "https://www.adhiroha.com/img/double-sharing-new.webp",
            "alt": isFirstBatch && course === "Sound Healing" ? "Single Private" : "Double Sharing"
        });
        $("#roomSelection").css("display", "none");
        $("#roomOptions").empty();
        return;
    }

    tripleSharingImg.attr({
        "src": "https://www.adhiroha.com/img/triple-sharing-01.webp",
        "alt": "Triple Sharing"
    });
    doubleSharingImg.attr({
        "src": "https://www.adhiroha.com/img/double-sharing-new.webp",
        "alt": "Double Sharing"
    });

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

    $("#batch").empty().append('<option value="">Select Batch</option>');
    $(".type-col, .month-col").hide();
    $(".course-col, .batch-col").removeClass('col-md-6').addClass('col-md-6');
    $("#tripleSharingFormCheck label").text('Triple Sharing');
    $("#doubleSharingFormCheck label").text('Double Sharing');
    tripleSharingImg.attr({
        "src": "https://www.adhiroha.com/img/triple-sharing-01.webp",
        "alt": "Triple Sharing"
    });
    doubleSharingImg.attr({
        "src": "https://www.adhiroha.com/img/double-sharing-new.webp",
        "alt": "Double Sharing"
    });
    $("#roomSelection").css("display", "none");
    $('#sound-healing-tab-li').hide();
    $('#sound-healing').removeClass('active');
    $('#main-course').addClass('active');
    $('#main-course-tab').addClass('active');
    $('#sound-healing-tab').removeClass('active');

    if (course) {
        mainCourseTab.text(course === "Yoga Retreat" ? "Yoga & Ayurveda Retreats" : (course === "Sound Healing" ? "Sound Healing TTC" : "Yoga TTC"));
        selectedType = course === "Yoga Retreat" ? "yoga_retreat" : courseTypeMap[course];
        fetchBatchesForCourse(course, selectedType);
    } else {
        $("#courseInfoPanel").slideUp();
        $("#toggleInfoBtn").hide();
        $("#nextBtn").prop("disabled", true);
        $("#tripleFees, #doubleFees").hide();
        $("#roomOptions").empty();
        $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 2");
        selectedType = null;
        updateFees();
    }
});

   function fetchBatchesForCourse(course, type) {
    if (!type) return;

    $.ajax({
        url: 'get_batches.php',
        type: 'GET',
        data: { type: type },
        success: function(data) {
            try {
                var batches = JSON.parse(data);
                var batchSelect = $("#batch");
                batchSelect.empty();
                batchSelect.append('<option value="">Select Batch</option>');
                batches.forEach(function(batch) {
                    var fullDateRange = batch.date_range;
                    var startDate = batch.start_date;
                    var optionText = batch.status === 'sold' 
                        ? `${startDate} - (Admission Full - Register For Waiting List)` 
                        : startDate;
                    batchSelect.append(`<option value="${batch.id}" data-status="${batch.status}" data-full-date="${fullDateRange}">${optionText}</option>`);
                });
                $("#courseInfoPanel").slideUp();
                $("#toggleInfoBtn").hide();
                $("#nextBtn").prop("disabled", true);
                $("#roomSelection").css("display", "none");
                updateFees();
                updateCourseFeeItems(course, "mainCourseFeeItems");
            } catch (e) {
                console.error('Error parsing batches:', e);
                alert('Error parsing batch data.');
                $("#batch").empty().append('<option value="">Select Batch</option>');
                $("#courseInfoPanel").slideUp();
                $("#toggleInfoBtn").hide();
                $("#nextBtn").prop("disabled", true);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching batches:', error, 'Status:', status);
            alert('Error fetching batches: ' + error);
            $("#batch").empty().append('<option value="">Select Batch</option>');
            $("#courseInfoPanel").slideUp();
            $("#toggleInfoBtn").hide();
            $("#nextBtn").prop("disabled", true);
        }
    });
}

    $("#type").off('change').on('change', function() {
        var type = $(this).val();
        var batchSelect = $("#batch");
        batchSelect.empty();
        batchSelect.append('<option value="">Select Batch</option>');

        const mainCourseTab = $("#main-course-tab");
        if (type) {
            mainCourseTab.text(type);
            console.log('Fetching batches for retreat type:', type);
            $.ajax({
                url: 'get_batches.php',
                type: 'GET',
                data: { type: 'yoga_retreat', retreat_type: type },
                success: function(data) {
                    console.log('Batches response:', data);
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
                                : startDate;
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
            mainCourseTab.text("Yoga Retreat");
            updateFees();
        }
    });

  
// Handle change event for triple and double sharing radio buttons
$("#tripleSharing, #doubleSharing").off('change').on('change', function() {
    const course = $("#course").val();
    const tripleChecked = $("#tripleSharing").is(":checked");
    const doubleChecked = $("#doubleSharing").is(":checked");
    const batchId = $("#batch").val();
    const selectedOption = $("#batch").find('option:selected');
    const fullDateRange = selectedOption.data('full-date');
    let isFirstBatch = false;

    if (fullDateRange && course === "Sound Healing") {
        const startStr = fullDateRange.split(' - ')[0].trim();
        const day = parseInt(startStr.split(' ')[0], 10);
        isFirstBatch = day === 1;
    }

    if (tripleChecked && !$("#tripleSharing").prop('disabled')) {
        selectedSharingType = "triple";
        if (course === "200 Hour YTTC" || course === "300 Hour YTTC" || course === "500 Hour YTTC") {
            updateRoomOptions("triple");
            $("#roomSelection").css("display", "block");
        } else {
            $("#roomSelection").css("display", "none");
            $("#roomOptions").empty();
        }
        $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(
            isFirstBatch && course === "Sound Healing" ? "Double Sharing" : "Triple Sharing"
        );
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
        $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(
            isFirstBatch && course === "Sound Healing" ? "Single Private" : "Double Sharing"
        );
        setTimeout(() => {
            document.getElementById('roomSelection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        selectedSharingType = null;
        selectedRoomName = null;
        $("#roomSelection").css("display", "none");
        $("#roomOptions").empty();
        $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text("Select on Step 2");
    }
    updateFees();
});

// Update room options based on selected sharing type
function updateRoomOptions(sharingType) {
    const course = $("#course").val();
    const tripleSharingImg = $(".triple-sharing-img");
    const doubleSharingImg = $(".double-sharing-img");
    const roomOptionsContainer = $("#roomOptions");
    roomOptionsContainer.empty();

    const batchId = $("#batch").val();
    const selectedOption = $("#batch").find('option:selected');
    const fullDateRange = selectedOption.data('full-date');
    let isFirstBatch = false;

    if (fullDateRange && course === "Sound Healing") {
        const startStr = fullDateRange.split(' - ')[0].trim();
        const day = parseInt(startStr.split(' ')[0], 10);
        isFirstBatch = day === 1;
    }

    $("#courseDetailsModal #accommodationText, #courseDetailsModal #soundHealingAccommodationText").text(
        sharingType === "triple" ? (isFirstBatch ? "Double Sharing" : "Triple Sharing") : 
        (sharingType === "double" ? (isFirstBatch ? "Single Private" : "Double Sharing") : "Select on Step 2")
    );

    if (course === "Sound Healing") {
        tripleSharingImg.attr({
            "src": isFirstBatch ? "https://www.adhiroha.com/img/sound-healing-double.webp" : "https://www.adhiroha.com/img/triple-sharing-01.webp",
            "alt": isFirstBatch ? "Double Sharing" : "Triple Sharing"
        });
        doubleSharingImg.attr({
            "src": isFirstBatch ? "https://www.adhiroha.com/img/sound-healing-single.webp" : "https://www.adhiroha.com/img/double-sharing-new.webp",
            "alt": isFirstBatch ? "Single Private" : "Double Sharing"
        });
        $("#roomSelection").css("display", "none");
        $("#roomOptions").empty();
        return;
    }

    tripleSharingImg.attr({
        "src": "https://www.adhiroha.com/img/triple-sharing-01.webp",
        "alt": "Triple Sharing"
    });
    doubleSharingImg.attr({
        "src": "https://www.adhiroha.com/img/double-sharing-new.webp",
        "alt": "Double Sharing"
    });

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
    var retreatType = $("#type").val();
    isSoundHealingAdded = false;
    $("#addSoundHealing").prop('checked', false).prop('disabled', !course);
    
    const mainCourseTab = $("#main-course-tab");
    if (course === "Sound Healing") {
        mainCourseTab.text("Sound Healing TTC");
        $("#addSoundHealing").closest('.form-check').hide();
        $(".month-col").show();
        $(".course-col, .month-col, .batch-col").removeClass('col-md-6').addClass('col-md-6');
        $("#tripleSharingFormCheck label").text('Triple Sharing');
        $("#doubleSharingFormCheck label").text('Double Sharing');
        populateMonthDropdown();
    } else {
        mainCourseTab.text(course === "Yoga Retreat" ? "Yoga Retreat" : "Yoga TTC");
        $("#addSoundHealing").closest('.form-check').show();
        $(".month-col").hide();
        $("#month").empty().append('<option value="">Select Month</option>');
        $("#batch").empty().append('<option value="">Select Batch</option>');
        $(".course-col, .batch-col").removeClass('col-md-6').addClass('col-md-6');
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

    if (course === "Yoga Retreat") {
        $("#tripleFees, #doubleFees").hide();
    } else {
        $("#tripleFees").html(`
            <p><strong>${course === "Sound Healing" ? "" : (course || 'Select Course')} Total Fees:</strong> <span id="t_fees_triple_${courseId}">${course ? (course === "Sound Healing" ? '€' + fees.sound_healing.triple.total : '€' + fees[courseId].triple.total) : '€XXX'}</span></p>
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
            <p><strong>${course === "Sound Healing" ? "" : (course || 'Select Course')} Total Fees:</strong> <span id="t_fees_double_${courseId}">${course ? (course === "Sound Healing" ? '€' + fees.sound_healing.double.total : '€' + fees[courseId].double.total) : '€XXX'}</span></p>
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
        $("#tripleFees, #doubleFees").show();
    }

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
        $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 2");
        $("#mainCourseFeeItems, #soundHealingCourseFeeItems").empty();
        selectedType = null;
        updateFees();
    }
});



// Handle month selection to fetch batches



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
        $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 2");
        window.batchDetails = null;
        $("#studentDetails").slideUp();
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
        dataType: 'json',
        beforeSend: function() {
            console.log('Fetching batch details for batchId:', batchId);
        },
        success: function(data) {
            try {
                console.log('Raw batch details response:', data);
                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid response format: Expected a JSON object');
                }
                if (!data.id || !data.date_range) {
                    throw new Error('Missing required fields in batch details');
                }

                window.batchDetails = data;
                selectedType = courseTypeMap[$("#course").val()];
                updateCourseInfoPanel();
                updateFees();

                // Update accommodation images based on batch for Sound Healing
                if ($("#course").val() === "Sound Healing") {
                    const startStr = data.date_range.split(' - ')[0].trim();
                    const day = parseInt(startStr.split(' ')[0], 10);
                    const isFirstBatch = day === 1;
                    $(".triple-sharing-img").attr({
                        "src": isFirstBatch ? "https://www.adhiroha.com/img/sound-healing-double.webp" : "https://www.adhiroha.com/img/triple-sharing-01.webp",
                        "alt": isFirstBatch ? "Double Sharing" : "Triple Sharing"
                    });
                    $(".double-sharing-img").attr({
                        "src": isFirstBatch ? "https://www.adhiroha.com/img/sound-healing-single.webp" : "https://www.adhiroha.com/img/double-sharing-new.webp",
                        "alt": isFirstBatch ? "Single Private" : "Double Sharing"
                    });
                    $("#tripleSharingFormCheck label").text(isFirstBatch ? 'Double Sharing' : 'Triple Sharing');
                    $("#doubleSharingFormCheck label").text(isFirstBatch ? 'Single Private' : 'Double Sharing');
                }

                $("#courseInfoPanel").slideDown();
                $("#toggleInfoBtn").show().text("Hide Course Info");
                $("#nextBtn").prop("disabled", false);
                $("#accommodationText, #soundHealingAccommodationText").text("Select on Step 2");

                const studentsContainer = document.getElementById('studentsContainer');
                if (!studentsContainer) {
                    console.error('studentsContainer element not found in the DOM.');
                    throw new Error('Student container element (ID: studentsContainer) is missing in the DOM.');
                }

                studentsContainer.innerHTML = '';
                studentCount = 0;
                addNewStudent($("#course").val());
                const addStudentBtn = document.getElementById('addStudentBtn');
                if (addStudentBtn) {
                    addStudentBtn.disabled = false;
                } else {
                    console.warn('addStudentBtn element not found in the DOM');
                }

                $("#studentDetails").slideDown();
            } catch (e) {
                console.error('Error processing batch details:', e.message, 'Response:', data);
                alert('Error processing batch details: ' + e.message);
                $("#courseInfoPanel").slideUp();
                $("#toggleInfoBtn").hide();
                $("#nextBtn").prop("disabled", true);
                $("#studentDetails").slideUp();
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
            $("#studentDetails").slideUp();
        }
    });
});
$("#nextBtn").off('click').on('click', function() {
    const $nextBtn = $(this);

    if (currentStep === 1) {
        const course = $("#course").val();
        const batch = $("#batch").val();
        const allEntries = document.querySelectorAll('.student-entry');

        if (!course) {
            alert('Please select a course.');
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
    } else if (currentStep === 2) {
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
    // Function to synchronize modal heights
function syncModalHeights() {
  const wizardModal = document.querySelector('#wizardModal .modal-content');
  const courseDetailsModal = document.querySelector('#courseDetailsModal .modal-content');

  if (wizardModal && courseDetailsModal) {
    // Reset any previous height to allow natural content height
    courseDetailsModal.style.height = 'auto';
    
    // Get the computed height of the wizardModal
    const wizardHeight = wizardModal.offsetHeight;
    
    // Set courseDetailsModal height to match wizardModal
    courseDetailsModal.style.height = `${wizardHeight}px`;
  }
}

// Function to update header text and interactivity based on screen size
function updateHeaderState() {
  const label = document.querySelector('#courseDetailsModalLabel');
  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const toggleIcon = document.querySelector('#courseDetailsModal .wizard-header i');
  const wizardHeader = document.querySelector('#courseDetailsModal .wizard-header');
  const isMobile = window.innerWidth <= 992;

  if (isMobile) {
    // Mobile: Enable toggle functionality and show/hide text
    wizardHeader.style.cursor = 'pointer';
    label.textContent = modalDialog.classList.contains('shown') ? 'Hide Course Details' : 'Show Course Details';
    toggleIcon.style.display = 'inline-block';
  } else {
    // PC: Non-clickable header with static text
    wizardHeader.style.cursor = 'default';
    label.textContent = 'Course Details';
    toggleIcon.style.display = 'none';
    // Ensure modal is always shown on PC
    modalDialog.classList.remove('hidden');
    modalDialog.classList.add('shown');
    modalBody.classList.remove('hidden');
    modalBody.classList.add('shown');
  }
}

// Toggle Course Details Modal on wizard-header click (mobile only)
document.querySelector('#courseDetailsModal .wizard-header').addEventListener('click', function(e) {
  if (window.innerWidth > 992) return; // Disable click on PC

  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const toggleIcon = this.querySelector('i');

  // Toggle modal state
  const isShown = modalDialog.classList.contains('shown');

  if (isShown) {
    // Hide the modal
    modalDialog.classList.remove('shown');
    modalDialog.classList.add('hidden');
    modalBody.classList.remove('shown');
    modalBody.classList.add('hidden');
    toggleIcon.classList.remove('fa-chevron-down');
    toggleIcon.classList.add('fa-chevron-up');
  } else {
    // Show the modal
    modalDialog.classList.remove('hidden');
    modalDialog.classList.add('shown');
    modalBody.classList.remove('hidden');
    modalBody.classList.add('shown');
    toggleIcon.classList.remove('fa-chevron-up');
    toggleIcon.classList.add('fa-chevron-down');
  }

  // Update header text and sync heights after toggle
  updateHeaderState();
  syncModalHeights();
});

// Initialize modal state on page load
document.addEventListener('DOMContentLoaded', function() {
  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const toggleIcon = document.querySelector('#courseDetailsModal .wizard-header i');

  // Set initial state based on screen size
  if (window.innerWidth <= 992) {
    modalDialog.classList.add('hidden');
    modalBody.classList.add('hidden');
    toggleIcon.classList.add('fa-chevron-up');
  } else {
    modalDialog.classList.add('shown');
    modalBody.classList.add('shown');
    toggleIcon.classList.add('fa-chevron-down');
  }

  // Initial header state and height sync
  updateHeaderState();
  syncModalHeights();
});

// Update modal state, header text, and heights on window resize
window.addEventListener('resize', function() {
  const modalDialog = document.querySelector('#courseDetailsModal .modal-dialog.course-details-modal');
  const modalBody = document.querySelector('#courseDetailsModal .modal-body');
  const toggleIcon = document.querySelector('#courseDetailsModal .wizard-header i');

  if (window.innerWidth <= 992) {
    // On mobile, default to hidden state unless already shown
    if (!modalDialog.classList.contains('shown')) {
      modalDialog.classList.add('hidden');
      modalBody.classList.add('hidden');
      toggleIcon.classList.remove('fa-chevron-down');
      toggleIcon.classList.add('fa-chevron-up');
    }
  } else {
    // On PC, always shown and non-clickable
    modalDialog.classList.remove('hidden');
    modalDialog.classList.add('shown');
    modalBody.classList.remove('hidden');
    modalBody.classList.add('shown');
    toggleIcon.classList.remove('fa-chevron-up');
    toggleIcon.classList.add('fa-chevron-down');
  }

  // Update header state and sync heights after resize
  updateHeaderState();
  syncModalHeights();
});

// Use ResizeObserver to detect changes in wizardModal size
const wizardModal = document.querySelector('#wizardModal .modal-content');
if (wizardModal) {
  const resizeObserver = new ResizeObserver(syncModalHeights);
  resizeObserver.observe(wizardModal);
}

// Update heights when modals are shown
document.querySelector('#wizardModal').addEventListener('shown.bs.modal', syncModalHeights);
document.querySelector('#courseDetailsModal').addEventListener('shown.bs.modal', syncModalHeights);

// Update heights when student details or other dynamic content changes
document.getElementById('addStudentBtn').addEventListener('click', syncModalHeights);
document.getElementById('course').addEventListener('change', syncModalHeights);
document.getElementById('month').addEventListener('change', syncModalHeights);
</script>
<script>

// ===== Sound Healing February 2026 Block Script =====
(function(){

    function lockSoundHealingBatch() {

        const courseSelect = document.getElementById("course");
        const batchSelect  = document.getElementById("batch");

        if(!courseSelect || !batchSelect) return;

        // Sirf Sound Healing pe chalega
        if(courseSelect.value !== "Sound Healing") return;

        // saare options check karo
        [...batchSelect.options].forEach(option => {

            // Batch ID = 14
            if(option.value == "14") {

                // Text change
                option.textContent = "February 2026 - Admission Full";

                // Disable
                option.disabled = true;

            }
        });
    }


    // --- Course change hone par ---
    document.addEventListener("change", function(e){
        if(e.target.id === "course"){
            // AJAX ko load hone ka time do
            setTimeout(lockSoundHealingBatch, 800);
        }
    });


    // --- Batch dropdown update detect (AJAX population) ---
    const observer = new MutationObserver(function(){
        lockSoundHealingBatch();
    });

    const batchElement = document.getElementById("batch");
    if(batchElement){
        observer.observe(batchElement, { childList:true });
    }


    // --- Manual selection block (DevTools hack protection) ---
    document.addEventListener("change", function(e){

        if(e.target.id === "batch"){

            const course = document.getElementById("course").value;
            const selectedVal = e.target.value;

            if(course === "Sound Healing" && selectedVal == "14"){
                alert("February 2026 Sound Healing batch is fully booked. Please choose another batch.");
                e.target.value = "";
            }
        }

    });

})();
</script>

<script>
// Referral code field show/hide
document.getElementById('studentsContainer').addEventListener('change', function(e) {
  if (e.target && e.target.classList.contains('student-how-know')) {
    var idx = e.target.id.replace('how_know-', '');
    var refGroup = document.getElementsByClassName('ref-code-group-' + idx)[0];
    if (refGroup) {
      if (e.target.value === 'Referral') {
        refGroup.style.display = 'block';
      } else {
        refGroup.style.display = 'none';
        var refInput = document.getElementById('ref_code-' + idx);
        if (refInput) refInput.value = '';
      }
    }
  }
});
</script>

</body>
</html>