document.addEventListener('DOMContentLoaded', function(){

    const loginForm = document.querySelector('form');
    const siretImput = document.getElementById('siret');
    const remerberMeCheckbox = document.getElementById('rememberMe');

    const STORAGE_KEY = 'rememberMeSiret';

    function loadRememberSiret() {
        const savedSiret = localStorage.getItem('STORAGE_KEY');

        if (savedSiret) {
            siretImput.value = savedSiret;

            remerberMeCheckbox.checked = true;
        }

    }
})


function handleForSubmit(event){

    if(remerberMeCheckbox.checked){

        const siretValue = siretImput.value.trim()

        if (siretValue) {
            localStorage.setItem(STORAGE_KEY, siretValue);
        }
    }else{
        localStorage.removeItem(STORAGE_KEY);
    }

}


loadRememberSiret();

loginForm.addEventListener('submit', handleForSubmit);

remerberMeCheckbox.addEventListener('change', function(){

    if (!this.checked) {
        localStorage.removeItem(STORAGE_KEY);
    }
})
