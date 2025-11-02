document.getElementById('guestbook-form').onsubmit= () => {
    clearErrors();

            let isValid = true;
        
    

        let fName = document.getElementById('fName').value.trim();
        let lName = document.getElementById('lName').value.trim();
        let email = document.getElementById('email').value.trim();
      
        if (!fName){
              document.getElementById('err-fName').style.display = "inline";
              isValid = false;
        };

        if (!lName){
              document.getElementById('err-lName').style.display = "inline";
              isValid = false;
        };

        if (email !== "") {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
            document.getElementById('err-email-valid').style.display = "inline";
            isValid = false;
            }
        }

        let meetDropdown = document.getElementById('meet').value;

        if( meetDropdown == "none"){
            document.getElementById('err-dropdown').style.display = "block";
            isValid = false;
        }

        let mailingList = document.getElementById('mailing');

        if(mailingList.checked && !email){
            document.getElementById('err-email').style.display = "block";
            isValid = false;
        }




        let linkedin = document.getElementById('linkedin').value.trim();

        if (linkedin !== "" && !linkedin.startsWith('https://linkedin.com/in/')){
            document.getElementById('err-linkedin').style.display = "inline";
            isValid = false;
        }

        return isValid;
    };

    function clearErrors()  {
    let errors = document.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++){
        errors[i].style.display = "none"
    }


}
    document.getElementById('mailing').addEventListener('change', function() {
    let formatGroup = document.getElementById('format-group');
    formatGroup.style.display = this.checked ? "block" : "none";
    });

    let meetVal = document.getElementById('meet');
    let  otherGroup = document.getElementById('other-group');



    meetVal.addEventListener('change', function() {
    if (meetVal.value === "other") {
        otherGroup.style.display = "block";
    }else{
        otherGroup.style.display = "none";
    }
    });

