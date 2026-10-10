(function(root,factory){const value=factory();if(typeof module==='object'&&module.exports)module.exports=value;else root.FrameForgeKeymap=value;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const commands=[
['new-image','New canvas','File','image',['Ctrl+N'],'Create a new Photoslop image document.'],
['open-project','Open project','File','global',['Ctrl+O'],'Open .ffproject; this is not Photoshop format support.'],
['save-project','Save project','File','global',['Ctrl+S'],'Save the active workspace as .ffproject.'],
['paste-image','Paste image','Clipboard','image',['Ctrl+V'],'Adds a clipboard image as a new raster layer. Text inputs keep normal text paste.'],
['copy-image','Copy image/selection','Clipboard','image',['Ctrl+C'],'Copy the active layer, or its selected area, as PNG.'],
['copy-merged','Copy Merged','Clipboard','image',['Ctrl+Shift+C'],'Copy the composite canvas or selected area as PNG.'],
['cut-image','Cut image/selection','Clipboard','image',['Ctrl+X'],'Copies before removing pixels/layer. Partial pixel cuts require a raster layer.'],
['edit-text','Edit selected text layer','Type','image',[],'Live on-canvas editing.'],['rasterize-text','Rasterize text','Type','image',[],'Converts editable text to pixels; Undo restores it.'],
['export-image','Export PNG','File','image',['Ctrl+Alt+Shift+W'],'Uses Photoshop’s Export As chord; this build exports PNG only.'],
['undo','Undo','Edit','global',['Ctrl+Z'],'Undo in the active image or video workspace.'],
['redo','Redo','Edit','global',['Ctrl+Shift+Z'],'Modern Photoshop-style redo. Ctrl+Y is not repurposed.'],
['add-layer','New layer without dialog','Layer','image',['Ctrl+Alt+Shift+N'],'Create an empty raster layer immediately.'],
['fill-layer','Fill…','Edit','image',['Shift+F5'],'Photoslop color-fill dialog; not all Photoshop fill modes.'],
['help','Photoslop guide','Settings','global',['F1'],''],
['new-layer-dialog','New layer…','Layer','image',['Ctrl+Shift+N'],'Open the New Layer name dialog.'],
['duplicate-layer','Layer via Copy / Duplicate','Layer','image',['Ctrl+J'],'Copy selected pixels to a new layer; duplicate the whole layer without a selection.'],
['tool-move','Move tool','Tools','image',['V'],''],['tool-select','Rectangular marquee','Tools','image',['M'],''],
['tool-brush','Brush tool','Tools','image',['B'],''],['tool-eraser','Eraser tool','Tools','image',['E'],''],
['tool-text','Horizontal type tool','Tools','image',['T'],'Click to type; drag to create a paragraph box. Ctrl+Enter finishes; Esc cancels.'],['tool-picker','Eyedropper','Tools','image',['I'],''],
['tool-rect','Rectangle tool','Tools','image',['U'],'U is the shape-tool position; other shape tools and cycling are not implemented.'],
['tool-hand','Hand tool','Tools','image',['H'],''],['tool-zoom','Zoom tool','Tools','image',['Z'],''],
['hold-pan','Temporary hand tool (hold)','Tools','image',['Space'],'Hold the key while dragging. Release returns to your selected tool.'],
['brush-smaller','Decrease brush size','Tools','image',['['],'Photoslop size steps; not a complete Photoshop brush preset engine.'],
['brush-larger','Increase brush size','Tools','image',[']'],'Photoslop size steps; not a complete Photoshop brush preset engine.'],
['select-all','Select all','Select','image',['Ctrl+A'],''],['clear-selection','Deselect','Select','image',['Ctrl+D'],''],
['fit-canvas','Fit on screen','View','image',['Ctrl+0'],''],['actual-pixels','100% zoom','View','image',['Ctrl+1'],''],
['zoom-in','Zoom in','View','image',['Ctrl+='],'Ctrl+= and Ctrl++ use the same physical Equal key.'],['zoom-out','Zoom out','View','image',['Ctrl+-'],''],
['toggle-rulers','Show / hide rulers','View','image',['Ctrl+R'],''],
['toggle-workspace','Show / hide tools, options and panels','View','image',['Tab'],'Keeps the menu and document visible.'],
['toggle-panels','Show / hide right-side panels','View','image',['Shift+Tab'],'Leaves the tools and tool-options bar visible.'],
['swap-colors','Swap foreground / background','Color','image',['X'],''],['default-colors','Default foreground / background','Color','image',['D'],''],
['fill-foreground','Fill with foreground','Color','image',['Alt+Backspace','Alt+Delete'],'Honors the rectangular selection.'],
['fill-background','Fill with background','Color','image',['Ctrl+Backspace','Ctrl+Delete'],'Honors the rectangular selection.'],
['keybindings','Keyboard shortcuts…','Settings','global',['Ctrl+Alt+Shift+K'],'Open this keyboard-shortcut editor.'],
['play','Play / pause','Video','video',['Space'],'Photoslop video control; not a full Premiere keymap.'],
['import-video','Import video','Video','video',[],''],['split','Split at playhead','Video','video',[],''],
['delete-clip','Remove selected clip','Video','video',[],'Current sequential timeline closes the gap.'],['export-video','Export MP4','Video','video',[],''],
['rotate','Rotate layer 90°','Image','image',[],'Layer rotation, not Rotate View.'],['flip','Flip layer horizontally','Image','image',[],''],['grayscale','Black & White','Image','image',[],'Destructive grayscale conversion.'],['apply-adjust','Apply brightness / contrast','Image','image',[],'Uses current panel settings.'],['apply-transform','Apply layer transform fields','Image','image',[],'Uses current Properties values.'],['show-properties','Properties panel','View','image',[],''],['show-adjustments','Adjustments panel','View','image',[],''],['show-color','Color panel','View','image',[],''],['show-layers','Layers panel','View','image',[],''],['toggle-taskbar','Show / hide contextual taskbar','View','image',[],''],['stop','Sequence start','Video','video',[],'Pause and return to sequence start.'],['apply-trim','Apply clip trim fields','Video','video',[],'Uses current clip in/out values.'],['clip-left','Move clip earlier','Video','video',[],''],['clip-right','Move clip later','Video','video',[],''],['transcribe','Transcribe selected clip','Video','video',[],'Optional local AI service.'],
['import-image','Place image as layer','File','image',[],''],['crop-selection','Crop to selection','Image','image',[],''],
['rename-layer','Rename layer','Layer','image',[],''],['scale-layer','Scale layer…','Layer','image',[],'Not Photoshop Free Transform.'],
['layer-up','Raise layer','Layer','image',[],''],['layer-down','Lower layer','Layer','image',[],''],['delete-layer','Delete layer','Layer','image',[],''],
['remove-bg','Remove background (local AI)','Image','image',[],'Optional local AI service required.'],
['show-navigator','Navigator panel','View','image',[],''],['show-history','History panel','View','image',[],''],['reset-workspace','Reset workspace layout','View','image',[],''],
].map(([id,label,category,scope,keys,note])=>({id,label,category,scope,keys,note,available:true}));
const unsupported=[
{id:'preferences',label:'General Preferences',keys:['Ctrl+K']},
{id:'rotate-view',label:'Rotate View tool',keys:['R']},
{id:'merge-visible',label:'Merge Visible',keys:['Ctrl+Shift+E']},
{id:'merge-down',label:'Merge Down',keys:['Ctrl+E']},
{id:'proof-colors',label:'Proof Colors',keys:['Ctrl+Y']},
{id:'free-transform',label:'Free Transform',keys:['Ctrl+T']},
{id:'save-as',label:'Save As',keys:['Ctrl+Shift+S']},
{id:'invert-selection',label:'Inverse Selection',keys:['Ctrl+Shift+I']},
].map(c=>({...c,category:'Not implemented',scope:'image',available:false,note:'Not implemented. Photoshop chord shown for reference; no default action is assigned.'}));
const byId=Object.fromEntries(commands.map(c=>[c.id,c]));
const special=['Space','Tab','Backspace','Delete','Enter','Escape','Home','End','PageUp','PageDown','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Insert',...Array.from({length:12},(_,i)=>'F'+(i+1))];
function canonical(value){if(typeof value!=='string'||value.length>70)throw new Error('Invalid shortcut');const parts=value.split('+'),key=parts.pop(),mods=parts;if(new Set(mods).size!==mods.length||mods.some(m=>!['Ctrl','Alt','Shift'].includes(m))||!(/^([A-Z0-9]|\[|\]|=|-|,|\.|\/|;|'|`|\\)$/.test(key)||special.includes(key)))throw new Error('Invalid shortcut: '+value);return ['Ctrl','Alt','Shift'].filter(m=>mods.includes(m)&&!(m==='Shift'&&key==='='&&mods.includes('Ctrl'))).concat(key).join('+');}
function blocked(value){return ['Alt+F4','Ctrl+Alt+Delete','F5','Ctrl+Shift+R','F11'].includes(value);}
function fromEvent(e){if(['Control','Shift','Alt','Meta','AltGraph'].includes(e.key)||e.metaKey||e.getModifierState?.('AltGraph'))return null;const code=e.code||'',punct={BracketLeft:'[',BracketRight:']',Equal:'=',Minus:'-',Comma:',',Period:'.',Slash:'/',Semicolon:';',Quote:"'",Backquote:'`',Backslash:'\\',NumpadAdd:'=',NumpadSubtract:'-'};let key;if(/^Key[A-Z]$/.test(code))key=code.slice(3);else if(/^Digit[0-9]$/.test(code))key=code.slice(5);else if(punct[code])key=punct[code];else if(code==='Space'||e.key===' ')key='Space';else if(special.includes(e.key))key=e.key;else if(/^[a-z0-9]$/i.test(e.key))key=e.key.toUpperCase();else if(['[',']','=','-',',','.','/',';',"'",'`','\\'].includes(e.key))key=e.key;else return null;const mods=[];if(e.ctrlKey)mods.push('Ctrl');if(e.altKey)mods.push('Alt');if(e.shiftKey&&!(key==='='&&e.ctrlKey))mods.push('Shift');return mods.concat(key).join('+');}
function defaults(){return Object.fromEntries(commands.map(c=>[c.id,[...c.keys]]));}
function overlap(a,b){return a==='global'||b==='global'||a===b;}
function conflicts(map){const list=[];const seen=[];for(const c of commands)for(const key of map[c.id]||[]){for(const prior of seen)if(prior.key===key&&overlap(c.scope,prior.command.scope))list.push({key,first:prior.command.id,second:c.id});seen.push({key,command:c});}return list;}
function validate(raw,strict=true){if(!raw||typeof raw!=='object'||Array.isArray(raw)||Object.keys(raw).length>commands.length)throw new Error('Invalid keybinding map');const result=defaults();for(const [id,keys] of Object.entries(raw)){if(!Object.hasOwn(byId,id)||!Array.isArray(keys)||keys.length>3)throw new Error('Unsupported command or too many shortcuts: '+id);result[id]=keys.map(k=>{const c=canonical(k);if(c!==k||blocked(c))throw new Error('Invalid or system-reserved shortcut: '+k);return c;});if(new Set(result[id]).size!==result[id].length)throw new Error('Duplicate shortcut for '+id);}if(strict&&conflicts(result).length)throw new Error('Shortcut conflicts must be resolved before saving');return result;}
function upgrade(raw){const result=validate(raw,false);for(const c of commands)if(!Object.hasOwn(raw,c.id))result[c.id]=result[c.id].filter(key=>!commands.some(other=>other.id!==c.id&&Object.hasOwn(raw,other.id)&&overlap(c.scope,other.scope)&&result[other.id].includes(key)));return validate(result);}
function find(map,chord,scope){return commands.find(c=>(c.scope==='global'||c.scope===scope)&&(map[c.id]||[]).includes(chord));}
function reference(chord){return unsupported.find(c=>c.keys.includes(chord));}
function display(chord){return chord==='Ctrl+='?'Ctrl++':chord.replace(/\+/g,' + ');}
return {commands,unsupported,byId,defaults,canonical,blocked,fromEvent,conflicts,validate,upgrade,find,reference,display};
});
