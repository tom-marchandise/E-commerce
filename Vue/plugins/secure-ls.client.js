// import { EncryptStorage } from 'encrypt-storage';
//
// let encryptLocalStorage = null;
// let encryptSessionStorage = null;
//
// if (process.client) {
//     encryptLocalStorage = new EncryptStorage('antonyleplusbeau', {
//         storageType: 'localStorage'
//     });
//
//     encryptSessionStorage = new EncryptStorage('antonyleplusbeau', {
//         storageType: 'sessionStorage'
//     });
// }
//
// export default { encryptLocalStorage, encryptSessionStorage };
import SecureLS from "secure-ls";

export default ({ app }, inject) => {
    const secureLS = new SecureLS({ encodingType: 'aes' });
    inject('secureLS', secureLS);
};