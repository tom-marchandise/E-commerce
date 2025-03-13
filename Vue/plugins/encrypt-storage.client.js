import { EncryptStorage } from 'encrypt-storage';

export default defineNuxtPlugin((nuxtApp) => {
    const encryptLocalStorage = new EncryptStorage('antonyleplusbeau', {
        storageType: 'localStorage',
    });

    const encryptSessionStorage = new EncryptStorage('antonyleplusbeau', {
        storageType: 'sessionStorage',
    });

    nuxtApp.provide('encryptLocalStorage', encryptLocalStorage);
    nuxtApp.provide('encryptSessionStorage', encryptSessionStorage);
});
