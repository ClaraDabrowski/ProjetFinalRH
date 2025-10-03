document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.querySelector('form');
    const siretInput = document.getElementById('siret');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    const STORAGE_KEY = 'rememberMeSiret';

    function loadRememberSiret() {
        const savedSiret = localStorage.getItem(STORAGE_KEY);
        if (savedSiret) {
            siretInput.value = savedSiret;

            rememberMeCheckbox.checked = true;
        }

    }



    function handleForSubmit(event) {
        if (rememberMeCheckbox.checked) {

            const siretValue = siretInput.value.trim()
            if (siretValue) {
                localStorage.setItem(STORAGE_KEY, siretValue);
            }
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }

    }


    loadRememberSiret();

    loginForm.addEventListener('submit', handleForSubmit);

    rememberMeCheckbox.addEventListener('change', function () {

        if (!this.checked) {
            localStorage.removeItem(STORAGE_KEY);
        }
    })

})