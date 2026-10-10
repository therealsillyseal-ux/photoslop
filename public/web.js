'use strict';
// Set this to the real GitHub release URL when the full app is ready.
const FULL_APP_URL='';
// Browser-only UI: image editing stays available; app-only features are omitted.
if(!api){
 document.body.classList.add('web-edition');
 const videoTab=$('mode-video');videoTab.disabled=true;videoTab.classList.add('hidden');videoTab.setAttribute('aria-hidden','true');
 for(const id of ['video-workspace','video-bar']){$(id).classList.add('hidden');$(id).inert=true;}
 for(const el of document.querySelectorAll('[data-action="remove-bg"],#remove-bg,.ai-note'))el.remove();
 for(const el of document.querySelectorAll('.menu-popup button'))if(el.textContent.includes('Generative fill'))el.remove();
 const button=document.createElement('button');button.id='web-full-app';button.textContent='Full app';button.title='The full version is coming soon as an app!';videoTab.parentElement.append(button);
 button.addEventListener('click',safe(async()=>{if(FULL_APP_URL){const url=new URL(FULL_APP_URL);if(url.protocol==='https:'&&url.hostname==='github.com'){location.assign(url.href);return;}}const submit=$('dialog-form').querySelector('[type="submit"]'),cancel=$('dialog-cancel'),oldLabel=submit.textContent;submit.textContent='Got it';cancel.classList.add('hidden');try{await message('Full version','The full version is coming soon as an app!');}finally{submit.textContent=oldLabel;cancel.classList.remove('hidden');}}));
 $('load-fonts').title='Installed-font listing is desktop-only. Choose a common font family from the picker.';
 const footer=document.querySelector('footer span:last-child');footer.textContent='Photoslop 0.4.1 · web / image editor';
 const guide=$('guide-dialog');guide.querySelector('p').textContent='Web image editor: paint, import/drop/paste images, edit text, use layers, save/open image projects and export PNG. Clipboard permissions depend on your browser; localhost or HTTPS is recommended.';
 for(const heading of [...guide.querySelectorAll('h3')])if(['Video studio','AI setup'].includes(heading.textContent)){if(heading.nextElementSibling?.tagName==='P')heading.nextElementSibling.remove();heading.remove();}
 const fontInfo=document.createElement('p');fontInfo.textContent='Font families render using fonts available to your browser; installed-font listing is available in the Windows app.';guide.insertBefore(fontInfo,guide.querySelector('h3'));
 const upcoming=document.createElement('p');upcoming.textContent='The full version is coming soon as an app!';guide.insertBefore(upcoming,$('close-guide'));
 // Keep desktop bindings compatible, but do not offer video commands in the web editor.
 $('shortcuts-scope').querySelector('option[value="video"]')?.remove();$('shortcuts-category').querySelector('option[value="Video"]')?.remove();
 const webShortcutList=renderShortcutList;renderShortcutList=function(){webShortcutList();for(const row of document.querySelectorAll('#shortcuts-list .shortcut-row'))if(KM.byId[row.dataset.command]?.scope==='video')row.remove();if(!$('shortcuts-list').children.length){const empty=document.createElement('p');empty.className='muted';empty.textContent='No matching commands.';$('shortcuts-list').append(empty);}};
 window.addEventListener('beforeunload',e=>{if(dirtyState.image){e.preventDefault();e.returnValue='';}});
}
