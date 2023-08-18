const form = document.querySelector('form');
form.addEventListener('submit', e => e.preventDefault());

const trazerRepositorios = () => {
    const nomeUsuario = document.getElementById('nomeUsuario').value.trim();
    if(nomeUsuario){
        const url = `https://api.github.com/users/${nomeUsuario}/repos`

        axios.get(url)
        .then(response => {
            const repos = document.getElementById('repos');
            repos.innerHTML = '';

            const info = document.querySelector('section');
            info.style.display = 'flex';

            const totalRepos = document.getElementById('totalRepos');
            totalRepos.innerText = `Total de repos.: ${response.data.length}`;

            const h3 = document.querySelector('h3');
            h3.innerText = `Repositórios de "${nomeUsuario}"`

            response.data.map(item => {
                const elemento = document.createElement('li');
                elemento.setAttribute('id', item.id);
                elemento.innerHTML = `<a href="${item.html_url}" target="_blank"><p><span class="description">Nome:</span> ${item.name}</p><p>${item.url}</p></a>`
                
                repos.appendChild(elemento);
            })        
        })
        .catch(err => {
            console.log(err.message);
        })
    
    } else {
        alert('Informe um nome de usuário');
    }
}

const btnTop = document.querySelector('.btnTop');

window.onscroll = () => scrollFunction();

function scrollFunction(){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        btnTop.classList.add('show');
    } else {
        btnTop.classList.remove('show');        
    }
}

const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}