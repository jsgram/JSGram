// Append necessary fields to fields for AWS
export const createDataForAWS = (AWSFieldName: string, file: File, description: string = ''): FormData => {
    const formData = new FormData();
    formData.append(AWSFieldName, file);
    formData.append('description', description);
    formData.append('enctype', 'multipart/form-data');
    return formData;
};

// Create File from base64
const base64RegExp = /^data:([^;]+);/;
export const base64ToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    const mime = mimeType || (url.match(base64RegExp) || '')[1];
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, {type: mime});

};

// Create blob url
export const createBlobUrl = (image: Blob, onloadendCallback: any): void => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = onloadendCallback;
};

// 5 Create new image (not file) inside getCroppedImg
export const createImg = (url: string): Promise<any> =>
    new Promise<any>((resolve: any, reject: any): any => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        // tslint:disable-next-line:typedef
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

// 6 Create cropped image in url
export const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<any> => {
    const image = await createImg(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    // @ts-ignore
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
    );

    // 7 Transform to blob url
    return new Promise((resolve: any, reject: any): any => {
        // tslint:disable-next-line:typedef
        canvas.toBlob(blob => {
            resolve((blob));
        }, 'image/jpeg');
    });
};
