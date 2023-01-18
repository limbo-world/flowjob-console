import {createI18n} from 'vue-i18n';
import en from './config/en-US.json';
import zh from './config/zh-CN.json';

const messages = {
    en: {
        ...en
    },
    zh: {
        ...zh
    },
};
const language = (navigator.language || 'en').toLocaleLowerCase(); // 这是获取浏览器的语言

export const i18n = createI18n({
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'en', // 设置备用语言
    messages,
});

// export const $t = (message: string) => {
//     if (!message) {
//         return "";
//     }
//     if (Object.keys(messages.zh).includes(message)) {
//         return i18n.global.t(i18n.global.locale, message);
//     } else {
//         return message;
//     }
// };
