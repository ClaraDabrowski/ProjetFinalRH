document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.querySelector('form');
    const siretInput = document.getElementById('siret');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    const STORAGE_KEY = 'rememberMeSiret';

    function loadRememberSiret() {
        const savedSiret = localStorage.getItem(STORAGE_KEY);
console.log('Chargement SIRET depuis localStorage:', savedSiret);
        if (savedSiret) {
            siretInput.value = savedSiret;

            rememberMeCheckbox.checked = true;
        }

    }



    function handleForSubmit(event) {
  console.log('Formulaire soumis');
        console.log('Checkbox cochée:', rememberMeCheckbox.checked);
        if (rememberMeCheckbox.checked) {

            const siretValue = siretInput.value.trim()
  console.log('Valeur SIRET à enregistrer:', siretValue);
            if (siretValue) {
                localStorage.setItem(STORAGE_KEY, siretValue);
                console.log('SIRET enregistré dans localStorage');
            }
        } else {
            localStorage.removeItem(STORAGE_KEY);
               console.log('SIRET supprimé du localStorage');
        }

    }


    loadRememberSiret();

    loginForm.addEventListener('submit', handleForSubmit);

    rememberMeCheckbox.addEventListener('change', function () {
  console.log('Checkbox changée, cochée:', this.checked);
        if (!this.checked) {
            localStorage.removeItem(STORAGE_KEY);
              console.log('SIRET supprimé du localStorage (change event)');
        }
    })

})