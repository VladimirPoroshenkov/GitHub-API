const nameInput = document.querySelector('#nameInput');
const userInfoContainer = document.querySelector('#userInfoContainer');
const form = document.querySelector('#userInfoForm');
const userTemplate = document.querySelector('#userInfoTemplate').innerHTML;

form.addEventListener('submit', onFormSubmit )

function onFormSubmit(e) {
    e.preventDefault();

    const name = nameInput.value;

    if(!name) {
        alert('Field Name required');
        return;
    }

    fetch(`https://api.github.com/users/${name}`)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(new Error('Sorry Somethings go wrong'));
        })
        .then((user) => renderUserInfo(user))
        .catch((error) => alert(error.message))
}

function renderUserInfo(user){
    const html = generateTemplate(user);
    userInfoContainer.innerHTML = html;
}

function generateTemplate(user){
    return userTemplate
        .replace('{{repos_url}}', user.repos_url)
        .replace('{{folowers}}', user.folowers)
        .replace('{{following}}', user.following);
}