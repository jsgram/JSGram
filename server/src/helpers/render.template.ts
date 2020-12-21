import pug from 'pug';
import path from 'path';

export const renderTemplate = (template: string, args: any): string => {
    const { env: { HEROKU_ROOT, TEMPLATE_DIR, FRONT_PATH, BACK_PATH } }: any = process;

    const templatePath = path.join(HEROKU_ROOT, TEMPLATE_DIR, template);
    const render = pug.compileFile(templatePath);

    return render({ baseUrl: FRONT_PATH, backendUrl: BACK_PATH, ...args });
};
