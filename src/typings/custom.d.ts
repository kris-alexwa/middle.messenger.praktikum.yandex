declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.hbs' {
    import { TemplateDelegate } from 'handlebars';

    const template: TemplateDelegate;

    export default template;
}
