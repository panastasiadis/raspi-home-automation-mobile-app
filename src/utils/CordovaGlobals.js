let FILE_PATH = '';

document.addEventListener('deviceready', () => {
    FILE_PATH = `${window.cordova.file.applicationDirectory}www`;
}, false);

export {FILE_PATH};