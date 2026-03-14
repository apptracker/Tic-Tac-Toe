/* Shared sidebar navigation logic */
(function(){
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const openBtn = document.getElementById('menuOpen');
    function open(){ sidebar.classList.add('open'); overlay.classList.add('show'); }
    function close(){ sidebar.classList.remove('open'); overlay.classList.remove('show'); }
    openBtn.addEventListener('click', open);
    overlay.addEventListener('click', close);
    document.querySelectorAll('.sidebar-link').forEach(l=>{
        l.addEventListener('click', ()=>{ if(window.innerWidth<900) close(); });
    });
})();
