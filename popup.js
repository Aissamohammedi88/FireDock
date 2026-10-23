document.addEventListener('DOMContentLoaded', async () => {
    const listEl = document.getElementById('extension-list');
    const searchEl = document.getElementById('search');
    let allExtensions = [];

    try {
        const extensions = await browser.management.getAll();
        allExtensions = extensions.filter(ext => ext.type === 'extension' && ext.id !== browser.runtime.id);
        renderExtensions(allExtensions);
    } catch (e) {
        listEl.innerHTML = `<div class="loading">Erreur : ${e.message}</div>`;
    }

    function renderExtensions(exts) {
        if (exts.length === 0) {
            listEl.innerHTML = '<div class="loading">Aucune extension trouvée.</div>';
            return;
        }
        
        listEl.innerHTML = '';
        exts.forEach(ext => {
            const item = document.createElement('div');
            item.className = 'ext-item';
            
            const iconUrl = ext.icons ? ext.icons[0].url : 'icon.png';
            const stateClass = ext.enabled ? 'btn-on' : 'btn-off';
            const stateText = ext.enabled ? 'ON' : 'OFF';

            item.innerHTML = `
                <img src="${iconUrl}" class="ext-icon">
                <div class="ext-info">
                    <div class="ext-name">${ext.name}</div>
                    <div class="ext-desc">${ext.description || 'Pas de description'}</div>
                </div>
                <button class="btn-toggle ${stateClass}">${stateText}</button>
            `;

            item.querySelector('.btn-toggle').addEventListener('click', async (e) => {
                e.stopPropagation();
                const newState = !ext.enabled;
                await browser.management.setEnabled(ext.id, newState);
                ext.enabled = newState;
                renderExtensions(exts);
            });

            listEl.appendChild(item);
        });
    }

    searchEl.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allExtensions.filter(ext => 
            ext.name.toLowerCase().includes(query) || 
            (ext.description && ext.description.toLowerCase().includes(query))
        );
        renderExtensions(filtered);
    });
});
