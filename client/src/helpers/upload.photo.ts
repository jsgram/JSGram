export const dataForAWS = (file: File): FormData => {
    const formData = new FormData();
    formData.append('userPhoto', file);
    formData.append('enctype', 'multipart/form-data');
    return formData;
};

const base64RegExp = /^data:([^;]+);/;

export const base64ToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    const mime = mimeType || (url.match(base64RegExp) || '')[1];
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, {type: mime});

};

export const selectImage = (imageFile: File): void => {
    const reader = new FileReader();
    // 1.1 Transform to base64
    reader.readAsDataURL(imageFile);
    let imageSrc;
    reader.onloadend = (): void => {
        imageSrc = reader.result;
    };
    return imageSrc;
};
