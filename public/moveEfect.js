const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
    panel.addEventListener('click', () =>{
        removerClase()
        panel.classList.add('active')
    })
})


function removerClase(){
    panels.forEach(panel => {
        panel.classList.remove ('active');
    })
}